import BaseAlert from '../../components/BaseAlert';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

describe('BaseAlert', () => {
  test('renders the component', () => {
    const { baseElement } = render(<BaseAlert message="Info" />);

    expect(baseElement).toMatchSnapshot();
  });

  test('renders the component as success', () => {
    const { baseElement } = render(
      <BaseAlert message="Success" type="success" />,
    );

    expect(baseElement).toMatchSnapshot();
  });

  test('renders the component as error', () => {
    const { baseElement } = render(<BaseAlert message="Error" type="error" />);

    expect(baseElement).toMatchSnapshot();
  });

  test('renders the component as warning', () => {
    const { baseElement } = render(
      <BaseAlert message="Warning" type="warning" />,
    );

    expect(baseElement).toMatchSnapshot();
  });

  test('calls alert close', async () => {
    const close = jest.fn();
    render(<BaseAlert message="Info" close={close} />);

    const closeButton = screen.getByTestId('alertClose');
    expect(closeButton).toBeTruthy();
    await fireEvent.click(closeButton);
    expect(close).toHaveBeenCalledTimes(1);
  });
});
