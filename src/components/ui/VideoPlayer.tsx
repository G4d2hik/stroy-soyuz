"use client";

import { Play, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface VideoPlayerProps {
  src?: string;
  poster?: string;
  title: string;
  onVideoEnd?: () => void;
  autoPlay?: boolean;
  small?: boolean;
}

export default function VideoPlayer({
  src,
  poster,
  title,
  onVideoEnd,
  autoPlay = false,
  small = false,
}: VideoPlayerProps) {
  const handlePlay = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = e.currentTarget.querySelector("video");
    if (video) {
      video.play();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`video-wrapper ${small ? "max-w-lg mx-auto" : ""}`}
      id={small ? "thank-you-video" : "hero-video"}
    >
      {src ? (
        <video
          controls
          autoPlay={autoPlay}
          playsInline
          poster={poster}
          onEnded={onVideoEnd}
          className="w-full h-full object-cover"
          preload="metadata"
        >
          <source src={src} type="video/mp4" />
          Ваш браузер не поддерживает воспроизведение видео.
        </video>
      ) : (
        <div
          className="video-placeholder"
          onClick={handlePlay}
        >
          {/* Background image for placeholder */}
          <Image
            src="/images/hero-bg.png"
            alt=""
            fill
            className="object-cover opacity-40"
            sizes="(max-width: 768px) 100vw, 60vw"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Play button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10 w-20 h-20 rounded-full border-2 border-[var(--color-accent)] flex items-center justify-center animate-pulse-glow cursor-pointer bg-[var(--color-accent)]/10 backdrop-blur-sm"
          >
            <Play size={30} className="text-[var(--color-accent)] ml-1" fill="var(--color-accent)" />
          </motion.div>

          {/* Title */}
          <div className="relative z-10 text-center px-6 mt-2">
            <h3 className="text-lg md:text-xl font-bold text-[var(--color-text-heading)] mb-1">
              {title}
            </h3>
            <p className="text-xs text-[var(--color-text-muted)] flex items-center justify-center gap-2">
              <Volume2 size={12} />
              Нажмите чтобы воспроизвести
            </p>
          </div>

          {/* Badge */}
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-[var(--color-accent)]/20 text-[var(--color-accent)] text-[10px] font-medium z-10 uppercase tracking-wider">
            Видео скоро
          </div>
        </div>
      )}
    </motion.div>
  );
}
