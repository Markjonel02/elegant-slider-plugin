
import React from 'react';
import { Slide } from '../types';

interface SlideManagerProps {
  slides: Slide[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Slide>) => void;
  onAdd: () => void;
}

const SlideManager: React.FC<SlideManagerProps> = ({ slides, onDelete, onUpdate, onAdd }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-slate-800">Your Slides</h2>
        <p className="text-slate-400 text-sm font-medium">Total: {slides.length}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slides.map((slide) => (
          <div 
            key={slide.id} 
            className={`bg-white rounded-3xl p-6 border transition-all ${slide.isPublished ? 'border-indigo-100 shadow-xl shadow-indigo-50/20' : 'border-slate-200 opacity-75 grayscale-[0.5]'}`}
          >
            <div className="flex gap-6">
              <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 shadow-inner bg-slate-100 relative group">
                <img src={slide.desktopUrl} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[10px] text-white font-bold uppercase tracking-tighter">Desktop Preview</span>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div 
                        onClick={() => onUpdate(slide.id, { isPublished: !slide.isPublished })}
                        className={`w-10 h-5 rounded-full transition-colors relative ${slide.isPublished ? 'bg-emerald-500' : 'bg-slate-300'}`}
                      >
                        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${slide.isPublished ? 'translate-x-5' : 'translate-x-1'}`}></span>
                      </div>
                      <span className={`text-xs font-bold uppercase tracking-wider ${slide.isPublished ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {slide.isPublished ? 'Published' : 'Hidden'}
                      </span>
                    </label>
                  </div>

                  <button 
                    onClick={() => onDelete(slide.id)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all"
                  >
                    <i className="fas fa-trash-alt text-sm"></i>
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Desktop URL</label>
                    <input 
                      type="text" 
                      value={slide.desktopUrl}
                      onChange={(e) => onUpdate(slide.id, { desktopUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full text-xs font-semibold bg-slate-50 border border-slate-100 rounded-lg py-1.5 px-3 outline-none focus:ring-1 focus:ring-indigo-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mobile URL (Optional)</label>
                    <input 
                      type="text" 
                      value={slide.mobileUrl}
                      onChange={(e) => onUpdate(slide.id, { mobileUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full text-xs font-semibold bg-slate-50 border border-slate-100 rounded-lg py-1.5 px-3 outline-none focus:ring-1 focus:ring-indigo-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Redirect Link</label>
                    <div className="relative">
                      <i className="fas fa-link absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-[10px]"></i>
                      <input 
                        type="text" 
                        value={slide.linkUrl}
                        onChange={(e) => onUpdate(slide.id, { linkUrl: e.target.value })}
                        placeholder="e.g. https://mywebsite.com/page"
                        className="w-full text-xs font-semibold bg-slate-50 border border-slate-100 rounded-lg py-1.5 px-3 pl-8 outline-none focus:ring-1 focus:ring-indigo-200"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button 
          onClick={onAdd}
          className="border-2 border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center text-slate-400 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group"
        >
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-all">
            <i className="fas fa-plus"></i>
          </div>
          <p className="font-bold text-sm">Add New Slide</p>
          <p className="text-xs mt-1">Images can be updated anytime</p>
        </button>
      </div>
    </div>
  );
};

export default SlideManager;
