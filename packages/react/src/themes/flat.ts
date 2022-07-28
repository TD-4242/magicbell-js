import { IMagicBellTheme } from '../context/Theme';
import { DeepPartial } from '../lib/types';
import { fonts } from './light';

const colors = {
  bg: '#FFFFFF',
  caption: '#15091F',
  text: '#3A424D',
  stroke: '#EFEEF1',
  accent: '#5225C1',
  badge: '#F80808',
  bgHighlight: '#F7F6F9',
  bgActive: '#F0EDF8',
  transparent: 'transparent',
};

const headerFooterProps: DeepPartial<IMagicBellTheme['header'] & IMagicBellTheme['footer']> = {
  backgroundColor: colors.bg,
  borderRadius: '8px',
  textColor: colors.accent,
  borderColor: colors.stroke,
};

export const flatTheme: DeepPartial<IMagicBellTheme> = {
  prose: {
    headings: colors.caption,
    links: colors.caption,
    bold: colors.caption,
    hr: colors.stroke,
    quotes: colors.text,
    quoteBorders: colors.stroke,
    captions: colors.caption,
    code: colors.text,
    preCode: colors.stroke,
    preBg: colors.text,
    thBorders: colors.stroke,
    tdBorders: colors.stroke,
    buttonBorders: colors.text,
    buttons: colors.caption,
  },
  icon: {
    borderColor: colors.accent,
  },
  header: headerFooterProps,
  footer: headerFooterProps,
  banner: {
    backgroundColor: colors.bgHighlight,
    backgroundOpacity: 1,
    textColor: colors.text,
    fontFamily: fonts.sans,
    textAlign: 'left',
    fontSize: '12px',
    boxShadow: `inset 0 1px 0 0 ${colors.stroke}`,
  },
  unseenBadge: {
    backgroundColor: colors.badge,
  },
  container: {
    backgroundColor: colors.bg,
    textColor: colors.text,
    boxShadow: 'none',
    borderColor: colors.accent,
  },
  notification: {
    default: {
      backgroundColor: colors.bg,
      borderRadius: '0',
      textColor: colors.text,
      margin: '0',
      title: {
        textColor: colors.caption,
      },
      hover: {
        backgroundColor: colors.bgActive,
        backgroundOpacity: 1,
      },
      state: {
        color: colors.transparent,
      },
    },
    unread: {
      backgroundColor: colors.bgHighlight,
      hover: {
        backgroundColor: colors.bgActive,
      },
      state: {
        color: colors.accent,
      },
    },
    unseen: {
      backgroundColor: colors.bgHighlight,
      hover: {
        backgroundColor: colors.bgActive,
      },
      state: {
        color: colors.accent,
      },
    },
  },
};
