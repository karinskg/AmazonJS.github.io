import {cart,addToCart,calculateCartQuantity} from '../data/cart.js'
import {products,loadProducts} from '../data/products.js'

loadProducts(renderproducts)
function renderproducts(){
    let productHTML = ''
    updateCartQuantity()
    products.forEach((product)=>{
        productHTML +=`
        <div class="product-container">
            <div class="product-image-container">
            <img class="product-image"
                src=${product.image}>
            </div>

            <div class="product-name limit-text-to-2-lines">
            ${product.name}
            </div>

            <div class="product-rating-container">
            <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
                ${product.rating.count}
            </div>
            </div>

            <div class="product-price">
            $${(product.priceCents/100).toFixed(2)}
            </div>

            <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}" >
            <img src="images/icons/checkmark.png">
            Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id ="${product.id}">
            Add to Cart
            </button>
        </div>`
    })

    document.querySelector('.js-products-grid').innerHTML = productHTML

    function updateCartQuantity(){
        const cartQuantity = calculateCartQuantity()
        document.querySelector('.cart-quantity').innerHTML = cartQuantity
    }



    function setTimeouts(productId){
        document.querySelector(`.js-added-to-cart-${productId}`).classList.add('added-to-cart-visible')

        let addedMessageTimeoutId;
        if (addedMessageTimeoutId) {
            clearTimeout(addedMessageTimeoutId);
        }

        const SetTime = setTimeout(()=>{
            document.querySelector(`.js-added-to-cart-${productId}`).classList.remove('added-to-cart-visible')
        },2000)

        addedMessageTimeoutId = SetTime;
    }

    document.querySelectorAll('.js-add-to-cart').forEach((button) =>{
        button.addEventListener('click',()=>{
            const productId =button.dataset.productId
            addToCart(productId)
            setTimeouts(productId)
            updateCartQuantity()
        })
    })
}