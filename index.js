const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, { cors: { origin: "https://chat-tempo-real.vercel.app" } }); 
const cors = require('cors');

app.use(cors());

io.on('connection', (socket) => {
    console.log('Usuário conectado');

    //io.emit('conectado', 'Estou conectado!');

    socket.broadcast.emit('novo usuário', 'Estou conectado!')


    socket.on('set_username', username => {
        socket.data.username = username;
    })

    socket.on('message', (text) => {

      io.emit('receive_message', {
        text,
        authorId: socket.id,
        author: socket.data.username
      })
      // socket.broadcast.emit('message', {
      //   username: socket.data.username,
      // })
    })
    // socket.on('disconnect', (reason) => {
    //     console.log('Usuário desconetado');
    // })
    
  });
  app.get('/', (req, res) => {
  
      res.json({
          "nome": 200,
          "id": 0,
          "message": "Hello World!"
        
        });
  
  
  });
  
http.listen(5000, () => console.log('server in runing in 5000'));


