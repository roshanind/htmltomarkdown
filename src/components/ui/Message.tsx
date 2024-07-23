import { ReactNode } from 'react';
import { Box, BoxProps, Typography, TypographyProps } from '@mui/material';

type Props = {
  image: string | ReactNode | ReactNode[] | null;
  imageSize?: { width: number; height: number };
  message: string | ReactNode | ReactNode[] | null;
  size?: 'small' | 'medium' | 'large';
} & BoxProps;

type ConfigType = {
  [key: string]: {
    imageSize: { width: number; height: number };
    variant: TypographyProps['variant'];
  };
};

const config: ConfigType = {
  small: {
    imageSize: { width: 100, height: 100 },
    variant: 'h6',
  },
  medium: {
    imageSize: { width: 200, height: 200 },
    variant: 'h5',
  },
  large: {
    imageSize: { width: 300, height: 300 },
    variant: 'h4',
  },
};

export default function Message({
  size,
  image = null,
  message = null,
  imageSize = { width: 200, height: 200 },
  ...props
}: Props) {
  const { imageSize: imageSizeConfig, variant } = config[size || 'medium'];

  return (
    <Box display="flex" justifyContent="center" flexDirection="column" {...props}>
      <Box display="flex" justifyContent="center">
        {typeof image === 'string' ? (
          <img src={image} alt="Message" width={imageSizeConfig.width} height={imageSizeConfig.height} />
        ) : (
          image
        )}
      </Box>
      <Box display="flex" justifyContent="center" mt={2}>
        {typeof message === 'string' ? <Typography variant={variant}>{message}</Typography> : message}
      </Box>
    </Box>
  );
}
