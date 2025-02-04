export default function TimelineDescription({ event }) {
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
      relative z-40 card-border-light dark:card-border-dark glow-effect cursor-glow flex-1 "
      onMouseMove={handleMouseMove}
    >
      <div className="space-y-4 md:space-y-6">
        <div className="inline-block px-3 py-1 md:px-4 md:py-2 bg-blue-100 dark:bg-blue-900 rounded-full">
          <span className="text-sm md:text-base text-blue-800 dark:text-blue-100 font-semibold">
            {event.year}
          </span>
        </div>

        <h3 className="text-xl md:text-3xl font-bold tracking-tight dark:text-white">
          {event.title}
        </h3>

        <div className="space-y-4">
          <p className="text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            {event.description}
          </p>

          {event.history && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
                Sejarah
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                {event.history}
              </p>
            </div>
          )}

          {event.highlights && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
                Highlights
              </h4>
              <ul className="space-y-2">
                {event.highlights.map((highlight, index) => (
                  <li
                    key={index}
                    className="flex items-center text-gray-700 dark:text-gray-300"
                  >
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
                  <p className="text-gray-700 dark:text-gray-300">
                    {event.location}
                  </p>
                </div>
              )}
              {event.architect && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                    Arsitek
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {event.architect}
                  </p>
                </div>
              )}
            </div>
          )}
          {(event.origin || event.material || event.purpose) && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4">
              {event.origin && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                    Asal
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {event.origin}
                  </p>
                </div>
              )}
              {event.material && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                    Material
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {event.material}
                  </p>
                </div>
              )}
              {event.purpose && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                    Fungsi
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {event.purpose}
                  </p>
                </div>
              )}
            </div>
          )}

          {event.acquisitionDate && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                Tanggal Akuisisi
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                {event.acquisitionDate}
              </p>
            </div>
          )}

          {event.originalOwner && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                Pemilik Asli
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                {event.originalOwner}
              </p>
            </div>
          )}

          {event.quote && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                Kutipan
              </h4>
              <p className="italic text-gray-700 dark:text-gray-300">
                "{event.quote}"
              </p>
            </div>
          )}

          {event.conservation && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                Konservasi
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                {event.conservation}
              </p>
            </div>
          )}

          {event.culturalSignificance && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                Signifikansi Budaya
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                {event.culturalSignificance}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
