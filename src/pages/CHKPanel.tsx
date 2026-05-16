import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const compilations = [
  { id: 1, title: "Лучшие идеи для бизнеса", duration: "0:59", plays: 24 },
  { id: 2, title: "Как повысить продуктивность", duration: "0:54", plays: 18 },
];

export default function CHKPanel() {
  const navigate = useNavigate();
  const [playing, setPlaying] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col">
      <div className="flex items-center gap-4 px-8 py-6 border-b border-neutral-800">
        <button onClick={() => navigate("/")} className="text-neutral-400 hover:text-white transition-colors">
          <Icon name="ArrowLeft" size={20} />
        </button>
        <h1 className="text-xl font-bold uppercase tracking-widest">Гора Чужих Клиентов</h1>
      </div>

      <div className="flex-1 px-8 py-10 max-w-2xl mx-auto w-full">
        <p className="text-neutral-400 mb-2 text-sm">Выберите тему и слушайте готовую компиляцию</p>
        <p className="text-neutral-600 mb-8 text-xs">Регистрация не требуется</p>

        <div className="flex flex-col gap-4">
          {compilations.map((c) => (
            <div
              key={c.id}
              className={`flex items-center gap-5 border rounded-xl px-6 py-5 transition-all duration-200 ${
                playing === c.id
                  ? "bg-white/10 border-white/30"
                  : "bg-neutral-900 border-neutral-800 hover:border-neutral-600"
              }`}
            >
              <button
                onClick={() => setPlaying(playing === c.id ? null : c.id)}
                className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  playing === c.id ? "bg-white text-black" : "bg-white/10 hover:bg-white/20 text-white"
                }`}
              >
                <Icon name={playing === c.id ? "Pause" : "Play"} size={20} />
              </button>
              <div className="flex-1">
                <div className="font-semibold text-white">{c.title}</div>
                <div className="text-neutral-500 text-sm mt-0.5">{c.duration} · {c.plays} прослушиваний</div>
              </div>
              {playing === c.id && (
                <div className="flex gap-0.5 items-end h-5">
                  {[3, 5, 4, 6, 3, 5, 4].map((h, i) => (
                    <div
                      key={i}
                      className="w-1 bg-white rounded-full animate-pulse"
                      style={{ height: `${h * 3}px`, animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
