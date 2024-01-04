/* eslint-disable */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Blog from '../../src/components/Blog';

describe('<Blog/>', () => {
  const blog = {
    title: 'Testing Blog',
    author: 'Tester',
    url: 'test.com',
    likes: 10,
  };

  test('Renders title at start', async () => {
    render(<Blog blog={blog} />);

    const title = await screen.findByText('Testing Blog');
    expect(title).toBeDefined();
  });

  test('Does not render author, url or likes at start', () => {
    render(<Blog blog={blog} />);

    const author = screen.queryByText('author: Tester');
    const url = screen.queryByText('URL: test.com');
    const likes = screen.queryByText('Liked 10 times');

    expect(author).not.toBeVisible();
    expect(url).not.toBeVisible();
    expect(likes).not.toBeVisible();
  });

  test('Renders author, url and likes after clicking details button', async () => {
    render(<Blog blog={blog} />);

    const user = userEvent.setup();
    const button = screen.getByText('Show details');
    await user.click(button);

    const author = await screen.findByText('author: Tester');
    const url = await screen.findByText('URL: test.com');
    const likes = await screen.findByText('Liked 10 times');

    expect(author).toBeVisible();
    expect(url).toBeVisible();
    expect(likes).toBeVisible();
  });

  test('Hides author, url and likes after clicking hide button', async () => {
    render(<Blog blog={blog} />);

    const user = userEvent.setup();
    const show = screen.getByText('Show details');
    const hide = screen.getByText('Hide details');
    await user.click(show);
    await user.click(hide);

    const author = screen.queryByText('author: Tester');
    const url = screen.queryByText('URL: test.com');
    const likes = screen.queryByText('Liked 10 times');

    expect(author).not.toBeVisible();
    expect(url).not.toBeVisible();
    expect(likes).not.toBeVisible();
  });

  test('Like button is called twice', async () => {
    const handleLike = jest.fn();

    render(<Blog blog={blog} handleLike={handleLike} />);

    const user = userEvent.setup();
    const show = screen.getByText('Show details');
    await user.click(show);

    const like = screen.getByText('Like');
    await user.click(like);
    await user.click(like);

    expect(handleLike.mock.calls).toHaveLength(2);
  });
});
