import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight } from "lucide-react";

const footerLinks = {
  services: [
    { label: "Дизайн проектирования", href: "/services/design" },
    { label: "Облицовка фасадов", href: "/services/facade" },
    { label: "Вент фасады", href: "/services/ventfacade" },
    { label: "Ландшафт и двор", href: "/services/landscape" },
    { label: "Интерьеры", href: "/services/interior" },
  ],
  company: [
    { label: "О компании", href: "#about" },
    { label: "Отзывы", href: "#reviews" },
    { label: "Контакты", href: "#contacts" },
    { label: "Политика конфиденциальности", href: "/privacy" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]" id="footer">
      <div className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
          {/* Company */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <span className="text-lg font-bold uppercase tracking-wide text-[var(--color-text-heading)]">
                Строй Союз
              </span>
            </Link>
            <div className="gold-divider mb-6" />
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-8">
              Профессиональная отделка и дизайн. Облицовка фасадов, ландшафт, интерьеры — всё в одной компании.
            </p>
            <div className="flex gap-3">
              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] text-[var(--color-text-muted)] transition-all duration-300"
                aria-label="Telegram"
              >
                <MessageCircle size={16} strokeWidth={1.5} />
              </a>
              <a
                href="mailto:info@soyuzstroy.ru"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] text-[var(--color-text-muted)] transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={16} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-8">
              Услуги
            </h3>
            <ul className="flex flex-col gap-4">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-300"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-8">
              Компания
            </h3>
            <ul className="flex flex-col gap-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-300"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-8">
              Контакты
            </h3>
            <div className="flex flex-col gap-5">
              <a
                href="tel:+79931464566"
                className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
              >
                <Phone size={14} strokeWidth={1.5} className="shrink-0 text-[var(--color-accent)]" />
                <span>+7 993 146-45-66</span>
              </a>
              <a
                href="mailto:info@soyuzstroy.ru"
                className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
              >
                <Mail size={14} strokeWidth={1.5} className="shrink-0 text-[var(--color-accent)]" />
                <span>info@soyuzstroy.ru</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]">
                <MapPin size={14} strokeWidth={1.5} className="shrink-0 mt-0.5 text-[var(--color-accent)]" />
                <span>г. Махачкала, ул. Хаджи Булача 14</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[var(--color-border)] mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-text-muted)]">
            © {currentYear} ООО «Строй Союз». Все права защищены.
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            Разработка сайта — веб-студия
          </p>
        </div>
      </div>
    </footer>
  );
}
