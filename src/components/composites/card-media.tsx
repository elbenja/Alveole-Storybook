import { Crown02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CardMediaImageProps {
  type: 'image';
  src: string;
  alt: string;
}

interface CardMediaConfirmationProps {
  type: 'confirmation';
  submittedName: string;
}

interface CardMediaWinnerProps {
  type: 'winner';
  winnerName: string;
  votes: number;
}

type CardMediaProps = (
  | CardMediaImageProps
  | CardMediaConfirmationProps
  | CardMediaWinnerProps
) & {
  className?: string;
};

export function CardMedia(props: CardMediaProps) {
  const { className } = props;

  if (props.type === 'image') {
    return (
      <div
        className={cn(
          'relative w-full h-[240px] border border-[#d8d8cb] rounded-[4px] overflow-hidden',
          className,
        )}
      >
        <img
          src={props.src}
          alt={props.alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    );
  }

  if (props.type === 'confirmation') {
    return (
      <div
        className={cn(
          'w-full px-6 py-6 text-center border rounded-[4px] bg-bg-success-light-hover border-border-success',
          className,
        )}
      >
        <p className="text-base leading-[1.1] text-[#f8f8f3]">Your suggestion</p>
        <p className="mt-0.5 text-2xl leading-8 font-medium text-[#f8f8f3]">
          {props.submittedName}
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center gap-4 w-full h-[240px] border rounded-[4px] bg-warm-orange border-[#d8d8cb]',
        className,
      )}
    >
      <p className="font-light text-[30px] leading-9 text-brand-yellow">
        {props.winnerName}
      </p>
      <Badge className="gap-1 rounded-full border-[#d8d8cb] bg-transparent text-[#f8f8f3] text-xs font-semibold">
        <HugeiconsIcon icon={Crown02Icon} size={16} />
        Crowned with {props.votes} votes
      </Badge>
    </div>
  );
}
