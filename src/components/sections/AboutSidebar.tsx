"use client";

import { motion } from "framer-motion";
import { Shield, Clock, Award, Users, Star, Quote } from "lucide-react";

const stats = [
  { value: "150+", label: "Проектов", icon: Award },
  { value: "12", label: "Лет опыта", icon: Clock },
  { value: "98%", label: "Довольны", icon: Users },
  { value: "5 лет", label: "Гарантия", icon: Shield },
];

const reviews = [
  {
    id: 1,
    name: "Александр М.",
    text: "Полностью преобразили наш фасад. Качество работ на высшем уровне.",
    rating: 5,
  },
  {
    id: 2,
    name: "Елена К.",
    text: "Дизайн-проект интерьера превзошёл ожидания! Рекомендую.",
    rating: 5,
  },
  {
    id: 3,
    name: "Дмитрий В.",
    text: "Профессиональный подход к ландшафту. Двор стал любимым местом семьи.",
    rating: 5,
  },
];

export default function AboutSidebar() {
  return (
    <div className="flex flex-col gap-5" id="about-sidebar">
      {/* About */}
      <div
        className="rounded-xl border border-[var(--color-border-card)] bg-[var(--color-bg-card)] p-6"
        id="about"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="gold-divider" />
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            О нас
          </h3>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
          <span className="text-[var(--color-text-heading)] font-semibold">«Строй Союз»</span>{" "}
          — команда профессионалов в сфере дизайна, отделки и благоустройства.
          Создаём пространства под ключ: от эскиза до реализации.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3" id="stats-section">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="rounded-xl border border-[var(--color-border-card)] bg-[var(--color-bg-card)] p-4 text-center group hover:border-[var(--color-border-hover)] transition-all duration-300"
            >
              <Icon
                size={18}
                strokeWidth={1.5}
                className="mx-auto mb-2 text-[var(--color-accent)]"
              />
              <div className="text-xl font-bold gradient-text leading-tight">{stat.value}</div>
              <div className="text-[10px] text-[var(--color-text-muted)] mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Reviews */}
      <div id="reviews">
        <div className="flex items-center gap-3 mb-4">
          <div className="gold-divider" />
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Отзывы
          </h3>
        </div>
        <div className="flex flex-col gap-3">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.12 }}
              className="rounded-xl border border-[var(--color-border-card)] bg-[var(--color-bg-card)] p-5 relative overflow-hidden group hover:border-[var(--color-border-hover)] transition-all duration-300"
            >
              <Quote
                size={36}
                className="absolute top-3 right-3 text-[var(--color-accent)] opacity-10"
                strokeWidth={1}
              />
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star
                    key={j}
                    size={12}
                    className="text-[var(--color-accent)]"
                    fill="var(--color-accent)"
                  />
                ))}
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-3 relative z-10">
                «{review.text}»
              </p>
              <p className="text-[11px] font-semibold text-[var(--color-accent)]">
                — {review.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
