"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Calculator, HardHat, Clock } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Calculator className="w-8 h-8" />,
      title: "Прозрачная смета",
      desc: "Точный расчет стоимости до начала работ. Никаких скрытых платежей и переплат в процессе.",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Бесплатный выезд на замер",
      desc: "Наш специалист приедет на объект, произведет замеры и проконсультирует вас абсолютно бесплатно.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Гарантия до 5 лет",
      desc: "Мы уверены в качестве своих работ и предоставляем официальную гарантию по договору.",
    },
    {
      icon: <HardHat className="w-8 h-8" />,
      title: "Опытные бригады",
      desc: "Квалифицированные мастера с многолетним опытом работы на объектах премиум-класса.",
    },
  ];

  return (
    <section className="py-[var(--spacing-section)] border-t border-[var(--color-border)] relative overflow-hidden" id="features">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-accent)] opacity-[0.015] rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10">
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
              Наши преимущества
            </span>
            <div className="gold-divider" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-text-heading)] mb-4">
            Почему выбирают <span className="gradient-text">нас</span>
          </h2>
          <p className="text-base text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Обеспечиваем высший уровень сервиса и качества для каждого клиента
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-2xl border border-[var(--color-border-card)] bg-[var(--color-bg-card)] hover:border-[var(--color-accent)]/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.05)] transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] group-hover:border-[var(--color-accent)]/30 transition-colors mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text-heading)] mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
