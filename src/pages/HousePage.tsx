import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Icon from "@/components/ui/icon";

export default function HousePage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"choose" | "register" | "login-sk">("choose");
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Фон */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/projects/ef9784f8-14ad-431d-bd41-8f39353f3998/files/32d24c31-7ad1-4411-b554-0be9e033740f.jpg')`,
        }}
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Кнопка назад */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 z-20 text-white/70 hover:text-white flex items-center gap-2 transition-colors text-sm"
      >
        <Icon name="ArrowLeft" size={16} />
        На главную
      </button>

      {/* Карточка */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">

          {/* Иконка домика */}
          <div className="text-center mb-6">
            <span className="text-5xl">🏡</span>
            <h2 className="text-white text-xl font-bold mt-3 tracking-wide">
              Добро пожаловать!
            </h2>
            <p className="text-white/60 text-sm mt-1">
              Путешествие в страну Аромат и Ум
            </p>
          </div>

          {/* Выбор роли */}
          {mode === "choose" && (
            <div className="flex flex-col gap-4">
              <p className="text-white/80 text-center text-sm mb-2">
                Кто вы?
              </p>

              <button
                onClick={() => setMode("register")}
                className="group flex items-center gap-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-xl px-5 py-4 text-left transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-400/30 transition-colors">
                  <span className="text-xl">🌟</span>
                </div>
                <div>
                  <div className="text-white font-semibold">Свой клиент</div>
                  <div className="text-white/50 text-xs mt-0.5">Записываю тексты и слушаю компиляции</div>
                </div>
                <Icon name="ChevronRight" size={16} className="text-white/40 ml-auto group-hover:text-white/70 transition-colors" />
              </button>

              <button
                onClick={() => navigate("/listen")}
                className="group flex items-center gap-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-xl px-5 py-4 text-left transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-full bg-sky-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-400/30 transition-colors">
                  <span className="text-xl">🎧</span>
                </div>
                <div>
                  <div className="text-white font-semibold">Чужой клиент</div>
                  <div className="text-white/50 text-xs mt-0.5">Просто слушаю — без регистрации</div>
                </div>
                <Icon name="ChevronRight" size={16} className="text-white/40 ml-auto group-hover:text-white/70 transition-colors" />
              </button>

              <div className="border-t border-white/10 pt-4 mt-2">
                <button
                  onClick={() => setMode("login-sk")}
                  className="w-full text-center text-white/50 hover:text-white/80 text-sm transition-colors"
                >
                  Уже зарегистрирован как Свой клиент? Войти
                </button>
              </div>
            </div>
          )}

          {/* Регистрация СК */}
          {mode === "register" && (
            <div className="flex flex-col gap-4">
              <p className="text-white/70 text-sm text-center mb-1">
                Регистрация доступна только по приглашению от администратора.
                Проверьте вашу почту — вам должна была прийти ссылка.
              </p>

              <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl px-4 py-3 flex gap-3 items-start">
                <Icon name="Mail" size={16} className="text-amber-300 mt-0.5 flex-shrink-0" />
                <p className="text-amber-200 text-xs leading-relaxed">
                  Если вы получили ссылку от администратора — перейдите по ней из письма, чтобы завершить регистрацию.
                </p>
              </div>

              <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
                <button
                  onClick={() => setMode("choose")}
                  className="w-full text-center text-white/50 hover:text-white/80 text-sm transition-colors"
                >
                  ← Назад
                </button>
              </div>
            </div>
          )}

          {/* Вход СК */}
          {mode === "login-sk" && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-white/60 text-xs uppercase tracking-wide">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/50 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-white/60 text-xs uppercase tracking-wide">Пароль</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="········"
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/50 transition-colors"
                />
              </div>

              <button
                onClick={() => navigate("/login")}
                className="w-full bg-white text-black font-semibold rounded-lg py-3 uppercase tracking-widest text-sm hover:bg-neutral-200 transition-colors mt-2"
              >
                Войти
              </button>

              <button
                onClick={() => setMode("choose")}
                className="w-full text-center text-white/50 hover:text-white/80 text-sm transition-colors"
              >
                ← Назад
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
