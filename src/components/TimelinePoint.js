export default function TimelinePoint({ isActive, isLeft, event }) {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--x', `${x}%`);
    e.currentTarget.style.setProperty('--y', `${y}%`);
  };

  return (
    <div className={`flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
      {/* Point */}
      <div className="relative flex items-center justify-center">
        <div className={`
          w-6 h-6 rounded-full border-4 border-blue-500 bg-white dark:bg-gray-800
          transition-all duration-300 transform
          ${isActive ? 'scale-125' : 'scale-100'}
        `} />
      </div>

      {/* Card */}
      <div className={`
        w-[calc(50%-2rem)] mx-8
        transition-all duration-500 transform
        ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        ${isLeft ? 'origin-left' : 'origin-right'}
      `}>
        <div 
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 glow-effect cursor-glow relative z-40 card-border-light dark:card-border-dark"
          onMouseMove={handleMouseMove}
        >
          <div className="relative aspect-video mb-4">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="text-2xl font-bold mb-2 dark:text-blue-400">{event.year}</div>
          <h3 className="text-xl font-semibold mb-3 dark:text-white">{event.title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
        </div>
      </div>
    </div>
  );
} 