import BaseAlert from '../../components/BaseAlert';

import MockTheme from '../../themes/MockTheme';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

describe('BaseAlert', () => {
  test('renders the component', () => {
    const { baseElement } = render(
      <MockTheme>
        <BaseAlert message="Info" />
      </MockTheme>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  test('renders the component as success', () => {
    const { baseElement } = render(
      <MockTheme>
        <BaseAlert message="Success" type="success" />,
      </MockTheme>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  test('renders the component as error', () => {
    const { baseElement } = render(
      <MockTheme>
        <BaseAlert message="Error" type="error" />,
      </MockTheme>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  test('renders the component as warning', () => {
    const { baseElement } = render(
      <MockTheme>
        <BaseAlert message="Warning" type="warning" />,
      </MockTheme>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  test('calls alert close', () => {
    const close = jest.fn();
    render(
      <MockTheme>
        <BaseAlert message="Info" close={close} />
      </MockTheme>,
    );

    const closeButton = screen.getByTestId('alertClose');
    expect(closeButton).toBeTruthy();
    fireEvent.click(closeButton);
    expect(close).toHaveBeenCalledTimes(1);
  });
});
