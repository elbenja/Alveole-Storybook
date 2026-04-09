import { useState } from 'react';
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ChampionIcon,
  CheckmarkBadge04Icon,
  Crown02Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import celebrationAnimation from '@/assets/lottie/celebration.json';
import cloudsAnimation from '@/assets/lottie/clouds.json';
import { CardHeader } from '@/components/composites/card-header';
import { CardMedia } from '@/components/composites/card-media';
import { NameList } from '@/components/composites/name-list';
import { QueenCard } from '@/components/composites/queen-card';
import { LottieBackground } from '@/components/primitives/lottie-background';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  MAX_VOTES,
  MOCK_SUGGESTIONS,
  USER_SUBMITTED_NAME,
  WINNER,
  type QueenSuggestion,
} from '@/data/mock-queen-names';

type FlowStep = 'INPUT' | 'SUBMITTED' | 'VOTING' | 'WINNER';

interface NameTheQueenProps {
  initialStep?: FlowStep;
}

export function NameTheQueen({ initialStep = 'INPUT' }: NameTheQueenProps) {
  const [step, setStep] = useState<FlowStep>(initialStep);
  const [nameInput, setNameInput] = useState(
    initialStep === 'INPUT' ? '' : USER_SUBMITTED_NAME,
  );
  const [submittedName, setSubmittedName] = useState(USER_SUBMITTED_NAME);
  const [error, setError] = useState('');
  const [votedIds, setVotedIds] = useState<Set<number>>(new Set());
  const [suggestions] = useState<QueenSuggestion[]>(MOCK_SUGGESTIONS);
  const [showMaxVotesMsg, setShowMaxVotesMsg] = useState(false);
  const [shakeInput, setShakeInput] = useState(false);

  const maxVotesReached = votedIds.size >= MAX_VOTES;
  const isLight = step === 'INPUT' || step === 'WINNER';

  const handleSubmitName = () => {
    if (!nameInput.trim()) {
      setError('Please enter a name');
      setShakeInput(true);
      window.setTimeout(() => setShakeInput(false), 300);
      return;
    }

    setSubmittedName(nameInput.trim());
    setStep('SUBMITTED');
    setError('');
  };

  const handleVoteToggle = (id: number) => {
    setVotedIds((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
        setShowMaxVotesMsg(false);
        return next;
      }

      if (next.size < MAX_VOTES) {
        next.add(id);
        if (next.size === MAX_VOTES) {
          setShowMaxVotesMsg(true);
        }
      }

      return next;
    });
  };

  return (
    <QueenCard variant={isLight ? 'light' : 'dark'} className="w-full h-full">
      {step === 'INPUT' ? (
        <>
          <div className="w-full">
            <CardHeader
              icon={
                <HugeiconsIcon
                  icon={Crown02Icon}
                  size={32}
                  className="text-foreground-accent"
                />
              }
              title="Name the Queen"
              subtitle="Our hive has a new queen - help us give her a royal name."
              variant="light"
              lottieData={cloudsAnimation}
              lottieHoverToPlay
            />
            <CardMedia
              type="image"
              src="/name-the-queen-input.jpg.jpg"
              alt="Honey bees on honeycomb"
            />
          </div>
          <div className="flex flex-col gap-[22px] w-full px-3 py-6">
            <div className="flex flex-col gap-1">
              <Input
                placeholder="Suggest a royal name..."
                value={nameInput}
                onChange={(event) => {
                  setNameInput(event.target.value);
                  if (error) {
                    setError('');
                  }
                }}
                className={`bg-[#f8f8f3] border-[#d8d8cb] rounded-[var(--radius-input)] text-lg h-12 ${
                  shakeInput ? 'animate-shake' : ''
                } ${error ? 'border-destructive' : ''}`}
              />
              {error ? <p className="text-sm text-destructive">{error}</p> : null}
            </div>
            <Button
              onClick={handleSubmitName}
              disabled={!nameInput.trim()}
              className="h-12 w-full text-lg font-medium rounded-[var(--radius-button)] bg-brand-yellow text-foreground-accent hover:bg-brand-yellow/90 disabled:opacity-50"
            >
              Continue
              <HugeiconsIcon icon={ArrowRight01Icon} size={24} />
            </Button>
            <Button
              variant="ghost"
              onClick={() => setStep('VOTING')}
              className="text-base font-medium text-foreground"
            >
              View submitted names
            </Button>
          </div>
        </>
      ) : null}

      {step === 'SUBMITTED' ? (
        <>
          <div className="w-full py-6">
            <CardHeader
              icon={
                <HugeiconsIcon
                  icon={CheckmarkBadge04Icon}
                  size={32}
                  className="text-border-success"
                />
              }
              title="Name Submitted!"
              subtitle="Your suggestion has been added to the hive."
              variant="dark"
              iconBorderColor="#059669"
            />
            <CardMedia type="confirmation" submittedName={submittedName} />
          </div>
          <div className="flex flex-col w-full px-3 py-6">
            <Button
              onClick={() => setStep('VOTING')}
              className="h-12 w-full text-lg font-medium rounded-[var(--radius-button)] bg-brand-yellow text-[#282824] hover:bg-brand-yellow/90"
            >
              {'\uD83D\uDC1D View All Names & Votes'}
              <HugeiconsIcon icon={ArrowRight01Icon} size={24} />
            </Button>
          </div>
        </>
      ) : null}

      {step === 'VOTING' ? (
        <>
          <div className="w-full py-6">
            <div className="flex flex-col items-center gap-6 px-3 py-10">
              <div className="flex items-center justify-center size-16 rounded-full border-[1.333px] border-[#f8f8f3]">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  className="text-[#f8f8f3]"
                >
                  <rect
                    x="13"
                    y="4"
                    width="6"
                    height="23"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="5"
                    y="15"
                    width="6"
                    height="12"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="21"
                    y="9"
                    width="6"
                    height="18"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="4"
                    y1="27"
                    x2="28"
                    y2="27"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-2 text-center w-full">
                <h3 className="font-light text-2xl leading-8 text-brand-yellow">
                  Queen Name Suggestions
                </h3>
                <p className="text-base leading-[1.1] text-[#f8f8f3]">
                  Upvote your favorites! The most popular name wins
                </p>
              </div>
            </div>
            <NameList
              suggestions={suggestions}
              votedIds={votedIds}
              maxVotesReached={maxVotesReached}
              onVoteToggle={handleVoteToggle}
            />
          </div>
          <div className="flex flex-col items-center gap-2 w-full py-8">
            {showMaxVotesMsg ? (
              <p className="text-xs text-border-success">
                You've used all 3 votes!
              </p>
            ) : null}
            <Button
              variant="ghost"
              onClick={() => setStep('WINNER')}
              className="text-base font-medium text-[#f8f8f3]"
            >
              Reveal the winner
            </Button>
          </div>
        </>
      ) : null}

      {step === 'WINNER' ? (
        <>
          <div className="w-full">
            <div className="relative flex flex-col items-center gap-4 w-full px-3 py-12 bg-gradient-to-b from-[var(--algray-200)] to-[var(--algray-50)]">
              <LottieBackground
                animationData={celebrationAnimation}
                blendMode="screen"
              />
              <div className="relative z-10 flex items-center p-4 rounded-full bg-white shadow-[0px_1px_3px_rgba(40,40,36,0.1),0px_1px_2px_rgba(40,40,36,0.1)]">
                <HugeiconsIcon
                  icon={ChampionIcon}
                  size={32}
                  className="text-foreground-accent"
                />
              </div>
              <div className="relative z-10 flex flex-col gap-2 text-center w-[312px]">
                <h3 className="font-light text-2xl leading-8 text-foreground-accent">
                  All Hail the Queen
                </h3>
                <p className="text-base leading-[1.1] text-foreground">
                  The hive has spoken. Our queen&apos;s name is...
                </p>
              </div>
            </div>
            <CardMedia
              type="winner"
              winnerName={WINNER.name}
              votes={WINNER.votes}
            />
          </div>
          <div className="flex flex-col w-full px-3 py-6">
            <Button
              variant="ghost"
              onClick={() => setStep('VOTING')}
              className="text-base font-medium opacity-50 text-foreground-accent"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
              Back to suggestions
            </Button>
          </div>
        </>
      ) : null}
    </QueenCard>
  );
}
