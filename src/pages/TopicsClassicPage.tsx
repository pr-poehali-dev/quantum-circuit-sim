import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/ui/icon";

const CAVE_LOGIN_URL = "https://functions.poehali.dev/b18ddbe0-49d6-4985-a81f-5d06e443ed45";
const GET_TOPICS_URL = "https://functions.poehali.dev/2a044b28-f6e5-44a7-b59e-20366d15c30d";
const CAVE_ENTER_IMG = "https://avatars.mds.yandex.net/get-shedevrum/15373038/img_9c0f7844dfb411efbc3f6aa9af691ef4/orig";

type Topic = { id: number; title: string; recordings: number; hasCompilation: boolean };

export default function TopicsClassicPage() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [clientName, setClientName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [topics, setTopics] = useState<Topic[]>([]);

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
        const topicsRes = await fetch(GET_TOPICS_URL);
        const topicsData = await topicsRes.json();
        setTopics(topicsData.topics || []);
        setLoggedIn(true);
      } else {
        setError(data.error || "Неверный логин или пароль");
      }
    } catch {
      setError("Ошибка соединения. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col">
      <img src={CAVE_ENTER_IMG} alt="Пещера" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/55" />

      {/* Шапка */}
      <header className="relative z-10 px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate("/topics")}
          className="bg-black/40 hover:bg-black/60 text-white/80 hover:text-white rounded-lg px-3 py-2 transition-all backdrop-blur-sm flex items-center gap-1"
        >
          <Icon name="ArrowLeft" size={16} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-amber-900/60 flex items-center justify-center text-sm">🌿</div>
          <span className="font-semibold text-white/90" style={{ fontFamily: "Georgia, serif" }}>Аромапещера</span>
        </div>
        <span className="ml-2 text-xs text-amber-200/60 bg-black/30 px-2 py-0.5 rounded-full backdrop-blur-sm">Классический вид</span>
        {loggedIn && clientName && (
          <span className="ml-auto text-sm text-amber-200/80">Привет, {clientName}</span>
        )}
      </header>

      <main className="relative z-10 flex-1 max-w-2xl mx-auto w-full px-6 py-10">
        <AnimatePresence mode="wait">
          {!loggedIn ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "Georgia, serif" }}>Вход</h1>
              <p className="text-amber-200/60 text-sm mb-8">Только для своих клиентов</p>

              <form onSubmit={handleLogin} className="rounded-2xl p-8 flex flex-col gap-5" style={{ background: "rgba(30,20,10,0.65)", backdropFilter: "blur(12px)", border: "1px solid rgba(200,150,60,0.2)" }}>
                <div>
                  <label className="block text-sm font-medium text-amber-200/80 mb-1.5" style={{ fontFamily: "Georgia, serif" }}>Логин</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Ваш логин"
                    autoComplete="username"
                    className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-colors"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(200,150,60,0.25)" }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-200/80 mb-1.5" style={{ fontFamily: "Georgia, serif" }}>Пароль</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ваш пароль"
                    autoComplete="current-password"
                    className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-colors"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(200,150,60,0.25)" }}
                  />
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-sm"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-semibold text-sm transition-colors"
                  style={{ background: loading ? "rgba(180,100,20,0.3)" : "rgba(200,120,30,0.8)", color: "rgba(255,230,150,0.95)", fontFamily: "Georgia, serif", border: "1px solid rgba(200,150,60,0.4)" }}
                >
                  {loading ? "Проверяем..." : "Войти"}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="topics"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "Georgia, serif" }}>Темы</h1>
              <p className="text-amber-200/60 text-sm mb-8">Выберите тему для прослушивания</p>

              <div className="flex flex-col gap-3">
                {topics.map((t, i) => (
                  <motion.button
                    key={t.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="rounded-2xl px-6 py-5 flex items-center gap-4 text-left transition-all group"
                    style={{ background: "rgba(30,20,10,0.6)", backdropFilter: "blur(10px)", border: "1px solid rgba(200,150,60,0.2)" }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(200,150,60,0.5)")}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(200,150,60,0.2)")}
                  >
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: "rgba(180,100,20,0.25)" }}>
                      🌿
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-white/90 text-sm" style={{ fontFamily: "Georgia, serif" }}>{t.title}</div>
                      <div className="text-amber-200/50 text-xs mt-0.5">{t.recordings} записей</div>
                    </div>
                    {t.hasCompilation ? (
                      <span className="text-xs rounded-full px-3 py-1 font-medium" style={{ background: "rgba(20,80,40,0.5)", color: "rgba(100,220,140,0.9)", border: "1px solid rgba(60,160,90,0.3)" }}>
                        Готово
                      </span>
                    ) : (
                      <span className="text-xs rounded-full px-3 py-1" style={{ background: "rgba(50,40,30,0.5)", color: "rgba(180,160,120,0.6)", border: "1px solid rgba(150,120,60,0.2)" }}>
                        В обработке
                      </span>
                    )}
                    <Icon name="ChevronRight" size={16} className="text-amber-600/40 group-hover:text-amber-400 transition-colors" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}