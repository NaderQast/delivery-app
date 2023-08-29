const express = require('express')
const path =require('path')
const app = express();
const port = 3000 ;
const{ DoorDashClient }= require("@doordash/sdk");
const { v4: uuidv4 } = require("uuid");
require('dotenv').config()

app.use(express.urlencoded({extended: false}))
app.use(express.json());

const publicPath = path.join(__dirname , './public')

app.use(express.static(publicPath)) ; 

app.set("view engine","pug")

app.get("/order" , (req ,res)=> {
  res.render("order")
})

// app.get('/',(req, res)=>{
//     res.sendFile(path.join(__dirname,"./public/index.html"))
// })

app.listen(port , () => {
    console.log('server is up on '+ port)
 })

app.post('/create-delivery',async(req ,res) => {
    const client = new DoorDashClient({
        developer_id: process.env.developer_id,
        key_id: process.env.key_id,
        signing_secret:process.env.signing_secret ,
      });  
      const response = await client.deliveryQuote({
        external_delivery_id: uuidv4(),
        pickup_address: "11 madison Ave, New York, NY, 10010",
        pickup_business_name:"take a look",
        pickup_phone_number: "+16505555555",
        dropoff_address: `${req.body.street},${req.body.city},${req.body.zipcode}`, 
        dropoff_phone_number: req.body.dropoff_phone_number,
        dropoff_contact_given_name : req.body.dropoff_contact_given_name,
        dropoff_contact_family_name: req.body.dropoff_contact_family_name,
        order_value: req.body.order_value,
      });  
      res.send(response)
      console.log(response) 
 })



 app.post('/create-delivery', async(req ,res) => {
    const client = new DoorDashClient({
        developer_id: process.env.developer_id,
        key_id: process.env.key_id,
        signing_secret:process.env.signing_secret ,
      })
    const response = await client.deliveryQuoteAccept(
        '59cc99cd-cb5c-4f3b-9d3e-e8fbd0503b75'
      )
    const clothingTotal = (response.data.order_value/100).toFixed(2);
    const feeTotal = (response.data.fee / 100).toFixed(2)
    const orderTotal = Number(clothingTotal) + Number(feeTotal)

    const data = {
      clothingTotal,
      feeTotal,
      orderTotal
    }
    res.render("order",{
      clothingTotal: data.clothingTotal,
      feeTotal: data.feeTotal,
      orderTotal: data.orderTotal,
    })  
    console.log("ACCEPT",response)  
 }) 
