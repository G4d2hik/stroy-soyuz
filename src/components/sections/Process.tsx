"use client";

import { motion } from "framer-motion";
import { MessageSquare, Ruler, FileSignature, Hammer, CheckCircle } from "lucide-react";

export default function Process() {
  const steps = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Заявка и консультация",
      desc: "Вы оставляете заявку, мы связываемся с вами, обсуждаем детали и пожелания.",
    },
    {
      icon: <Ruler className="w-6 h-6" />,
      title: "Замер и смета",
      desc: "Наш специалист бесплатно выезжает на объект, проводит замеры и составляет точную смету.",
    },
    {
      icon: <FileSignature className="w-6 h-6" />,
      title: "Договор",
      desc: "Фиксируем стоимость, сроки и гарантии в официальном договоре.",
    },
    {
      icon: <Hammer className="w-6 h-6" />,
      title: "Реализация",
      desc: "Приступаем к работе. Вы получаете регулярные отчеты о ходе выполнения работ.",
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Сдача объекта",
      desc: "Проводим финальную уборку и сдаем готовый объект точно в срок.",
    },
  ];

  return (
    <section className="py-[var(--spacing-section)] bg-[var(--color-bg-secondary)]" id="process">
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
              Схема работы
            </span>
            <div className="gold-divider" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-text-heading)] mb-4">
            Как мы <span className="gradient-text">работаем</span>
          </h2>
        </motion.div>

        {/* Desktop Process Line (hidden on mobile) */}
        <div className="hidden lg:block relative mb-20">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent -translate-y-1/2" />
          
          <div className="grid grid-cols-5 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[var(--color-bg-card)] border-2 border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] mb-6 shadow-xl relative z-10">
                  {step.icon}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--color-accent)] text-[var(--color-bg-primary)] text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[var(--color-text-heading)] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Process List */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex gap-6 p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-card)]"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] relative">
                {step.icon}
                <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[var(--color-accent)] text-[var(--color-bg-primary)] text-[10px] font-bold flex items-center justify-center">
                  {idx + 1}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--color-text-heading)] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
