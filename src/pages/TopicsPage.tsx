import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CAVE_LOGIN_URL = "https://functions.poehali.dev/b18ddbe0-49d6-4985-a81f-5d06e443ed45";
const CAVE_ENTER_IMG = "https://avatars.mds.yandex.net/get-shedevrum/15373038/img_9c0f7844dfb411efbc3f6aa9af691ef4/orig";
const CAVE_INNER_IMG = "https://img.freepik.com/free-photo/archaeological-cave-paintings_23-2151786614.jpg?semt=ais_hybrid&w=740";

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
            <p className="text-base leading-loose font-medium text-center" style={{ color: "rgba(220,210,190,0.9)", textShadow: "0 1px 3px rgba(0,0,0,0.9)", fontFamily: "Georgia, serif" }}>
              <span className="block text-lg font-bold mb-4" style={{ color: "rgba(255,220,100,0.95)" }}>📜 Правила</span>
              <span className="block mb-3">1. Скидки — только Своим клиентам.</span>
              <span className="block">2. Измени описание аромата более чем на 5% и получи <strong style={{ color: "rgba(255,220,100,1)" }}>+300 бонусов</strong></span>
            </p>
            <button onClick={() => setClicked(false)} className="mt-6 w-full text-center text-xs" style={{ color: "rgba(200,180,140,0.6)", fontFamily: "Georgia, serif" }}>
              × закрыть
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

const topics = [
  { id: 1, title: "Лучшие идеи для бизнеса", recordings: 5, hasCompilation: true },
  { id: 2, title: "Как повысить продуктивность", recordings: 3, hasCompilation: true },
  { id: 3, title: "Вдохновение каждый день", recordings: 7, hasCompilation: false },
];

export default function TopicsPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"enter" | "login" | "inside">("enter");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [clientName, setClientName] = useState("");
  const [enterHovered, setEnterHovered] = useState(false);
  const torchRef = useRef<HTMLDivElement>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(CAVE_LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.ok) {
        setClientName(data.username);
        setStep("inside");
      } else {
        setError(data.error || "Неверный логин или пароль");
      }
    } catch {
      setError("Ошибка соединения. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  if (step === "enter") {
    return (
      <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center">
        <img src={CAVE_ENTER_IMG} alt="Вход в пещеру" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <button onClick={() => navigate("/")} className="absolute top-6 left-6 z-20 bg-black/40 hover:bg-black/60 text-white/80 hover:text-white rounded-lg px-4 py-2 text-sm transition-all backdrop-blur-sm">
          ← На главную
        </button>
        <Stone />
        <motion.button
          onClick={() => setStep("login")}
          onHoverStart={() => setEnterHovered(true)}
          onHoverEnd={() => setEnterHovered(false)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative z-10 flex flex-col items-center gap-4"
        >
          <motion.div
            animate={{ scale: enterHovered ? 1.08 : 1 }}
            transition={{ duration: 0.3 }}
            className="text-6xl"
          >
            🔦
          </motion.div>
          <motion.div
            animate={{ opacity: enterHovered ? 1 : 0.8 }}
            className="bg-amber-50/90 backdrop-blur-sm text-amber-900 font-bold uppercase tracking-widest text-sm px-6 py-3 rounded-xl border border-amber-200 shadow-lg"
          >
            Войти в пещеру тем
          </motion.div>
        </motion.button>
      </div>
    );
  }

  if (step === "login") {
    return (
      <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center">
        <img src={CAVE_ENTER_IMG} alt="Вход в пещеру" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        <button onClick={() => setStep("enter")} className="absolute top-6 left-6 z-20 bg-black/40 hover:bg-black/60 text-white/80 hover:text-white rounded-lg px-4 py-2 text-sm transition-all backdrop-blur-sm">
          ← Назад
        </button>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 w-full max-w-sm mx-4"
        >
          <div
            className="px-8 py-10 rounded-2xl"
            style={{
              background: "linear-gradient(160deg, rgba(20,12,5,0.97) 0%, rgba(10,8,3,0.98) 100%)",
              border: "1px solid rgba(180,130,50,0.3)",
              boxShadow: "0 0 60px rgba(180,100,20,0.15), 0 20px 60px rgba(0,0,0,0.8)",
            }}
          >
            <div className="text-center mb-8">
              <div className="text-4xl mb-3">🕯️</div>
              <h2 className="text-amber-200 font-bold text-xl tracking-widest uppercase" style={{ fontFamily: "Georgia, serif" }}>
                Пещера Тем
              </h2>
              <p className="text-amber-800 text-xs mt-1">Только для своих</p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <label className="text-amber-700 text-xs uppercase tracking-widest block mb-1.5">Логин</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ваш логин"
                  autoComplete="username"
                  className="w-full px-4 py-3 rounded-lg text-amber-100 placeholder-amber-900 text-sm outline-none transition-all"
                  style={{
                    background: "rgba(255,180,50,0.06)",
                    border: "1px solid rgba(180,130,50,0.25)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(200,150,60,0.6)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(180,130,50,0.25)")}
                />
              </div>

              <div>
                <label className="text-amber-700 text-xs uppercase tracking-widest block mb-1.5">Пароль</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ваш пароль"
                  autoComplete="current-password"
                  className="w-full px-4 py-3 rounded-lg text-amber-100 placeholder-amber-900 text-sm outline-none transition-all"
                  style={{
                    background: "rgba(255,180,50,0.06)",
                    border: "1px solid rgba(180,130,50,0.25)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(200,150,60,0.6)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(180,130,50,0.25)")}
                />
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-400 text-xs text-center"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.97 }}
                className="mt-2 w-full py-3 rounded-lg font-bold uppercase tracking-widest text-sm transition-all"
                style={{
                  background: loading ? "rgba(100,70,20,0.4)" : "linear-gradient(135deg, #b8860b, #8b6914)",
                  color: loading ? "rgba(200,160,60,0.5)" : "#fff8e1",
                  border: "1px solid rgba(200,150,50,0.4)",
                }}
              >
                {loading ? "Проверяем..." : "Войти в пещеру"}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen text-white flex flex-col relative overflow-hidden"
    >
      <img src={CAVE_INNER_IMG} alt="Пещера тем" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(5,3,0,0.7) 100%)" }} />

      <div className="relative z-10 flex items-center gap-4 px-8 py-6 border-b border-amber-900/30 backdrop-blur-sm bg-black/20">
        <button onClick={() => setStep("enter")} className="text-amber-700 hover:text-amber-400 transition-colors">
          <Icon name="ArrowLeft" size={20} />
        </button>
        <h1 className="text-xl font-bold tracking-widest text-amber-200" style={{ fontFamily: "Georgia, serif" }}>
          🕯️ Пещера Тем
        </h1>
        {clientName && (
          <span className="ml-auto text-amber-800 text-xs">Привет, {clientName}</span>
        )}
      </div>

      <div className="relative z-10 flex-1 px-8 py-10 max-w-2xl mx-auto w-full">
        <p className="text-amber-600 mb-8 text-sm" style={{ fontFamily: "Georgia, serif" }}>
          Выберите тему для прослушивания
        </p>
        <div className="flex flex-col gap-4">
          {topics.map((t, i) => (
            <motion.button
              key={t.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + 0.2 }}
              className="flex items-center gap-5 border rounded-xl px-6 py-5 text-left transition-all duration-200 group hover:border-amber-700/50 backdrop-blur-sm"
              style={{ background: "rgba(10,6,2,0.55)", borderColor: "rgba(180,130,50,0.2)" }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-xl" style={{ background: "rgba(180,130,30,0.15)" }}>
                🕯️
              </div>
              <div className="flex-1">
                <div className="font-semibold text-amber-100" style={{ fontFamily: "Georgia, serif" }}>{t.title}</div>
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
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
