const form = document.body.querySelector('form');
const input = document.body.querySelector('input');
const conversation = document.body.querySelector('#conversation');

const socket = io();

input.focus();

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    console.log(input.value)

    socket.emit('chat message', input.value);

    input.value = '';
    input.focus();

    return false;
})

socket.on('chat message', function (msg) {
    conversation.innerHTML += `<li>${msg}</li>`;
})