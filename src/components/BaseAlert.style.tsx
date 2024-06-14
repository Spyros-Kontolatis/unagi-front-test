import { styled } from '@mui/system';

export const AlertWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  padding: '1rem 1rem',
  marginBottom: '1rem',
  border: '1px solid transparent',
  borderRadius: '0.25rem',
  color: theme.palette.info.light,
  backgroundColor: theme.palette.info.main,
  borderColor: '#b6effb',
}));
export const ErrorAlertWrapper = styled(AlertWrapper)(({ theme }) => ({
  color: theme.palette.error.light,
  backgroundColor: theme.palette.error.main,
  borderColor: '#f5c2c7',
}));

export const SuccessAlertWrapper = styled(AlertWrapper)(({ theme }) => ({
  color: theme.palette.success.light,
  backgroundColor: theme.palette.success.main,
  borderColor: '#badbcc',
}));

export const WarningAlertWrapper = styled(AlertWrapper)(({ theme }) => ({
  color: theme.palette.warning.light,
  backgroundColor: theme.palette.warning.main,
  borderColor: '#ffecb5',
}));

export const AlertHideButton = styled('span')(({ theme }) => ({
  marginLeft: '15px',
  color: 'white',
  fontWeight: 'bold',
  float: 'right',
  fontSize: '22px',
  lineHeight: '20px',
  cursor: 'pointer',
  transition: '0.3s',
  '&:hover': {
    color: theme.palette.text.primary,
  },
}));
