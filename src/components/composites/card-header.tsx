import type { ReactNode } from 'react';

import { LottieBackground } from '@/components/primitives/lottie-background';
import { cn } from '@/lib/utils';

interface CardHeaderProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  variant?: 'light' | 'dark';
  lottieData?: Record<string, unknown>;
  lottieBlendMode?: 'normal' | 'screen';
  lottieHoverToPlay?: boolean;
  iconBorderColor?: string;
}

export function CardHeader({
  icon,
  title,
  subtitle,
  variant = 'light',
  lottieData,
  lottieBlendMode = 'normal',
  lottieHoverToPlay = false,
  iconBorderColor,
}: CardHeaderProps) {
  const isLight = variant === 'light';

  return (
    <div
      className={cn(
        'relative flex flex-col items-center gap-4 w-full px-3 py-12',
        isLight && 'bg-gradient-to-b from-[var(--algray-200)] to-[var(--algray-50)]',
      )}
    >
      {lottieData ? (
        <LottieBackground
          animationData={lottieData}
          blendMode={lottieBlendMode}
          hoverToPlay={lottieHoverToPlay}
        />
      ) : null}
      <div
        className={cn(
          'relative z-10 flex items-center p-4 rounded-full shadow-[0px_1px_3px_rgba(40,40,36,0.1),0px_1px_2px_rgba(40,40,36,0.1)]',
          isLight ? 'bg-white' : 'border-[1.333px]',
          !isLight && !iconBorderColor && 'border-[#f8f8f3]',
        )}
        style={
          iconBorderColor
            ? {
                borderColor: iconBorderColor,
                borderWidth: '1.333px',
                borderStyle: 'solid',
              }
            : undefined
        }
      >
        {icon}
      </div>
      <div className="relative z-10 flex flex-col gap-2 text-center w-[312px]">
        <h3
          className={cn(
            'font-light text-2xl leading-8',
            isLight ? 'text-foreground-accent' : 'text-brand-yellow',
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            'text-base leading-[1.1]',
            isLight ? 'text-foreground' : 'text-[#f8f8f3]',
          )}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
