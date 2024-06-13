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
}

export interface CardElementStyles {
  width: string | number;
  height: string | number;
  titleFont: string;
  subtitleFont: string;
  padding: string;
}
