const dayList = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
];

(function printNow() {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  const dayIndex = today.getDay();
  const day = dayList[dayIndex];

  const originHours = today.getHours();
  const originMinutes = today.getMinutes();
  const originSeconds = today.getSeconds();

  const hours = parseHours(originHours);
  const minutes = parseMinuteSeconds(originMinutes);
  const seconds = parseMinuteSeconds(originSeconds);

  const amPm = getAmPm(originHours);

  const dateString = `${year}년 ${month}월 ${date}일 (${day}) - ${hours}시 ${minutes}분 ${seconds}초 ${amPm}`;
  console.log(dateString);

  setTimeout(printNow, 1000);
}());

function getAmPm(hours) {
  return hours > 12
    ? 'pm'
    : 'am';
}

function parseHours(hours) {
  const parsedHours = hours % 12;

  return parsedHours < 10
    ? `0${parsedHours}`
    : parsedHours;
}

function parseMinuteSeconds(value) {
  return value < 10
    ? `0${value}`
    : value;
}