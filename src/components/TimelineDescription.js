export default function TimelineDescription({ event }) {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--x', `${x}%`);
    e.currentTarget.style.setProperty('--y', `${y}%`);
  };

  return (
    <div 
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300 glow-effect cursor-glow relative z-40 card-border-light dark:card-border-dark"
      onMouseMove={handleMouseMove}
    >
      <div className="space-y-6">
        <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-full">
          <span className="text-blue-800 dark:text-blue-100 font-semibold">{event.year}</span>
        </div>
        
        <h3 className="text-3xl font-bold tracking-tight dark:text-white">{event.title}</h3>
        
        <div className="space-y-4">
          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            {event.description}
          </p>
          
          {event.history && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
                Sejarah
              </h4>
              <p className="text-gray-700 dark:text-gray-300">{event.history}</p>
            </div>
          )}

          {event.highlights && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
                Highlights
              </h4>
              <ul className="space-y-2">
                {event.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(event.location || event.architect) && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2 gap-4">
              {event.location && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                    Lokasi
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">{event.location}</p>
                </div>
              )}
              {event.architect && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                    Arsitek
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">{event.architect}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 