export default function Featured() {
  const features = [
    {
      icon: "🎙️",
      title: "Запись до 1 минуты",
      desc: "Свои клиенты наговаривают идеи по теме прямо в браузере — без приложений и оборудования.",
    },
    {
      icon: "🤖",
      title: "ИИ-компиляция",
      desc: "Из всех записей по теме ИИ отбирает лучшие мысли и собирает один итоговый текст до 60 секунд.",
    },
    {
      icon: "🎧",
      title: "Слушают все",
      desc: "Чужие клиенты заходят без регистрации, выбирают тему и сразу слышат готовый результат.",
    },
  ];

  return (
    <div id="about" className="flex flex-col lg:flex-row lg:justify-between lg:items-center min-h-screen px-6 py-20 lg:py-0 bg-white">
      <div className="flex-1 h-[400px] lg:h-[800px] mb-12 lg:mb-0 lg:order-2">
        <img
          src="/images/mountain-landscape.jpg"
          alt="Аудио платформа"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 text-left lg:h-[800px] flex flex-col justify-center lg:mr-16 lg:order-1">
        <h3 className="uppercase mb-4 text-sm tracking-widest text-neutral-500">Как это работает</h3>
        <p className="text-3xl lg:text-4xl mb-10 text-neutral-900 leading-tight font-light">
          Голос каждого участника важен — ИИ не выбирает победителя, он собирает лучшее из всех.
        </p>
        <div className="flex flex-col gap-6 mb-10">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4 items-start">
              <span className="text-2xl mt-1">{f.icon}</span>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-1">{f.title}</h4>
                <p className="text-neutral-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="bg-black text-white border border-black px-6 py-3 text-sm transition-all duration-300 hover:bg-white hover:text-black cursor-pointer w-fit uppercase tracking-widest">
          Начать работу
        </button>
      </div>
    </div>
  );
}
