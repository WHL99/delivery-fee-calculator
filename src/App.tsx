import { useState } from "react";
import "./App.css";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

function App() {
  const [value, setValue] = useState(0);
  const [distance, setDistance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [dateTime, setDateTime] = useState<dayjs.Dayjs | null>(
    dayjs(new Date())
  );
  const [deliveryPrice, setDeliveryPrice] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setDeliveryPrice(() => {
      let newDeliveryPrice;
      if (ifNoShippingFee(value) === true) {
        newDeliveryPrice = 0;
      } else {
        if (ifRushHour(dateTime) === true) {
          let rushHourSurcharge = 1.2;
          newDeliveryPrice =
            (valueSurcharge(value) +
              distanceSurcharge(distance) +
              amountSurcharge(amount)) *
            rushHourSurcharge;
        } else {
          newDeliveryPrice =
            valueSurcharge(value) +
            distanceSurcharge(distance) +
            amountSurcharge(amount);
        }
        return Number(newDeliveryPrice.toFixed(2)) >= 15
          ? 15
          : Number(newDeliveryPrice.toFixed(2));
      }
      return Number(newDeliveryPrice.toFixed(2)) >= 15
        ? 15
        : Number(newDeliveryPrice.toFixed(2));
    });
    setValue(0);
    setDistance(0);
    setAmount(0);
    setDateTime(dayjs(new Date()));
    console.log(deliveryPrice);
  };

  const valueSurcharge = (value: number): number => {
    let surcharge: number;
    let minValue = 10;
    if (value < minValue) {
      surcharge = minValue - value;
    } else {
      surcharge = 0;
    }
    return surcharge;
  };

  const ifNoShippingFee = (value: number): boolean => {
    let ifNoShippingFee;
    let maxValue = 100;
    if (value >= maxValue) {
      ifNoShippingFee = true;
    } else {
      ifNoShippingFee = false;
    }
    return ifNoShippingFee;
  };

  const distanceSurcharge = (distance: number): number => {
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

  const amountSurcharge = (amount: number): number => {
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

  const ifRushHour = (dateTime: dayjs.Dayjs | null): boolean => {
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
      (orderHour === rushHourEnd + 1 && orderMin === 0)
    ) {
      ifRushHour = true;
    } else {
      ifRushHour = false;
    }
    return ifRushHour;
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Cart Value</label>
          <input
            onChange={(e) =>
              setValue(Number((e.target as HTMLInputElement).value))
            }
            type="number"
            value={value}
            min="0.01"
            step="0.01"
          />
          €
        </div>
        <div>
          <label>Delivery Distance</label>
          <input
            onChange={(e) =>
              setDistance(Number((e.target as HTMLInputElement).value))
            }
            type="number"
            value={distance}
            min="1"
            step="1"
          />
          m
        </div>
        <div>
          <label>Amount of Items</label>
          <input
            onChange={(e) =>
              setAmount(Number((e.target as HTMLInputElement).value))
            }
            type="number"
            value={amount}
            min="1"
            step="1"
          />
        </div>
        <div>
          <label>Time</label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              value={dateTime}
              onChange={(e) => {
                setDateTime(e);
              }}
              minDateTime={dayjs(new Date())}
            />
          </LocalizationProvider>
        </div>

        <button type="submit">Calculate delivery price</button>
      </form>
      <div>{deliveryPrice}</div>
    </div>
  );
}

export default App;
