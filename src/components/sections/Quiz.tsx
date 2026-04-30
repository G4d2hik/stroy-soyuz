"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Send, Check } from "lucide-react";
import { submitLead } from "@/app/actions/submitLead";

interface QuizQuestion {
  id: number;
  question: string;
  type: "single" | "text" | "contact";
  options?: string[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "На какой стадии ваш объект?",
    type: "single",
    options: ["В планах", "Строится", "Готовый объект"],
  },
  {
    id: 2,
    question: "Есть ли дизайн-проект или визуализация?",
    type: "single",
    options: [
      "Да, есть готовый дизайн-проект",
      "Есть наброски / референсы",
      "Нет, нужна помощь с нуля",
    ],
  },
  {
    id: 3,
    question: "Где находится ваш объект?",
    type: "text",
  },
  {
    id: 4,
    question: "Определились со стилем дизайна?",
    type: "single",
    options: [
      "Да, знаю что хочу",
      "Есть идеи, нужна консультация",
      "Нет, жду предложений от вас",
    ],
  },
  {
    id: 5,
    question: "Оставьте ваши контакты",
    type: "contact",
  },
];

interface QuizProps {
  onComplete: () => void;
}

export default function Quiz({ onComplete }: QuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = quizQuestions.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const currentQuestion = quizQuestions[currentStep];
  const isLastStep = currentStep === totalSteps - 1;
  
  const canProceed = currentQuestion.type === "contact"
    ? (answers["name"]?.trim()?.length > 1 && answers["phone"]?.trim()?.length > 5)
    : !!answers[String(currentQuestion.id)];

  const handleSelect = (option: string) => {
    setAnswers((prev) => ({ ...prev, [String(currentQuestion.id)]: option }));
  };

  const handleTextChange = (value: string) => {
    setAnswers((prev) => ({ ...prev, [String(currentQuestion.id)]: value }));
  };

  const handleNext = () => {
    if (isLastStep) handleSubmit();
    else setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Подготовка данных для отправки
    const leadData: Record<string, string> = {
      name: answers["name"] || "",
      phone: answers["phone"] || "",
    };

    // Добавляем вопросы и ответы
    quizQuestions.forEach((q) => {
      if (q.type !== "contact" && answers[String(q.id)]) {
        leadData[q.question] = answers[String(q.id)];
      }
    });

    const result = await submitLead(leadData, "Квиз");
    
    setIsSubmitting(false);
    
    if (result.success) {
      onComplete();
    } else {
      alert("К сожалению, произошла ошибка при отправке. Пожалуйста, позвоните нам.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto"
      id="quiz-section"
    >
      <div className="rounded-2xl border border-[var(--color-border-card)] bg-[var(--color-bg-card)] overflow-hidden shadow-2xl">
        {/* Progress */}
        <div className="h-[2px] bg-[var(--color-bg-secondary)]">
          <motion.div
            className="h-full bg-[var(--color-accent)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        <div className="p-8 md:p-10">
          {/* Step */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-xs uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
              Вопрос {currentStep + 1} из {totalSteps}
            </span>
            <span className="text-xs font-medium text-[var(--color-accent)]">
              {Math.round(progress)}%
            </span>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="text-2xl font-bold text-[var(--color-text-heading)] mb-8">
                {currentQuestion.question}
              </h3>

              {currentQuestion.type === "single" && currentQuestion.options && (
                <div className="flex flex-col gap-3">
                  {currentQuestion.options.map((option) => {
                    const isSelected = answers[String(currentQuestion.id)] === option;
                    return (
                      <motion.button
                        key={option}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleSelect(option)}
                        className={`w-full text-left px-6 py-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? "border-[var(--color-accent)] bg-[var(--color-accent-muted)] text-[var(--color-text-heading)]"
                            : "border-[var(--color-border-card)] bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-elevated)]"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${
                              isSelected
                                ? "border-[var(--color-accent)] bg-[var(--color-accent)]"
                                : "border-[var(--color-text-muted)]"
                            }`}
                          >
                            {isSelected && <Check size={12} className="text-[var(--color-bg-primary)]" />}
                          </div>
                          <span className="font-medium text-sm">{option}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {currentQuestion.type === "text" && (
                <input
                  type="text"
                  value={answers[String(currentQuestion.id)] || ""}
                  onChange={(e) => handleTextChange(e.target.value)}
                  placeholder="Например: г. Москва, Подмосковье..."
                  className="w-full px-6 py-4 rounded-xl border border-[var(--color-border-card)] bg-[var(--color-bg-secondary)] text-[var(--color-text-heading)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-all duration-300 text-base"
                  id="quiz-text-input"
                />
              )}

              {currentQuestion.type === "contact" && (
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    value={answers["name"] || ""}
                    onChange={(e) => setAnswers(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ваше имя"
                    className="w-full px-6 py-4 rounded-xl border border-[var(--color-border-card)] bg-[var(--color-bg-secondary)] text-[var(--color-text-heading)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-all duration-300 text-base"
                    id="quiz-name-input"
                  />
                  <input
                    type="tel"
                    value={answers["phone"] || ""}
                    onChange={(e) => setAnswers(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Ваш номер телефона (например: +7 900 000 00 00)"
                    className="w-full px-6 py-4 rounded-xl border border-[var(--color-border-card)] bg-[var(--color-bg-secondary)] text-[var(--color-text-heading)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-all duration-300 text-base"
                    id="quiz-phone-input"
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
                currentStep === 0
                  ? "opacity-0 pointer-events-none"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-heading)] border border-[var(--color-border-card)] hover:border-[var(--color-border-hover)]"
              }`}
              id="quiz-back-btn"
            >
              <ChevronLeft size={16} />
              Назад
            </button>

            <motion.button
              whileHover={canProceed ? { scale: 1.03 } : {}}
              whileTap={canProceed ? { scale: 0.97 } : {}}
              onClick={handleNext}
              disabled={!canProceed || isSubmitting}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                canProceed
                  ? "bg-[var(--color-accent)] text-[var(--color-bg-primary)] hover:bg-[var(--color-accent-hover)] shadow-lg"
                  : "bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)] cursor-not-allowed"
              }`}
              id="quiz-next-btn"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-[var(--color-bg-primary)]/30 border-t-[var(--color-bg-primary)] rounded-full animate-spin" />
                  Отправка...
                </>
              ) : isLastStep ? (
                <>
                  Отправить
                  <Send size={14} />
                </>
              ) : (
                <>
                  Далее
                  <ChevronRight size={16} />
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
