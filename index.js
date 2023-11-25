const dayjs = require("dayjs");
const {
  STATUS,
  PASSENGER_TYPE,
  DISCOUNT_PERSON,
  TRAIN,
  SEAT_TYPES,
  DATE_TIME_FORMAT,
} = require("./constants");

var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

export const generateMessage = ({ train, timeStart, price }) => {
  return `-  Tàu : ${train}\n-  Thời gian xuất phát : ${timeStart}\n-  Tổng tiền : ${price}k`;
};
const isValidValue = ({ departureDay, seatTypes, passengerType }) => {
  const isDepartureDayValid = dayjs(
    departureDay,
    DATE_TIME_FORMAT,
    true
  ).isValid();

  const isSeatTypesValid = SEAT_TYPES[seatTypes] !== undefined;
  const isPassengerTypeValid = PASSENGER_TYPE[passengerType] !== undefined;

  return isDepartureDayValid && isSeatTypesValid && isPassengerTypeValid;
};

const getTrainsValid = (departureDay) => {
  const trains = Object.keys(TRAIN).filter((key) => {
    return dayjs(departureDay).isBefore(
      `${departureDay.split(" ")[0]} ${TRAIN[key].time}`,
      "minutes"
    );
  });

  return trains;
};

const getOptions = ({ trains, departureDay, seatTypes, passengerType }) => {
  const options = trains.map((train) => {
    const timeStart = `${departureDay.split(" ")[0]} ${TRAIN[train].time}`;
    const price =
      TRAIN[train][seatTypes] -
      TRAIN[train][seatTypes] * DISCOUNT_PERSON[passengerType];

    return generateMessage({ train, timeStart, price });
  });

  return options;
};

const generateResult = (options) => {
  let result = "";
  for (let index = 0; index < options.length; index++) {
    result += `\nOption ${index + 1}: \n${options[index]}`;
  }

  return result;
};

const calculateTicketPrice = ({ departureDay, seatTypes, passengerType }) => {
  if (!isValidValue({ departureDay, seatTypes, passengerType })) {
    return STATUS.INVALID;
  }

  const trains = getTrainsValid(departureDay);

  if (!trains.length) {
    return STATUS.NONE_TRAIN;
  }

  const options = getOptions({
    trains,
    departureDay,
    seatTypes,
    passengerType,
  });

  let result = generateResult(options);

  return result;
};

// const data = {
//   departureDay: "12/12/2023 07:30",
//   seatTypes: "L1",
//   passengerType: 1,
// };

// console.log(calculateTicketPrice(data));
module.exports = {
  calculateTicketPrice,
  getOptions,
  generateResult,
};
