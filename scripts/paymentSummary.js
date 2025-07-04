import{cart} from "../data/cart.js"
import {products } from "../data/products.js"
import {getDeliveryItem} from "../data/delivaryOpstions.js"

export function renderPaymentSummary(){
    let orderItems=0
    let orderPrice = 0
    let shippingPrice= 0
    let taxPrice = 0
    let taxPrice10 = 0
    let orderTotal = 0
    cart.forEach((CartItem) => {
        orderItems += CartItem.quantity

        let matchingItem
        products.forEach((productItem)=>{
            if(CartItem.productId === productItem.id){
                matchingItem = productItem
            }
        })

        const deliveryOption = getDeliveryItem(CartItem.delivaryOptionId)

        shippingPrice += (deliveryOption.priceCents/100)

        orderPrice+= (matchingItem.priceCents/100) * CartItem.quantity
    })
    taxPrice =Number((orderPrice + shippingPrice).toFixed(2)) 
    taxPrice10 = Number((((taxPrice*0.1)/100)*100).toFixed(2)) 
    orderTotal =taxPrice +taxPrice10
    
    const paymentSummaryHTML =`
    <div class="payment-summary">
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${orderItems}):</div>
            <div class="payment-summary-money">$${orderPrice.toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${shippingPrice}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${Math.round(taxPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${taxPrice10.toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${orderTotal.toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        </div>
    `

    document.querySelector('.js-paymentSummary').innerHTML= paymentSummaryHTML
}