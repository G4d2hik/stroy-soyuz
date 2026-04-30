"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Phone, User } from "lucide-react";
import { submitLead } from "@/app/actions/submitLead";

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    
    // Подписываемся на кастомное событие
    window.addEventListener("open-contact-modal", handleOpen);
    
    return () => {
      window.removeEventListener("open-contact-modal", handleOpen);
    };
  }, []);

  const close = () => {
    setIsOpen(false);
    setTimeout(() => {
      setIsSuccess(false);
      setName("");
      setPhone("");
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsSubmitting(true);
    const result = await submitLead({ name, phone }, "Модальное окно");
    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
      setTimeout(close, 3000); // Закрываем через 3 секунды после успеха
    } else {
      alert("К сожалению, произошла ошибка. Пожалуйста, позвоните нам.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md z-[101]"
          >
            <div className="relative bg-[var(--color-bg-card)] border border-[var(--color-border-card)] rounded-2xl shadow-2xl p-8 overflow-hidden">
              
              {/* Close Button */}
              <button
                onClick={close}
                className="absolute top-4 right-4 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center mx-auto mb-6">
                    <Send className="text-[var(--color-accent)]" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--color-text-heading)] mb-4">
                    Заявка отправлена!
                  </h3>
                  <p className="text-[var(--color-text-secondary)]">
                    Спасибо за доверие. Мы свяжемся с вами в течение часа.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-8 text-center">
                    <h3 className="text-2xl font-bold text-[var(--color-text-heading)] mb-2">
                      Оставьте заявку
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      Оставьте свои контакты, и мы перезвоним вам в ближайшее время.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
                        <User size={18} />
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Ваше имя"
                        className="w-full pl-12 pr-6 py-4 rounded-xl border border-[var(--color-border-card)] bg-[var(--color-bg-secondary)] text-[var(--color-text-heading)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-all duration-300"
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
                        <Phone size={18} />
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        placeholder="Ваш телефон (+7 900 000 00 00)"
                        className="w-full pl-12 pr-6 py-4 rounded-xl border border-[var(--color-border-card)] bg-[var(--color-bg-secondary)] text-[var(--color-text-heading)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-all duration-300"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !name || !phone}
                      className="mt-2 flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-primary)] font-semibold hover:bg-[var(--color-accent-hover)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer shadow-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-[var(--color-bg-primary)]/30 border-t-[var(--color-bg-primary)] rounded-full animate-spin" />
                          Отправка...
                        </>
                      ) : (
                        <>
                          Отправить заявку
                          <Send size={16} />
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-center text-[var(--color-text-muted)] mt-2">
                      Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
