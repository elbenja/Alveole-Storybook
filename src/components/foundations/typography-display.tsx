export interface TypographyVariant {
  name: string;
  level?: string;
  weight: string;
  size: string;
  lineHeight: string;
  sample: string;
}

export interface TypographyCategory {
  label: string;
  description?: string;
  variants: TypographyVariant[];
}

export function TypographyDisplay({
  categories,
}: {
  categories: TypographyCategory[];
}) {
  const getHeadingClass = (size: string) => {
    const sizeMap: Record<string, string> = {
      '48px': 'text-[48px] leading-[48px]',
      '30px': 'text-[30px] leading-[36px]',
      '24px': 'text-[24px] leading-[32px]',
      '20px': 'text-[20px] leading-[28px]',
    };
    return sizeMap[size] || '';
  };

  const getTextClass = (size: string, lineHeight: string) => {
    const sizeMap: Record<string, string> = {
      '12px': 'text-[12px]',
      '14px': 'text-[14px]',
      '16px': 'text-[16px]',
      '18px': 'text-[18px]',
      '20px': 'text-[20px]',
      '24px': 'text-[24px]',
      '30px': 'text-[30px]',
      '36px': 'text-[36px]',
    };
    const lineHeightMap: Record<string, string> = {
      '16px': 'leading-[16px]',
      '20px': 'leading-[20px]',
      '24px': 'leading-[24px]',
      '28px': 'leading-[28px]',
      '32px': 'leading-[32px]',
      '36px': 'leading-[36px]',
      '40px': 'leading-[40px]',
      '48px': 'leading-[48px]',
    };
    return `${sizeMap[size] || ''} ${lineHeightMap[lineHeight] || ''}`;
  };

  const getWeightClass = (weight: string) => {
    const weightMap: Record<string, string> = {
      Light: 'font-light',
      Regular: 'font-normal',
      Medium: 'font-medium',
      'Semi Bold': 'font-semibold',
    };
    return weightMap[weight] || 'font-normal';
  };

  return (
    <div className="space-y-12">
      {categories.map((category) => (
        <div key={category.label} className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-[#3e1915]">
              {category.label}
            </h3>
            {category.description && (
              <p className="text-base leading-7 text-[#533d32]">
                {category.description}
              </p>
            )}
          </div>

          <div className="space-y-4">
            {category.variants.map((variant) => (
              <div
                key={variant.name}
                className="flex items-baseline gap-6 rounded-lg bg-[#f8f8f3] p-4"
              >
                <div
                  className={`flex-shrink-0 text-[#2a2c29] ${
                    variant.level
                      ? getHeadingClass(variant.size)
                      : getTextClass(variant.size, variant.lineHeight)
                  } ${getWeightClass(variant.weight)}`}
                >
                  {variant.sample}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-[#2a2c29]">
                    {variant.name}
                    {variant.level && ` · ${variant.level}`}
                  </p>
                  <p className="text-xs text-[#787664]">
                    {variant.weight} · {variant.size}/{variant.lineHeight}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
