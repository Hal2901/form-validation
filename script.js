const divs = document.querySelectorAll(".form-input");
const user_password_input = Array.from(divs).find(div => div.id === "password").querySelector("input");
const user_password_error = Array.from(divs).find(div => div.id === "password").querySelector(".error");
const button = document.querySelector("button");

const nameRegExp = /\w{2,}/;
const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passRegExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

let pass;
let pass_confirm;

// const passRegExp_1Number = /^(?=.*[0-9])$/;
// const passRegExp_1Symbol = /^(?=.*[!@#$%^&*])$/;
// const passRegExp_1Uppercase = /^(?=.*[A-Z])$/;
// const passRegExp_8Characters = /^.{8,}$/;

// function showCondition() {
//     if (!passRegExp_1Number.test(e.value)) {

//     }
// }

//check if the input is valid according to pattern
function isValid(input, regExp) {
    return (regExp.test(input.value)) ? "valid" : "invalid";
}
//check if the 2 pass are same
function isPassSame(pass, pass_confirm) {
    // user_password_input.className = isValid(user_password_input, passRegExp);
    // if (user_password_input.className === "invalid") return "invalid";
    return (pass !== pass_confirm) ? "invalid" : "valid";
}
//show error if invalid input
function showError(input, error) {
    if (input.className === "invalid") {
        switch (input.id) {
            case "user-email":
                error.textContent = "Invalid Email Format";
                break;

            case "user-password":
                error.textContent = "Password does not meet the requirements below";
                break;

            case "user-confirm":
                error.textContent = "Password does not match";
                user_password_input.className = "invalid";
                break;
        }
    }
    else if (input.className === "valid") {
        if (input.id === "user-confirm") {
            user_password_input.className = isValid(user_password_input, passRegExp);
        }
        error.textContent = "";
        return;
    }

    // if (input.value.length === 0) {
    //     if (input.id === "phone-number") {}
    //     else {
    //         input.className = "invalid";
    //         error.textContent = "Please fill the blank";
    //     }
        
    //     if (input.className === "valid") {
    //         error.textContent = "";
    //     }
    // }
}
//check if input is blank
function ifBlank(input, error, blank) {
    if (blank === 0) {
        if (input.id === "user-confirm") {
            user_password_input.className = isValid(user_password_input, passRegExp);
            
            if (user_password_input.value.length === 0) {
                user_password_input.className = "";
            }
        }
        input.className = "";
        error.textContent = "";
    }
}

divs.forEach(div => {
    const input = div.querySelector("input");
    const error = div.querySelector("span.error");

    input.addEventListener("input", () => {
        switch (input.id) {
            case "last-name":
            case "first-name":
                input.className = isValid(input, nameRegExp);
                showError(input, error);
                if (input.value.length === 0) {input.className = ""};
                break;

            case "user-email":
                ifBlank(input, error, input.value.length);
                break;
            
            // case "phone-number":
            //     input.className = isValid(e.target, phoneRegExp);
            //     if (e.target.value.length === 0) {input.className = ""};
            //     break;

            case "user-password":
                pass = input.value;
                // showCondition(pass);
                input.className = isValid(input, passRegExp);
                showError(input, error);
                ifBlank(input, error, input.value.length);
                break;

            case "user-confirm":
                pass_confirm = input.value;
                ifBlank(input, error, input.value.length);
                break;
        }
    });

    input.addEventListener("blur", () => {
        switch (input.id) {
            case "user-email":
                input.className = isValid(input, emailRegExp);
                showError(input, error);
                ifBlank(input, error, input.value.length);
                break;

            case "user-password":
                div.querySelector(".instruction").style.display = "none";
                ifBlank(input, error, input.value.length);
                break;

            case "user-confirm":
                input.className = isPassSame(pass, pass_confirm);
                showError(input, error);
                ifBlank(input, error, input.value.length);
                break;
        }
    });

    input.addEventListener("focus", () => {
        if (input.id === "user-password") {
            div.querySelector(".instruction").style.display = "block";
        }
    });

});

// button.addEventListener("click", (e) => {
//     e.target.disabled = false;
//     divs.forEach(div => {
//         const input = div.querySelector("input");
//         const error = div.querySelector("span.error");

//         if (input.value.length === 0) {
//             showError(input, error);
//         }
//         if (input.className === "invalid") {
//             e.target.disabled = true;
//         }
//         else if (input.className === "valid") {
//             e.target.removeAtrribute("disabled");
//         }
//     });

    
// console.log(e.target.disabled);
// });



