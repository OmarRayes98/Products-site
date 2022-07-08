let producttsFavorites = localStorage.getItem("productsFavorite");
let productts = JSON.parse(localStorage.getItem("products"));

let badgeDom =document.querySelector(".badge");

let productsDom = document.querySelector(".products");
let noProductsDom = document.querySelector(".noProducts");
let items = [];


if(JSON.parse(producttsFavorites).length !=0){
    items =JSON.parse(producttsFavorites);

  /*  badgeDom.style.display="block";
    badgeDom.innerHTML = JSON.parse(localStorage.getItem("productsInCart")).length;*/

    drawFavoritsCartProductsUI(items);
}
else{

    noProductsDom.innerHTML=`There is no Items !!!`;
    //badgeDom.style.display="none";

}

function drawFavoritsCartProductsUI(products){
    let productsUI = products.map((item) => {
        return `
        <div class="product-item">
        <img src="${item.ImageUrl}" class="product-item-img" alt="laptop">
        <div class="product-item-desc">
            <h2> ${item.title}</h2>
            <p> ${item.desc} </p>
            <span>Size : ${item.size} </span> <br>
        </div>

        <div class="product-item-actions">
            <button class="add-to-cart"   onclick="removeFromCart(event,${item.id})">Remove From Favorite</button>
            <i class="favorite far fa-heart"></i>
        </div>
    </div>`;
    }).join("");

    productsDom.innerHTML = productsUI;

};

function removeFromCart(e,id){

        //To remove item completly
        items= items.filter((item) => item.id !=id);

        localStorage.setItem('productsFavorite',JSON.stringify(items));

        // delete property liked from products 
        productts.map(item =>{
            if(item.id ===id){
                item.liked=false;
            }
        })
        localStorage.setItem('products',JSON.stringify(productts));


        //drawFavoritsCartProductsUI(items);
        // //OR for delete from html instead of drawCartProductsUI
        e.target.parentElement.parentElement.remove();

        
        //Check if there no item in HTML 
        if(items.length ===0){
            noProductsDom.innerHTML=`There is no Items !!!`;}
           /* badgeDom.style.display="none";

        }else{

             //get the number of items in cart menu
            badgeDom.style.display="block";
            badgeDom.innerHTML = JSON.parse(localStorage.getItem("productsInCart")).length;   
        }*/
}