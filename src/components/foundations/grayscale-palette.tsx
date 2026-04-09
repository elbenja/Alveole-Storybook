export interface GrayScaleColor {
  name: string;
  value: string;
  hex: string;
}

export function GrayscalePalette({
  colors,
}: {
  colors: GrayScaleColor[];
}) {
  return (
    <div className="space-y-6">
      <p className="text-base leading-7 text-[#533d32]">
        A comprehensive grayscale palette for content contrast, backgrounds,
        borders, and supporting surfaces across the Alveole system.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {colors.map((color) => (
          <div key={color.name} className="space-y-3">
            <div
              className="aspect-square rounded-[16px] border border-[#d8d8cb]"
              style={{ backgroundColor: color.value }}
            />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-[#2a2c29]">
                {color.name}
              </p>
              <p className="text-xs font-mono text-[#787664]">
                {color.hex}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
