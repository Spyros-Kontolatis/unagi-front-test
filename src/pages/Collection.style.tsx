import { styled } from '@mui/system';
import breakpoints from '../constants/breakpoints';

export const Container = styled('div')({
  padding: '24px',
});
export const CardGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gridColumnGap: '4px',
  gridRowGap: '24px',
  justifyItems: 'center',
  alignUtems: 'center',
});

export const ResponsiveCardGrid = styled(CardGrid)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2,1fr);',
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3,1fr);',
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(4,1fr);',
  },
  [theme.breakpoints.up('xl')]: {
    gridTemplateColumns: 'repeat(6,1fr);',
  },
}));
