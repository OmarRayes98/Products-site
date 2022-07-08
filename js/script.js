
//Define Products 
// -------------products-------------
let productsDom = document.querySelector(".products");
let carProductsMenu= document.querySelector(".cart-products");

let carProductsDivDom = document.querySelector(".cart-products div");
let badgeDom =document.querySelector(".badge");
let shoppingCard = document.querySelector(".shoppingCard");

// products is from data.js 
// let products = JSON.parse( localStorage.getItem("products"));
//Instead  productsDB that is from data.js (Database Name) :
let products = productsDB;
//_________________
let addedItem = [];


//Open Cart Menu
shoppingCard.addEventListener("click",openCardMenu);
//Display Products
let drawProductsUI;
(drawProductsUI =function(productsItems =[]){
    let productsUI = productsItems.map((item) => {
        return `
        <div class="product-item" style="border: ${item.isMe ==="Y" ? "2px solid green" : ""}">
        <img src="${item.ImageUrl}" class="product-item-img" alt="laptop">
        <div class="product-item-desc">
            <a onclick='saveItemData(${item.id})'> ${item.title}</a>
            <p> ${item.desc} </p>
            <span>Size : ${item.size} </span>

            ${item.isMe ==="Y" ? "<button class='edit-product' onclick='editProduct("+item.id+")'> Edit Product </button>" :""}
        </div>
        <div class="product-item-actions">
            <button class="add-to-cart" data-item-id=${item.id}  onclick="addToCart(event)">Add To Cart</button>
            <i class="favorite far fa-regular fa-heart" style="color:${item.liked===true?"red":""}
            " onclick="addToFavorite(${item.id})"></i>
        </div>
    </div>`;
    }).join("");

    productsDom.innerHTML = productsUI;

})(JSON.parse(localStorage.getItem('products')) || products ); // invoke function 

//_________________________________________

//Check if there is items in LocalStorage For Cart Menu
//cartMenuData
    addedItem = localStorage.getItem("productsInCart") ?  JSON.parse(localStorage.getItem("productsInCart")) : [];
    

// console.log(addedItem); // if [] the length is 0 
if(addedItem.length !=0){
    addedItem.map(item => {
        carProductsDivDom.innerHTML +=`<p style="margin-bottom: 5px;"> ${item.title} ${item.qty}</p>`;
    });

    badgeDom.style.display="block";
    badgeDom.innerHTML = addedItem.length;
}
else{
    badgeDom.style.display="none";
}



//_____________________________________________________
//Add form database  to Cart menu by id and put them in LocatStorage else login

function addToCart(event){
    let idItem = event.target.dataset.itemId; 
    //console.log(typeof idItem); //string , so should convert to number 

    if(localStorage.getItem('username')){

        //because now We Can Create Prodct after run time 
        //so to get id from localStorage OR if localStorage is empty get from prodctsDB    
        let productsForAdd = JSON.parse(localStorage.getItem('products')) || products; 
        let choosenProduct = productsForAdd.find(item => item.id === parseInt(idItem));
        
        let isProductInCart = addedItem.some (i => i.id === choosenProduct.id);


        if(isProductInCart){
            // choosenItemById.qty +=1;
            addedItem.map(p => {
                //
                if(p.id=== choosenProduct.id){
                    p.qty +=1;
                }else{
                    return p;
                }
            })
        }else{

            // let oldQty = typeof addedItem.find(item => item.id === choosenItemById.id) !== 'undefined' ? addedItem.find(item => item.id === choosenItemById.id) :0;
            // // console.log(oldQty);
            // if(oldQty===0){choosenItemById.qty +=oldQty;} else{choosenItemById.qty +=oldQty.qty}

            addedItem.push(choosenProduct);
            
        }


        // carProductsDivDom.innerHTML +=`<p style="margin-bottom: 5px;"> ${choosenItemById.title}</p>`;
    
       // addedItem = [choosenItemById,...addedItem ];

        // not to repeat id (product) inside cartMenu
        //let uniqueProducts = getUniqueArr(addedItem,"id");

        //empty the old products then by foreach add old and new products 
        carProductsDivDom.innerHTML ="";
        
        addedItem.forEach(item => {
            carProductsDivDom.innerHTML +=`<p style="margin-bottom: 5px;"> ${item.title} ${item.qty}</p>`;
        })

        //Save Data 
        localStorage.setItem('productsInCart', JSON.stringify(addedItem));

        //get the number of items in cart menu
        //let cartProductsItems = document.querySelectorAll(".cart-products div p"); /*count of p in div that I put the items inside*/
        //OR length from addItem
        //Add counter of items
        badgeDom.style.display="block";
        badgeDom.innerHTML = addedItem.length;   
    }
    else{
        window.location="login.html";
    }
}

function getUniqueArr(arr , filterType){
    //[1,1,1]
    //console.log(arr);
    let unique =arr // instead of indexOf use lastIndexOf
    .map(item => item[filterType])//[1,1,1]
    .map((item,index , final) => final.indexOf(item) ===index && index)//[0,false,false]
    //filter to delete false of final array 
    .filter(item => arr[item])//[0]
    .map(item => arr[item]);//[{....}]
    
    // unique.sort((a, b) => {
    //     let fa = a.title.toLowerCase(),
    //         fb = b.title.toLowerCase();
    
    //     if (fa < fb) {
    //         return -1;
    //     }
    //     if (fa > fb) {
    //         return 1;
    //     }
    //     return 0;
    // });

    return unique;
}

/*
    let uniqueSet = new Set(unique);
    let s = [...uniqueSet]
    let uniqueMap= s.map( item => arr.find(idd => item ==idd.id));
    console.log(uniqueMap)
*/
//OR
//onclick(${item.id}) ===> in HTML
// function addToCart(id){
    
//     //let choosenItemId = products.find(item => item.id ===id);
//     console.log(id);

// }

//__________________________________________

//Open Cart Menu by shopping click
function openCardMenu(){

if(carProductsDivDom.innerHTML!=""){ //if there are items in cart menu or not

    
    // carProductsMenu.classList.toggle("cart-products-toggle");

    //OR without Class 
   
    if(carProductsMenu.style.display =="block"){

        carProductsMenu.style.opacity=0;

        carProductsMenu.addEventListener('transitionend', function(e) {

        carProductsMenu.style.display="none";}
        , {
            capture: false,
            once: true,
            passive: false
        });

    }else{
        carProductsMenu.style.display="block";

        setTimeout(function () {
        carProductsMenu.style.opacity=1;
        }, 20);


}
} //end if 

}

//Save id product for knowing which product will be showed in productDetails.html 
function saveItemData(id){
    localStorage.setItem('productId',id);
    window.location = "cartDetails.html";

}

//_____________________________________________search Function

let inputSearch = document.querySelector("#id_search");

inputSearch.addEventListener("keyup",function(e){


    if(inputSearch.value.trim()===""){
        drawProductsUI(products);
        return;
    }
    // if(e.keyCode===13){
        //e.target.value OR inputSearch.value
        search(inputSearch.value,JSON.parse(localStorage.getItem("products")));
    // }


});

function search(title , myArray){

    // for(let i =0; i< myArray.length ; i++){
    //     if(myArray[i].title === title){ console.log(myArray[i])
    //     } }

    //OR other better way 
    let arr_serach = myArray.filter ((item) => item.title.toLowerCase().indexOf(title.toLowerCase()) != -1);
    drawProductsUI(arr_serach);
    // console.log(arr_serach);
}

//--------------------------------------------------------------------------
//_____________ADD to Favorite _______________________

//To get = saved favorite items and if there no favorite will be []
let favoriteItems =localStorage.getItem("productsFavorite") ? 
                    JSON.parse(localStorage.getItem("productsFavorite")) 
                    : [];

function addToFavorite(id){
    

    if(localStorage.getItem('username')){


        products = JSON.parse(localStorage.getItem("products"));

        let choosenProduct = products.find(item => item.id ===id);

        let isProductInFavorite = favoriteItems.some (i => i.id === choosenProduct.id);

        if(isProductInFavorite){

            favoriteItems.map(p => {
                
                if(p.id=== choosenProduct.id){
                    //add property : liked
                    choosenProduct.liked =true;
                }else{
                    return p;
                }
            })
        }else{
            favoriteItems.push(choosenProduct);
        }

        //all items with property : liked
        //favoriteItems =[choosenItemById,...favoriteItems ];

        //let uniqueProducts = getUniqueArr(favoriteItems,"id");

        localStorage.setItem('productsFavorite', JSON.stringify(favoriteItems));
        
        products.map(item =>{
            if(item.id=== choosenProduct.id){
                item.liked=true;
            }
            console.log(item);

        })
    
        localStorage.setItem("products",JSON.stringify(products));
        drawProductsUI(products);
    }
    else{
        window.location="login.html";
    }
}

//____________________________________________
//Filter Product By Size

let sizeFilter = document.getElementById('size-filter');

sizeFilter.addEventListener('change',getProductsFilterBySize);

function getProductsFilterBySize(e){

    let val = e.target.value;

    let products = JSON.parse(localStorage.getItem("products")) || products

    if(val=== 'all'){
        drawProductsUI(products);
    }else{
        products = products.filter(i => i.size === val);
        drawProductsUI(products);
    }
}

//_____________________________________
//Edit Product 

function editProduct(id){
    localStorage.setItem("editProduct",id);

    window.location = "editProduct.html";
}