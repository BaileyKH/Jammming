import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar'; 

describe('SearchBar Component', () => {
  it('allows a search term to be input and used for search', () => {
    const onSearchMock = vi.fn();
    const { getByPlaceholderText, getByText } = render(<SearchBar onSearch={onSearchMock} />);

    const searchInput = getByPlaceholderText('What song are you looking for?');
    fireEvent.change(searchInput, { target: { value: 'Imagine Dragons' } });

    expect(searchInput.value).toBe('Imagine Dragons');

    fireEvent.keyUp(searchInput, { key: 'Enter', code: 'Enter' });

    expect(onSearchMock).toHaveBeenCalledWith('Imagine Dragons');

    onSearchMock.mockClear();

    const searchButton = getByText('Search');
    fireEvent.click(searchButton);

    expect(onSearchMock).toHaveBeenCalledWith('Imagine Dragons');
  });
});
