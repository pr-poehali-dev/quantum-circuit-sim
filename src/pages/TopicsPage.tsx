import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const topics = [
  { id: 1, title: "Лучшие идеи для бизнеса", recordings: 5, hasCompilation: true },
  { id: 2, title: "Как повысить продуктивность", recordings: 3, hasCompilation: true },
  { id: 3, title: "Вдохновение каждый день", recordings: 7, hasCompilation: false },
];

export default function TopicsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col">
      <div className="flex items-center gap-4 px-8 py-6 border-b border-neutral-800">
        <button onClick={() => navigate("/")} className="text-neutral-400 hover:text-white transition-colors">
          <Icon name="ArrowLeft" size={20} />
        </button>
        <h1 className="text-xl font-bold uppercase tracking-widest">Гора Тем</h1>
      </div>

      <div className="flex-1 px-8 py-10 max-w-2xl mx-auto w-full">
        <p className="text-neutral-400 mb-8 text-sm">Выберите тему для прослушивания</p>
        <div className="flex flex-col gap-4">
          {topics.map((t) => (
            <button
              key={t.id}
              className="flex items-center gap-5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-600 rounded-xl px-6 py-5 text-left transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                <Icon name="Music" size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white">{t.title}</div>
                <div className="text-neutral-500 text-sm mt-0.5">{t.recordings} записей</div>
              </div>
              {t.hasCompilation ? (
                <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full px-3 py-1">
                  Компиляция готова
                </span>
              ) : (
                <span className="text-xs bg-neutral-700/50 text-neutral-500 border border-neutral-700 rounded-full px-3 py-1">
                  В обработке
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
