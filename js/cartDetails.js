
let products = JSON.parse(localStorage.getItem("products"));
let productId = localStorage.getItem("productId");

let itemDom = document.querySelector(".item-details");

let productsDetailItem = products.find(item => item.id == productId )


itemDom.innerHTML = `
<img src="${productsDetailItem.ImageUrl}" alt="${productsDetailItem.title}">
<h2> ${productsDetailItem.title} </h2>
<p> ${productsDetailItem.desc} </p>
<span>Size : ${productsDetailItem.size}</span> <br>
<span>Quantity : ${productsDetailItem.qty}</span>

`;