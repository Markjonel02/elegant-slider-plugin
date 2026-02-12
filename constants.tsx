
import { Slide, SliderSettings, LayoutType, AnimationType } from './types';

export const INITIAL_SLIDES: Slide[] = [
  {
    id: '1',
    desktopUrl: 'https://picsum.photos/id/10/1200/600',
    mobileUrl: 'https://picsum.photos/id/10/400/600',
    linkUrl: 'https://google.com',
    isPublished: true,
    order: 0
  },
  {
    id: '2',
    desktopUrl: 'https://picsum.photos/id/20/1200/600',
    mobileUrl: 'https://picsum.photos/id/20/400/600',
    linkUrl: 'https://github.com',
    isPublished: true,
    order: 1
  }
];

export const DEFAULT_SETTINGS: SliderSettings = {
  borderRadius: 16,
  layoutType: LayoutType.FLEX,
  gap: 0,
  columns: 1,
  animationType: AnimationType.SLIDE,
  animationDuration: 500,
  autoplay: true,
  autoplaySpeed: 5000,
  showArrows: true,
  showDots: true,
  accentColor: '#6366f1' // Indigo-500
};
