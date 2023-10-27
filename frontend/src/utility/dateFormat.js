const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function dateFormat(value) {
  const date = new Date(value);

  return `${month[date.getMonth()]} ${date.getDate()},${date.getFullYear()} ${
    weekday[date.getDay()]
  }`;
}
