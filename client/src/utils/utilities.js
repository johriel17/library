import { format } from 'date-fns';

const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(value + 'T23:59:59Z');
  return format(date, 'MMM d, yyyy');
}

export {
    formatDate,
}