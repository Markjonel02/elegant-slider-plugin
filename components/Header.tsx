
import React from 'react';

interface HeaderProps {
  activeView: 'preview' | 'manager';
  setActiveView: (view: 'preview' | 'manager') => void;
  device: 'desktop' | 'mobile';
  setDevice: (device: 'desktop' | 'mobile') => void;
  onAddSlide: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  activeView, 
  setActiveView, 
  device, 
  setDevice,
  onAddSlide 
}) => {
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
          <i className="fas fa-layer-group text-lg"></i>
        </div>
        <div>
          <h1 className="font-bold text-slate-800 text-lg">Elegant Slider Pro</h1>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Dashboard v2.0</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex bg-slate-100 p-1 rounded-lg gap-1">
          <button 
            onClick={() => setDevice('desktop')}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${device === 'desktop' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <i className="fas fa-desktop mr-2"></i> Desktop
          </button>
          <button 
            onClick={() => setDevice('mobile')}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${device === 'mobile' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <i className="fas fa-mobile-alt mr-2"></i> Mobile
          </button>
        </div>

        <div className="h-6 w-px bg-slate-200 mx-2"></div>

        <nav className="flex items-center gap-4">
          <button 
            onClick={() => setActiveView('preview')}
            className={`text-sm font-semibold flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${activeView === 'preview' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <i className="fas fa-eye"></i> Live Preview
          </button>
          <button 
            onClick={() => setActiveView('manager')}
            className={`text-sm font-semibold flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${activeView === 'manager' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <i className="fas fa-images"></i> Manage Slides
          </button>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={onAddSlide}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-5 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-95 flex items-center gap-2"
        >
          <i className="fas fa-plus"></i> New Slide
        </button>
      </div>
    </header>
  );
};

export default Header;
