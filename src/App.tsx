import { useState } from "react";
import "./App.css";
import dayjs from "dayjs";
import { Box, Grid, Button, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  valueSurcharge,
  ifNoShippingFee,
  ifRushHour,
  distanceSurcharge,
  amountSurcharge,
  deliveryPriceShouldLessThanMax,
} from "./functions";

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
        return deliveryPriceShouldLessThanMax(newDeliveryPrice);
      }
      return deliveryPriceShouldLessThanMax(newDeliveryPrice);
    });
    setValue(0);
    setDistance(0);
    setAmount(0);
    setDateTime(dayjs(new Date()));
  };

  return (
    <Grid
      container
      spacing={1}
      sx={{
        margin: "auto",
        justifyContent: "center",
      }}
    >
      <Grid item xs={10} md={8} lg={6} xl={4} mt={5}>
        <h1>Delivery Fee Calculator</h1>
        <form onSubmit={handleSubmit}>
          <Box className="box">
            <div>
              <label>Cart Value: </label>
              <input
                data-testid="cart-value-test"
                onChange={(e) =>
                  setValue(Number((e.target as HTMLInputElement).value))
                }
                type="number"
                value={value}
                min="0.01"
                step="0.01"
              />
              &nbsp;€
            </div>
            <div>
              <label>Delivery Distance: </label>
              <input
                data-testid="delivery-distance-test"
                onChange={(e) =>
                  setDistance(Number((e.target as HTMLInputElement).value))
                }
                type="number"
                value={distance}
                min="1"
                step="1"
              />
              &nbsp;m
            </div>
            <div>
              <label>Amount of Items: </label>
              <input
                data-testid="amount-test"
                onChange={(e) =>
                  setAmount(Number((e.target as HTMLInputElement).value))
                }
                type="number"
                value={amount}
                min="1"
                step="1"
              />
            </div>
            <Grid display="flex" alignItems="center" direction="row">
              <label>Time:&nbsp;</label>

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
            </Grid>

            <Button
              data-testid="submit-button-test"
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "rgb(50, 178, 228)",
                ":hover": { backgroundColor: "rgb(114, 190, 220)" },
              }}
            >
              Calculate delivery price
            </Button>
            <div>
              <label>Delivery Price: </label>
              <div
                data-testid="delivery-price-test"
                style={{ paddingTop: "10px", fontSize: "2rem" }}
              >
                {deliveryPrice} €
              </div>
            </div>
          </Box>
        </form>
      </Grid>
    </Grid>
  );
}

export default App;
