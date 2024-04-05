
const container = document.getElementById('container');
const registerBtn = document.getElementById('toggle1');
const loginBtn = document.getElementById('toggle2');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});