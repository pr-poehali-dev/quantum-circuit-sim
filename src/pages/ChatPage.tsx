import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";

const CHAT_URL = "https://functions.poehali.dev/1b02460d-06e6-4763-ae90-4735706f83ff";

interface Message {
  id: number;
  author: string;
  message: string;
  created_at: string;
}

export default function ChatPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [author, setAuthor] = useState(() => localStorage.getItem("chat_name") || "");
  const [nameSet, setNameSet] = useState(() => !!localStorage.getItem("chat_name"));
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const loadMessages = async () => {
    const res = await fetch(CHAT_URL);
    const data = JSON.parse(await res.json ? res.json() : res.text());
    const parsed = typeof data === "string" ? JSON.parse(data) : data;
    setMessages(parsed.messages || []);
  };

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const saveName = () => {
    if (!author.trim()) return;
    localStorage.setItem("chat_name", author.trim());
    setNameSet(true);
  };

  const sendMessage = async () => {
    if (!text.trim() || sending) return;
    setSending(true);
    await fetch(CHAT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author, message: text.trim() }),
    });
    setText("");
    setSending(false);
    await loadMessages();
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(160deg, #1a0f2e 0%, #0d1a0f 100%)" }}>
      {/* Шапка */}
      <div className="flex items-center gap-4 px-6 py-4 border-b border-white/10">
        <button onClick={() => navigate("/")} className="text-white/50 hover:text-white transition-colors">
          <Icon name="ArrowLeft" size={20} />
        </button>
        <span className="text-lg">🏔️</span>
        <div>
          <h1 className="text-white font-bold tracking-wide text-sm uppercase">Гора Своих — Чат</h1>
          <p className="text-white/40 text-xs">Только для Своих клиентов</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white/40 text-xs">онлайн</span>
        </div>
      </div>

      {/* Ввод имени */}
      {!nameSet && (
        <div className="flex-1 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 w-full max-w-sm text-center"
          >
            <span className="text-4xl mb-4 block">🌟</span>
            <h2 className="text-white font-bold text-lg mb-2">Как вас зовут?</h2>
            <p className="text-white/40 text-sm mb-6">Представьтесь, чтобы войти в чат Своих</p>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveName()}
              placeholder="Ваше имя"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/40 mb-4"
            />
            <button
              onClick={saveName}
              className="w-full bg-white text-black font-bold rounded-xl py-3 text-sm uppercase tracking-widest hover:bg-neutral-200 transition-colors"
            >
              Войти в чат
            </button>
          </motion.div>
        </div>
      )}

      {/* Чат */}
      {nameSet && (
        <>
          <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-3">
            {messages.length === 0 && (
              <p className="text-white/30 text-center text-sm mt-10">Пока нет сообщений. Начните беседу!</p>
            )}
            {messages.map((m) => {
              const isMe = m.author === author;
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col max-w-xs ${isMe ? "self-end items-end" : "self-start items-start"}`}
                >
                  {!isMe && <span className="text-white/40 text-xs mb-1 px-1">{m.author}</span>}
                  <div
                    className="rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
                    style={{
                      background: isMe ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.07)",
                      border: isMe ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.9)",
                    }}
                  >
                    {m.message}
                  </div>
                  <span className="text-white/25 text-[10px] mt-1 px-1">{formatTime(m.created_at)}</span>
                </motion.div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Поле ввода */}
          <div className="px-4 py-4 border-t border-white/10 flex gap-3 items-end">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder="Напишите сообщение..."
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/30 transition-colors"
            />
            <button
              onClick={sendMessage}
              disabled={sending || !text.trim()}
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
              style={{ background: text.trim() ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.1)" }}
            >
              <Icon name="Send" size={18} className={text.trim() ? "text-black" : "text-white/30"} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
