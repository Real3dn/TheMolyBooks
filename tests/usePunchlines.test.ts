import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePunchlines } from '../src/hooks/usePunchlines';
import { CANONS } from '../src/data/canons';

describe('usePunchlines Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads default punchlines initially', () => {
    const { result } = renderHook(() => usePunchlines());
    expect(result.current.getPunchline('bible')).toBe(CANONS.bible.defaultPunchline);
    expect(result.current.getPunchline('aristotle')).toBe(CANONS.aristotle.defaultPunchline);
  });

  it('saves custom punchline to localStorage and updates state', () => {
    const { result } = renderHook(() => usePunchlines());
    act(() => {
      result.current.setPunchline('bible', 'Give me your phone number right now.');
    });
    expect(result.current.getPunchline('bible')).toBe('Give me your phone number right now.');
    expect(localStorage.getItem('app_bible_punchline')).toBe('Give me your phone number right now.');
  });

  it('resets to defaults cleanly', () => {
    const { result } = renderHook(() => usePunchlines());
    act(() => {
      result.current.setPunchline('aristotle', 'Custom text');
      result.current.resetToDefaults();
    });
    expect(result.current.getPunchline('aristotle')).toBe(CANONS.aristotle.defaultPunchline);
    expect(localStorage.getItem('app_aristotle_punchline')).toBeNull();
  });
});
