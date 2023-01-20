import { describe, test } from "vitest";
import { render } from "@testing-library/react";
import App from "./App";
import dayjs from "dayjs";

import {
  valueSurcharge,
  ifNoShippingFee,
  ifRushHour,
  distanceSurcharge,
  amountSurcharge,
  deliveryPriceShouldLessThanMax,
} from "./functions";

const { getByTestId } = render(<App />);

describe("input of cart value", () => {
  const input = getByTestId("cart-value-test") as HTMLInputElement;
  test("If the initial cart value is 0", () => {
    expect(input.value).toBe("0");
  });
  test("input step should be equal to 0.01€", () => {
    expect(input.getAttribute("step")).toBe("0.01");
  });
  test("minimum input should be equal to 0.01€", () => {
    expect(input.getAttribute("min")).toBe("0.01");
  });
});

describe("input of delivery distance", () => {
  const input = getByTestId("delivery-distance-test") as HTMLInputElement;
  test("If the initial delivery distance value is 0", () => {
    expect(input.value).toBe("0");
  });
  test("input step should be equal to 1m", () => {
    expect(input.getAttribute("step")).toBe("1");
  });
  test("minimum input should be equal to 1m", () => {
    expect(input.getAttribute("min")).toBe("1");
  });
});

describe("input of amount of items", () => {
  const input = getByTestId("amount-test") as HTMLInputElement;
  test("If the initial amount of items value is 0", () => {
    expect(input.value).toBe("0");
  });
  test("input step should be equal to 1", () => {
    expect(input.getAttribute("step")).toBe("1");
  });
  test("minimum input should be equal to 1m", () => {
    expect(input.getAttribute("min")).toBe("1");
  });
});

describe("valueSurcharge function", () => {
  test("returns the difference between value and 10€, when value is less than 10€", () => {
    expect(valueSurcharge(5.1)).toBe(4.9);
  });
  test("returns 0, when value is greater than or equal to 10€", () => {
    expect(valueSurcharge(10)).toBe(0);
    expect(valueSurcharge(15)).toBe(0);
  });
});

describe("ifNoShippingFee function", () => {
  test("returns true, when value is greater than or equal to 100€", () => {
    expect(ifNoShippingFee(100)).toBe(true);
    expect(ifNoShippingFee(120)).toBe(true);
  });
  test("returns false, when value is less than 100€", () => {
    expect(ifNoShippingFee(50)).toBe(false);
    expect(ifNoShippingFee(99)).toBe(false);
  });
});

describe("distanceSurcharge function", () => {
  test("returns 2, when distance is less than or equal to 1000m", () => {
    expect(distanceSurcharge(500)).toBe(2);
    expect(distanceSurcharge(1000)).toBe(2);
  });
  test("returns surcharge of distance based on step distance (500m), when distance is greater than 1000m", () => {
    expect(distanceSurcharge(1499)).toBe(3);
    expect(distanceSurcharge(1500)).toBe(3);
    expect(distanceSurcharge(1501)).toBe(4);
  });
});

describe("amountSurcharge function", () => {
  test("surcharge of amount is 0, when amount is less or equal than 4", () => {
    expect(amountSurcharge(4)).toBe(0);
  });
  test("returns surcharge of amount based on unit cost 0.5, when amount is greater than 4 and less than or equal to 12", () => {
    expect(amountSurcharge(5)).toBe(0.5);
    expect(amountSurcharge(10)).toBe(3);
    expect(amountSurcharge(12)).toBe(4);
  });
  test("returns surcharge of amount based on unit cost 0.5 and extra bulk fee 1.2, when amount is greater than 12", () => {
    expect(amountSurcharge(13)).toBe(5.7);
    expect(amountSurcharge(15)).toBe(6.7);
  });
});

describe("ifRushHour function", () => {
  test("returns true, during the rush hour (Friday 3 - 7 PM UTC)", () => {
    let dateTime = dayjs("2023-02-24 15:00:00");
    expect(ifRushHour(dateTime)).toBe(true);
    dateTime = dayjs("2023-03-17 19:00:00");
    expect(ifRushHour(dateTime)).toBe(true);
  });
  test("returns false, when day and time is not in rush hour", () => {
    let dateTime = dayjs("2023-02-21 14:08:00");
    expect(ifRushHour(dateTime)).toBe(false);
    dateTime = dayjs("2023-02-23 19:00:00");
    expect(ifRushHour(dateTime)).toBe(false);
  });
});

describe("deliveryPriceShouldLessThanMax function", () => {
  test("if delivery price more than or equal 15€, then only charge 15€", () => {
    const deliveryPriceTest1 = deliveryPriceShouldLessThanMax(123);
    expect(deliveryPriceTest1).toBeGreaterThanOrEqual(15);
    expect(deliveryPriceTest1).toBe(15);

    const deliveryPriceTest2 = deliveryPriceShouldLessThanMax(15.99);
    expect(deliveryPriceTest2).toBeGreaterThanOrEqual(15);
    expect(deliveryPriceTest2).toBe(15);
  });
  test("if delivery price less than 15€, then round to the second decimal", () => {
    const deliveryPriceTest1 = deliveryPriceShouldLessThanMax(14.694);
    expect(deliveryPriceTest1).toBeLessThanOrEqual(15);
    expect(deliveryPriceTest1).toBe(14.69);

    const deliveryPriceTest2 = deliveryPriceShouldLessThanMax(13.398);
    expect(deliveryPriceTest2).toBeLessThanOrEqual(15);
    expect(deliveryPriceTest2).toBe(13.4);
  });
});
