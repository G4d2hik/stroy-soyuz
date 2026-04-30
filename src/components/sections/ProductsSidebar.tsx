"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { services as products } from "@/config/services";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export default function ProductsSidebar() {
  return (
    <div className="flex flex-col gap-3" id="products-sidebar">
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-1">
        Наши услуги
      </h3>
      {products.map((product, i) => (
        <motion.a
          key={product.id}
          href={`/services/${product.id}`}
          custom={i}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.02 }}
          className="group relative rounded-xl overflow-hidden border border-[var(--color-border-card)] bg-[var(--color-bg-card)] hover:border-[var(--color-border-hover)] transition-all duration-500 cursor-pointer"
          id={`product-card-${product.id}`}
        >
          {/* Image */}
          <div className="relative h-20 overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
              sizes="300px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-card)] via-transparent to-transparent" />
          </div>

          {/* Text */}
          <div className="px-4 pb-3 -mt-2 relative z-10">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-[var(--color-text-heading)] group-hover:text-[var(--color-accent)] transition-colors leading-tight">
                {product.title}
              </h4>
              <ArrowRight
                size={14}
                className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-all duration-300 opacity-0 group-hover:opacity-100 shrink-0"
              />
            </div>
            <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5">
              {product.desc}
            </p>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
