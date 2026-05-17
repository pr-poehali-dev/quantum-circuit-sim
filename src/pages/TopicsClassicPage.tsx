import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/ui/icon";

const CAVE_LOGIN_URL = "https://functions.poehali.dev/b18ddbe0-49d6-4985-a81f-5d06e443ed45";

const topics = [
  { id: 1, title: "Лучшие идеи для бизнеса", recordings: 5, hasCompilation: true },
  { id: 2, title: "Как повысить продуктивность", recordings: 3, hasCompilation: true },
  { id: 3, title: "Вдохновение каждый день", recordings: 7, hasCompilation: false },
];

export default function TopicsClassicPage() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [clientName, setClientName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Шапка */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate("/topics")}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Icon name="ArrowLeft" size={20} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-amber-100 flex items-center justify-center text-sm">🌿</div>
          <span className="font-semibold text-gray-800">Аромапещера</span>
        </div>
        <span className="ml-2 text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Классический вид</span>
        {loggedIn && clientName && (
          <span className="ml-auto text-sm text-gray-500">Привет, {clientName}</span>
        )}
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-10">
        <AnimatePresence mode="wait">
          {!loggedIn ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-2xl font-bold text-gray-800 mb-1">Вход</h1>
              <p className="text-gray-400 text-sm mb-8">Только для своих клиентов</p>

              <form onSubmit={handleLogin} className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col gap-5 shadow-sm">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">Логин</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Ваш логин"
                    autoComplete="username"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-sm outline-none focus:border-amber-400 transition-colors bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">Пароль</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ваш пароль"
                    autoComplete="current-password"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-sm outline-none focus:border-amber-400 transition-colors bg-gray-50"
                  />
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-500 text-sm"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:bg-amber-200 text-white font-semibold text-sm transition-colors"
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
              <h1 className="text-2xl font-bold text-gray-800 mb-1">Темы</h1>
              <p className="text-gray-400 text-sm mb-8">Выберите тему для прослушивания</p>

              <div className="flex flex-col gap-3">
                {topics.map((t, i) => (
                  <motion.button
                    key={t.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-white border border-gray-200 rounded-2xl px-6 py-5 flex items-center gap-4 text-left hover:border-amber-300 hover:shadow-sm transition-all group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center text-xl flex-shrink-0 group-hover:bg-amber-100 transition-colors">
                      🌿
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 text-sm">{t.title}</div>
                      <div className="text-gray-400 text-xs mt-0.5">{t.recordings} записей</div>
                    </div>
                    {t.hasCompilation ? (
                      <span className="text-xs bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full px-3 py-1 font-medium">
                        Готово
                      </span>
                    ) : (
                      <span className="text-xs bg-gray-50 text-gray-400 border border-gray-200 rounded-full px-3 py-1">
                        В обработке
                      </span>
                    )}
                    <Icon name="ChevronRight" size={16} className="text-gray-300 group-hover:text-amber-400 transition-colors" />
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
