import BaseCard from '../../components/BaseCard';
import MockTheme from '../../themes/MockTheme';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

describe('BaseCard', () => {
  test('renders the component', () => {
    const { baseElement } = render(
      <MockTheme>
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
        />
      </MockTheme>,
    );

    expect(baseElement).toMatchSnapshot();
  });
  test('renders the component with loading', () => {
    const { baseElement } = render(
      <MockTheme>
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
        />
      </MockTheme>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  test('calls action handler', () => {
    const action = {
      label: 'Action',
      handler: jest.fn(),
    };
    render(
      <MockTheme>
        <BaseCard
          imageUrl="test"
          title="Test"
          subtitle="Test"
          size="sm"
          action={action}
          loading={false}
          lazyLoading={true}
        />
      </MockTheme>,
    );

    const actionButton = screen.getByText('Action');
    expect(actionButton).toBeTruthy();
    fireEvent.click(actionButton);
    expect(action.handler).toHaveBeenCalledTimes(1);
  });
});
