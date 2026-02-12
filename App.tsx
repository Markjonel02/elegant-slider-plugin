
import React, { useState, useCallback } from 'react';
import { Slide, SliderSettings, LayoutType, AnimationType } from './types';
import { INITIAL_SLIDES, DEFAULT_SETTINGS } from './constants';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import PreviewArea from './components/PreviewArea';
import SlideManager from './components/SlideManager';

const App: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>(INITIAL_SLIDES);
  const [settings, setSettings] = useState<SliderSettings>(DEFAULT_SETTINGS);
  const [activeView, setActiveView] = useState<'preview' | 'manager'>('preview');
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');

  const updateSettings = (newSettings: Partial<SliderSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const addSlide = () => {
    const newSlide: Slide = {
      id: Math.random().toString(36).substr(2, 9),
      desktopUrl: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/1200/600`,
      mobileUrl: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/400/600`,
      linkUrl: '',
      isPublished: true,
      order: slides.length
    };
    setSlides([...slides, newSlide]);
  };

  const deleteSlide = (id: string) => {
    setSlides(slides.filter(s => s.id !== id));
  };

  const updateSlide = (id: string, updates: Partial<Slide>) => {
    setSlides(slides.map(s => (s.id === id ? { ...s, ...updates } : s)));
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar for Settings */}
      <Sidebar settings={settings} onUpdateSettings={updateSettings} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          activeView={activeView} 
          setActiveView={setActiveView} 
          device={device} 
          setDevice={setDevice} 
          onAddSlide={addSlide}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {activeView === 'preview' ? (
              <PreviewArea slides={slides} settings={settings} device={device} />
            ) : (
              <SlideManager 
                slides={slides} 
                onDelete={deleteSlide} 
                onUpdate={updateSlide}
                onAdd={addSlide}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
