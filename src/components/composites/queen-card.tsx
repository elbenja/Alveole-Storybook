import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface QueenCardProps {
  variant?: 'light' | 'dark';
  className?: string;
  children: ReactNode;
}

export function QueenCard({
  variant = 'light',
  className,
  children,
}: QueenCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center overflow-clip rounded-[var(--radius-card)] shadow-[0px_1px_3px_rgba(40,40,36,0.1),0px_1px_2px_-1px_rgba(40,40,36,0.1)]',
        variant === 'light' ? 'bg-[#f8f8f3]' : 'bg-[#282824]',
        className,
      )}
    >
      {children}
    </div>
  );
}
