'use client';

import { useState, useEffect, useRef } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  const lastSystemTheme = useRef<'light' | 'dark'>('light');

  // In the first render detect the theme ----------------------------
  useEffect(() => {
    setMounted(true);
    // Get the theme saved in the localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    const initialTheme = savedTheme || 'system';
    // Save the current system theme
    lastSystemTheme.current = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme(initialTheme);
    updateResolvedTheme(initialTheme);
  }, []);


  // UseEffect to handle changes in the theme is systemm --------------
  useEffect(() => {
    if (mounted && theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const systemTheme = mediaQuery.matches ? 'dark' : 'light';
      setResolvedTheme(systemTheme);
      applyTheme(systemTheme);
    }
  }, [mounted, theme]);


  // UseEffect to handle changes in the system --------------------
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      const currentSystemTheme = mediaQuery.matches ? 'dark' : 'light';

      // Detect changes in the browser
      if (currentSystemTheme !== lastSystemTheme.current && theme !== 'system') {
        setTheme('system');
        localStorage.setItem('theme', 'system');
        setResolvedTheme(currentSystemTheme);
        applyTheme(currentSystemTheme);
      } else if (theme === 'system') {
        setResolvedTheme(currentSystemTheme);
        applyTheme(currentSystemTheme);
      }

      lastSystemTheme.current = currentSystemTheme;
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const updateResolvedTheme = (newTheme: Theme) => {
    let resolved: 'light' | 'dark';

    if (newTheme === 'system') {
      // Use the system preferences
      resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      // Use the manual theme
      resolved = newTheme;
    }

    setResolvedTheme(resolved);
    applyTheme(resolved);
  };

  const applyTheme = (themeToApply: 'light' | 'dark') => {
    const root = document.documentElement;

    if (themeToApply === 'dark') {
      root.style.setProperty('--background', '#0a0a0a');
      root.style.setProperty('--foreground', '#ededed');
      root.style.setProperty('--card', '#1a1a1a');
      root.style.setProperty('--card-foreground', '#ededed');
      root.style.setProperty('--border', '#374151');
      root.style.setProperty('--muted', '#1f2937');
      root.style.setProperty('--muted-foreground', '#9ca3af');
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.style.setProperty('--background', '#ffffff');
      root.style.setProperty('--foreground', '#171717');
      root.style.setProperty('--card', '#ffffff');
      root.style.setProperty('--card-foreground', '#171717');
      root.style.setProperty('--border', '#e5e7eb');
      root.style.setProperty('--muted', '#f9fafb');
      root.style.setProperty('--muted-foreground', '#6b7280');
      root.classList.remove('dark');
      root.classList.add('light');
    }
  };

  const setThemeMode = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    updateResolvedTheme(newTheme);
  };

  const toggleTheme = () => {
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      const oppositeTheme = systemTheme === 'light' ? 'dark' : 'light';
      setThemeMode(oppositeTheme);
    } else {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setThemeMode(newTheme);
    }
  };

  return {
    theme,
    resolvedTheme,
    setTheme: setThemeMode,
    toggleTheme,
    mounted
  };
}