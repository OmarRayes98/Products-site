let producttsInCart = localStorage.getItem('productsInCart');
let badgeDom =document.querySelector(".badge");

let productsDom = document.querySelector(".products");
let noProductsDom = document.querySelector(".noProducts");
let items = [];


if(JSON.parse(producttsInCart).length !=0){
    items =JSON.parse(producttsInCart);

    badgeDom.style.display="block";
    badgeDom.innerHTML = items.length;

    drawCartProductsUI(items);
}
else{

    noProductsDom.innerHTML=`There is no Items !!!`;
    badgeDom.style.display="none";

}

function drawCartProductsUI(products){
    let productsUI = products.map((item) => {
        return `
        <div class="product-item">
        <img src="${item.ImageUrl}" class="product-item-img" alt="laptop">
        <div class="product-item-desc">
            <h2> ${item.title}</h2>
            <p> ${item.desc}</p>
            <span>Size : ${item.size} </span> <br>
            <span data-price=${item.qty}>Quantity : ${item.qty} </span>
        </div>

        <div class="product-item-actions">
            <button class="add-to-cart"   onclick="removeFromCart(event,${item.id})">Remove From Cart</button>
            <i class="favorite far fa-heart"></i>
        </div>
    </div>`;
    }).join("");

    productsDom.innerHTML = productsUI;

};

function removeFromCart(e,id){

    //items = localStorage.getItem('productsInCart');


    let qtyItem = e.target.parentElement.previousElementSibling.lastElementChild.dataset.price;

    if(parseInt(qtyItem) ===1){

        //To remove item completly

        items= items.filter((item) => item.id !=id);
        // console.log(items);

        localStorage.setItem('productsInCart',JSON.stringify(items));
        //drawCartProductsUI(items);
        // //OR for delete from html instead of drawCartProductsUI
        e.target.parentElement.parentElement.remove();

        //Check if there no item in HTML 
        if(items.length ===0){
            noProductsDom.innerHTML=`There is no Items !!!`;
            badgeDom.style.display="none";

        }else{

             //get the number of items in cart menu
            badgeDom.style.display="block";
            badgeDom.innerHTML = items.length;   
        }
    }

    else{

        // to decrease qty of item if has qty more than 1
        let titleID, sizeID;

        qtyItem = qtyItem -1;

        //map : for check all items 
        //If : to know which item has to update 

        let updateQty_Items= items.map((item)=>{

            // I can put inside if :  e.target.parentElement.previousElementSibling.innerHTML =` or make varibles (titleID or sizeId) then use them in the end 
            if(item.id===id){
                item.qty=qtyItem;
                titleID=item.title;
                sizeID =item.size;

            }

            return item;
        });

        localStorage.setItem('productsInCart',JSON.stringify(updateQty_Items));

        //drawCartProductsUI(items);
        // //OR for Update from html instead of drawCartProductsUI
        e.target.parentElement.previousElementSibling.innerHTML =`
        <h2> ${titleID}</h2>
        <p> Lorem ipsm , dolor sit amet consectetur. </p>
        <span>Size : ${sizeID} </span> <br>
        <span data-price=${qtyItem}>Quantity : ${qtyItem} </span>
        `;
        
    }
}