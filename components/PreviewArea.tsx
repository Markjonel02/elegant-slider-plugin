
import React, { useState, useEffect } from 'react';
import { Slide, SliderSettings, LayoutType, AnimationType } from '../types';

interface PreviewAreaProps {
  slides: Slide[];
  settings: SliderSettings;
  device: 'desktop' | 'mobile';
}

const PreviewArea: React.FC<PreviewAreaProps> = ({ slides, settings, device }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const publishedSlides = slides.filter(s => s.isPublished);

  useEffect(() => {
    if (settings.autoplay && publishedSlides.length > 0 && settings.layoutType === LayoutType.FLEX) {
      const timer = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % publishedSlides.length);
      }, settings.autoplaySpeed);
      return () => clearInterval(timer);
    }
  }, [settings.autoplay, settings.autoplaySpeed, publishedSlides.length, settings.layoutType]);

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % publishedSlides.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + publishedSlides.length) % publishedSlides.length);
  };

  if (publishedSlides.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] border-2 border-dashed border-slate-200 rounded-3xl bg-white/50">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <i className="fas fa-image text-slate-300 text-3xl"></i>
        </div>
        <h3 className="text-slate-600 font-bold text-xl">No Published Slides</h3>
        <p className="text-slate-400 mt-2">Publish some slides or add new ones to see the preview.</p>
      </div>
    );
  }

  const containerStyles: React.CSSProperties = {
    borderRadius: `${settings.borderRadius}px`,
    overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className={`bg-white transition-all duration-700 shadow-2xl relative ${device === 'mobile' ? 'w-[375px] h-[667px]' : 'w-full aspect-video'}`}
        style={containerStyles}
      >
        {settings.layoutType === LayoutType.FLEX ? (
          /* Slider View */
          <div className="w-full h-full relative">
            <div className="w-full h-full relative overflow-hidden">
               {publishedSlides.map((slide, idx) => (
                 <a 
                   key={slide.id} 
                   href={slide.linkUrl || '#'} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className={`absolute inset-0 w-full h-full transition-all duration-${settings.animationDuration} ${
                     idx === currentIndex ? 'opacity-100 z-10 scale-100 translate-x-0' : 'opacity-0 z-0 scale-95 translate-x-full'
                   }`}
                   style={{
                     transitionDuration: `${settings.animationDuration}ms`,
                     transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                     pointerEvents: idx === currentIndex ? 'auto' : 'none',
                     display: 'block'
                   }}
                 >
                   <img 
                     src={device === 'mobile' ? (slide.mobileUrl || slide.desktopUrl) : slide.desktopUrl} 
                     alt="" 
                     className="w-full h-full object-cover"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                 </a>
               ))}
            </div>

            {/* Navigation Arrows */}
            {settings.showArrows && (
              <>
                <button 
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/40 transition-all border border-white/30"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button 
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/40 transition-all border border-white/30"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </>
            )}

            {/* Pagination Dots */}
            {settings.showDots && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {publishedSlides.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2.5 rounded-full transition-all ${idx === currentIndex ? 'w-8' : 'w-2.5 bg-white/40 hover:bg-white/60'}`}
                    style={{ backgroundColor: idx === currentIndex ? settings.accentColor : undefined }}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Grid View */
          <div 
            className="w-full h-full p-6 overflow-y-auto"
            style={{ 
              display: 'grid', 
              gridTemplateColumns: `repeat(${device === 'mobile' ? 1 : settings.columns}, 1fr)`,
              gap: `${settings.gap}px`
            }}
          >
            {publishedSlides.map((slide) => (
              <a 
                key={slide.id} 
                href={slide.linkUrl || '#'} 
                target="_blank" 
                className="relative aspect-video rounded-xl overflow-hidden shadow-md group border border-slate-100"
              >
                <img 
                   src={device === 'mobile' ? (slide.mobileUrl || slide.desktopUrl) : slide.desktopUrl} 
                   alt="" 
                   className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                {slide.linkUrl && (
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs text-indigo-600 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <i className="fas fa-external-link-alt"></i>
                  </div>
                )}
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center gap-4 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Preview Mode</span>
        <div className="h-4 w-px bg-slate-200"></div>
        <p className="text-sm font-medium text-slate-600">
          Viewing {publishedSlides.length} published {publishedSlides.length === 1 ? 'slide' : 'slides'} in <strong>{settings.layoutType}</strong> mode.
        </p>
      </div>
    </div>
  );
};

export default PreviewArea;
