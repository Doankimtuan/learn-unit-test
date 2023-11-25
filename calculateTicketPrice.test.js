const { calculateTicketPrice, generateResult, getOptions } = require("./index");
const { STATUS } = require("./constants");

describe("Input validation", () => {
  describe("Missing input value", () => {
    it("Missing input value passengerType", () => {
      const data = {
        departureDay: "12/12/2023 11:30",
        seatTypes: "L1",
      };
      const result = calculateTicketPrice(data);
      expect(result).toBe(STATUS.INVALID);
    });
    it("Missing input value seatTypes", () => {
      const data = {
        departureDay: "12/12/2023 11:30",
        passengerType: 1,
      };
      const result = calculateTicketPrice(data);
      expect(result).toBe(STATUS.INVALID);
    });
    it("Missing input value departureDay", () => {
      const data = {
        seatTypes: "L1",
        passengerType: 1,
      };
      const result = calculateTicketPrice(data);
      expect(result).toBe(STATUS.INVALID);
    });
    it("Empty input", () => {
      const data = {};
      const result = calculateTicketPrice(data);
      expect(result).toBe(STATUS.INVALID);
    });
  });

  describe("Wrong input value", () => {
    it("Wrong departure date format - format date", () => {
      const data = {
        departureDay: "12-12-2023 11:30",
        seatTypes: "L1",
        passengerType: 1,
      };
      const result = calculateTicketPrice(data);
      expect(result).toBe(STATUS.INVALID);
    });

    it("Wrong departure date format - format time", () => {
      const data = {
        departureDay: "12-12-2023 1:30",
        seatTypes: "L1",
        passengerType: 1,
      };
      const result = calculateTicketPrice(data);
      expect(result).toBe(STATUS.INVALID);
    });

    it("Wrong format of seats on the train", () => {
      const data = {
        departureDay: "12/12/2023 11:30",
        seatTypes: null,
        passengerType: 1,
      };
      const result = calculateTicketPrice(data);
      expect(result).toBe(STATUS.INVALID);
    });

    it("Wrong passenger type format", () => {
      const data = {
        departureDay: "12/12/2023 11:30",
        seatTypes: "L1",
        passengerType: "L2",
      };
      const result = calculateTicketPrice(data);
      expect(result).toBe(STATUS.INVALID);
    });
  });

  describe("Correct input", () => {
    it("Wrong departure date format", () => {
      const data = {
        departureDay: "12/12/2023 11:30",
        seatTypes: "L1",
        passengerType: 1,
      };
      const result = calculateTicketPrice(data);
      expect(result).toBe(
        `\nOption 1: \n-  Tàu : SE2\n-  Thời gian xuất phát : 12/12/2023 12:00\n-  Tổng tiền : 135k`
      );
    });
  });
});

describe("Find the right train", () => {
  it("Booking time is before 8:30", () => {
    const data = {
      departureDay: "12/12/2023 07:30",
      seatTypes: "L2",
      passengerType: 2,
    };
    const result = calculateTicketPrice(data);
    expect(result).toBe(
      `\nOption 1: \n-  Tàu : SE1\n-  Thời gian xuất phát : 12/12/2023 08:30\n-  Tổng tiền : 160k\nOption 2: \n-  Tàu : SE2\n-  Thời gian xuất phát : 12/12/2023 12:00\n-  Tổng tiền : 200k`
    );
  });
  it("Booking time is 8:30", () => {
    const data = {
      departureDay: "12/12/2023 08:30",
      seatTypes: "L3",
      passengerType: 3,
    };
    const result = calculateTicketPrice(data);
    expect(result).toBe(
      `\nOption 1: \n-  Tàu : SE2\n-  Thời gian xuất phát : 12/12/2023 12:00\n-  Tổng tiền : 85k`
    );
  });
  it("Booking time is 8:30", () => {
    const data = {
      departureDay: "12/12/2023 08:30",
      seatTypes: "L3",
      passengerType: 3,
    };
    const result = calculateTicketPrice(data);
    expect(result).toBe(
      `\nOption 1: \n-  Tàu : SE2\n-  Thời gian xuất phát : 12/12/2023 12:00\n-  Tổng tiền : 85k`
    );
  });
  it("Booking time is after 8:30 before 12:00", () => {
    const data = {
      departureDay: "12/12/2023 11:30",
      seatTypes: "L3",
      passengerType: 4,
    };
    const result = calculateTicketPrice(data);
    expect(result).toBe(
      `\nOption 1: \n-  Tàu : SE2\n-  Thời gian xuất phát : 12/12/2023 12:00\n-  Tổng tiền : 170k`
    );
  });
  it("Booking time is 12:00", () => {
    const data = {
      departureDay: "12/12/2023 12:00",
      seatTypes: "L3",
      passengerType: 4,
    };
    const result = calculateTicketPrice(data);
    expect(result).toBe(STATUS.NONE_TRAIN);
  });
  it("Booking time is after 12:00", () => {
    const data = {
      departureDay: "12/12/2023 13:30",
      seatTypes: "L3",
      passengerType: 4,
    };
    const result = calculateTicketPrice(data);
    expect(result).toBe(STATUS.NONE_TRAIN);
  });
});

describe("Calculate train ticket fare", () => {
  it("seatTypes = L3, passengerType = 3", () => {
    const data = {
      departureDay: "12/12/2023 07:30",
      seatTypes: "L3",
      passengerType: 3,
    };
    const result = calculateTicketPrice(data);
    expect(result).toBe(
      `\nOption 1: \n-  Tàu : SE1\n-  Thời gian xuất phát : 12/12/2023 08:30\n-  Tổng tiền : 75k\nOption 2: \n-  Tàu : SE2\n-  Thời gian xuất phát : 12/12/2023 12:00\n-  Tổng tiền : 85k`
    );
  });
  it("seatTypes = L3, passengerType = 4", () => {
    const data = {
      departureDay: "12/12/2023 07:30",
      seatTypes: "L3",
      passengerType: 4,
    };
    const result = calculateTicketPrice(data);
    expect(result).toBe(
      `\nOption 1: \n-  Tàu : SE1\n-  Thời gian xuất phát : 12/12/2023 08:30\n-  Tổng tiền : 150k\nOption 2: \n-  Tàu : SE2\n-  Thời gian xuất phát : 12/12/2023 12:00\n-  Tổng tiền : 170k`
    );
  });
});
