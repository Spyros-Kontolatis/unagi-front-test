import BaseCard from '../../components/BaseCard';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

describe('BaseCard', () => {
  test('renders the component', () => {
    const { baseElement } = render(
      <BaseCard
        imageUrl="test"
        title="Test"
        subtitle="Test"
        size="sm"
        action={{
          label: 'Action',
          handler: jest.fn(),
        }}
        loading={false}
        lazyLoading={true}
      />,
    );

    expect(baseElement).toMatchSnapshot();
  });
  test('renders the component with loading', () => {
    const { baseElement } = render(
      <BaseCard
        imageUrl="test"
        title="Test"
        subtitle="Test"
        size="sm"
        action={{
          label: 'Action',
          handler: jest.fn(),
        }}
        loading={true}
        lazyLoading={true}
      />,
    );

    expect(baseElement).toMatchSnapshot();
  });

  test('calls action handler', async () => {
    const action = {
      label: 'Action',
      handler: jest.fn(),
    };
    render(
      <BaseCard
        imageUrl="test"
        title="Test"
        subtitle="Test"
        size="sm"
        action={action}
        loading={false}
        lazyLoading={true}
      />,
    );

    const actionButton = screen.getByText('Action');
    expect(actionButton).toBeTruthy();
    await fireEvent.click(actionButton);
    expect(action.handler).toHaveBeenCalledTimes(1);
  });
});
