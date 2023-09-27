const full_name = document.querySelectorAll("#first-name, #last-name");
const email = document.getElementById("user_email");
const phone = document.getElementById("phone-number");
// const pass = document.querySelectorAll("#password, #password-confirm");
const password = document.getElementById("password");
const password_confirm = document.getElementById("password-confirm");


function isValid(event, regExp) {
    if (event.target.value.length && regExp.test(event.target.value)) {
        console.log("true");
        return "valid";
    }
    else {
        console.log("false");
        return "invalid";
    }
}

full_name.forEach(user_name => {
    user_name.addEventListener("input", (e) => {
        const nameRegExp = /\w{1,}/;
        user_name.className = isValid(e, nameRegExp);
        console.log(user_name);
    });
});

email.addEventListener("input", (e) => {
    const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    email.className = isValid(e, emailRegExp);
    console.log(email);
});

phone.addEventListener("input", (e) => {
    const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    phone.className = isValid(e, phoneRegExp);
    console.log(phone);
});

// pass.forEach(user_pass => {
//     user_pass.addEventListener("input", () => {
//     });
// });

let pass = "";
let pass_confirm = "";

password.addEventListener("input", (e) => {
    pass = e.target.value;
    e.className = isPassSame(pass, pass_confirm);
    console.log(e.className);
});

password_confirm.addEventListener("input", (e) => {
    pass_confirm = e.target.value;
    e.className = isPassSame(pass, pass_confirm);
    console.log(e.className);
});

function isPassSame(pass, pass_confirm) {
    return (pass === pass_confirm) ? "valid" : "invalid";
}