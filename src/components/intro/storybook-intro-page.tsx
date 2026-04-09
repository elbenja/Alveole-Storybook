import { AlveoleLogo } from './alveole-logo';
import { BrandingCard } from './branding-card';
import { ColorSwatch } from './color-swatch';
import { HeroChapters } from './hero-chapters';

const brandColors = [
  { name: 'brand/yellow', value: '#FDFF91', swatch: '#FDFF91' },
  { name: 'brand/teal', value: '#006D6A', swatch: '#006D6A' },
  { name: 'brand/dark-teal', value: '#013331', swatch: '#013331' },
  { name: 'brand/ruby', value: '#3E1915', swatch: '#3E1915' },
  { name: 'brand/light-brown', value: '#533D32', swatch: '#533D32' },
  { name: 'neutral/black', value: '#2A2C29', swatch: '#2A2C29' },
  {
    name: 'neutral/white',
    value: '#FFFFFF',
    swatch: '#FFFFFF',
    border: '#d8d8cb',
  },
  { name: 'neutral/warm-gray', value: '#787664', swatch: '#787664' },
  { name: 'neutral/soft-gray', value: '#ECECE0', swatch: '#ECECE0' },
] as const;

export function StorybookIntroPage() {
  return (
    <main className="min-h-screen bg-[#f8f8f3] text-[#2a2c29]">
      <section className="px-5 py-5 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
        <div className="mx-auto overflow-hidden rounded-[32px] bg-[#013331] px-6 py-8 text-[#ecece0] sm:px-10 sm:py-12 lg:px-[4.5rem] lg:py-[4.5rem]">
          <div className="flex min-h-[32rem] flex-col justify-between gap-14">
            <AlveoleLogo color="#FDFF91" className="w-fit" />
            <div className="max-w-4xl space-y-8">
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#fdff91]">
                  Alveole Working Draft
                </p>
                <h1 className="max-w-[12ch] text-4xl font-semibold leading-tight tracking-[-0.05em] text-[#fdff91] sm:text-5xl lg:text-[4.25rem] lg:leading-[1.02]">
                  Design System Foundations
                </h1>
                <p className="max-w-3xl text-base leading-7 text-[#ecece0] sm:text-lg">
                  Source of truth for the Alveole visual system across brand
                  moments, reusable UI, and validation screens. This intro page
                  brings the core foundations into Storybook in a web-first
                  format.
                </p>
              </div>
              <HeroChapters />
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="max-w-3xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#006d6a]">
              Branding
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              A logo system built for bold moments and calm surfaces.
            </h2>
            <p className="text-base leading-7 text-[#533d32] sm:text-lg">
              The three core marks can be applied across high-contrast hero
              sections, compact brand signatures, and lighter editorial
              layouts. Each specimen below uses live colorable artwork rather
              than static screenshots.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            <BrandingCard
              eyebrow="Primary lockup"
              title="Logo"
              description="Preferred signature for bold brand moments and high-contrast placements."
              background="#013331"
              foreground="#ECECE0"
              accent="#FDFF91"
              specimen={<AlveoleLogo color="#FDFF91" className="scale-[1.15]" />}
            />
            <BrandingCard
              eyebrow="Brand mark"
              title="Icon"
              description="Compact hex mark for favicons, avatars, and minimal brand applications."
              background="#FDFF91"
              foreground="#013331"
              accent="#013331"
              specimen={
                <AlveoleLogo
                  variant="icon"
                  color="#2A2C29"
                  className="h-auto w-28"
                />
              }
            />
            <BrandingCard
              eyebrow="Secondary lockup"
              title="Wordmark"
              description="Lightweight signature for calm surfaces, supporting layouts, and editorial use."
              background="#F8F8F3"
              foreground="#2A2C29"
              accent="#FDFF91"
              bordered
              specimen={
                <AlveoleLogo
                  variant="wordmark"
                  color="#2A2C29"
                  className="h-auto w-56"
                />
              }
            />
          </div>
        </div>
      </section>

      <section className="px-5 pb-12 pt-4 sm:px-8 lg:px-10 lg:pb-16 lg:pt-6">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="max-w-3xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#006d6a]">
              Foundations
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Core brand and neutral colors
            </h2>
            <p className="text-base leading-7 text-[#533d32] sm:text-lg">
              A concise palette view for the colors that define Alveole&apos;s
              first impression, content contrast, and supporting surfaces
              across the system.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {brandColors.map((color) => (
              <ColorSwatch
                key={color.name}
                name={color.name}
                value={color.value}
                swatch={color.swatch}
                border={'border' in color ? color.border : undefined}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
