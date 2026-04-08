import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { NameList } from '@/components/composites/name-list';
import { MOCK_SUGGESTIONS } from '@/data/mock-queen-names';

const meta: Meta<typeof NameList> = {
  title: 'Composites/NameList',
  component: NameList,
  decorators: [
    (Story) => (
      <div className="bg-[#282824] w-[336px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NameList>;

export const NoVotes: Story = {
  args: {
    suggestions: MOCK_SUGGESTIONS,
    votedIds: new Set<number>(),
    maxVotesReached: false,
    onVoteToggle: () => {},
  },
};

export const ThreeVotes: Story = {
  args: {
    suggestions: MOCK_SUGGESTIONS,
    votedIds: new Set([2, 4, 5]),
    maxVotesReached: true,
    onVoteToggle: () => {},
  },
};

export const Interactive: Story = {
  render: () => {
    const [votedIds, setVotedIds] = useState<Set<number>>(new Set());

    const handleToggle = (id: number) => {
      setVotedIds((prev) => {
        const next = new Set(prev);

        if (next.has(id)) {
          next.delete(id);
        } else if (next.size < 3) {
          next.add(id);
        }

        return next;
      });
    };

    return (
      <>
        <NameList
          suggestions={MOCK_SUGGESTIONS}
          votedIds={votedIds}
          maxVotesReached={votedIds.size >= 3}
          onVoteToggle={handleToggle}
        />
        {votedIds.size >= 3 ? (
          <p className="py-2 text-xs text-center text-border-success">
            You've used all 3 votes!
          </p>
        ) : null}
      </>
    );
  },
};
