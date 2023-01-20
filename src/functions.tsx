import dayjs from "dayjs";

export const valueSurcharge = (value: number): number => {
  let surcharge: number;
  let minValue = 10;
  if (value < minValue) {
    surcharge = minValue - value;
  } else {
    surcharge = 0;
  }
  return surcharge;
};

export const ifNoShippingFee = (value: number): boolean => {
  let ifNoShippingFee;
  let maxValue = 100;
  if (value >= maxValue) {
    ifNoShippingFee = true;
  } else {
    ifNoShippingFee = false;
  }
  return ifNoShippingFee;
};

export const distanceSurcharge = (distance: number): number => {
  let surcharge;
  let minDistance = 1000;
  let stepDistance = 500;
  if (distance <= minDistance) {
    surcharge = 2;
  } else {
    surcharge = 2 + Math.ceil((distance - minDistance) / stepDistance) * 1;
  }
  return surcharge;
};

export const amountSurcharge = (amount: number): number => {
  let surcharge;
  let numberOfIteamNoSurcharge = 4;
  let unitExtraCost = 0.5;
  let numberOfIteamExtraBulkFee = 12;
  let extraBulkFee = 1.2;
  if (amount <= numberOfIteamNoSurcharge) {
    surcharge = 0;
  } else if (
    amount > numberOfIteamNoSurcharge &&
    amount <= numberOfIteamExtraBulkFee
  ) {
    surcharge = (amount - numberOfIteamNoSurcharge) * unitExtraCost;
  } else {
    surcharge =
      (amount - numberOfIteamNoSurcharge) * unitExtraCost + extraBulkFee;
  }
  return surcharge;
};

export const ifRushHour = (dateTime: dayjs.Dayjs | null): boolean => {
  let ifRushHour;
  let orderMin = dayjs(dateTime).minute();
  let orderHour = dayjs(dateTime).hour();
  let orderDay = dayjs(dateTime).day();
  let rushDay = 5;
  let rushHourStart = 15;
  let rushHourEnd = 18;
  if (
    (orderDay === rushDay &&
      orderHour >= rushHourStart &&
      orderHour <= rushHourEnd) ||
    (orderDay === rushDay && orderHour === rushHourEnd + 1 && orderMin === 0)
  ) {
    ifRushHour = true;
  } else {
    ifRushHour = false;
  }
  return ifRushHour;
};

export const deliveryPriceShouldLessThanMax = (price: number): number => {
  let maxDeliveryPrice = 15;
  if (price >= maxDeliveryPrice) return maxDeliveryPrice;
  else return Number(price.toFixed(2));
};
