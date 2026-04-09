type ColorSwatchProps = {
  name: string;
  value: string;
  swatch: string;
  border?: string;
};

export function ColorSwatch({
  name,
  value,
  swatch,
  border = 'transparent',
}: ColorSwatchProps) {
  return (
    <div className="space-y-3">
      <div
        className="aspect-square rounded-[20px]"
        style={{ background: swatch, border: `1px solid ${border}` }}
        aria-hidden="true"
      />
      <div className="space-y-1">
        <p className="text-sm font-semibold text-[#2a2c29]">{name}</p>
        <p className="text-xs text-[#787664]">{value}</p>
      </div>
    </div>
  );
}
