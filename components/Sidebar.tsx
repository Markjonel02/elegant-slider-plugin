
import React, { useState } from 'react';
import { SliderSettings, LayoutType, AnimationType } from '../types';

interface SidebarProps {
  settings: SliderSettings;
  onUpdateSettings: (updates: Partial<SliderSettings>) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ settings, onUpdateSettings }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const code = `[elegant_slider id="1"]`;
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <aside className="w-80 bg-white border-r border-slate-200 overflow-y-auto shrink-0 hidden lg:block">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Global Settings</h2>
      </div>

      <div className="p-6 space-y-8">
        {/* Layout Settings */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-800 font-bold">
            <i className="fas fa-th-large text-indigo-500"></i>
            <h3>Layout & Structure</h3>
          </div>
          
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-600">Container Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => onUpdateSettings({ layoutType: LayoutType.FLEX, columns: 1 })}
                className={`py-2 px-3 rounded-lg border text-sm font-bold transition-all ${settings.layoutType === LayoutType.FLEX ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'border-slate-200 text-slate-500 hover:border-indigo-100'}`}
              >
                Slider (Flex)
              </button>
              <button 
                onClick={() => onUpdateSettings({ layoutType: LayoutType.GRID })}
                className={`py-2 px-3 rounded-lg border text-sm font-bold transition-all ${settings.layoutType === LayoutType.GRID ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'border-slate-200 text-slate-500 hover:border-indigo-100'}`}
              >
                Grid View
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-600">Border Radius ({settings.borderRadius}px)</label>
            <input 
              type="range" min="0" max="100" 
              value={settings.borderRadius} 
              onChange={(e) => onUpdateSettings({ borderRadius: parseInt(e.target.value) })}
              className="w-full accent-indigo-600 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </section>

        {/* Animation Settings */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-800 font-bold">
            <i className="fas fa-magic text-rose-500"></i>
            <h3>Animations</h3>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-600">Transition Effect</label>
            <select 
              value={settings.animationType}
              onChange={(e) => onUpdateSettings({ animationType: e.target.value as AnimationType })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 text-sm focus:ring-2 focus:ring-indigo-100 outline-none font-semibold text-slate-700"
            >
              <option value={AnimationType.SLIDE}>Slide Right/Left</option>
              <option value={AnimationType.FADE}>Smooth Fade</option>
              <option value={AnimationType.ZOOM}>Zoom Scale</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-600">Autoplay</label>
            <button 
              onClick={() => onUpdateSettings({ autoplay: !settings.autoplay })}
              className={`w-11 h-6 rounded-full transition-colors relative ${settings.autoplay ? 'bg-indigo-600' : 'bg-slate-300'}`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.autoplay ? 'translate-x-6' : 'translate-x-1'}`}></span>
            </button>
          </div>
        </section>

        {/* Navigation Settings */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-800 font-bold">
            <i className="fas fa-location-arrow text-amber-500"></i>
            <h3>Navigation</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-600">Show Arrows</label>
              <button 
                onClick={() => onUpdateSettings({ showArrows: !settings.showArrows })}
                className={`w-11 h-6 rounded-full transition-colors relative ${settings.showArrows ? 'bg-indigo-600' : 'bg-slate-300'}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.showArrows ? 'translate-x-6' : 'translate-x-1'}`}></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-600">Show Pagination Dots</label>
              <button 
                onClick={() => onUpdateSettings({ showDots: !settings.showDots })}
                className={`w-11 h-6 rounded-full transition-colors relative ${settings.showDots ? 'bg-indigo-600' : 'bg-slate-300'}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.showDots ? 'translate-x-6' : 'translate-x-1'}`}></span>
              </button>
            </div>
          </div>
        </section>

        {/* Shortcode Card */}
        <section className="pt-6 border-t border-slate-100">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Your Shortcode</h3>
          <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-4 flex flex-col gap-3">
            <code className="text-xs font-mono text-indigo-600 font-bold bg-white p-2 rounded border border-slate-100">
              [elegant_slider id="1"]
            </code>
            <button 
              onClick={handleCopy}
              className={`w-full py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${copied ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-400 hover:text-indigo-600'}`}
            >
              <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`}></i>
              {copied ? 'Copied to Clipboard!' : 'Copy Shortcode'}
            </button>
          </div>
        </section>
      </div>
    </aside>
  );
};

export default Sidebar;
