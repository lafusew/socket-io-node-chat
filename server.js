//Node 12.16.1 ne supporte pas es6 sans config particuliere donc on ecrit les imports en require et pas d'arrow fonction

//import du module nomp express (les parenthese permettre de run express et de mettre dans app directement à l'import)
const app = require('express')();
//module http node et run imediat de la method create server avec l'app express en params
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let port = process.env.PORT;

if ( port == null || port == ''){
    port = 3000;
}

// module url de node
//const url = require('url');
//module de query (trucs apres le ? dans l'url)
//const query = require('querystring');


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})
app.get('/style.min.css', function (req, res) {
    res.sendFile(__dirname + '/style.min.css');
})
app.get('/style.min.css.map', function (req, res) {
    res.sendFile(__dirname + '/style.min.css.map');
})
app.get('/client.js', function (req, res) {
        res.sendFile(__dirname + '/client.js');
    })
    //comme app renvooie app on peut chainer les get (on pourrait utiliser)
    //dernier appel on fait un use 
    .use(function (req, res, next) {
        res.setHeader('Content-Type', 'text/plain');
        res.status(404)
        res.send(`Page not found`);
    });
//on utilise io.pour run tout ça lorsqu'un utilisateur se connecte
io.on('connection', function (socket) {
    console.log('an uuser connected')
    //on utilise socket.on comme event listener sur le socket avec le client
    socket.on('chat message', function (msg, username, msgColor, id) {
        console.log(`msg from ${id}`);
        //on emit globalement le chat message en passant tout les arguments récupéré du client pour les autres
        io.emit('chat message', msg, username, msgColor)
    });

    socket.on('disconnect', function () {
        console.log('an user has disconnected')
    });
});

//on ecoute un certain port
server.listen(port)








//basics avec node vanilla 

/*
const server = http.createServer(function(req, res) {

    console.log(req);

    //on viens recupérer l'url local (sur le server ducoup) demanqé par l'utilisateur via l'objet request
    let page = url.parse(req.url).pathname;
    console.log(page);
    // ici on recupere les parametre de la query en parsant l'url (on recuperer une string dans les parenthes et on le parse en sjon avec query.parse)
    let params = query.parse(url.parse(req.url).query);
    console.log(params);
    
    //c'est le code d'erreur que l'on renvoi dans la response
    res.writeHead(200);
    //end en node vanilla = le contenu que 
    if (page == "/"){
        res.writeHead(200 , {"Content-Type":"text/plain; charset=utf-8"});

        if( 'prenom' in params && 'nom' in params){
            res.write(`Page d'acceuil ê de ${params['prenom']} ${params['nom']}`)
        } else {
            res.write(`Page d'acceuil de l'inconu`)
        }

    } else if (page == "/contact"){
        res.writeHead(200)
        res.write('Ceci est une page de contact')
    } else {
        res.writeHead(200);
        res.write('page inconnue')
    }
    res.end();
    
});
    //on ecoute le port 3000 en local 
    server.listen('3000'); */