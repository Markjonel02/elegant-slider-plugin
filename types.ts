
export enum LayoutType {
  FLEX = 'flex',
  GRID = 'grid'
}

export enum AnimationType {
  FADE = 'fade',
  SLIDE = 'slide',
  ZOOM = 'zoom'
}

export interface Slide {
  id: string;
  desktopUrl: string;
  mobileUrl: string;
  linkUrl: string;
  isPublished: boolean;
  order: number;
}

export interface SliderSettings {
  borderRadius: number;
  layoutType: LayoutType;
  gap: number;
  columns: number;
  animationType: AnimationType;
  animationDuration: number;
  autoplay: boolean;
  autoplaySpeed: number;
  showArrows: boolean;
  showDots: boolean;
  accentColor: string;
}
