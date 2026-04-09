import React from 'react';
import type { Preview, StoryContext } from '@storybook/react-vite';
import { withThemeByClassName } from '@storybook/addon-themes';
import { useGlobals } from 'storybook/preview-api';
import { MINIMAL_VIEWPORTS } from 'storybook/viewport';

import '../src/index.css';

const alveoleViewports = {
  mobile: {
    name: 'Mobile',
    styles: { width: '375px', height: '812px' },
  },
  tablet: {
    name: 'Tablet',
    styles: { width: '768px', height: '1024px' },
  },
  desktop: {
    name: 'Desktop',
    styles: { width: '1440px', height: '900px' },
  },
};

const breakpointWidths: Record<string, string> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
};

function ScreensBreakpointDecorator(
  Story: React.ComponentType,
  context: StoryContext,
) {
  const [globals] = useGlobals();
  const bp = globals.screensBreakpoint as string | undefined;

  if (!context.title?.startsWith('Screens/')) {
    return <Story />;
  }

  const width = (bp && breakpointWidths[bp]) ?? '100%';

  return (
    <div
      style={{
        width,
        margin: '0 auto',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      <Story />
    </div>
  );
}

const preview: Preview = {
  globalTypes: {
    screensBreakpoint: {
      name: 'Screens Breakpoint',
      toolbar: {
        title: 'Screens Breakpoint',
        items: [
          {
            value: 'desktop',
            icon: 'monitor',
            title: 'Desktop (1440px)',
          },
          {
            value: 'tablet',
            icon: 'tablet',
            title: 'Tablet (768px)',
          },
          {
            value: 'mobile',
            icon: 'mobile',
            title: 'Mobile (375px)',
          },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    screensBreakpoint: 'desktop',
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Introduction', ['Overview']],
      },
    },
    viewport: {
      options: {
        ...MINIMAL_VIEWPORTS,
        ...alveoleViewports,
      },
    },
  },
  decorators: [
    ScreensBreakpointDecorator,
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
  tags: ['autodocs'],
};

export default preview;
