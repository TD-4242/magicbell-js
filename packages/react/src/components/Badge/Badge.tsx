/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import { useTheme } from '../../context/MagicBellThemeContext';
import { toRGBA } from '../../lib/color';
import { cleanslate } from '../Styled';

export interface Props {
  count: number;
}

/**
 * Badge to display the number of unseen notifications. The color of the badge
 * can be customized through the theme context.
 *
 * @example
 * <Badge  />
 */
export default function Badge({ count }: Props) {
  const theme = useTheme();
  const { unseenBadge: badgeTheme } = theme;

  const style = css`
    align-items: center;
    background: ${toRGBA(badgeTheme.backgroundColor, badgeTheme.backgroundOpacity)} !important;
    border: 1px solid ${badgeTheme.borderColor} !important;
    border-radius: ${badgeTheme.borderRadius} !important;
    color: ${badgeTheme.textColor} !important;
    display: flex;
    font-family: ${badgeTheme.fontFamily} !important;
    font-size: ${badgeTheme.fontSize} !important;
    font-weight: ${badgeTheme.fontWeight} !important;
    padding: ${badgeTheme.padding} !important;
    text-align: ${badgeTheme.textAlign} !important;
    text-transform: ${badgeTheme.textTransform} !important;

    div {
      width: 100%;
    }
  `;

  return (
    <span css={[cleanslate, style]}>
      <div aria-label={`${count} unread items`} aria-live="polite" role="status">
        {count}
      </div>
    </span>
  );
}
