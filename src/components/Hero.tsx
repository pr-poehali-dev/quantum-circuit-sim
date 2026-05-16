import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const mountains = [
  {
    id: "admin",
    label: "Гора Админа",
    href: "/admin",
    style: { left: "10%", top: "18%" },
    description: "Управление платформой",
  },
  {
    id: "topics",
    label: "Пещера Тем",
    href: "/topics",
    style: { left: "32%", top: "14%" },
    description: "Все доступные темы",
  },
  {
    id: "sk",
    label: "Гора Своих",
    href: "/chat",
    style: { left: "calc(50% + 2cm)", top: "10%", transform: "translateX(-50%)" },
    description: "Запись и прослушивание",
  },
  {
    id: "chk",
    label: "Гора Чужих",
    href: "/listen",
    style: { right: "12%", top: "20%" },
    description: "Слушать компиляции",
  },
];

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.4;
    audio.play().catch(() => {});
  }, []);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
    >
      <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
        <img
          src="https://cdn.poehali.dev/projects/ef9784f8-14ad-431d-bd41-8f39353f3998/files/32d24c31-7ad1-4411-b554-0be9e033740f.jpg"
          alt="Mountain landscape"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Затемнение для читаемости */}
      <div className="absolute inset-0 bg-black/30 z-[1]" />

      {/* Кликабельные горы */}
      {mountains.map((m) => (
        <button
          key={m.id}
          onClick={() => navigate(m.href)}
          onMouseEnter={() => setHovered(m.id)}
          onMouseLeave={() => setHovered(null)}
          className="absolute z-10 flex flex-col items-center group cursor-pointer"
          style={m.style as React.CSSProperties}
        >
          {/* Маркер сверху */}
          <div className="flex flex-col items-center">
            <motion.div
              animate={{ scale: hovered === m.id ? 1.1 : 1 }}
              transition={{ duration: 0.2 }}
              className="bg-white/90 backdrop-blur-sm text-black rounded-md px-2 py-1 text-center shadow-lg border border-white/50 mb-1"
            >
              <span className="text-[10px] font-bold uppercase tracking-wide whitespace-nowrap">
                {m.label}
              </span>
            </motion.div>
            {/* Подсказка при наведении */}
            <motion.div
              animate={{ opacity: hovered === m.id ? 1 : 0, height: hovered === m.id ? "auto" : 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden mb-1"
            >
              <p className="text-white text-[9px] opacity-80 text-center whitespace-nowrap">{m.description}</p>
            </motion.div>
            {/* Линия-указатель вниз */}
            <motion.div
              animate={{ height: hovered === m.id ? 28 : 16 }}
              transition={{ duration: 0.2 }}
              className="w-0.5 bg-white/70"
              style={{ height: 16 }}
            />
            {/* Точка */}
            <motion.div
              animate={{ scale: hovered === m.id ? 1.5 : 1 }}
              transition={{ duration: 0.2 }}
              className="w-2 h-2 rounded-full bg-white shadow-md border border-white/50"
            />
          </div>
        </button>
      ))}

      {/* Домик — кликабельная зона поверх домика на картинке */}
      <button
        onClick={() => navigate("/house")}
        onMouseEnter={() => setHovered("house")}
        onMouseLeave={() => setHovered(null)}
        className="absolute z-10 cursor-pointer"
        style={{ left: "12%", bottom: "34%", width: "7%", aspectRatio: "1" }}
      >
        <motion.div
          animate={{ scale: hovered === "house" ? 1.05 : 1 }}
          transition={{ duration: 0.2 }}
          className="w-full h-full relative flex flex-col items-center justify-end"
        >
          {/* Постоянная надпись над домиком */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm text-black rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide whitespace-nowrap shadow">
            Регистрация
          </div>
          {/* Прозрачная зона с рамкой при наведении */}
          <motion.div
            animate={{ opacity: hovered === "house" ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 border-2 border-white/60 rounded-lg bg-white/10"
          />
        </motion.div>
      </button>


      <audio
        ref={audioRef}
        src="https://cdn.freesound.org/previews/619/619015_5674468-lq.mp3"
        loop
        preload="auto"
      />
    </div>
  );
}