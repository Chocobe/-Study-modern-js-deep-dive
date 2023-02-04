const today = new Date();

const timezoneOffset = today.getTimezoneOffset();
const timezoneOffsetHours = timezoneOffset / 60;

// timezoneOffsetHours: -9
console.log('timezoneOffsetHours: ', timezoneOffsetHours);
