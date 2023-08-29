window.menuItems = 0 

const street = document.getElementById("street")
const city = document.getElementById("city")
const zipcode = document.getElementById("zipcode")
const fname = document.getElementById("name")
const lastname = document.getElementById("lastname")
const phonenumber = document.getElementById("phonenumber")

const clothingItems = document.getElementsByClassName("clothing-option")
const orderTotal = document.getElementById("total")

const clothingTotal = document.getElementById("price")

async function callFeeAPI({target}){
    if(target.className === "clothing" && target.checked){
        window.menuItems += parseInt(target.value)
    }else if(target.className === "clothing" && !target.checked){
        window.menuItems -= parseInt(target.value)

        let response = await getFee()
        if(res){
            window.responseFee = response.data.fee
            orderTotal.textContent = `$${((Number(window.menuItems) + response.data.fee)/100).toFixed(2)}`
        }






    }
    clothingTotal.textContent = `$${(window.menuItems/100).toFixed(2)}`
}

for(const clothing of clothingItems){
    clothing.addEventListener("click", callFeeAPI);
}

street.addEventListener("focusout",callFeeAPI)
city.addEventListener("focusout",callFeeAPI)
zipcode.addEventListener("focusout",callFeeAPI)
fname.addEventListener("focusout",callFeeAPI)
lastname.addEventListener("focusout",callFeeAPI)
phonenumber.addEventListener("focusout",callFeeAPI)
