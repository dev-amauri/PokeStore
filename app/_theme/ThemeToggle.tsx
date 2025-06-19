'use client';

import { useThemeContext } from './ThemeProvider';
import { Icon } from '@iconify/react'

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme, mounted } = useThemeContext();

  // Avoid hydration errors
  if (!mounted) {
    return (
      <button
        className="w-10 h-10 rounded-lg flex items-center justify-center"
        aria-label="Cambiar tema"
      >
        <div className="w-5 h-5 rounded-full animate-pulse" />
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={toggleTheme}
        className="w-10 h-10 rounded-[999px] shadow-border transition-colors duration-200 flex items-center justify-center cursor-pointer"
        aria-label={`Cambiar a tema ${resolvedTheme === 'light' ? 'oscuro' : 'claro'}`}
      >
        {resolvedTheme === 'light' ? (
          <Icon icon="si:moon-duotone" className="w-5 h-5 " />
        ) : (
          <Icon icon="si:sun-duotone" className="w-5 h-5 " />
        )}
      </button>
    </div>
  );
}