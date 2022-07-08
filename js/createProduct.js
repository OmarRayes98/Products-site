// Variables 

let productName = document.getElementById('product-name');
let productDesc = document.getElementById('product-desc');
let productSizeSelect = document.getElementById('product-size');
let inputFileImage =document.getElementById('upload-image-file');
let createForm = document.getElementById('create-form');
// let productSizeValue;
let productImage;


//Events
// productSizeSelect.addEventListener('change',getProductSizeValue);
createForm.addEventListener('submit',createProductFun)
inputFileImage.addEventListener('change',uploadImage)


//Functions
// function getProductSizeValue(e){
//     productSizeValue =e.target.value;
// }


function createProductFun(e){
    e.preventDefault();

    let allProducts = JSON.parse(localStorage.getItem('products')) || productsDB;
    let nameValue =productName.value;
    let descValue =productDesc.value;
    // console.log(productSizeSelect.value);
    //Validation of Input :
    if( nameValue && descValue && productSizeSelect.value !=""){

        let obj ={
        
            id: allProducts ? allProducts.length +1 : 1 ,
            title: nameValue,
            desc: descValue,
            size:productSizeSelect.value,
            ImageUrl:productImage,
            qty:1,
            isMe:"Y",
        };
    
    
        let newProdcuts= allProducts ?  [...allProducts , obj] : [obj] ;// ما ضرورية لانو ما عاد رح يضيف على مصفوفة فاضيه طالما بالتعمليمة الاولى قلت :اذا الذاكرة المحلية فاضيه اجلب من القاعدة الاساسية داتا ج س
        localStorage.setItem("products",JSON.stringify(newProdcuts));
        
        // make the input is empty (Reset)
    
        productName.value="";
        productDesc.value="";
    
        productSizeSelect.value=""; // it mean I mention to value of the options that innerHTML is : "select vale"    

    } else{

        alert("Enter Data ....")
    }
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

    reader.onload = function(){
        productImage = reader.result;
    }


    reader.onerror =function(){
        alert("Error !");
    }
}