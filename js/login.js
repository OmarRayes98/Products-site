let username = document.querySelector("#id_username");
let pwd = document.querySelector("#id_password");

let loginBtn = document.querySelector("#id_sign_in");

//_______________________

let getUser = localStorage.getItem("username");
let getPassword = localStorage.getItem("password");

loginBtn.addEventListener("click", login);

function login(e){
    e.preventDefault();
    if(username.value ==="" || pwd.value===""){
        alert("Please Fill Data");
    }
    else{

        if(username.value.trim()=== getUser.trim() && pwd.value===getPassword){

            // console.log("test Login is correct");
            window.location = "index.html";
        }else{
            // console.log("username or password is wrong!!!");
            alert("username or password is wrong!!!");
        }

    }
};