const{ DoorDashClient }= require("@doordash/sdk");
const { v4: uuidv4 } = require("uuid");
require('dotenv').config()

const client = new DoorDashClient({
  developer_id: process.env.developer_id,
  key_id: process.env.key_id,
  signing_secret:process.env.signing_secret ,
});

const response = client
  .createDelivery({
    external_delivery_id: uuidv4(),
    pickup_address: "1000 4th Ave, Seattle, WA, 98104",
    pickup_phone_number: "2063428631",
    dropoff_address: "1201 3rd Ave, Seattle, WA, 98101",
    dropoff_phone_number: "2487620356",
  })
 

console.log(response)