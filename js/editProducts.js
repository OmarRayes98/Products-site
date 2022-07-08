// Variables 

let products = JSON.parse(localStorage.getItem('products')) || productsDB ;
let prodctId = JSON.parse(localStorage.getItem("editProduct"));

let getProduct = products.find(i=> i.id ===prodctId);

let productName = document.getElementById('product-name');
let productDesc = document.getElementById('product-desc');
let productSizeSelect = document.getElementById('product-size');
let inputFileImage =document.getElementById('upload-image-file');
let updateForm = document.getElementById('update-form');
// let productSizeValue;
let productImage;

//get data from item that I clicked 
//Before Update
productName.value = getProduct.title;
productDesc.value= getProduct.desc;
productSizeSelect.value=getProduct.size;
productImage= getProduct.ImageUrl;

//____________________

//Events
// productSizeSelect.addEventListener('change',getProductSizeValue);
updateForm.addEventListener('submit',updateProductFun)
inputFileImage.addEventListener('change',uploadImage)


//Functions
// function getProductSizeValue(e){
//     productSizeValue =e.target.value;
// }

function updateProductFun(e){
    e.preventDefault();
    
    getProduct.title= productName.value;
    getProduct.desc = productDesc.value;
    getProduct.size =productSizeSelect.value;
    getProduct.ImageUrl = productImage;

    //After Update

    localStorage.setItem("products",JSON.stringify(products));

    setTimeout( () => {
        window.location = "index.html";
    }, 500)

}

// uploadImage
function uploadImage (){

    let file = this.files[0];
    
    let types = ["image/jpeg" ,"image/png"];

    if(types.indexOf(file.type) == -1 ){
        alert("Type not Supported");
        return;
    }

    if(file.size > 2* 1024 *1024){
        alert("Image not Exced 2MG");
        return;
    }

    //productImage = URL.createObjectURL(file);
    getImageBase64(file);
    
}

function getImageBase64(filee){
    let reader = new FileReader();

    reader.readAsDataURL(filee);
    console.log(reader.result);

    reader.onload = function(){
        productImage = reader.result;
        console.log(reader.result);
    }


    reader.onerror =function(){
        alert("Error !");
    }
}