const DATE_TIME_FORMAT = "DD/MM/YYYY HH:mm";

const STATUS = {
  INVALID: "Sai giá trị input",
  NONE_TRAIN: "Không có tàu",
  OK: "OK",
};

const PASSENGER_TYPE = {
  1: "STUDENT",
  2: "ELDER",
  3: "CHILDREN",
  4: "OTHER",
};

const SEAT_TYPES = {
  L1: "L1",
  L2: "L2",
  L3: "L3",
};

const TRAIN = {
  SE1: {
    [SEAT_TYPES.L1]: 100,
    [SEAT_TYPES.L2]: 200,
    [SEAT_TYPES.L3]: 150,
    time: "08:30",
  },
  SE2: {
    [SEAT_TYPES.L1]: 150,
    [SEAT_TYPES.L2]: 250,
    [SEAT_TYPES.L3]: 170,
    time: "12:00",
  },
};

const DISCOUNT_PERSON = {
  1: 0.1,
  2: 0.2,
  3: 0.5,
  4: 0,
};

module.exports = {
  STATUS,
  PASSENGER_TYPE,
  DISCOUNT_PERSON,
  TRAIN,
  DATE_TIME_FORMAT,
  SEAT_TYPES,
};
