import { styled } from '@mui/system';
import type {
  CartWrapperStyleProps,
  CardTextStyleProps,
  CartContentSkeletonStyleProps,
} from '../types';
export const CardWrapper = styled('div')<CartWrapperStyleProps>((props) => ({
  width: props.width,
  height: props.height,
  backgroundColor: 'black',
  border: '1px solid black',
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: props.$padding,
  position: 'relative',
  cursor: 'pointer',
  boxShadow: '0 0 #000000, 0 0 #000000, 0 0 #000000, 0 1px 2px -1px',
}));

export const CardTitle = styled('div')<CardTextStyleProps>(
  ({ $cardfontsize, theme }) => ({
    fontSize: $cardfontsize,
    marginTop: '24px',
    color: theme.palette.text.secondary,
    width: '80%',
    lineHeight: '2rem',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',

    textAlign: 'center',
  }),
);

export const CardSubtitle = styled('div')<CardTextStyleProps>((props) => ({
  fontSize: props.$cardfontsize,
  textAlign: 'center',
  color: 'lightyellow',
  marginTop: '8px',
}));

export const CardAction = styled('button')(({ theme }) => ({
  width: '50%',
  backgroundColor: theme.palette.primary.main,
  border: `1px solid ${theme.palette.primary.main}`,
  color: theme.palette.text.primary,
  fontWeight: 600,
  borderRadius: '24px',
  marginTop: '8px',
  padding: '12px 6px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    borderColor: theme.palette.primary.dark,
  },
}));

export const CardContentSkeleton = styled('div')<CartContentSkeletonStyleProps>(
  (props) => ({
    animation: 'scale 3s linear infinite',
    height: props.height,
    width: props.width,
    background: '#e5e4e2',
    marginTop: props.$cardmargintop ?? '8px',
    borderRadius: props.$cardborderradius ?? '',
    '@keyframes scale': {
      '0%': {
        opacity: 0.1,
      },
      '25%': {
        opacity: 0.5,
      },
      '50%': {
        opacity: 1,
      },
      '75%': {
        opacity: 0.5,
      },
      '100%': {
        opacity: 0.1,
      },
    },
  }),
);
