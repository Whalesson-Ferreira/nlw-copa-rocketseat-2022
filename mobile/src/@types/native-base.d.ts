import { THEME } from '../styles/theme';
type ThemeType = typeof THEME;

declare module 'native-base' {
  interface ICustomTheme extends ThemeType { }
}
