import {cart,removeFromCart,calculateCartQuantity,updateQuantity,updateDeliveryOption} from '../data/cart.js'
import {products} from '../data/products.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'

import {delivaryOptions,getDeliveryItem} from '../data/delivaryOpstions.js'

import{renderPaymentSummary} from "./paymentSummary.js"

export function play(){

    updateCartQuantity()
    let cartHTML =''
    let matchingProduct

    cart.forEach((cartItem)=>{
        products.forEach((productItem)=>{
            if(cartItem.productId === productItem.id){
                matchingProduct = productItem
            }
        })

        const deliveryOptionId = cartItem.delivaryOptionId
        const currentDate = getDeliveryItem(deliveryOptionId)

        
        cartHTML += `
            <div class="cart-item-container js-cart-item-container-${cartItem.productId}">
                <div class="delivery-date">
                    Delivery date: ${dayjs().add(currentDate.delivaryDays,'days').format('dddd, MMMM D')}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image"
                    src=${matchingProduct.image}>

                    <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price js-product-price-${matchingProduct.id}">
                        $${((matchingProduct.priceCents/100)*cartItem.quantity).toFixed(2)}
                    </div>
                    <div class="product-quantity">
                        <span>
                        Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                        </span>
                        <input class="quantity-input js-quantity-input-${cartItem.productId}">
                        <span class="save-quantity-link link-primary js-save-link"
                        data-product-id="${matchingProduct.id}" >
                        Save
                        </span>
                        <span class="update-quantity-link link-primary" data-update-button = '${cartItem.productId}'>
                        Update
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-quantity-link" data-delete-button = '${cartItem.productId}'>
                        Delete
                        </span>
                    </div>
                    </div>

                    <div class="delivery-options js-delivery-options">
                    <div class="delivery-options-title ">
                        Choose a delivery option:
                    </div>
                    ${delivaryOptionHTML(cartItem)}
                    </div>
                </div>
            </div>  
            `
    })
    document.querySelector('.js-order-summary').innerHTML = cartHTML


    function delivaryOptionHTML(cartItem){
        let html = ''
        delivaryOptions.forEach((item)=>{
        const today = dayjs()

        const priceString = item.priceCents === 0 ? 'FREE' : `$${(item.priceCents/100).toFixed(2)}`

        const isChecked = item.id === cartItem.delivaryOptionId
        html+=`<div class="delivery-option js-delivery-option" 
        data-product-id="${cartItem.productId}"
        data-delivery-product-id="${item.id}">
            <input type="radio"
            ${isChecked ? `checked` : ''}
            class="delivery-option-input"
            name="delivery-option js-delivery-option-${cartItem.productId}">
            <div>
            <div class="delivery-option-date">
                ${today.add(item.delivaryDays,'days').format('dddd, MMMM D')}
            </div>
            <div class="delivery-option-price">
                ${priceString} - Shipping
            </div>
            </div>
        </div>`
        }) 
    return html
    }


    function updateCartQuantity(){
        const cartQuantity = calculateCartQuantity()
        document.querySelector('.js-return-to-home-link').innerText = cartQuantity +` items`
    }

    document.querySelectorAll('.js-delete-quantity-link').forEach((button)=>{
        button.addEventListener('click',()=>{
            const productId = button.dataset.deleteButton
            cart.forEach((cartItem)=>{
                if(cartItem.productId === productId){
                    removeFromCart(productId)
                    document.querySelector(`.js-cart-item-container-${productId}`).remove()
                    updateCartQuantity()
                    renderPaymentSummary()
                }
            })
        })
    })


    document.querySelectorAll('.update-quantity-link').forEach((item)=>{
        item.addEventListener('click',()=>{
            const productId = item.dataset.updateButton
            const container = document.querySelector(
                `.js-cart-item-container-${productId}`
            );
            container.classList.add('is-editing-quantity');
        })
    })


    document.querySelectorAll('.js-save-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
        const productId = link.dataset.productId;

        const inputValue =Number(document.querySelector(`.js-quantity-input-${productId}`).value) 

        const container = document.querySelector(
        `.js-cart-item-container-${productId}`
        );
        container.classList.remove('is-editing-quantity');
        updateQuantity(productId,inputValue)

        const quantityLabel = document.querySelector(
        `.js-quantity-label-${productId}`
        );
        quantityLabel.innerHTML = inputValue;

        updateCartQuantity()
        play()
        renderPaymentSummary()
        });
    });

    document.querySelectorAll('.js-delivery-option').forEach((element)=>{
        element.addEventListener('click',()=>{
            const productId = element.dataset.productId
            const delivaryOptionId = element.dataset.deliveryProductId
            updateDeliveryOption(productId,delivaryOptionId)
            play()
            renderPaymentSummary()
        })
    })
}
