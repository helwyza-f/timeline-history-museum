import Image from "next/image";

export default function TimelineEvent({ event }) {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--x", `${x}%`);
    e.currentTarget.style.setProperty("--y", `${y}%`);
  };

  return (
    <div
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 md:p-8 
      relative z-40 card-border-light dark:card-border-dark card-hover-effect glow-effect cursor-glow flex-1"
      onMouseMove={handleMouseMove}
    >
      <div className="flex flex-col gap-4">
        <div className="relative aspect-video w-full">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-contain rounded-lg"
          />
        </div>
        <div>
          <div className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">
            {event.year}
          </div>
          <h3 className="text-lg md:text-xl font-semibold mt-2 dark:text-white">
            {event.title}
          </h3>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-2">
            {event.shortDesc}
          </p>
        </div>
      </div>
    </div>
  );
}
