/* eslint-disable */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import BlogForm from '../../src/components/BlogForm';

describe('<BlogForm/>', () => {
  test('Inputs are filled', async () => {
    render(<BlogForm />);

    const user = userEvent.setup();
    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[0], 'Test');
    await user.type(inputs[1], 'Tester');
    await user.type(inputs[2], 'test.com');

    expect(inputs[0]).toBeDefined();
    expect(inputs[1]).toBeDefined();
    expect(inputs[2]).toBeDefined();
  });
});
