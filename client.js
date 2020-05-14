const form = document.body.querySelector('#chatForm');
const input = document.body.querySelector('#message');
const scrollDiv = document.body.querySelector('#conversationContainer');
const conversation = document.body.querySelector('#conversation');
const usernameForm = document.body.querySelector;

let username = '';
let msgColor = '';

//on met en place le socket
const socket = io();


conversation.innerHTML += `<li class="usernameDisplay">Console</li><li style="background-color:red; color:white">Try typing /help before strating using this node.js chat.</li>`;
scrollDiv.scrollBy(0, 100);

input.focus();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = input.value

    //on recupere le premier mot pour savoir  s'il y a utilisation de commandes
    const tempMsgArray = msg.split(' ');

    //si la premier lettre c'est un / alors le client utilise une commande; on appelle la fonction qui gere les commande
    if (msg.charAt(0) == '/') {
        commandHandler(tempMsgArray);
    } else {
        //sinon check que l'utilisateur a set un nom
        if (username !== '') {
            //si oui on envoie au serveur node son msg, nom , color choisi et id (pour l'implementation d'un /mute)
            socket.emit('chat message', msg, username, msgColor, socket.id);
        } else {
            consoleDisplay('noname')
        }
    }

    input.value = '';
    input.focus();

    return false;
})

//lors de la reception d'un message on executera la fonction avec tout ces params qui sont passé par le server node js
socket.on('chat message', (msg, username, msgColor, id) => {
    conversation.innerHTML += `<li class="usernameDisplay">${username}</li><li style="background-color:${msgColor}; color:${blackOrWhiteText(msgColor)}">${msg}</li>`;
    scrollDiv.scrollBy(0, 100);
})

function commandHandler(tempMsgArray) {

    console.log('Command used')
    //tempMsgArray est le tableau des mots de l'input de command
    switch (tempMsgArray[0]) {
        case '/setcolor':
            msgColor = tempMsgArray[1];
            consoleDisplay('setcolor');
            break;
        case '/setname':
            if (tempMsgArray.lenght > 2) {
                //ce code de se run jamais tempMsgArray.lenght est undefined
            } else {
                username = tempMsgArray[1];
                consoleDisplay('setname')
            }
            break;
        case '/help':
            consoleDisplay('help');
            break;
        default:
            consoleDisplay('unknown')
            break;
    }
}

function consoleDisplay(error) {
    let bgColor;
    let color = 'black';
    let consoleMsg;

    switch (error) {
        case 'noname':
            bgColor = 'red';
            color = 'white'
            consoleMsg = 'You must choose a username, try /setname yourName (no space allowed)';
            break;
        case 'setcolor':
            bgColor = msgColor;
            color = blackOrWhiteText(bgColor);
            consoleMsg = `You just set your color on ${msgColor}`;
            break;
        case 'setname':
            bgColor = 'red';
            color = 'white';
            consoleMsg = `You'll be called ${username}`;
            break;
        case 'help':
            bgColor = 'red';
            color = 'white';
            consoleMsg = `For now, u have only 2 commands perfectly working : <br> /setname "yourName" <br> /setcolor "colorname" (colors allowed <a target="_blank" href="https://www.w3schools.com/cssref/css_colors.asp">here</a>, not all are working, u may have problem with dark colors )`;
            break;
        case 'unknown':
            bgColor = 'red';
            color = 'white';
            consoleMsg = `Unknown command`;
            break;
        default:
            bgColor = 'yellow';
            color = 'black'
            consoleMsg = `Normally, u'll never seen this message on ur screen (jul the best)`
            break;
    }
    scrollDiv.scrollBy(0, 100);

    conversation.innerHTML += `<li class="usernameDisplay">Console :</li><li style="background-color:${bgColor}; color:${color}">${consoleMsg}</li>`;
}

function blackOrWhiteText(bgColor) {
    switch (bgColor) {
        case 'blue':
            return 'white';
        case 'lightblue':
            return 'black';
        case 'green':
            return 'white';
        case 'lightgreen':
            return 'black';
        case 'steelblue':
            return 'white';
        case 'orange':
            return 'white';
        default:
            return 'black';
    }
}