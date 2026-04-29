window.addEventListener("DOMContentLoaded", () => {
  const infoDate = document.querySelector(".info-date");
  const infoTme = document.querySelector(".info-time");

  const now = new Date();
  const dayIndex = now.getDay(); // возвращает 0 (воскресенье) — 6 (суббота)
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = daysOfWeek[dayIndex];

  const monthIndex = now.getMonth(); // 0 (январь) – 11 (декабрь)
  const months = [
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
  const monthName = months[monthIndex];

  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  const formattedDate = `${dayName}, ${monthName} ${day}`;
  const formattedTime = `${hours}:${minutes}`;

  infoDate.textContent = formattedDate;
  infoTme.textContent = formattedTime;
});
