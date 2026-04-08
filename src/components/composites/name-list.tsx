import { NameListItem } from '@/components/primitives/name-list-item';
import type { QueenSuggestion } from '@/data/mock-queen-names';

interface NameListProps {
  suggestions: QueenSuggestion[];
  votedIds: Set<number>;
  maxVotesReached: boolean;
  onVoteToggle: (id: number) => void;
}

export function NameList({
  suggestions,
  votedIds,
  maxVotesReached,
  onVoteToggle,
}: NameListProps) {
  const sorted = [...suggestions].sort((a, b) => b.votes - a.votes);

  return (
    <div className="flex flex-col w-full">
      {sorted.map((suggestion, index) => (
        <NameListItem
          key={suggestion.id}
          rank={index + 1}
          name={suggestion.name}
          votes={suggestion.votes}
          voted={votedIds.has(suggestion.id)}
          voteDisabled={maxVotesReached && !votedIds.has(suggestion.id)}
          onVoteToggle={() => onVoteToggle(suggestion.id)}
        />
      ))}
    </div>
  );
}
