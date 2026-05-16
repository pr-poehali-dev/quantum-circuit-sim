import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

const IZBA_IMG = "https://cdn.poehali.dev/projects/ef9784f8-14ad-431d-bd41-8f39353f3998/files/11f44778-9d63-4ae0-97be-30053094bfb2.jpg";

export default function HousePage() {
  const navigate = useNavigate();
  const [tableHovered, setTableHovered] = useState(false);

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Фон — интерьер избы */}
      <img
        src={IZBA_IMG}
        alt="Интерьер избы"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/10" />

      {/* Кнопка назад */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 z-20 bg-black/40 hover:bg-black/60 text-white/80 hover:text-white rounded-lg px-4 py-2 text-sm transition-all flex items-center gap-2 backdrop-blur-sm"
      >
        ← На главную
      </button>

      {/* Кликабельная зона стола */}
      <motion.button
        onClick={() => navigate("/register")}
        onHoverStart={() => setTableHovered(true)}
        onHoverEnd={() => setTableHovered(false)}
        className="absolute z-10 cursor-pointer"
        style={{
          bottom: "8%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "40%",
          height: "36%",
        }}
      >
        {/* Подсветка стола при наведении */}
        <motion.div
          animate={{ opacity: tableHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 rounded-2xl bg-amber-300/20 border-2 border-amber-300/70"
        />

        {/* Подсказка над столом */}
        <motion.div
          animate={{ opacity: tableHovered ? 1 : 0, y: tableHovered ? 0 : 8 }}
          transition={{ duration: 0.25 }}
          className="absolute -top-14 left-1/2 -translate-x-1/2 bg-amber-50/95 text-amber-900 rounded-xl px-5 py-2 text-sm font-bold shadow-lg whitespace-nowrap border border-amber-200"
        >
          📜 Нажми, чтобы записаться
        </motion.div>
      </motion.button>
    </div>
  );
}
