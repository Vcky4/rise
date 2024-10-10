import React from 'react';
import { Image, ImageSourcePropType, ImageStyle, StyleSheet } from 'react-native';

interface IconProps {
  source: ImageSourcePropType;
  size?: number;
  color?: string;
  style?: ImageStyle;
  [x: string]: any;  // Accept any other optional props
}

const Icon: React.FC<IconProps> = ({ source, size = 24, color, style, ...rest }) => {
  return (
    <Image
      source={source}
      style={[
        styles.icon,
        {
          width: size,
          height: size,
          tintColor: color, 
        },
        style,
      ]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
  },
});

export default Icon;
