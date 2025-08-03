export default function formatDate(date) {
  const day = date.getDate(); // returns 3 (no leading zero)
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getMonth()]; // returns "Aug"
  const year = date.getFullYear(); // returns 2025

  return `${day} ${month} ${year}`;
}
    