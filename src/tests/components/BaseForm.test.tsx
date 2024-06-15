import BaseForm from '../../components/BaseForm';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

describe('BaseCard', () => {
  test('renders the component', () => {
    const onCancel = jest.fn();
    const onSubmit = jest.fn();
    const { baseElement } = render(
      <BaseForm
        fields={[
          {
            type: 'textfield',
            label: 'First name',
            key: 'firstname',
            error: jest.fn(),
          },
          {
            type: 'textfield',
            label: 'Last name',
            key: 'lastname',
            error: jest.fn(),
          },
          {
            type: 'textfield',
            label: 'Image Url',
            key: 'image',
            error: jest.fn(),
          },
          {
            type: 'datepicker',
            label: 'Date of Birth',
            key: 'birthday',
            error: jest.fn(),
          },
        ]}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />,
    );

    expect(baseElement).toMatchSnapshot();
  });
  test('calls onCancel and onSubmit', () => {
    const onCancel = jest.fn();
    const onSubmit = jest.fn();
    const { baseElement } = render(
      <BaseForm
        fields={[
          {
            type: 'textfield',
            label: 'First name',
            key: 'firstname',
            error: jest.fn(),
          },
          {
            type: 'textfield',
            label: 'Last name',
            key: 'lastname',
            error: jest.fn(),
          },
          {
            type: 'textfield',
            label: 'Image Url',
            key: 'image',
            error: jest.fn(),
          },
          {
            type: 'datepicker',
            label: 'Date of Birth',
            key: 'birthday',
            error: jest.fn(),
          },
        ]}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />,
    );
    const cancelButton = screen.getByText('Cancel');
    expect(cancelButton).toBeTruthy();
    fireEvent.click(cancelButton);
    expect(onCancel).toHaveBeenCalledTimes(1);

    const submitButton = screen.getByText('Submit');
    expect(submitButton).toBeTruthy();
    fireEvent.click(submitButton);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
