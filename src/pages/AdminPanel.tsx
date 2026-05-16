import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const navigate = useNavigate();

  const actions = [
    { icon: "ListMusic", label: "Управление темами", desc: "Создавать, редактировать, удалять темы" },
    { icon: "Users", label: "Клиенты", desc: "Приглашать СК, блокировать, просматривать" },
    { icon: "Mic", label: "Модерация записей", desc: "Просматривать и удалять аудиозаписи" },
    { icon: "Sparkles", label: "ИИ-компиляция", desc: "Запустить сборку итогового текста по теме" },
    { icon: "Download", label: "Выгрузка аудио", desc: "Скачать записи и компиляции" },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col">
      <div className="flex items-center gap-4 px-8 py-6 border-b border-neutral-800">
        <button onClick={() => navigate("/")} className="text-neutral-400 hover:text-white transition-colors">
          <Icon name="ArrowLeft" size={20} />
        </button>
        <h1 className="text-xl font-bold uppercase tracking-widest">Гора Админа</h1>
      </div>

      <div className="flex-1 px-8 py-10 max-w-2xl mx-auto w-full">
        <p className="text-neutral-400 mb-8 text-sm">Управление платформой VoiceCore</p>
        <div className="flex flex-col gap-4">
          {actions.map((a) => (
            <button
              key={a.label}
              className="flex items-center gap-5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-600 rounded-xl px-6 py-5 text-left transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                <Icon name={a.icon} size={20} className="text-white" />
              </div>
              <div>
                <div className="font-semibold text-white">{a.label}</div>
                <div className="text-neutral-500 text-sm mt-0.5">{a.desc}</div>
              </div>
              <Icon name="ChevronRight" size={16} className="text-neutral-600 ml-auto group-hover:text-neutral-400 transition-colors" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
