//Register User 

let username = document.querySelector("#id_username");
let email = document.querySelector("#id_email");
let pwd = document.querySelector("#id_password");

let register_btn=document.querySelector("#id_register")

//__________________________

register_btn.addEventListener("click",register);

function register(e){    
        e.preventDefault();
        
        if(username.value ==="" || email.value==="" || pwd.value===""){
            alert("Please Fill Data");
        }
        else{
            localStorage.setItem("username",username.value);
            localStorage.setItem("email",email.value);
            localStorage.setItem("password",pwd.value);
    
            setTimeout(()=>{
                window.location = "login.html";
    
            },1000)
        }
    
    };