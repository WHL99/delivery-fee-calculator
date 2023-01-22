import { useEffect, useState } from "react";
import "./App.css";
import dayjs from "dayjs";
import { Box, Grid, Button, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import MopedIcon from "@mui/icons-material/Moped";
import {
  ifDeliveryFee,
  ifRushHour,
  maxDeliveryPrice,
  rushHourDeliveryPrice,
  noRushHourDeliveryPrice,
} from "./functions";

function App() {
  const [cartValue, setCartValue] = useState(0);
  const [distance, setDistance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [dateTime, setDateTime] = useState<dayjs.Dayjs | null>(
    dayjs(new Date())
  );
  const [deliveryPrice, setDeliveryPrice] = useState(0);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setDeliveryPrice(() => {
      let newDeliveryPrice = 0;
      if (ifDeliveryFee(cartValue)) {
        if (ifRushHour(dateTime)) {
          return maxDeliveryPrice(
            rushHourDeliveryPrice(cartValue, distance, amount)
          );
        }
        return maxDeliveryPrice(
          noRushHourDeliveryPrice(cartValue, distance, amount)
        );
      }
      return newDeliveryPrice;
    });
  };

  return (
    <Grid
      container
      sx={{
        margin: "auto",
        justifyContent: "center",
      }}
    >
      <Grid xs={10} md={8} lg={6} xl={5} mt={5}>
        <h1>Delivery Fee Calculator</h1>
        <form onSubmit={handleSubmit}>
          <Box className="box">
            <div>
              <label>Cart Value: </label>
              <input
                data-testid="cart-value"
                onChange={(e) => setCartValue(Number(e.target.value))}
                type="number"
                value={cartValue}
                min="0.01"
                step="0.01"
              />
              &nbsp;€
            </div>
            <div>
              <label>Delivery Distance: </label>
              <input
                data-testid="delivery-distance"
                onChange={(e) => setDistance(Number(e.target.value))}
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
                data-testid="amount-of-items"
                onChange={(e) => setAmount(Number(e.target.value))}
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
                  className="mkl"
                  label="Pick date and time"
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
              data-testid="submit-button"
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
              <Grid display="flex" alignItems="center" direction="row">
                <label>Delivery Price&nbsp;&nbsp;</label>
                <MopedIcon fontSize="large" />
              </Grid>
              <div
                data-testid="delivery-price"
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
