export type BaseAlertType = 'info' | 'success' | 'error' | 'warning';
export interface BaseAlert {
  message: string;
  type?: BaseAlertType;
  close?: () => void;
}
