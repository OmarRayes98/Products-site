let products = JSON.parse(localStorage.getItem('products')) || productsDB;
let myProducts = products.filter((item) => item.isMe ==='Y');

let noProductsDom = document.querySelector(".noProducts");
let productsDom = document.querySelector(".products");


if(myProducts.length !=0){

    drawMYProductsUI(myProducts);
}
else{

    noProductsDom.innerHTML=`There is no Products !!!`;
}

//____________________________


function drawMYProductsUI(productsItems =[]){
    let productsUI = productsItems.map((item) => {
        return `
        <div class="product-item" style="border: ${item.isMe ==="Y" ? "2px solid green" : ""}">
        <img src="${item.ImageUrl}" class="product-item-img" alt="laptop">
        <div class="product-item-desc">
            <a onclick='saveItemData(${item.id})'> ${item.title}</a>
            <p> ${item.desc} </p>
            <span>Size : ${item.size} </span>
            <div class="display-btn">
            <button class='edit-product' onclick='editProduct(${item.id})'> Edit Product </button>
        
            <button class='edit-product' onclick='deleteProduct(${item.id})'> Delete Product </button>
            </div>
            </div>
            
        <div class="product-item-actions">
        </div>

    </div>`;
    }).join("");

    productsDom.innerHTML = productsUI;

};

//___________________
//Edit Product 

function editProduct(id){
    localStorage.setItem("editProduct",id);

    window.location = "editProduct.html";
}


function deleteProduct(id){
    
    let products = JSON.parse(localStorage.getItem('products'));

    //For Showing ( HTML)
    let filtered = products.filter((item)=> item.id != id && item.isMe==='Y');
    console.log(filtered)
    
    if(filtered.length !=0){
        
        drawMYProductsUI(filtered);
        }

        else{
        drawMYProductsUI(filtered);
        noProductsDom.innerHTML=`There is no Products !!!`; 
    }

    //For DataBase

    let filteredById =products.filter((item)=> item.id != id );

    localStorage.setItem("products",JSON.stringify(filteredById));



}