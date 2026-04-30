"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  const contacts = [
    {
      name: "WhatsApp",
      icon: <MessageSquare size={20} />,
      href: "https://wa.me/79931464566",
      color: "bg-[#25D366]",
    },
    {
      name: "Telegram",
      icon: <MessageCircle size={20} />,
      href: "https://t.me/8404066937", // Based on previous context chat ID or bot
      color: "bg-[#0088cc]",
    },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col items-end gap-3 mb-2">
            {contacts.map((contact, idx) => (
              <motion.a
                key={contact.name}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className={`${contact.color} text-white p-4 rounded-full shadow-2xl flex items-center gap-3 group hover:scale-110 transition-transform`}
              >
                <span className="text-sm font-semibold max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
                  {contact.name}
                </span>
                {contact.icon}
              </motion.a>
            ))}
          </div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-[var(--color-accent)] text-[var(--color-bg-primary)] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95 z-10"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>

      {/* Ripple Effect */}
      {!isOpen && (
        <span className="absolute inset-0 rounded-full bg-[var(--color-accent)] opacity-40 animate-ping -z-10" />
      )}
    </div>
  );
}
