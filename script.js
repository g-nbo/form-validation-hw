const regForm = document.getElementById("registration");
const userName = regForm.elements['username'];
const email = regForm.elements['email'];
const password = regForm.elements['password'];
const passwordCheck = regForm.elements['passwordCheck'];
const terms = regForm.elements['terms'];

const errorDisplay = document.getElementById("errorDisplay");

regForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const valid = validateSubmissions();

    if (valid) {
        let user = {
            username: userName.value.toLowerCase(),
            email: email.value,
            password: password.value
        };
        localStorage.setItem(userName.value.toLowerCase(), JSON.stringify(user));

        regForm.submit();
        alert("successful submission");
    }
})

function validateSubmissions(event) {
    const valName = validateName();
    const valEmail = validateEmail();
    const valPassword = validatePassword();
    const valTerms = validateTerms();
    const valUniqueName = validateUniqName();

    if (valName === false) {
        return false;
    }
    if (valEmail === false) {
        return false;
    }
    if (valPassword === false) {
        return false;
    }
    if (valTerms === false) {
        return false;
    } if (valUniqueName === false) {
        return false;
    } else {
        return true;
    }
}

function validateName() {
    hashSet = new Set([]);
    for (i = 0; i < userName.value.length; i++) {
        hashSet.add(userName.value[i]);
    }
    if (userName.value === '') {
        errorDisplay.style.display = "block"
        errorDisplay.textContent = "The username cannot be blank."
        userName.focus();
        return false;
    } else if (userName.value.length < 4) {
        errorDisplay.style.display = "block"
        errorDisplay.textContent = "The username must be at least four characters long."
        userName.focus();
        return false;
    } else if (hashSet.size < 2) {
        errorDisplay.style.display = "block"
        errorDisplay.textContent = "The username must contain at least two unique characters."
        userName.focus();
        return false;
    } else {
        return true;
    }
}

function validateEmail() {
    const re = new RegExp("(?=.*@)(?!.*example).*");
    if (!re.test(email.value)) {
        errorDisplay.style.display = "block"
        errorDisplay.textContent = "The email must not be from the domain 'example.com.'"
        email.focus();
        return false;
    } else {
        return true;
    }
}

function validatePassword() {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$")
    if (password.value.length < 12) {
        errorDisplay.style.display = "block"
        errorDisplay.textContent = "Passwords must be at least 12 characters long."
        password.focus();
        return false;
    } else if (password.value.toLowerCase().includes("password")) {
        errorDisplay.style.display = "block"
        errorDisplay.textContent = "Passwords cannot contain the word 'password' (uppercase, lowercase, or mixed)."
        password.focus();
        return false;
    } else if (password.value.toLowerCase().includes(userName.value.toLowerCase())) {
        errorDisplay.style.display = "block"
        errorDisplay.textContent = "Passwords cannot contain the username."
        password.focus();
        return false;
    } else if (re.test(password.value)) {
        errorDisplay.style.display = "block";
        errorDisplay.textContent =
            `
        Passwords must have at least one uppercase and one lowercase letter.
        Passwords must contain at least one number.
        Passwords must contain at least one special character.
        `
        password.focus();
        return false;
    } else if (password.value !== passwordCheck.value) {
        errorDisplay.style.display = "block";
        errorDisplay.textContent = `Both passwords must match.`
        password.focus();
        return false;
    } else {
        return true;
    }
}

function validateTerms() {
    if (!terms.checked) {
        errorDisplay.style.display = "block";
        errorDisplay.textContent = `The terms and conditions must be accepted.`
        terms.focus();
        return false;
    } else {
        return true;
    }
}



function validateUniqName() {
    if (JSON.parse(localStorage.getItem(userName.value))) {

        return false;
    } else {

        return true;
    }
}

const logForm = document.getElementById("login");
const logUserName = logForm.elements['username'];
const logPass = logForm.elements['password'];
const keepLogin = logForm.elements['persist'];

logForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let loginInfo = localStorage.getItem((logUserName.value))

    const validLogin = valLogin();
    if (validLogin) {
        logForm.submit();

        if (keepLogin.checked) {
            alert("successful login! Keeping you logged in!");
        } else {
            alert("successful login!");
        }
    }
})

function valLogin() {
    const valLogUser = validUserLog();
    const valLogPass = validPassLog();

    if (valLogUser === false) {
        return false;
    }
    if (valLogPass === false) {
        return false;
    }
    return true;
}

function validUserLog() {
    if (logUserName.value === '') {
        alert("Empty Username")
        return false;
    } else if (localStorage.getItem(logUserName.value)) {
        return true;
    } else {
        alert("Do not recognize your password and login");
        return false;
    }
}

function validPassLog() {
    const loginInfo = localStorage.getItem((logUserName.value))

    if (logPass.value === "") {
        alert("Empty Password")
        return false;
    } if (logUserName.value === "") {
        return false;
    } else if (JSON.parse(loginInfo).password === logPass.value) {
        return true;
    } else {
        alert("Do not recognize your password and login");
        return false;
    }
}

