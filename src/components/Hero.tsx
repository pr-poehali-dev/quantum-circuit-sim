import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useState } from "react";

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
    label: "Гора Тем",
    href: "/topics",
    style: { left: "32%", top: "14%" },
    description: "Все доступные темы",
  },
  {
    id: "sk",
    label: "Гора Своих Клиентов",
    href: "/login",
    style: { left: "50%", top: "10%", transform: "translateX(-50%)" },
    description: "Запись и прослушивание",
  },
  {
    id: "chk",
    label: "Гора Чужих Клиентов",
    href: "/listen",
    style: { right: "12%", top: "20%" },
    description: "Слушать компиляции",
  },
];

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
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
          src="https://cdn.poehali.dev/projects/ef9784f8-14ad-431d-bd41-8f39353f3998/files/799e9dcc-371d-4af2-97d4-e0eccefc1258.jpg"
          alt="Mountain landscape"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Затемнение для читаемости */}
      <div className="absolute inset-0 bg-black/30 z-[1]" />

      {/* Кликабельные горы */}
      {mountains.map((m) => (
        <a
          key={m.id}
          href={m.href}
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
        </a>
      ))}

      {/* Заголовок */}
      <div className="relative z-10 text-center text-white px-6 -mt-40">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 drop-shadow-lg">
          VOICECORE
        </h1>
        <p className="text-lg md:text-xl max-w-xl mx-auto opacity-80 leading-relaxed drop-shadow">
          Голосовые идеи вашей команды — одним совершенным текстом.
        </p>
      </div>
    </div>
  );
}