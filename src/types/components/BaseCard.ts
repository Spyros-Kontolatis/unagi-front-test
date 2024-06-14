import type { Size } from '../global';

interface BaseCardAction {
  label: string;
  handler: () => void;
}

export interface BaseCardProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  size?: Size;
  action?: BaseCardAction;
  loading?: boolean;
  lazyLoading?: boolean;
  onClick?: () => void;
}

export interface CardElementStyles {
  width: string;
  height: string;
  titleFont: string;
  subtitleFont: string;
  padding: string;
}

export interface CartWrapperStyleProps {
  width: string;
  height: string;
  $padding: string;
}
export interface CardTextStyleProps {
  $cardfontsize: string;
}

export interface CartContentSkeletonStyleProps {
  width: string;
  height: string;
  $cardmargintop?: string;
  $cardborderradius?: string;
}
