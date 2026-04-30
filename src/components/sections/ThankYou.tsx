"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import VideoPlayer from "@/components/ui/VideoPlayer";

export default function ThankYou() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto text-center"
      id="thank-you-section"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-[var(--color-accent)] flex items-center justify-center bg-[var(--color-accent-muted)]"
      >
        <Heart size={24} className="text-[var(--color-accent)]" fill="var(--color-accent)" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-3xl md:text-4xl font-bold text-[var(--color-text-heading)] mb-4"
      >
        Спасибо за ваши ответы!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-base text-[var(--color-text-secondary)] mb-4 max-w-md mx-auto"
      >
        Мы свяжемся с вами в ближайшее время. А пока посмотрите короткое видео о наших ценностях.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex items-center justify-center gap-2 text-xs uppercase tracking-wider text-[var(--color-accent)] mb-8"
      >
        <Sparkles size={14} />
        <span>Видео запустится автоматически</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <VideoPlayer title="О наших ценностях" autoPlay small />
      </motion.div>
    </motion.div>
  );
}
