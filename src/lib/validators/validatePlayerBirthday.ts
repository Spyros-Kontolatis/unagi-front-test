import type { Dayjs } from 'dayjs';

import { isBefore, subYears } from 'date-fns';

export const validateBirthday = (birthday: Dayjs) => {
  const formattedBirthday = birthday.format('YYYY-MM-DDTHH:mm:ss');
  if (!formattedBirthday) return 'Date of birth is mandatory';
  if (!isBefore(formattedBirthday, subYears(new Date(), 10)))
    return 'Date of birth must be older than ten years ago';
  return '';
};
