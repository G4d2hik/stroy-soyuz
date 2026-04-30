import { notFound } from "next/navigation";
import Image from "next/image";
import { services } from "@/config/services";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";
import Quiz from "@/components/sections/Quiz";
import ContactButton from "@/components/ui/ContactButton";

interface PageProps {
  params: Promise<{ id: string }>;
}

import { Metadata } from "next";

export async function generateStaticParams() {
  return services.map((service) => ({
    id: service.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const service = services.find((s) => s.id === id);

  if (!service) {
    return {
      title: "Услуга не найдена",
    };
  }

  return {
    title: service.title,
    description: service.desc,
    openGraph: {
      title: `${service.title} | ООО Союз Строй`,
      description: service.desc,
      url: `/services/${service.id}`,
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | ООО Союз Строй`,
      description: service.desc,
      images: [service.image],
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { id } = await params;
  const service = services.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[70vh] flex flex-col justify-end overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-primary)]/80 via-[var(--color-bg-primary)]/70 to-[var(--color-bg-primary)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-transparent to-transparent" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl">
            <Link
              href="/#products"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              Все услуги
            </Link>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="gold-divider" />
              <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-[var(--color-accent)]">
                Услуга {service.num}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--color-text-heading)] leading-[1.1] mb-6">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
              {service.desc}
            </p>
          </div>
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <section className="py-[var(--spacing-section)]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* Main Content */}
            <div className="lg:col-span-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-heading)] mb-6">
                Особенности услуги
              </h2>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed mb-12">
                {service.detailedDescription}
              </p>

              {/* Gallery Section */}
              {service.gallery && service.gallery.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-heading)] mb-8">
                    Галерея проектов
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.gallery.map((img, i) => (
                      <div 
                        key={i} 
                        className={`relative aspect-[4/3] rounded-2xl overflow-hidden group ${
                          i === 0 && service.gallery!.length % 2 !== 0 ? 'sm:col-span-2' : ''
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${service.title} - проект ${i + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-heading)] mb-8">
                Преимущества работы с нами
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
                {service.benefits.map((benefit, i) => (
                  <div key={i} className="flex gap-4 p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-card)]">
                    <CheckCircle2 className="text-[var(--color-accent)] shrink-0" size={24} />
                    <p className="text-sm font-medium text-[var(--color-text-heading)]">{benefit}</p>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-heading)] mb-8">
                Как мы работаем
              </h2>
              <div className="space-y-6">
                {service.processSteps.map((step, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-full border border-[var(--color-border-card)] bg-[var(--color-bg-card)] flex items-center justify-center shrink-0 text-[var(--color-accent)] font-bold text-lg shadow-sm">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[var(--color-text-heading)] mb-2">{step.title}</h4>
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar / CTA */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 p-8 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-card)] shadow-2xl">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center mb-6">
                  <Sparkles className="text-[var(--color-accent)]" size={24} />
                </div>
                <h3 className="text-xl font-bold text-[var(--color-text-heading)] mb-4">
                  Готовы начать проект?
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-8">
                  Оставьте заявку на бесплатную консультацию. Мы ответим на все вопросы и подготовим предварительный расчет.
                </p>
                <ContactButton
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-primary)] font-semibold text-sm hover:bg-[var(--color-accent-hover)] transition-all duration-300 shadow-lg cursor-pointer"
                >
                  Связаться с нами
                </ContactButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
