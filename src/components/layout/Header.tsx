"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#hero", label: "Главная" },
  { href: "#products", label: "Услуги" },
  { href: "#about", label: "О нас" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#contacts", label: "Контакты" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass py-2"
          : "bg-transparent py-4"
      }`}
      id="header"
    >
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo — оригинальный логотип заказчика */}
          <Link href="/" className="flex items-center gap-2 group" id="logo-link">
            <div className="relative w-12 h-12 flex items-center justify-center rounded-lg overflow-hidden bg-white/95 p-1 shadow-sm">
              <Image
                src="/images/logo-original.png"
                alt="Строй Союз"
                width={44}
                height={44}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-wide text-[var(--color-text-heading)] uppercase leading-tight">
                Строй Союз
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent)] leading-none">
                дизайн • фасады • интерьеры
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10" id="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={isHome ? link.href : `/${link.href}`}
                className="text-[13px] font-medium uppercase tracking-wider text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contacts */}
          <div className="hidden lg:flex items-center gap-5" id="header-contacts">
            <a
              href="tel:+79931464566"
              className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300"
              id="header-phone"
            >
              <Phone size={14} className="text-[var(--color-accent)]" />
              <span className="font-medium tracking-wider">+7 993 146-45-66</span>
            </a>
            <div className="w-px h-4 bg-[var(--color-border)]" />
            <div className="flex items-center gap-2">
              <a
                href="mailto:info@soyuzstroy.ru"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-muted)] transition-all duration-300"
                id="header-email"
                aria-label="Email"
              >
                <Mail size={15} strokeWidth={1.5} />
              </a>
              <a
                href="https://t.me/8404066937"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-muted)] transition-all duration-300"
                id="header-telegram"
                aria-label="Telegram"
              >
                <MessageCircle size={15} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
            aria-label="Меню"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)]"
            id="mobile-menu"
          >
            <div className="container py-8 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={isHome ? link.href : `/${link.href}`}
                    className="block text-base font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors py-3 border-b border-[var(--color-border)]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-6 flex flex-col gap-4">
                <a
                  href="tel:+79931464566"
                  className="flex items-center gap-3 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                >
                  <Phone size={16} strokeWidth={1.5} />
                  <span>+7 993 146-45-66</span>
                </a>
                <a
                  href="mailto:info@soyuzstroy.ru"
                  className="flex items-center gap-3 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                >
                  <Mail size={16} strokeWidth={1.5} />
                  <span>info@soyuzstroy.ru</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
