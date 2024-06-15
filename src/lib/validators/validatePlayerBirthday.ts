import type { Dayjs } from 'dayjs';

export const validateBirthday = (birthday: Dayjs) => {
  const formattedBirthday = birthday.format('YYYY-MM-DDTHH:mm:ss');
  if (!formattedBirthday) return 'Date of birth is mandatory';
  return '';
};
