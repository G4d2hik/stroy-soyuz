"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function Portfolio() {
  const projects = [
    {
      id: 1,
      title: "Бутик KOROM",
      category: "Облицовка фасадов",
      image: "/images/portfolio/IMG_8786.PNG",
      colSpan: "md:col-span-2 lg:col-span-8",
    },
    {
      id: 2,
      title: "Арт-пространство",
      category: "Дизайн интерьера",
      image: "/images/portfolio/IMG_0897.PNG",
      colSpan: "md:col-span-1 lg:col-span-4",
    },
    {
      id: 3,
      title: "Загородный дом",
      category: "Вентилируемые фасады",
      image: "/images/portfolio/IMG_9841.PNG",
      colSpan: "md:col-span-1 lg:col-span-5",
    },
    {
      id: 4,
      title: "Коммерческий объект",
      category: "Облицовка камнем",
      image: "/images/portfolio/WhatsApp Image 2026-04-25 at 19.33.59.jpeg",
      colSpan: "md:col-span-2 lg:col-span-7",
    },
  ];

  return (
    <section className="py-[var(--spacing-section)]" id="portfolio">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="gold-divider" />
              <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-[var(--color-accent)]">
                Портфолио
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-text-heading)]">
              Наши <span className="gradient-text">работы</span>
            </h2>
          </div>
          
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
            className="group flex items-center gap-2 text-sm font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors cursor-pointer"
          >
            Хочу так же
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-5 h-auto lg:h-[600px]">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer h-[300px] lg:h-auto ${project.colSpan}`}
              onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)]/90 via-[var(--color-bg-primary)]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              <div className="absolute bottom-0 left-0 p-8 z-20 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--color-accent)] mb-2">
                  {project.category}
                </p>
                <div className="flex justify-between items-end">
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    {project.title}
                  </h3>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0 border border-white/20">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
