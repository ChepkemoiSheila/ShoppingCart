const allproducts = document.querySelector(".products-list")
const cartitemel = document.querySelector(".cart-items")
const subtotalel = document.querySelector(".subtotal")
const totalincartel = document.querySelector(".totalitemsincart")
function renderProducts(){
    products.forEach((product) =>{
        allproducts.innerHTML += `
   
        <div class="product">
        <div class= "productlistcontainer">
            <div class="card">
                <div class= "title">
                    ${product.name}

                </div>
                <div class= "image">
                <img src = "${product.imgSrc}">
                    </div>
                    <div class= "price">Price:
                        ${product.price}

                        </div>
                        <div class= "stock">In Stock:
                        ${product.instock}

                        </div>
                        <button onclick="addtoCart(${product.id})" class= "add" >Add To Cart</button>
                    
            
        </div> 
        
        
         `

        
    })
}
renderProducts();

//cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart()
//add to cart
function addtoCart(id){

    if(cart.some((item)=> item.id === id)){
        changenoofUnits("plus", id)
    }
    else{
        const item= products.find((product) => product.id === id)
        cart.push({
            ...item,
            numberofUnits:1
        });
        
    }
    updateCart();
   
}
function updateCart(){
renderCartItems();
renderSubtotal();
localStorage.setItem("CART", JSON.stringify(cart))
}
//save to local storage

//render total
function renderSubtotal(){
    let totalPrice = 0, 
    totalitems = 0;

cart.forEach((item)=>{
    totalPrice += item.price * item.numberofUnits;
    totalitems  += item.numberofUnits;
});
subtotalel.innerHTML = `Subtotal (${totalitems}items): $${totalPrice.toFixed(2)}`;
totalincartel.innerHTML = totalitems;
}//render cart items
function renderCartItems(){
    cartitemel.innerHTML = "";
    cart.forEach((item) =>{
        cartitemel.innerHTML += `
        <div class= "cartitem">
                            <div class="row">
                                    <div class="col-sm">
                                            <div class="item-info">
                                                    <img src="${item.imgSrc}" alt="t-shirt 1">
                                                    <h6>${item.name}</h6>
                                                </div>
                                    </div>
                                    <div class="col-sm">
                                            <div class="unit-price">
                                                    <small>$</small>${item.price}
                                                </div>
                                    </div>
                                    <div class="col-sm">
                                            <div class="units">
                                                    <div class="btn minus" onclick="changenoofUnits('minus', ${item.id})">-</div>
                                                    <div class="number">${item.numberofUnits}</div>
                                                    <div class="btn plus" onclick="changenoofUnits('plus', ${item.id})">+</div>           
                                                </div>
                                    </div>
                                    <div class="col-sm">
                                            <button onclick="removeitem(${item.id})">Remove</button>
                                    </div>
                                  </div><!-- render cart items here -->
                        </div>
        `
    })

}
//removeitems
function removeitem(id){
   cart= cart.filter((item)=> item.id!==id);
updateCart();
}
function changenoofUnits(action,id){
    cart= cart.map((item)=>{
    let numberofUnits = item.numberofUnits;
    
        if(item.id === id){
            if(action === "minus" && numberofUnits >1){
                numberofUnits--;
            }
            else if(action=== "plus" && numberofUnits < item.instock){
                numberofUnits++
            }

    }
    return {
        ...item,
        numberofUnits,
    };
    });
    updateCart()
}
    
    
    
 