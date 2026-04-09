import { useRef } from 'react';
import LottieImport, { type LottieRefCurrentProps } from 'lottie-react';

// Handle ESM/CJS interop — lottie-react may double-wrap its default export
const Lottie =
  (LottieImport as unknown as { default: typeof LottieImport }).default ??
  LottieImport;

import { cn } from '@/lib/utils';

interface LottieBackgroundProps {
  animationData: Record<string, unknown>;
  className?: string;
  blendMode?: 'normal' | 'screen';
  hoverToPlay?: boolean;
}

export function LottieBackground({
  animationData,
  className,
  blendMode = 'normal',
  hoverToPlay = false,
}: LottieBackgroundProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  return (
    <div
      className={cn(
        'absolute inset-0 overflow-hidden pointer-events-none',
        className,
      )}
      style={{ mixBlendMode: blendMode }}
      onMouseEnter={() => {
        if (hoverToPlay) {
          lottieRef.current?.play();
        }
      }}
      onMouseLeave={() => {
        if (hoverToPlay) {
          lottieRef.current?.pause();
        }
      }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        autoplay={!hoverToPlay}
        className="w-full h-full"
        style={{ pointerEvents: hoverToPlay ? 'auto' : 'none' }}
      />
    </div>
  );
}
