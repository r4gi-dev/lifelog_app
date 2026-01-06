// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

// Allow custom keys by intersecting with Record<string, any> or similar
const MAPPING = {
  // See MaterialIcons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',

  // Custom mappings for LifeLog App
  'list.bullet': 'list',
  'plus.circle.fill': 'add-circle',
  'checkmark.circle.fill': 'check-circle',
  'calendar': 'calendar-today',
  'calendar.fill': 'calendar-today',
  'photo.fill': 'image',
  'camera.fill': 'camera-alt',
  'checkmark.circle': 'check-circle-outline',
  'photo': 'image',
  'chart.bar.fill': 'bar-chart',
  'star.fill': 'star',
  'gear': 'settings',
  'sun.max.fill': 'wb_sunny',
  'moon.fill': 'brightness-3', // Crescent moon
  'lightbulb.fill': 'lightbulb',
  'magnifyingglass': 'search',
  'xmark': 'close',
} as const;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name] as any} style={style} />;
}
