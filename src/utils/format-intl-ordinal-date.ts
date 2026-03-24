export function formatIntlOrdinalDate(dateStr: string) {
  if (!dateStr) return ""; // empty string if invalid

  const dateObj = new Date(dateStr);
  if (isNaN(dateObj.getTime())) return ""; // invalid date

  const day = dateObj.getDate();

  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  });

  const monthAndYear = formatter.format(dateObj);

  let suffix: string;
  if (day > 3 && day < 21) {
    suffix = "th";
  } else {
    switch (day % 10) {
      case 1:
        suffix = "st";
        break;
      case 2:
        suffix = "nd";
        break;
      case 3:
        suffix = "rd";
        break;
      default:
        suffix = "th";
    }
  }

  return `${day}${suffix} ${monthAndYear}`;
}
