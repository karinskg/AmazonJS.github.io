export let cart = JSON.parse(localStorage.getItem('cart'))

if(!cart){
    cart= [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 5,
    delivaryOptionId: '1'
    },{
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 2,
    delivaryOptionId: '2'
    }]
} 

export function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart))
}



export function calculateCartQuantity(){
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
    });
    return cartQuantity
}

export function addToCart(productId){
    let matchingItem;
    const selectValue = document.querySelector(`.js-quantity-selector-${productId}`).value
    cart.forEach((CartItem)=>{
        if(productId === CartItem.productId){
            matchingItem = CartItem
        }
    })

    if(matchingItem){
        matchingItem.quantity += 1
    }else{
        cart.push({
            productId: productId,
            quantity: Number(selectValue),
            delivaryOptionId: '1'
        })
    }
    saveToStorage()
}

export function removeFromCart(productId){
    let newCart=[]
    cart.forEach((cartItem)=>{
        if(cartItem.productId !== productId){
            newCart.push(cartItem)
        }
    })
    cart= newCart
    saveToStorage()
}

export function updateQuantity(productId, newQuantity) {
    let matchingItem;
  
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    matchingItem.quantity = newQuantity;
  
    saveToStorage();
}

export function updateDeliveryOption(productId,delivaryOptionId){
    let matchingItem;
  
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.delivaryOptionId = delivaryOptionId
    saveToStorage()
}