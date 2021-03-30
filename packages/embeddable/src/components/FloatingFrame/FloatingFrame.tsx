/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { FloatingNotificationInboxArrow, Notification, useTheme } from '@magicbell/magicbell-react';
import { FloatingNotificationInboxProps } from '@magicbell/magicbell-react/dist/components/FloatingNotificationInbox';
import IFrame from '../IFrame';
import Popover from './Popover';

/**
 * Renders an iframe within a popover. Its position can be customized through the
 * optional `placement` property. The popover has a poiting arrow.
 *
 * @example
 * (props) => <FloatingFrame position="auto" {...props} />
 */
export default function FloatingFrame({
  isOpen,
  placement = 'auto',
  launcherRef,
  toggle,
  onNotificationClick,
  closeOnNotificationClick,
  closeOnClickOutside,
  ...props
}: FloatingNotificationInboxProps) {
  const theme = useTheme();
  const { header: headerTheme, footer: footerTheme, container: containerTheme } = theme;

  const handleNotificationClick = (notification: Notification) => {
    if (closeOnNotificationClick) toggle?.();

    if (onNotificationClick) onNotificationClick(notification);
    else if (notification.actionUrl) window.open(notification.actionUrl, '_self');
  };

  const handleClickOutside = () => {
    if (closeOnClickOutside) toggle?.();
  };

  return (
    <Popover isOpen={isOpen} onClickOutside={handleClickOutside} reference={launcherRef} placement={placement}>
      {(attrs) => (
        <div
          css={css`
            overflow: hidden !important;
            font-family: ${containerTheme.fontFamily} !important;
            background-color: ${containerTheme.backgroundColor} !important;
            color: ${containerTheme.textColor} !important;
            border-radius: ${headerTheme.borderRadius} ${footerTheme.borderRadius} !important;
            box-shadow: 0px 20px 25px rgba(84, 95, 111, 0.1), 0px 10px 10px rgba(84, 95, 111, 0.04) !important;
          `}
          {...attrs}
        >
          <IFrame onNotificationClick={handleNotificationClick} {...props} />
          <FloatingNotificationInboxArrow placement={attrs['data-placement']} />
        </div>
      )}
    </Popover>
  );
}
