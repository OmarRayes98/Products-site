let userInfo = document.querySelector("#user_info");
let userDom = document.querySelector("#user");

let navLinks = document.querySelector("#id_links");

let logout = document.querySelector("#id_logout");

//________________________

let username =localStorage.getItem("username");
// console.log(username); // null if it's not exsited

//this condtion for : checking from exist user or not
if(username){
    // console.log("yes");
    navLinks.remove(); // OR navLinks.style.display="none";
    userInfo.style.display="flex";
    userDom.innerHTML=username;
}

logout.addEventListener("click", function(){
    localStorage.clear();
    
    setTimeout(() => {
        window.location="register.html";
    }, 1000);
});

function bobo (){
    console.log("I;sm bobob");
}