'use client';

import { useThemeContext } from './ThemeProvider';
import { Icon } from '@iconify/react'
import useSound from 'use-sound';

export function ThemeToggle({ isMobile }: { isMobile: boolean }) {
  const { resolvedTheme, toggleTheme, mounted } = useThemeContext();
  const [playOn] = useSound("/sounds/switch-on.mp3", {
    volume: 0.50,
  });

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
        className={`shadow-border transition-colors duration-200 flex  cursor-pointer hover:bg-border ${isMobile ? 'w-full h-10 p-2 rounded-lg' : 'w-10 h-10 rounded-[999px] justify-center items-center'}`}
        onMouseDown={() => playOn()}
      >
        {resolvedTheme === 'light' ? (
          <div className='flex items-center gap-2'>
            <Icon icon="si:moon-duotone" className="w-7 h-7 " />
            {isMobile && <span className='text-sm font-medium'>Dark</span>}
          </div>
        ) : (
          <div className='flex items-center gap-2'>
            <Icon icon="si:sun-duotone" className="w-7 h-7 " />
            {isMobile && <span className='text-sm font-medium'>Light</span>}
          </div>
        )}
      </button>
    </div>
  );
}