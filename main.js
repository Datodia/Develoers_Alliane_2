const form = document.getElementById('my-form')
const nameInput = document.getElementById('name')
const surnameInput = document.getElementById('surname')
const addressInput = document.getElementById('address')
const dateInput = document.getElementById('date')
const sexInput = document.getElementById('sex')
const aboutInput = document.getElementById('about')
const error = document.getElementById('error')
const users = document.getElementById('users')
const btn = document.getElementById('my-btn')


let counter = 0;
btn.addEventListener("click", () => {
    counter++
});


const inputs = [nameInput, surnameInput, addressInput];
for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    input.addEventListener('input', function () {
        if (!hasAppError === true) return
        error.textContent = "";
        hasAppError = false;
    })

}



form.addEventListener('submit', onSumbit);


let hasAppError = false;


function isValidInput(name, surname, address) {
    if (name === "" || surname === "" || address === "") {
        return false;
    }

    return true;
}

function isAboutFill() {
    if (aboutInput.value != "") {
        return "Filled"
    } else {
        return 'Dont Filled'
    }
}


function draw() {

    let userFromLocalStorage = JSON.parse(localStorage.getItem('userData'))
    console.log(userFromLocalStorage)

    const userContainer = document.createElement("div")
    userContainer.classList.add("userContainer")
    userContainer.id = counter


    const userID = document.createElement("h1")
    userID.textContent = `ID: ${userFromLocalStorage[counter - userContainer.id].number}`
    userContainer.appendChild(userID)

    const userNameTag = document.createElement("h1")
    userNameTag.textContent = `Name: ${userFromLocalStorage[counter - userContainer.id].name} `
    userContainer.appendChild(userNameTag)

    const userSurameTag = document.createElement("h1")
    userSurameTag.textContent = `Surname:  ${userFromLocalStorage[counter - userContainer.id].lname}`
    userContainer.appendChild(userSurameTag)

    const userAddressTag = document.createElement("h1")
    userAddressTag.textContent = `Address:  ${userFromLocalStorage[counter - userContainer.id].adress}`
    userContainer.appendChild(userAddressTag)

    const userDateTag = document.createElement("h1")
    userDateTag.textContent = `Date of Birth:  ${userFromLocalStorage[counter - userContainer.id].data}`
    userContainer.appendChild(userDateTag)

    const userSexTag = document.createElement("h1")
    userSexTag.textContent = `sex:  ${userFromLocalStorage[counter - userContainer.id].sex}`
    userContainer.appendChild(userSexTag)

    const userAboutTag = document.createElement("h1")
    userAboutTag.textContent = 'About: ' + isAboutFill()
    userContainer.appendChild(userAboutTag)

    let open = document.createElement('button')
    open.textContent = "Open Note"
    userContainer.appendChild(open)
    open.onclick = function () {
        dialog.showModal()
        dialog.classList.toggle('showDialog')
    }



    let dialog = document.createElement('dialog')
    dialog.textContent = `About:   ${userFromLocalStorage[counter - userContainer.id].about}`
    userContainer.appendChild(dialog)

    let close = document.createElement('button')
    close.textContent = "Close"
    dialog.appendChild(close)
    close.onclick = function () {
        dialog.close();
        dialog.classList.toggle('showDialog')
    }



    const deleteButton = document.createElement("button")
    deleteButton.textContent = "Delete"
    deleteButton.addEventListener("click", () => {
        userContainer.remove()
    })
    userContainer.appendChild(deleteButton)

    for (let i = 0; i < userFromLocalStorage.length; i++) {
        users.appendChild(userContainer)
    }


}


//form submit handler
function onSumbit(event) {
    event.preventDefault();

    const userName = nameInput.value;
    const userSurname = surnameInput.value;
    const userAddress = addressInput.value;
    const userDate = dateInput.value;
    const userSex = sexInput.value;
    const userAbout = aboutInput.value;
    let userNumber = counter;

    let userData = [];
    let showData = {
        name: userName,
        lname: userSurname,
        adress: userAddress,
        data: userDate,
        sex: userSex,
        about: userAbout,
        number: userNumber
    };
    userData.push(showData);
    userData = userData.concat(JSON.parse(localStorage.getItem('userData') || '[]'))
    //console.log(userData)
    localStorage.setItem('userData', JSON.stringify(userData))



    const isValidValues = isValidInput(userName, userSurname, userAddress);

    if (!isValidValues) {
        error.textContent = 'Please fill all requaried inputs'
        hasAppError = true;
        return;
    }


    draw();

}


window.addEventListener('load', draw);

