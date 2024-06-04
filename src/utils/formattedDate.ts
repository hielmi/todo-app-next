export const formatDate = (date: Date) => {
  const inputDate = new Date(date);
  const today = new Date();

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const isToday =
    today.getDate() === inputDate.getDate() &&
    today.getMonth() === inputDate.getMonth() &&
    today.getFullYear() === inputDate.getFullYear();

  if (isToday) {
    return "Today";
  }

  const dayOfWeek = weekday[inputDate.getDay()];
  const month = monthNames[inputDate.getMonth()];
  const outputDate = inputDate.getDate();

  return `${dayOfWeek}, ${month} ${outputDate}`;
};
