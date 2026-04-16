import { useState, useMemo } from 'react';
import type { Character, FilterState } from '@/types';

export function useCharacterFilter(characters: Character[]) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    sort: 'popular-month',
    gender: 'female',
    style: 'any',
    age: 'any',
    tags: ['All'],
  });

  const filteredCharacters = useMemo(() => {
    let result = [...characters];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (char) =>
          char.name.toLowerCase().includes(searchLower) ||
          char.description.toLowerCase().includes(searchLower) ||
          char.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    // Tag filter
    if (filters.tags.length > 0 && !filters.tags.includes('All')) {
      result = result.filter((char) =>
        filters.tags.some((tag) =>
          char.tags.some((charTag) =>
            charTag.toLowerCase() === tag.toLowerCase()
          )
        )
      );
    }

    // Sort
    switch (filters.sort) {
      case 'popular-month':
      case 'popular-week':
      case 'popular-day':
        result.sort((a, b) => {
          const aViews = parseFloat(a.views.replace(/[kM]/g, '')) * (a.views.includes('M') ? 1000 : a.views.includes('k') ? 1 : 0.001);
          const bViews = parseFloat(b.views.replace(/[kM]/g, '')) * (b.views.includes('M') ? 1000 : b.views.includes('k') ? 1 : 0.001);
          return bViews - aViews;
        });
        break;
      case 'newest':
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case 'oldest':
        result.sort((a, b) => parseInt(a.id) - parseInt(b.id));
        break;
    }

    return result;
  }, [characters, filters]);

  const setSearch = (search: string) =>
    setFilters((prev: FilterState) => ({ ...prev, search }));

  const setSort = (sort: string) =>
    setFilters((prev: FilterState) => ({ ...prev, sort }));

  const setGender = (gender: string) =>
    setFilters((prev: FilterState) => ({ ...prev, gender }));

  const setStyle = (style: string) =>
    setFilters((prev: FilterState) => ({ ...prev, style }));

  const setAge = (age: string) =>
    setFilters((prev: FilterState) => ({ ...prev, age }));

  const toggleTag = (tag: string) => {
    setFilters((prev: FilterState) => {
      if (tag === 'All') {
        return { ...prev, tags: ['All'] };
      }

      const newTags = prev.tags.includes(tag)
        ? prev.tags.filter((t: string) => t !== tag)
        : [...prev.tags.filter((t: string) => t !== 'All'), tag];

      return {
        ...prev,
        tags: newTags.length === 0 ? ['All'] : newTags,
      };
    });
  };

  return {
    filters,
    filteredCharacters,
    setSearch,
    setSort,
    setGender,
    setStyle,
    setAge,
    toggleTag,
  };
}
