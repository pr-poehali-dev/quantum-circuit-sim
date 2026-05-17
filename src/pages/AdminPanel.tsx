import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import * as XLSX from "xlsx";

const UPLOAD_TOPICS_URL = "https://functions.poehali.dev/f35827d9-98e1-492f-8bc9-4cc7496cd680";
const ADMIN_LOGIN_URL = "https://functions.poehali.dev/6d4329dd-22a5-40d9-a864-bd3559944b27";

export default function AdminPanel() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<string | null>(null);
  const [authed, setAuthed] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);
    try {
      const res = await fetch(ADMIN_LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: adminPassword }),
      });
      const data = await res.json();
      if (data.ok) {
        setAuthed(true);
      } else {
        setAuthError(data.error || "Неверный пароль");
      }
    } catch {
      setAuthError("Ошибка соединения");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadResult(null);
    try {
      const buffer = await file.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
      const res = await fetch(UPLOAD_TOPICS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file: base64 }),
      });
      const data = await res.json();
      if (data.ok) {
        setUploadResult(`✓ Загружено тем: ${data.count}`);
      } else {
        setUploadResult(`✗ ${data.error}`);
      }
    } catch {
      setUploadResult("✗ Ошибка загрузки");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const downloadTemplate = () => {
    const ws = XLSX.utils.aoa_to_sheet([
      ["Название темы", "Кол-во записей", "Компиляция готова (1=да, 0=нет)"],
      ["Лучшие идеи для бизнеса", 5, 1],
      ["Как повысить продуктивность", 3, 1],
      ["Вдохновение каждый день", 7, 0],
    ]);
    ws["!cols"] = [{ wch: 40 }, { wch: 20 }, { wch: 32 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Темы");
    XLSX.writeFile(wb, "шаблон_темы.xlsx");
  };

  const actions = [
    { icon: "ListMusic", label: "Управление темами", desc: "Создавать, редактировать, удалять темы" },
    { icon: "Users", label: "Клиенты", desc: "Приглашать СК, блокировать, просматривать" },
    { icon: "Mic", label: "Модерация записей", desc: "Просматривать и удалять аудиозаписи" },
    { icon: "Sparkles", label: "ИИ-компиляция", desc: "Запустить сборку итогового текста по теме" },
    { icon: "Download", label: "Выгрузка аудио", desc: "Скачать записи и компиляции" },
  ];

  if (!authed) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-3 mb-8">
            <button onClick={() => navigate("/")} className="text-neutral-500 hover:text-white transition-colors">
              <Icon name="ArrowLeft" size={20} />
            </button>
            <h1 className="text-xl font-bold uppercase tracking-widest">Гора Админа</h1>
          </div>

          <form onSubmit={handleAdminLogin} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 flex flex-col gap-5">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-neutral-800 mx-auto">
              <Icon name="ShieldCheck" size={28} className="text-neutral-400" />
            </div>
            <p className="text-center text-neutral-400 text-sm">Введите пароль администратора</p>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Пароль"
              autoFocus
              className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-sm outline-none focus:border-neutral-500 transition-colors"
            />
            {authError && (
              <p className="text-red-400 text-sm text-center">{authError}</p>
            )}
            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 rounded-xl bg-white hover:bg-neutral-200 disabled:bg-neutral-700 text-neutral-950 font-semibold text-sm transition-colors"
            >
              {authLoading ? "Проверяю..." : "Войти"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col">
      <div className="flex items-center gap-4 px-8 py-6 border-b border-neutral-800">
        <button onClick={() => navigate("/")} className="text-neutral-400 hover:text-white transition-colors">
          <Icon name="ArrowLeft" size={20} />
        </button>
        <h1 className="text-xl font-bold uppercase tracking-widest">Гора Админа</h1>
        <button
          onClick={() => setAuthed(false)}
          className="ml-auto text-neutral-600 hover:text-neutral-400 text-sm transition-colors"
        >
          Выйти
        </button>
      </div>

      <div className="flex-1 px-8 py-10 max-w-2xl mx-auto w-full">
        <p className="text-neutral-400 mb-8 text-sm">Управление платформой VoiceCore</p>

        {/* Загрузка тем из Excel */}
        <div className="mb-6 rounded-xl border border-amber-800/40 bg-amber-950/30 px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-amber-900/50 flex items-center justify-center flex-shrink-0">
              <Icon name="FileSpreadsheet" size={20} className="text-amber-400" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-white">Загрузить темы из Excel</div>
              <div className="text-neutral-500 text-sm mt-0.5">Колонки: Название | Кол-во записей | Компиляция готова (1/0)</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={downloadTemplate}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-white text-sm font-medium transition-colors"
              >
                <Icon name="FileDown" size={16} />
                Шаблон
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-700 hover:bg-amber-600 disabled:bg-amber-900 text-white text-sm font-medium transition-colors"
              >
                <Icon name="Upload" size={16} />
                {uploading ? "Загружаю..." : "Загрузить"}
              </button>
            </div>
            <input ref={fileInputRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={handleFileChange} />
          </div>
          {uploadResult && (
            <p className={`mt-3 text-sm ${uploadResult.startsWith("✓") ? "text-emerald-400" : "text-red-400"}`}>
              {uploadResult}
            </p>
          )}
        </div>

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
