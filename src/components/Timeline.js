'use client';
import { useState, useEffect, useRef } from 'react';
import TimelineEvent from './TimelineEvent';
import TimelineDescription from './TimelineDescription';

export default function Timeline({ events }) {
  const [visibleEvents, setVisibleEvents] = useState(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRef = useRef(null);
  const isBottomDesc = false;
  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const element = timelineRef.current;
        const windowHeight = window.innerHeight;
        const { top, height } = element.getBoundingClientRect();
        
        // Hitung progress scroll
        const scrolled = windowHeight - top;
        const total = height + windowHeight;
        const progress = Math.min(Math.max(scrolled / total, 0), 1) * 100;
        
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const eventId = entry.target.getAttribute('data-event-id');
          if (entry.isIntersecting) {
            setVisibleEvents(prev => new Set([...prev, eventId]));
          } else {
            setVisibleEvents(prev => {
              const newSet = new Set(prev);
              newSet.delete(eventId);
              return newSet;
            });
          }
        });
      },
      {
        root: null,
        threshold: 0.3,
        rootMargin: '-100px 0px'
      }
    );

    const eventElements = document.querySelectorAll('.event-marker');
    eventElements.forEach(element => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  // Layout patterns untuk variasi posisi
  const layouts = [
    { event: 'left', desc: 'right' },    // Pattern 1
    { event: 'right', desc: 'left' },    // Pattern 2
    { event: 'left', desc: 'right' },   // Pattern 3
    { event: 'right', desc: 'left' },  // Pattern 4
  ];

  return (
    <div className="relative w-full min-h-screen px-4 md:px-0" ref={timelineRef}>
      {/* Timeline Center Line */}
      <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] md:w-[3px] bg-gray-200 dark:bg-gray-700 transform md:-translate-x-1/2">
        <div 
          className="absolute left-0 top-0 w-full bg-blue-500 dark:bg-blue-400 transition-all duration-300"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {events.map((event, index) => {
          const layout = layouts[index % layouts.length];
          
          return (
            <div 
              key={event.id}
              data-event-id={event.id}
              className="event-marker relative py-12 md:py-24"
            >
              {/* Timeline Point */}
              <div className="absolute left-[18px] md:left-1/2 top-1/2 md:-translate-x-1/2 -translate-y-1/2 z-10">
                <div className={`
                  w-4 h-4 md:w-5 md:h-5 rounded-full border-4 border-blue-500 bg-white
                  transition-all duration-500
                  ${visibleEvents.has(event.id.toString()) ? 'scale-125 bg-blue-500' : ''}
                `} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 pl-12 md:pl-0">
                {/* Event Card */}
                <div className={`
                  ${layout.event === 'left' ? 'md:pr-8' : 'md:pl-8'}
                  ${layout.event === 'right' ? 'md:col-start-2' : ''}
                  transition-all duration-700 transform
                  ${visibleEvents.has(event.id.toString()) 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-20'}
                `}>
                  <TimelineEvent event={event} />
                </div>

                {/* Description Card */}
                <div className={`
                  ${!isBottomDesc ? (layout.desc === 'left' ? 'md:pr-8' : 'md:pl-8') : 'mt-4 md:mt-8'}
                  ${layout.desc === 'left' ? 'md:col-start-1 md:row-start-1' : ''}
                  transition-all duration-700 transform delay-200
                  ${visibleEvents.has(event.id.toString()) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-20'}
                `}>
                  <TimelineDescription event={event} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 