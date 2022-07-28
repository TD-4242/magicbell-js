import React, { ReactNode } from 'react';
import { createContext, useContext, useMemo } from 'react';

import { darken } from '../lib/color';
import { merge } from '../lib/merge';
import { DeepPartial } from '../lib/types';
import { defaultTheme, IMagicBellTheme } from './Theme';

const MagicBellThemeContext = createContext<IMagicBellTheme>(defaultTheme);

type MagicBellProviderProps = {
  value: DeepPartial<IMagicBellTheme>;
  children: ReactNode;
};

export function MagicBellThemeProvider({
  value: partialTheme = {},
  ...props
}: MagicBellProviderProps) {
  const theme = useMemo(() => {
    const merged: IMagicBellTheme = merge(defaultTheme, partialTheme);

    // make notification unseen & unread state fallback to custom default state before falling back to default theme
    for (const variant of ['unseen', 'unread']) {
      merged.notification[variant] = merge(
        merged.notification[variant],
        partialTheme.notification?.default,
        partialTheme.notification?.[variant],
      );
    }

    // backwards compatibility for notification hover styles. We only compute hover styles if
    // the partially provided theme doesn't define them for any of the notification states.
    const hasDeclaredHoverStyles = ['default', 'unseen', 'unread'].some((variant) =>
      Boolean(partialTheme.notification?.[variant]?.hover),
    );

    if (!hasDeclaredHoverStyles) {
      for (const variant of ['default', 'unseen', 'unread']) {
        const current = merged.notification[variant];

        merged.notification[variant].hover = merge(
          {
            backgroundColor: darken(current.backgroundColor, 5),
            backgroundOpacity: 0.1,
          },
          partialTheme.notification?.default?.hover,
          partialTheme.notification?.[variant]?.hover,
        );
      }
    }

    // backwards compatibility for status styles. We only compute status style if
    // the partially provided theme doesn't define them for any of the notification states.
    const hasDeclaredStateStyles = ['default', 'unseen', 'unread'].some((variant) =>
      Boolean(partialTheme.notification?.[variant]?.state),
    );

    if (!hasDeclaredStateStyles) {
      for (const variant of ['default', 'unseen', 'unread']) {
        const current = merged.notification[variant];
        // note that default was technically `toRGBA(current.textColor, 0.5)`, but it also didn't show
        // the state dot back then, as it was hidden behind the menu button when the notification was read.
        // so this color differs, but the result is closer to the old behavior - don't show the dot -.
        const color = variant === 'default' ? 'transparent' : merged.header.backgroundColor;
        merged.notification[variant].state = merge(current.state, { color });
      }
    }

    // backwards compatibility for unseenBadge
    merged.unseenBadge.borderColor = partialTheme?.unseenBadge?.borderColor || 'transparent';

    // backwards compatibility for container
    merged.container.borderColor = partialTheme?.container?.borderColor || '';

    // backwards compatibility for banner style
    merged.banner = merge(
      merged.banner,
      {
        backgroundColor: merged.notification.unseen.backgroundColor,
        backgroundOpacity: 0.1,
        textColor: merged.notification.unseen.textColor,
        fontFamily: merged.footer.fontFamily,
        textAlign: merged.footer.textAlign,
        fontSize: merged.footer.fontSize,
      },
      partialTheme.banner,
    );

    return merged;
  }, [partialTheme]);

  return <MagicBellThemeContext.Provider value={theme} {...props} />;
}

export const useTheme = () => useContext(MagicBellThemeContext);

export default MagicBellThemeContext;
