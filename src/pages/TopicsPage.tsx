import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

const Stone = () => {
  const [clicked, setClicked] = useState(false);
  const [stoneHovered, setStoneHovered] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setClicked(true)}
        onMouseEnter={() => setStoneHovered(true)}
        onMouseLeave={() => setStoneHovered(false)}
        animate={{ scale: stoneHovered ? 1.06 : 1 }}
        transition={{ duration: 0.2 }}
        className="absolute z-20 cursor-pointer"
        style={{ left: "4%", bottom: "22%" }}
      >
        <div
          className="relative px-5 py-4 text-left"
          style={{
            background: "linear-gradient(160deg, #6b6b6b 0%, #4a4a4a 40%, #3a3a3a 100%)",
            borderRadius: "40% 35% 45% 38% / 30% 40% 35% 42%",
            boxShadow: "4px 6px 16px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.4)",
            border: "1px solid rgba(120,120,120,0.4)",
            minWidth: "170px",
            maxWidth: "200px",
          }}
        >
          <div className="absolute top-2 left-4 w-8 h-2 rounded-full opacity-20" style={{ background: "white", transform: "rotate(-15deg)" }} />
          <p className="text-[10px] leading-relaxed font-medium" style={{ color: "rgba(220,210,190,0.85)", textShadow: "0 1px 2px rgba(0,0,0,0.8)", fontFamily: "Georgia, serif" }}>
            <span className="block mb-1">1. Скидки только Своим.</span>
            <span className="block">2. Измени описание аромата более чем на 5% — получи <strong style={{ color: "rgba(255,220,100,0.9)" }}>+300 бонусов</strong></span>
          </p>
        </div>
      </motion.button>

      {/* Увеличенный камень — модалка */}
      {clicked && (
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.4 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setClicked(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 px-12 py-10 text-left"
            style={{
              background: "linear-gradient(160deg, #6b6b6b 0%, #4a4a4a 40%, #3a3a3a 100%)",
              borderRadius: "40% 35% 45% 38% / 30% 40% 35% 42%",
              boxShadow: "8px 12px 40px rgba(0,0,0,0.8), inset 0 2px 0 rgba(255,255,255,0.1)",
              border: "1px solid rgba(140,140,140,0.4)",
              maxWidth: "420px",
              width: "90vw",
            }}
          >
            <div className="absolute top-4 left-8 w-16 h-3 rounded-full opacity-20" style={{ background: "white", transform: "rotate(-15deg)" }} />
            <p
              className="text-base leading-loose font-medium text-center"
              style={{ color: "rgba(220,210,190,0.9)", textShadow: "0 1px 3px rgba(0,0,0,0.9)", fontFamily: "Georgia, serif" }}
            >
              <span className="block text-lg font-bold mb-4" style={{ color: "rgba(255,220,100,0.95)" }}>📜 Правила</span>
              <span className="block mb-3">1. Скидки — только Своим клиентам.</span>
              <span className="block">2. Измени описание аромата более чем на 5% и получи <strong style={{ color: "rgba(255,220,100,1)" }}>+300 бонусов</strong></span>
            </p>
            <button
              onClick={() => setClicked(false)}
              className="mt-6 w-full text-center text-xs"
              style={{ color: "rgba(200,180,140,0.6)", fontFamily: "Georgia, serif" }}
            >
              × закрыть
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

const CAVE_IMG = "https://avatars.mds.yandex.net/get-shedevrum/15373038/img_9c0f7844dfb411efbc3f6aa9af691ef4/orig";

const topics = [
  { id: 1, title: "Лучшие идеи для бизнеса", recordings: 5, hasCompilation: true },
  { id: 2, title: "Как повысить продуктивность", recordings: 3, hasCompilation: true },
  { id: 3, title: "Вдохновение каждый день", recordings: 7, hasCompilation: false },
];

export default function TopicsPage() {
  const navigate = useNavigate();
  const [entered, setEntered] = useState(false);
  const [hovered, setHovered] = useState(false);

  if (!entered) {
    return (
      <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center">
        <img
          src={CAVE_IMG}
          alt="Вход в пещеру"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />

        {/* Кнопка назад */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 z-20 bg-black/40 hover:bg-black/60 text-white/80 hover:text-white rounded-lg px-4 py-2 text-sm transition-all backdrop-blur-sm"
        >
          ← На главную
        </button>

        {/* Камень с правилами */}
        <Stone />

        {/* Кнопка войти в пещеру */}
        <motion.button
          onClick={() => setEntered(true)}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative z-10 flex flex-col items-center gap-4"
        >
          <motion.div
            animate={{ scale: hovered ? 1.08 : 1, textShadow: hovered ? "0 0 30px rgba(255,200,50,0.8)" : "0 0 0px rgba(255,200,50,0)" }}
            transition={{ duration: 0.3 }}
            className="text-6xl"
          >
            🔦
          </motion.div>
          <motion.div
            animate={{ opacity: hovered ? 1 : 0.8 }}
            className="bg-amber-50/90 backdrop-blur-sm text-amber-900 font-bold uppercase tracking-widest text-sm px-6 py-3 rounded-xl border border-amber-200 shadow-lg"
          >
            Войти в пещеру тем
          </motion.div>
        </motion.button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen text-white flex flex-col"
      style={{ background: "linear-gradient(160deg, #0d0a05 0%, #1a1005 50%, #0a0d0a 100%)" }}
    >
      <div className="flex items-center gap-4 px-8 py-6 border-b border-amber-900/30">
        <button onClick={() => setEntered(false)} className="text-amber-700 hover:text-amber-400 transition-colors">
          <Icon name="ArrowLeft" size={20} />
        </button>
        <h1 className="text-xl font-bold tracking-widest text-amber-200">🕯️ Пещера Тем</h1>
      </div>

      <div className="flex-1 px-8 py-10 max-w-2xl mx-auto w-full">
        <p className="text-amber-700 mb-8 text-sm">Выберите тему для прослушивания</p>
        <div className="flex flex-col gap-4">
          {topics.map((t) => (
            <button
              key={t.id}
              className="flex items-center gap-5 border rounded-xl px-6 py-5 text-left transition-all duration-200 group hover:border-amber-700/50"
              style={{ background: "rgba(255,180,50,0.05)", borderColor: "rgba(255,150,30,0.15)" }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors text-xl"
                style={{ background: "rgba(255,150,30,0.1)" }}>
                🕯️
              </div>
              <div className="flex-1">
                <div className="font-semibold text-amber-100">{t.title}</div>
                <div className="text-amber-800 text-sm mt-0.5">{t.recordings} записей</div>
              </div>
              {t.hasCompilation ? (
                <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full px-3 py-1">
                  Компиляция готова
                </span>
              ) : (
                <span className="text-xs text-amber-800 border border-amber-900/40 rounded-full px-3 py-1">
                  В обработке
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}