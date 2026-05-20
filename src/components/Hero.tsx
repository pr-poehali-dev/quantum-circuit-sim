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
    label: "Аромапещера",
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

const clouds = [
  { id: 1, top: "1%",  width: 65,  opacity: 0.88, duration: 55, delay: 0,  startX: "-80px", scale: 1 },
  { id: 2, top: "3%",  width: 45,  opacity: 0.70, duration: 75, delay: 8,  startX: "15vw",  scale: 0.8 },
  { id: 3, top: "0%",  width: 85,  opacity: 0.80, duration: 90, delay: 20, startX: "40vw",  scale: 1.1 },
  { id: 4, top: "4%",  width: 50,  opacity: 0.60, duration: 65, delay: 35, startX: "70vw",  scale: 0.9 },
  { id: 5, top: "2%",  width: 38,  opacity: 0.55, duration: 80, delay: 50, startX: "55vw",  scale: 0.7 },
];

const flowers = [
  { id: 1, left: "18%", bottom: "14%", emoji: "🌸", size: 22, delay: 0, amplitude: 4 },
  { id: 2, left: "22%", bottom: "10%", emoji: "🌼", size: 18, delay: 0.4, amplitude: 5 },
  { id: 3, left: "26%", bottom: "12%", emoji: "🌸", size: 20, delay: 0.8, amplitude: 3 },
  { id: 4, left: "72%", bottom: "16%", emoji: "🌼", size: 16, delay: 0.3, amplitude: 6 },
  { id: 5, left: "76%", bottom: "12%", emoji: "🌸", size: 22, delay: 0.9, amplitude: 4 },
  { id: 6, left: "80%", bottom: "14%", emoji: "🌻", size: 18, delay: 0.5, amplitude: 5 },

];

function Cloud({ top, width, opacity, duration, delay, startX, scale }: typeof clouds[0]) {
  const h = width * 0.42;
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top, width, opacity, zIndex: 2, filter: "blur(0.5px)" }}
      initial={{ x: startX }}
      animate={{ x: ["0vw", "115vw"] }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    >
      <svg
        viewBox="0 0 400 160"
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={h}
        style={{ transform: `scaleY(${scale})`, display: "block" }}
      >
        <defs>
          <radialGradient id={`cg${delay}`} cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="rgba(255,255,255,1)" />
            <stop offset="60%" stopColor="rgba(240,248,255,0.95)" />
            <stop offset="100%" stopColor="rgba(210,230,255,0.5)" />
          </radialGradient>
          <filter id={`cf${delay}`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {/* Основная масса */}
        <ellipse cx="200" cy="115" rx="190" ry="42" fill={`url(#cg${delay})`} />
        {/* Выпуклости сверху */}
        <ellipse cx="140" cy="90" rx="90" ry="65" fill={`url(#cg${delay})`} />
        <ellipse cx="240" cy="82" rx="80" ry="70" fill={`url(#cg${delay})`} />
        <ellipse cx="320" cy="100" rx="70" ry="52" fill={`url(#cg${delay})`} />
        <ellipse cx="80"  cy="105" rx="65" ry="46" fill={`url(#cg${delay})`} />
        {/* Верхние пузыри */}
        <ellipse cx="200" cy="65" rx="60" ry="52" fill={`url(#cg${delay})`} />
        <ellipse cx="270" cy="72" rx="48" ry="44" fill={`url(#cg${delay})`} />
        <ellipse cx="155" cy="75" rx="44" ry="40" fill={`url(#cg${delay})`} />
        {/* Мягкое дно */}
        <ellipse cx="200" cy="130" rx="180" ry="25" fill="rgba(200,220,255,0.35)" />
      </svg>
    </motion.div>
  );
}

function Flower({ left, bottom, emoji, size, delay, amplitude }: typeof flowers[0]) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left, bottom, fontSize: size, zIndex: 3, originY: 1 }}
      animate={{
        rotate: [0, amplitude, -amplitude, amplitude * 0.5, 0],
        y: [0, -2, 0, -1, 0],
      }}
      transition={{
        duration: 3 + delay,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {emoji}
    </motion.div>
  );
}

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

      {/* Облака */}
      {clouds.map((c) => (
        <Cloud key={c.id} {...c} />
      ))}

      {/* Цветы */}
      {flowers.map((f) => (
        <Flower key={f.id} {...f} />
      ))}

      {/* Затемнение для читаемости */}
      <div className="absolute inset-0 bg-black/30 z-[4]" />

      {/* Кликабельные горы */}
      {mountains.map((m) => (
        <button
          key={m.id}
          onClick={() => navigate(m.href)}
          onMouseEnter={() => setHovered(m.id)}
          onMouseLeave={() => setHovered(null)}
          className="absolute z-10 flex flex-col items-center group cursor-pointer"
          style={{ ...(m.style as React.CSSProperties), zIndex: 5 }}
        >
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
            <motion.div
              animate={{ opacity: hovered === m.id ? 1 : 0, height: hovered === m.id ? "auto" : 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden mb-1"
            >
              <p className="text-white text-[9px] opacity-80 text-center whitespace-nowrap">{m.description}</p>
            </motion.div>
            <motion.div
              animate={{ height: hovered === m.id ? 28 : 16 }}
              transition={{ duration: 0.2 }}
              className="w-0.5 bg-white/70"
              style={{ height: 16 }}
            />
            <motion.div
              animate={{ scale: hovered === m.id ? 1.5 : 1 }}
              transition={{ duration: 0.2 }}
              className="w-2 h-2 rounded-full bg-white shadow-md border border-white/50"
            />
          </div>
        </button>
      ))}

      {/* Лошадь с жеребёнком */}
      <div
        className="absolute pointer-events-none"
        style={{ left: "22%", bottom: "28%", width: "9%", zIndex: 5 }}
      >
        <motion.img
          src="https://cdn.poehali.dev/projects/ef9784f8-14ad-431d-bd41-8f39353f3998/files/d5263f78-2b48-40f8-a29b-5f38bddc78f3.jpg"
          alt="Лошадь с жеребёнком"
          className="w-full rounded-lg shadow-xl"
          style={{ opacity: 0.92 }}
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Домик */}
      <button
        onClick={() => navigate("/house")}
        onMouseEnter={() => setHovered("house")}
        onMouseLeave={() => setHovered(null)}
        className="absolute cursor-pointer"
        style={{ left: "12%", bottom: "34%", width: "7%", aspectRatio: "1", zIndex: 5 }}
      >
        <motion.div
          animate={{ scale: hovered === "house" ? 1.05 : 1 }}
          transition={{ duration: 0.2 }}
          className="w-full h-full relative flex flex-col items-center justify-end"
        >
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm text-black rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide whitespace-nowrap shadow">
            Регистрация
          </div>
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