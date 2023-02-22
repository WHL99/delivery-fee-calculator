import dayjs from 'dayjs'

export const cartValueSurcharge = (cartValue: number): number => {
  let surcharge = 0
  let minValue = 10
  return cartValue < minValue
    ? (surcharge = Number((minValue - cartValue).toFixed(2)))
    : surcharge
}

export const ifDeliveryFee = (cartValue: number): boolean => {
  let maxValue = 100
  return cartValue >= maxValue ? false : true
}

export const distanceSurcharge = (distance: number): number => {
  let surcharge = 2
  let minDistance = 1000
  let stepDistance = 500
  return distance <= minDistance
    ? surcharge
    : (surcharge = 2 + Math.ceil((distance - minDistance) / stepDistance) * 1)
}

export const amountSurcharge = (amount: number): number => {
  let surcharge = 0
  let numberOfItemNoSurcharge = 4
  let unitExtraCost = 0.5
  let numberOfItemExtraBulkFee = 12
  let extraBulkFee = 1.2
  if (amount > numberOfItemNoSurcharge && amount <= numberOfItemExtraBulkFee) {
    surcharge = (amount - numberOfItemNoSurcharge) * unitExtraCost
  } else if (amount > numberOfItemExtraBulkFee) {
    surcharge =
      (amount - numberOfItemNoSurcharge) * unitExtraCost + extraBulkFee
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
  cartValue: number,
  distance: number,
  amount: number,
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
  cartValue: number,
  distance: number,
  amount: number,
): number => {
  let deliveryPrice =
    cartValueSurcharge(cartValue) +
    distanceSurcharge(distance) +
    amountSurcharge(amount)
  return Number(deliveryPrice.toFixed(2))
}
