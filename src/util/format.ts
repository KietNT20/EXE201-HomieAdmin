export const formatDate = (date: Date | null | undefined | string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  if (!date) return '';
  return new Date(date).toLocaleDateString('vi-VN', options);
};

// Format price function for Vietnamese Dong
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(price);
};
