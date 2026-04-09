const chapters = [
  '01 Foundations',
  '02 Typography',
  '03 Layout',
  '04 Components',
  '05 Patterns',
  '06 Screens',
] as const;

export function HeroChapters() {
  return (
    <div
      className="flex flex-wrap gap-3"
      aria-label="Storybook design system chapters"
    >
      {chapters.map((chapter) => (
        <span
          key={chapter}
          className="rounded-full bg-[#006d6a] px-4 py-2 text-xs font-semibold tracking-[0.01em] text-[#fdff91]"
        >
          {chapter}
        </span>
      ))}
    </div>
  );
}
