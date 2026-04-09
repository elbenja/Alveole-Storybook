import type { ReactNode } from 'react';

type BrandingCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  background: string;
  foreground: string;
  accent: string;
  specimen: ReactNode;
  bordered?: boolean;
};

export function BrandingCard({
  eyebrow,
  title,
  description,
  background,
  foreground,
  accent,
  specimen,
  bordered = false,
}: BrandingCardProps) {
  return (
    <article
      className="flex min-h-[26rem] flex-col rounded-[24px] p-7 shadow-[0px_1px_3px_rgba(40,40,36,0.1),0px_12px_32px_-18px_rgba(40,40,36,0.25)]"
      style={{
        background,
        color: foreground,
        border: bordered ? '1px solid #d8d8cb' : '1px solid transparent',
      }}
    >
      <p className="text-sm font-medium uppercase tracking-[0.08em] opacity-80">
        {eyebrow}
      </p>
      <h3 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.04em] leading-8">
        {title}
      </h3>
      <p className="mt-3 max-w-[30ch] text-base leading-6 opacity-90">
        {description}
      </p>
      <div className="mt-8 flex flex-1 items-center justify-center rounded-[20px] bg-white/5 px-6 py-8">
        {specimen}
      </div>
      <div className="mt-8 h-1 w-14 rounded-full" style={{ background: accent }} />
    </article>
  );
}
