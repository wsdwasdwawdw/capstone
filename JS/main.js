const logshowhide = document.querySelector(".log-showhide");
const logpassword = document.getElementById("log-password");
const regshowhide = document.querySelector(".reg-showhide");
const regpassword = document.getElementById("reg-password");

const regform = document.querySelector(".reg-form");
const logform = document.querySelector(".login-form");

const sara = document.querySelector(".close");
const login_reg = document.querySelector(".login-reg");
const login = document.querySelector(".login");

const span = document.querySelectorAll(".logreg");

let logtoggle = true;
let regtoggle = true;
let logreg = true;


login.addEventListener("click", ()=>{
    login_reg.classList.remove("hide");
});

function Login(){
    login_reg.classList.remove("hide");
    regform.classList.remove("reg-form-hide");
    logform.classList.add("login-form-hide");
}

logshowhide.addEventListener("click", ()=>{

    if(logtoggle){
        logpassword.type = "text";
        logshowhide.src = "/img/show.png";
        logtoggle = false;
    }
    else{
        logpassword.type = "password";
        logshowhide.src = "/img/hide.png";
        logtoggle = true;
    }
});

regshowhide.addEventListener("click", ()=>{

    if(regtoggle){
        regpassword.type = "text";
        regshowhide.src = "/img/show.png";
        regtoggle = false;
    }
    else{
        regpassword.type = "password";
        regshowhide.src = "/img/hide.png";
        regtoggle = true;
    }
});

sara.addEventListener("click", ()=>{
    login_reg.classList.add("hide");
});

span.forEach(function(element) {
    element.addEventListener('click', function() {
        if(logreg){
            regform.classList.remove("reg-form-hide");
            logform.classList.add("login-form-hide");
            logreg = false;
        }
        else{
            regform.classList.add("reg-form-hide");
            logform.classList.remove("login-form-hide");
            logreg = true;
        }
    });
});

