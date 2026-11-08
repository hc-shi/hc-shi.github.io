import { MoonIcon, SunIcon } from "@/components/Icons";

// Light/dark switch (option A, chosen 2026-11-08). The inline script from lib/theme.ts switches the
// theme for every [data-theme-toggle]; this markup only shows what a click will do, swapping by
// `dark:`. The negative margin gives a 32px tap target without moving the nav.
export function ThemeToggle() {
  return (
    <button
      type="button"
      data-theme-toggle
      className="-m-[9px] inline-flex cursor-pointer items-center self-center p-[9px] text-faint hover:text-acc"
    >
      <MoonIcon className="h-[14px] w-[14px] dark:hidden" />
      <SunIcon className="hidden h-[14px] w-[14px] dark:block" />
      <span className="sr-only dark:hidden">Switch to dark mode</span>
      <span className="sr-only hidden dark:inline">Switch to light mode</span>
    </button>
  );
}
