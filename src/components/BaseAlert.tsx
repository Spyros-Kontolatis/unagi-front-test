import React from 'react';
import {
  AlertWrapper,
  AlertHideButton,
  ErrorAlertWrapper,
  SuccessAlertWrapper,
  WarningAlertWrapper,
} from './BaseAlert.style';
import type { ReactNode } from 'react';
import type { BaseAlert } from '../types';

export default ({ message, type, close }: BaseAlert) => {
  const renderAlertByType = (children: ReactNode) => {
    switch (type) {
      case 'error':
        return <ErrorAlertWrapper>{children}</ErrorAlertWrapper>;
      case 'success':
        return <SuccessAlertWrapper>{children}</SuccessAlertWrapper>;
      case 'warning':
        return <WarningAlertWrapper>{children}</WarningAlertWrapper>;
      default:
        return <AlertWrapper>{children}</AlertWrapper>;
    }
  };
  return renderAlertByType(
    <>
      {!!close && (
        <AlertHideButton data-testid="alertClose" onClick={() => close()}>
          &times;
        </AlertHideButton>
      )}
      {message}
    </>,
  );
};
