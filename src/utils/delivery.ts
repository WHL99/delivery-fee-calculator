import dayjs from 'dayjs'

export const cartValueSurcharge = (cartValue: number | undefined): number => {
  let minValue = 10
  return cartValue !== undefined && cartValue < minValue
    ? Number((minValue - cartValue).toFixed(2))
    : 0
}

export const ifDeliveryFee = (cartValue: number | undefined): boolean => {
  let maxValue = 100
  return cartValue !== undefined ? cartValue < maxValue : false
}

export const distanceSurcharge = (distance: number | undefined): number => {
  let surcharge = 2
  let minDistance = 1000
  let stepDistance = 500
  return distance !== undefined && distance > minDistance
    ? surcharge + Math.ceil((distance - minDistance) / stepDistance) * 1
    : surcharge
}

export const amountSurcharge = (amount: number | undefined): number => {
  let surcharge = 0
  let numberOfItemNoSurcharge = 4
  let unitExtraCost = 0.5
  let numberOfItemExtraBulkFee = 12
  let extraBulkFee = 1.2
  if (amount !== undefined && amount > numberOfItemNoSurcharge) {
    surcharge =
      amount > numberOfItemExtraBulkFee
        ? (amount - numberOfItemNoSurcharge) * unitExtraCost + extraBulkFee
        : (amount - numberOfItemNoSurcharge) * unitExtraCost
  }
  return surcharge
}

export const ifRushHour = (dateTime: dayjs.Dayjs | null): boolean => {
  let orderMin = dayjs(dateTime).minute()
  let orderHour = dayjs(dateTime).hour()
  let orderDay = dayjs(dateTime).day()
  let rushDay = 5
  let rushHourStart = 15
  let rushHourEnd = 18

  return (orderDay === rushDay &&
    orderHour >= rushHourStart &&
    orderHour <= rushHourEnd) ||
    (orderDay === rushDay && orderHour === rushHourEnd + 1 && orderMin === 0)
    ? true
    : false
}

export const maxDeliveryPrice = (deliveryPrice: number): number => {
  let maxDeliveryPrice = 15
  return deliveryPrice >= maxDeliveryPrice ? maxDeliveryPrice : deliveryPrice
}

export const rushHourDeliveryPrice = (
  cartValue: number | undefined,
  distance: number | undefined,
  amount: number | undefined,
): number => {
  let rushHourSurcharge = 1.2
  let deliveryPrice =
    (cartValueSurcharge(cartValue) +
      distanceSurcharge(distance) +
      amountSurcharge(amount)) *
    rushHourSurcharge
  return Number(deliveryPrice.toFixed(2))
}

export const noRushHourDeliveryPrice = (
  cartValue: number | undefined,
  distance: number | undefined,
  amount: number | undefined,
): number => {
  let deliveryPrice =
    cartValueSurcharge(cartValue) +
    distanceSurcharge(distance) +
    amountSurcharge(amount)
  return Number(deliveryPrice.toFixed(2))
}
