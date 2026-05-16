import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

const IZBA_IMG = "https://cdn.poehali.dev/projects/ef9784f8-14ad-431d-bd41-8f39353f3998/files/11f44778-9d63-4ae0-97be-30053094bfb2.jpg";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.email) return;
    setSent(true);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center">
      {/* Фон — интерьер избы */}
      <img
        src={IZBA_IMG}
        alt="Интерьер избы"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Кнопка назад */}
      <button
        onClick={() => navigate("/house")}
        className="absolute top-6 left-6 z-20 bg-black/40 hover:bg-black/60 text-white/80 hover:text-white rounded-lg px-4 py-2 text-sm transition-all flex items-center gap-2 backdrop-blur-sm"
      >
        ← В избу
      </button>

      {/* Пергамент */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md mx-4"
        style={{
          background: "linear-gradient(160deg, #f5e6c8 0%, #eddcb0 40%, #e8d49a 100%)",
          borderRadius: "4px 12px 4px 12px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.3)",
          border: "1px solid #c9a96e",
        }}
      >
        {/* Декоративная рамка */}
        <div
          className="absolute inset-3 rounded pointer-events-none"
          style={{ border: "1px solid rgba(150, 100, 40, 0.3)" }}
        />

        <div className="px-10 py-10">
          {!sent ? (
            <>
              <div className="text-center mb-8">
                <span className="text-3xl">🪶</span>
                <h2
                  className="text-2xl font-bold mt-2"
                  style={{ color: "#4a2e0a", fontFamily: "Georgia, serif" }}
                >
                  Запись в книгу
                </h2>
                <p className="text-sm mt-1" style={{ color: "#7a5a2a" }}>
                  Путешествие в страну Аромат и Ум
                </p>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <label
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "#7a5a2a" }}
                  >
                    Имя
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Ваше имя"
                    className="w-full px-4 py-3 text-sm rounded focus:outline-none"
                    style={{
                      background: "rgba(180, 130, 60, 0.1)",
                      border: "1px solid rgba(150, 100, 40, 0.4)",
                      color: "#3a1f00",
                    }}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "#7a5a2a" }}
                  >
                    Номер телефона
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full px-4 py-3 text-sm rounded focus:outline-none"
                    style={{
                      background: "rgba(180, 130, 60, 0.1)",
                      border: "1px solid rgba(150, 100, 40, 0.4)",
                      color: "#3a1f00",
                    }}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "#7a5a2a" }}
                  >
                    Электронная почта
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 text-sm rounded focus:outline-none"
                    style={{
                      background: "rgba(180, 130, 60, 0.1)",
                      border: "1px solid rgba(150, 100, 40, 0.4)",
                      color: "#3a1f00",
                    }}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full py-3 mt-2 font-bold uppercase tracking-widest text-sm rounded transition-all duration-200"
                  style={{
                    background: "linear-gradient(135deg, #8b4513, #6b3410)",
                    color: "#f5e6c8",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  🪶 Записаться
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <span className="text-5xl">📜</span>
              <h3
                className="text-xl font-bold mt-4 mb-2"
                style={{ color: "#4a2e0a", fontFamily: "Georgia, serif" }}
              >
                Запись принята!
              </h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "#7a5a2a" }}>
                Администратор рассмотрит вашу заявку и пришлёт приглашение на указанную почту.
              </p>
              <button
                onClick={() => navigate("/")}
                className="text-sm font-semibold underline"
                style={{ color: "#8b4513" }}
              >
                ← Вернуться на главную
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
