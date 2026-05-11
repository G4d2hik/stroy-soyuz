"use client";

import React, { useState } from "react";
import { ArrowRight, ChevronRight, Play, X, Check, Palette, Clock, ShieldCheck } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Quiz from "@/components/sections/Quiz";
import ThankYou from "@/components/sections/ThankYou";
import { sendTelegramFromBrowser } from "@/lib/sendTelegramClient";

const InlineLeadForm = ({ 
  buttonClass, 
  buttonText, 
  inputClass,
  formClass
}: { 
  buttonClass: string, 
  buttonText: string, 
  inputClass: string,
  formClass: string
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || phone.length < 5) return;
    setIsSubmitting(true);
    await sendTelegramFromBrowser({ name, phone }, "Форма со страницы дизайн-проектирования");
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 bg-green-50 border border-green-200 text-green-800 p-6 rounded-2xl ${formClass}`}>
        <Check size={28} className="text-green-600 flex-shrink-0" />
        <span className="font-bold text-lg text-center sm:text-left">Заявка успешно отправлена! Мы скоро свяжемся с вами.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-4 ${formClass}`}>
      <input 
        type="text" 
        placeholder="Ваше имя" 
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={inputClass} 
      />
      <input 
        type="tel" 
        placeholder="+7 (999) 000-00-00" 
        required
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className={inputClass} 
      />
      <button 
        type="submit" 
        disabled={isSubmitting}
        className={`${buttonClass} ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {isSubmitting ? "Отправка..." : buttonText}
      </button>
    </form>
  );
};

export default function DesignReplicaPage() {
  const [activeTab, setActiveTab] = useState("apartments");
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizStage, setQuizStage] = useState<"quiz" | "thankyou">("quiz");

  const scrollToCatalog = () => {
    const element = document.getElementById('catalog-section');
    if (!element) return;
    
    // Account for fixed header offset if any, using 80px as standard
    const headerOffset = 80;
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - headerOffset;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1200; // 1.2 seconds for slower scroll
    let start: number | null = null;

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Easing function: easeInOutQuart for very smooth start and end
      const ease = progress < 0.5 ? 8 * progress * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 4) / 2;

      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  return (
    <main className="bg-white text-[#1a1a1a] min-h-screen pt-24 font-sans">
      {/* HERO SECTION */}
      <section className="relative w-full h-[600px] md:h-[700px] bg-gray-100 overflow-hidden flex items-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image src="/images/design/hero.png" alt="Дизайн интерьера" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="container relative z-10 px-4 md:px-8">
          <div className="max-w-3xl bg-white/95 backdrop-blur-md p-8 md:p-12 rounded-2xl shadow-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-gray-900 tracking-tight">
              Создаем и реализуем интерьер вашей мечты
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 font-medium">
              Рассчитайте стоимость прямо на сайте и бесплатно получите детальную смету через 30 минут
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => { setIsQuizOpen(true); setQuizStage("quiz"); }}
                className="bg-[#0088FF] hover:bg-[#0070d6] text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-lg shadow-blue-500/30"
              >
                РАССЧИТАТЬ СТОИМОСТЬ РАБОТ
              </button>
              <button 
                onClick={scrollToCatalog}
                className="bg-white border-2 border-[#0088FF] text-[#0088FF] hover:bg-blue-50 font-bold py-4 px-8 rounded-xl transition-colors"
              >
                Скачайте каталог с ценами
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F8F9FA] p-8 rounded-2xl flex flex-col items-center text-center justify-center border border-gray-100 shadow-sm transition-transform hover:-translate-y-1">
               <div className="w-16 h-16 bg-blue-50/50 rounded-full flex items-center justify-center mb-6">
                 <Palette className="text-[#0088FF]" size={32} />
               </div>
               <h3 className="font-bold text-lg text-gray-900">Акцент на эстетике<br/>и функциональности</h3>
            </div>
            <div className="bg-[#F8F9FA] p-8 rounded-2xl flex flex-col items-center text-center justify-center border border-gray-100 shadow-sm transition-transform hover:-translate-y-1">
               <div className="w-16 h-16 bg-blue-50/50 rounded-full flex items-center justify-center mb-6">
                 <Clock className="text-[#0088FF]" size={32} />
               </div>
               <h3 className="font-bold text-lg text-gray-900">Точные сроки<br/>и фиксированный бюджет</h3>
            </div>
            <div className="bg-[#F8F9FA] p-8 rounded-2xl flex flex-col items-center text-center justify-center border border-gray-100 shadow-sm transition-transform hover:-translate-y-1">
               <div className="w-16 h-16 bg-blue-50/50 rounded-full flex items-center justify-center mb-6">
                 <ShieldCheck className="text-[#0088FF]" size={32} />
               </div>
               <h3 className="font-bold text-lg text-gray-900">Строгое соблюдение<br/>СНиП и ГОСТ</h3>
            </div>
          </div>
        </div>
      </section>


      {/* LEAD FORM 1 */}
      <section className="py-24 bg-[#0088FF] text-white relative overflow-hidden">
        {/* Background abstract element placeholder */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="container relative z-10 px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                Не знаете, что выбрать?
              </h2>
              <p className="text-xl mb-10 opacity-90 leading-relaxed font-medium">
                Оставьте заявку, и наш специалист поможет подобрать оптимальный пакет под ваши задачи.
              </p>
              <InlineLeadForm
                formClass="w-full max-w-2xl"
                inputClass="flex-1 px-6 py-5 rounded-xl text-gray-900 text-lg shadow-inner focus:outline-none focus:ring-4 focus:ring-white/30 w-full"
                buttonClass="bg-[#1A1A1A] hover:bg-black text-white font-bold px-10 py-5 rounded-xl transition-all shadow-lg text-lg hover:scale-105 active:scale-95 w-full sm:w-auto"
                buttonText="Отправить"
              />
              <p className="text-xs mt-6 opacity-70">
                Нажимая на кнопку, вы соглашаетесь с <a href="#" className="underline hover:opacity-100 transition-opacity">политикой конфиденциальности</a>
              </p>
            </div>
            <div className="w-full md:w-5/12 h-[450px] relative overflow-hidden rounded-3xl shadow-2xl border border-white/20">
               <Image src="/images/design/specialist.png" alt="Наш специалист" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="py-24 bg-white">
        <div className="container px-4 md:px-8">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-12 text-center text-gray-900 tracking-tight max-w-4xl mx-auto">
            Выполнили 10 000+ проектов по всей России и СНГ
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <button 
              onClick={() => setActiveTab('apartments')}
              className={`px-8 py-4 rounded-full font-bold transition-all ${activeTab === 'apartments' ? 'bg-[#1A1A1A] text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Дизайн-проект квартир
            </button>
            <button 
              onClick={() => setActiveTab('houses')}
              className={`px-8 py-4 rounded-full font-bold transition-all ${activeTab === 'houses' ? 'bg-[#1A1A1A] text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Дизайн-проект домов
            </button>
            <button 
              onClick={() => setActiveTab('renovation')}
              className={`px-8 py-4 rounded-full font-bold transition-all ${activeTab === 'renovation' ? 'bg-[#1A1A1A] text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Ремонт квартир и домов
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="aspect-[4/3] bg-gray-200 rounded-3xl mb-6 overflow-hidden relative flex items-center justify-center">
                  <Image src={`/images/design/portfolio_${item}.png`} alt={`Проект ${item}`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-[#0088FF]/0 group-hover:bg-[#0088FF]/20 transition-colors flex items-center justify-center z-10">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-8 group-hover:translate-y-0 duration-300 shadow-xl">
                      <ChevronRight size={32} className="text-[#0088FF]" />
                    </div>
                  </div>
                </div>
                <h3 className="font-extrabold text-2xl text-gray-900 mb-3 group-hover:text-[#0088FF] transition-colors">
                  Дизайн-проект {activeTab === 'houses' ? 'дома' : 'квартиры'}
                </h3>
                <p className="text-gray-500 font-medium flex items-center gap-2 uppercase tracking-wider text-sm">
                  Смотреть проект <ArrowRight size={16} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOG BANNER */}
      <section id="catalog-section" className="py-12 bg-white">
        <div className="container px-4 md:px-8">
          <div className="bg-[#F8F9FA] border border-gray-100 rounded-[2rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-8 text-gray-900 tracking-tight leading-tight">
                Получите полный каталог выполненных проектов в формате PDF
              </h2>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal', { detail: { source: 'Получение каталога с ценами (Дизайн)' } }))}
                className="bg-[#0088FF] hover:bg-[#0070d6] text-white font-bold py-5 px-10 rounded-xl transition-all shadow-lg shadow-blue-500/30 text-lg inline-block"
              >
                Получить каталог с ценами
              </button>
            </div>
            <div className="w-full md:w-[400px] aspect-[3/4] md:aspect-square bg-gray-200 rounded-[2rem] border-4 border-white shadow-xl relative overflow-hidden">
               <Image src="/images/design/catalog.png" alt="Каталог проектов" fill className="object-cover" />
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#0088FF] rounded-full blur-2xl opacity-50 z-10 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT / HISTORY */}
      <section className="py-24 bg-white">
        <div className="container px-4 md:px-8 flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 aspect-[4/3] bg-gray-200 rounded-[2rem] relative overflow-hidden shadow-xl">
             <Image src="/images/design/team.png" alt="Наша команда" fill className="object-cover" />
             <div className="absolute top-0 left-0 w-full h-full border-8 border-gray-100 rounded-[2rem] pointer-events-none z-10"></div>
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-10 text-gray-900 leading-tight tracking-tight">
              Воплощаем ваши представления об идеальном пространстве с 2020 года
            </h2>
            <div className="grid grid-cols-2 gap-10 mb-10">
              <div>
                <div className="text-5xl font-black text-[#0088FF] mb-3">350+</div>
                <p className="text-gray-600 font-medium text-lg leading-snug">Реализованных проектов</p>
              </div>
              <div>
                <div className="text-5xl font-black text-[#0088FF] mb-3">50+</div>
                <p className="text-gray-600 font-medium text-lg leading-snug">Специалистов в штате</p>
              </div>
            </div>
            <button className="bg-[#1A1A1A] hover:bg-black text-white font-bold py-5 px-10 rounded-xl transition-all text-lg shadow-lg">
              Подробнее о нас
            </button>
          </div>
        </div>
      </section>


      {/* LEAD FORM 2 */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container px-4 md:px-8">
          <div className="bg-[#F8F9FA] rounded-[3rem] p-10 md:p-20 flex flex-col md:flex-row gap-16 items-center border border-gray-100">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 tracking-tight leading-tight">
                Не знаете, какой дизайн интерьера хотите?
              </h2>
              <p className="text-xl mb-10 text-gray-600 font-medium">
                Мы поможем определиться со стилем и рассчитаем точную стоимость проекта.
              </p>
              <InlineLeadForm
                formClass="w-full max-w-3xl"
                inputClass="flex-1 px-8 py-5 rounded-2xl bg-white border border-gray-300 text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-[#0088FF]/20 transition-all shadow-sm w-full"
                buttonClass="bg-[#0088FF] hover:bg-[#0070d6] text-white font-bold px-10 py-5 rounded-2xl transition-all shadow-lg shadow-blue-500/30 text-lg whitespace-nowrap w-full sm:w-auto"
                buttonText="Обсудить проект"
              />
              <p className="text-sm mt-6 text-gray-500">
                Нажимая на кнопку, вы соглашаетесь с <a href="#" className="underline hover:text-gray-900 transition-colors">политикой конфиденциальности</a>
              </p>
            </div>
            <div className="w-full md:w-[450px] aspect-[4/5] bg-gray-200 rounded-[2rem] border-8 border-white shadow-xl relative overflow-hidden">
               <Image src="/images/design/form_bg.png" alt="Дизайн интерьера" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* QUIZ MODAL */}
      <AnimatePresence>
        {isQuizOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsQuizOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-6 md:p-10 shadow-2xl z-10 custom-scrollbar"
            >
              <button 
                onClick={() => setIsQuizOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-[#0088FF] transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="mt-4">
                {quizStage === "quiz" ? (
                  <Quiz onComplete={() => setQuizStage("thankyou")} />
                ) : (
                  <ThankYou />
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
