import moment from "moment";

export const range = (number) => {
  const res = [];
  for (let i = 0; i < number; i++) {
    res.push(i);
  }

  return res;
};

export const getDurationString = (duration = 61) => {
  const minutes = moment.duration(duration, `m`).minutes();
  const hours = moment.duration(duration, `m`).hours();
  let result = ``;
  if (hours) {
    result += `${hours}ч`;
  }
  if (minutes) {
    result += ` ${minutes}м`;
  }
  return result.trim();
};
