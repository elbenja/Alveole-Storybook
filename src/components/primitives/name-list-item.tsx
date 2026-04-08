import { CheckmarkBadge04Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { VoteToggle } from './vote-toggle';

interface NameListItemProps {
  rank: number;
  name: string;
  votes: number;
  voted?: boolean;
  voteDisabled?: boolean;
  onVoteToggle?: () => void;
}

export function NameListItem({
  rank,
  name,
  votes,
  voted = false,
  voteDisabled = false,
  onVoteToggle,
}: NameListItemProps) {
  return (
    <div className="flex items-center gap-3 p-2 border-b border-[#59594d]">
      <div className="flex items-center justify-center shrink-0 size-10 rounded-full">
        {rank === 1 ? (
          <HugeiconsIcon
            icon={CheckmarkBadge04Icon}
            size={16}
            className="text-[#f8f8f3]"
          />
        ) : (
          <span className="text-sm font-medium text-[#f8f8f3]">{rank}</span>
        )}
      </div>
      <span className="flex-1 min-w-0 text-lg font-semibold truncate text-[#f8f8f3]">
        {name}
      </span>
      <VoteToggle
        votes={votes}
        voted={voted}
        disabled={voteDisabled}
        onToggle={onVoteToggle}
      />
    </div>
  );
}
