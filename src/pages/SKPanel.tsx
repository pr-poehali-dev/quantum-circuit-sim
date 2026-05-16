import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const myRecordings = [
  { id: 1, topic: "Лучшие идеи для бизнеса", date: "14 мая 2026", duration: "0:47" },
  { id: 2, topic: "Как повысить продуктивность", date: "12 мая 2026", duration: "0:58" },
];

export default function SKPanel() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col">
      <div className="flex items-center gap-4 px-8 py-6 border-b border-neutral-800">
        <button onClick={() => navigate("/")} className="text-neutral-400 hover:text-white transition-colors">
          <Icon name="ArrowLeft" size={20} />
        </button>
        <h1 className="text-xl font-bold uppercase tracking-widest">Гора Своих Клиентов</h1>
      </div>

      <div className="flex-1 px-8 py-10 max-w-2xl mx-auto w-full">
        {/* Кнопка записи */}
        <button className="w-full flex items-center justify-center gap-3 bg-white text-black rounded-xl py-5 font-bold uppercase tracking-widest text-sm hover:bg-neutral-200 transition-colors mb-10">
          <Icon name="Mic" size={20} />
          Записать новый текст
        </button>

        <p className="text-neutral-400 mb-4 text-sm uppercase tracking-wide">Мои записи</p>
        <div className="flex flex-col gap-4 mb-10">
          {myRecordings.map((r) => (
            <div key={r.id} className="flex items-center gap-4 bg-neutral-900 border border-neutral-800 rounded-xl px-6 py-4">
              <button className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center flex-shrink-0 transition-colors">
                <Icon name="Play" size={16} className="text-white" />
              </button>
              <div className="flex-1">
                <div className="font-medium text-white text-sm">{r.topic}</div>
                <div className="text-neutral-500 text-xs mt-0.5">{r.date} · {r.duration}</div>
              </div>
              <button className="text-neutral-600 hover:text-red-400 transition-colors">
                <Icon name="Trash2" size={16} />
              </button>
            </div>
          ))}
        </div>

        <p className="text-neutral-400 mb-4 text-sm uppercase tracking-wide">Компилированные тексты</p>
        <button className="w-full flex items-center gap-5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-600 rounded-xl px-6 py-5 text-left transition-all duration-200 group">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <Icon name="Sparkles" size={20} className="text-emerald-400" />
          </div>
          <div>
            <div className="font-semibold text-white">Лучшие идеи для бизнеса</div>
            <div className="text-neutral-500 text-sm mt-0.5">Компиляция готова · 0:59</div>
          </div>
          <Icon name="Play" size={16} className="text-neutral-600 ml-auto group-hover:text-white transition-colors" />
        </button>
      </div>
    </div>
  );
}
