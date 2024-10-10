import { Text, type TextProps, StyleSheet } from 'react-native';
import colors from '../../assets/colors/colors';


export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = colors;

  return (
    <Text
      style={[
        { color: color.textDark },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? [styles.link,{color: color.primary}] : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    // lineHeight: 24,
    fontFamily: 'DMSans-Regular'
  },
  defaultSemiBold: {
    fontSize: 16,
    // lineHeight: 24,
    fontFamily: 'DMSans-SemiBold'
  },
  title: {
    fontSize: 32,
    // lineHeight: 32,
    fontFamily: 'DMSans-Bold'
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'DMSans-Medium'
  },
  link: {
    // lineHeight: 30,
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
    textDecorationLine: 'underline',
  },
});
