import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="/images/mountain-landscape.jpg"
          alt="Mountain landscape"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 drop-shadow-lg">
          VOICECORE
        </h1>
        <p className="text-lg md:text-2xl max-w-2xl mx-auto opacity-90 mb-10 leading-relaxed drop-shadow">
          Голосовые идеи вашей команды — одним совершенным текстом. ИИ собирает лучшее из каждого.
        </p>
        <a
          href="#about"
          className="inline-block bg-white text-black px-8 py-3 uppercase tracking-widest text-sm font-semibold hover:bg-neutral-200 transition-colors duration-300"
        >
          Узнать больше
        </a>
      </div>
    </div>
  );
}