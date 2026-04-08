import { ArrowUp02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { cn } from '@/lib/utils';

interface VoteToggleProps {
  votes: number;
  voted?: boolean;
  disabled?: boolean;
  onToggle?: () => void;
}

export function VoteToggle({
  votes,
  voted = false,
  disabled = false,
  onToggle,
}: VoteToggleProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onToggle}
      className={cn(
        'flex items-center gap-2 h-10 px-3 py-2 rounded-[4px] border text-sm font-medium transition-colors',
        voted
          ? 'bg-bg-success-light border-border-success text-border-success'
          : 'border-[#59594d] text-brand-yellow hover:border-brand-yellow/50',
        disabled && !voted && 'opacity-50 cursor-not-allowed',
      )}
    >
      <HugeiconsIcon icon={ArrowUp02Icon} size={16} />
      <span>{votes}</span>
    </button>
  );
}
