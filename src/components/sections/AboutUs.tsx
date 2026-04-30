"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function AboutUs() {
  const points = [
    "Более 10 лет на рынке",
    "Собственный штат мастеров",
    "Использование премиум материалов",
    "Строгий контроль качества на всех этапах"
  ];

  return (
    <section className="py-[var(--spacing-section)] bg-[var(--color-bg-secondary)]" id="about">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="gold-divider" />
              <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-[var(--color-accent)]">
                О компании
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-text-heading)] mb-6">
              Надежный партнер в строительстве и <span className="gradient-text">ремонте</span>
            </h2>
            
            <p className="text-base text-[var(--color-text-secondary)] mb-8 leading-relaxed">
              «Союз Строй» — это команда профессионалов, объединенная целью создавать безупречные объекты. 
              Мы берем на себя полную ответственность за результат: от разработки первого эскиза до финальной уборки перед сдачей ключей.
            </p>
            
            <div className="space-y-4 mb-10">
              {points.map((point, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-[var(--color-accent)] flex-shrink-0" />
                  <span className="text-[var(--color-text-primary)] font-medium">{point}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-[var(--color-border)] text-[var(--color-text-heading)] font-semibold text-sm hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300 w-full sm:w-auto cursor-pointer"
            >
              Узнать больше
            </button>
          </motion.div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[500px] lg:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl border border-[var(--color-border-card)] group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)]/80 via-transparent to-transparent z-10" />
            <Image
              src="/images/hero-bg.png" // Используем пока что фоновое изображение для демонстрации
              alt="О компании Союз Строй"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            
            {/* Overlay Text/Badge */}
            <div className="absolute bottom-8 left-8 right-8 z-20">
              <div className="backdrop-blur-md bg-black/40 border border-white/10 p-6 rounded-xl text-white">
                <p className="text-3xl font-bold text-[var(--color-accent)] mb-1">100+</p>
                <p className="text-sm font-medium">Успешно реализованных объектов по всему Дагестану</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
