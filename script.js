const divs = document.querySelectorAll(".form-input");
const user_pass_input = document.getElementById("user-password");
// const user_password_error = document.querySelector("input#user-password + span.error");
const user_pass_input_confirm = document.getElementById("user-confirm");
const user_pass_error = document.querySelector("input#user-confirm + span.error");
const form = document.querySelector("form");

const nameRegExp = /[a-zA-Z]{2,}/;
// const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passRegExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

let pass;
let pass_confirm;

// //check if the input is valid according to pattern
function isValid(input, regExp) {
    return (regExp.test(input.value)) ? true : false;
}

form.addEventListener("submit", (e) => {
    divs.forEach(div => {
        const input = div.querySelector("input");
        const error = div.querySelector("span.error");

        if (input.value.length === 0 || input.value == null) {
            if (input.id === "phone-number") {return};

            switch (input.id) {
                case "first-name": 
                case "last-name":
                    input.className = "invalid";
                    error.textContent = "Name is required";
                    break;

                case "user-email":
                    input.className = "invalid";
                    error.textContent = "Email is required";
                    break;

                case "user-password":
                case "user-confirm":
                    input.className = "invalid";
                    error.textContent = "Password is required";
                    break;
            }
            e.preventDefault();
        }

        if (input.className === "invalid") {
            e.preventDefault();
        }  
    });
});

divs.forEach(div => {
    const input = div.querySelector("input");
    const error = div.querySelector("span.error");
    

    input.addEventListener("focus", () => {
        switch (input.id) {
            case "phone-number":
                return;

            case "user-password":
                div.querySelector(".instruction").style.display = "block";
        }

        input.className = "";
        error.textContent = "";
    });

    input.addEventListener("input", () => {
        switch (input.id) {
            case "last-name":
            case "first-name":
            case "user-email":
                if (input.value.length === 0) {
                    input.className = "";
                    error.textContent = "";
                }
                break;

            case "user-password":
                pass = input.value;
                if (input.value.length === 0) {
                    input.className = "";
                    error.textContent = "";
                }
                break;

            case "user-confirm":
                pass_confirm = input.value;
                if (input.value.length === 0) {
                    input.className = "";
                    error.textContent = "";
                }
                break;
        }
    });

    input.addEventListener("blur", () => {
        switch (input.id) {
            case "last-name":
            case "first-name":
                if (isValid(input, nameRegExp)) {
                    input.className = "valid";
                    error.textContent = "";
                }
                else {
                    input.className = "invalid";
                    error.textContent = "Name must be letters";
                }

                if (input.value.length === 0) {
                    input.className = "";
                    error.textContent = "";
                }
                break;

            case "user-email":
                if (isValid(input, emailRegExp)) {
                    input.className = "valid";
                    error.textContent = "";
                }
                else {
                    input.className = "invalid";
                    error.textContent = "Invalid Email";
                }

                if (input.value.length === 0) {
                    input.className = "";
                    error.textContent = "";
                }
                break;

            case "user-password":
                if (isValid(input, passRegExp)) {
                    input.className = "valid";
                    if (pass === pass_confirm) {
                        user_pass_input_confirm.className = "valid";
                    }
                    error.textContent = "";
                }
                else {
                    input.className = "invalid";
                    user_pass_input_confirm.className = "invalid";
                    user_pass_error.textContent = "";
                    error.textContent = "Invalid Password";
                }

                if (input.value.length === 0) {
                    input.className = "";
                    error.textContent = "";
                }
                break;
            
            case "user-confirm":
                if (isValid(user_pass_input, passRegExp)) {
                    user_pass_input.className = "valid";
                    if (pass === pass_confirm) {
                        input.className = "valid";
                        error.textContent = "";
                    }
                    else {
                        input.className = "invalid";
                        user_pass_input.className = "invalid";
                        error.textContent = "Unmatched Password";
                    }
                }
                else {
                    input.className = "invalid";
                }
                
                if (input.value.length === 0) {
                    input.className = "";
                    error.textContent = "";
                    if (isValid(user_pass_input, passRegExp)) {
                        user_pass_input.className = "valid";
                        error.textContent = "";
                    }
                }
                break;
        }

        if (input.id === "user-password") {
                div.querySelector(".instruction").style.display = "none";
            }
    });
    
});