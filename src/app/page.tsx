"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import VideoPlayer from "@/components/ui/VideoPlayer";
import ProductsSidebar from "@/components/sections/ProductsSidebar";
import AboutSidebar from "@/components/sections/AboutSidebar";
import Quiz from "@/components/sections/Quiz";
import ThankYou from "@/components/sections/ThankYou";
import AboutUs from "@/components/sections/AboutUs";
import Features from "@/components/sections/Features";
import Portfolio from "@/components/sections/Portfolio";
import Process from "@/components/sections/Process";
import { Sparkles, ArrowRight, Phone } from "lucide-react";

type FunnelStage = "video" | "quiz" | "thankyou";

import { services } from "@/config/services";

export default function HomePage() {
  const [funnelStage, setFunnelStage] = useState<FunnelStage>("video");

  const handleVideoEnd = () => {
    setFunnelStage("quiz");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleQuizComplete = () => {
    setFunnelStage("thankyou");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* ===== HERO with background image ===== */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden" id="hero">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/portfolio/IMG_8784.PNG"
            alt="Современная архитектура"
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="100vw"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-primary)]/50 via-[var(--color-bg-primary)]/60 to-[var(--color-bg-primary)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg-primary)]/80 via-transparent to-[var(--color-bg-primary)]/40" />
        </div>

        {/* Hero content */}
        <div className="container relative z-10 pt-32 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="gold-divider" />
              <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-[var(--color-accent)]">
                Махачкала и Республика Дагестан
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--color-text-heading)] leading-[1.1] mb-6">
              Превращаем идеи
              <br />
              <span className="gradient-text">в реальность</span>
            </h1>

            <p className="text-base md:text-lg text-[var(--color-text-secondary)] max-w-xl mb-10 leading-relaxed">
              Премиальное строительство, дизайн-проектирование, фасады, интерьеры и ландшафт по всему Дагестану.
              Комплексный подход к каждому объекту с гарантией качества.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-primary)] font-semibold text-sm hover:bg-[var(--color-accent-hover)] transition-all duration-300 shadow-lg w-full sm:w-auto"
                id="hero-cta-services"
              >
                Наши услуги
                <ArrowRight size={16} />
              </a>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-[var(--color-border)] text-[var(--color-text-heading)] font-semibold text-sm hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300 backdrop-blur-sm w-full sm:w-auto cursor-pointer"
                id="hero-cta-contact"
              >
                Связаться с нами
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== VIDEO FUNNEL SECTION ===== */}
      <section className="py-[var(--spacing-section)] relative" id="video-funnel">
        <div className="container">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="gold-divider" />
              <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-[var(--color-accent)]">
                Узнайте больше
              </span>
              <div className="gold-divider" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-heading)] mb-3">
              Смотрите и <span className="gradient-text">узнавайте</span>
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] max-w-lg mx-auto">
              Посмотрите видео, пройдите короткий опрос — и мы подберём решение именно для вас
            </p>
          </motion.div>

          {/* 3-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left — Products */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <ProductsSidebar />
            </div>

            {/* Center — Video Funnel */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <AnimatePresence mode="wait">
                {funnelStage === "video" && (
                  <motion.div
                    key="video"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <VideoPlayer
                      title="3 опасные ошибки, которые допускают 99% людей"
                      onVideoEnd={handleVideoEnd}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mt-6 text-center"
                    >
                      <button
                        onClick={() => setFunnelStage("quiz")}
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-primary)] font-semibold text-sm hover:bg-[var(--color-accent-hover)] shadow-lg transition-all duration-300 animate-pulse-glow cursor-pointer"
                        id="start-quiz-btn"
                      >
                        <Sparkles size={16} />
                        Пройти анкету и получить консультацию
                      </button>
                      <p className="text-[11px] text-[var(--color-text-muted)] mt-3 uppercase tracking-wider">
                        4 вопроса — 30 секунд вашего времени
                      </p>
                    </motion.div>
                  </motion.div>
                )}

                {funnelStage === "quiz" && (
                  <motion.div
                    key="quiz"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Quiz onComplete={handleQuizComplete} />
                  </motion.div>
                )}

                {funnelStage === "thankyou" && (
                  <motion.div
                    key="thankyou"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ThankYou />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right — About & Reviews */}
            <div className="lg:col-span-3 order-3">
              <AboutSidebar />
            </div>
          </div>
        </div>
      </section>

      <AboutUs />
      <Features />
      <Portfolio />



      <Process />

      {/* ===== SERVICES DETAILED ===== */}
      <section className="py-[var(--spacing-section)] border-t border-[var(--color-border)]" id="products">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="gold-divider" />
              <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-[var(--color-accent)]">
                Что мы делаем
              </span>
              <div className="gold-divider" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-text-heading)] mb-4">
              Наши <span className="gradient-text">услуги</span>
            </h2>
            <p className="text-base text-[var(--color-text-secondary)] max-w-xl mx-auto">
              Полный спектр услуг по дизайну, отделке и благоустройству вашего объекта
            </p>
          </motion.div>

          {/* Services grid — like references with images and numbers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`group rounded-2xl border border-[var(--color-border-card)] bg-[var(--color-bg-card)] overflow-hidden hover:border-[var(--color-border-hover)] transition-all duration-500 ${
                  i >= 3 ? "lg:col-span-1 md:col-span-1" : ""
                }`}
                id={`service-${service.id}`}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-card)] via-transparent to-transparent" />
                  {/* Number */}
                  <div className="absolute top-4 left-4 text-4xl font-bold text-white/10 leading-none">
                    {service.num}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-[var(--color-text-heading)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
                    {service.desc}
                  </p>
                  <a
                    href={`/services/${service.id}`}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors group/link"
                  >
                    Подробнее
                    <ArrowRight size={12} className="transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACTS ===== */}
      <section className="py-[var(--spacing-section)] border-t border-[var(--color-border)] relative overflow-hidden" id="contacts">
        {/* Background accent */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-accent)] opacity-[0.02] rounded-full blur-[150px]" />
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Text & Buttons */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="gold-divider" />
                <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-[var(--color-accent)]">
                  Связаться с нами
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-text-heading)] mb-6">
                Обсудим ваш <span className="gradient-text">проект?</span>
              </h2>
              
              <div className="space-y-4 mb-10 text-base text-[var(--color-text-secondary)]">
                <p className="leading-relaxed">
                  Оставьте заявку или позвоните — мы ответим в течение часа и предложим лучшее решение для вашего объекта.
                </p>
                <div className="flex flex-col gap-3 pt-4">
                  <p className="flex items-center gap-3 text-[var(--color-text-primary)]">
                    <span className="w-8 h-8 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] text-xs">📍</span> 
                    г. Махачкала, ул. Хаджи Булача, 14
                  </p>
                  <p className="flex items-center gap-3 text-[var(--color-text-primary)]">
                    <span className="w-8 h-8 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] text-xs">🕒</span> 
                    Пн-Сб: 09:00 - 18:00
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="tel:+79931464566"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-primary)] font-semibold text-sm hover:bg-[var(--color-accent-hover)] shadow-lg transition-all duration-300 w-full sm:w-auto"
                  id="contact-call-btn"
                >
                  <Phone size={16} />
                  Позвонить нам
                </a>
                <a
                  href="https://t.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-[var(--color-border)] text-[var(--color-text-heading)] font-semibold text-sm hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300 w-full sm:w-auto"
                  id="contact-telegram-btn"
                >
                  Написать в Telegram
                </a>
              </div>
            </motion.div>

            {/* Right: Yandex Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden border border-[var(--color-border-card)] shadow-2xl group"
            >
              {/* Overlay for aesthetic */}
              <div className="absolute inset-0 bg-black/10 pointer-events-none group-hover:bg-transparent transition-colors duration-500 z-10" />
              
              <iframe 
                src="https://yandex.ru/map-widget/v1/?mode=search&text=Махачкала,+улица+Хаджи+Булача,+14&z=17" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                allowFullScreen={true}
                className="absolute inset-0 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              ></iframe>
              
              {/* Badge */}
              <div className="absolute top-6 right-6 z-20 pointer-events-none transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="backdrop-blur-md bg-black/60 border border-[var(--color-accent)]/30 px-4 py-2 rounded-lg">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-accent)]">Мы на карте</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
