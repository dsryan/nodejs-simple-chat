var net = require('net');

var sockets = [];

var server = net.createServer(function(socket){  
  sockets.push(socket);
  
  socket.on('data', function(data){
    for (sock in sockets) {
      if (sockets[sock] != socket)
        sockets[sock].write(data);
    }
  });
  
  socket.on('end', function(){
    var i = sockets.indexOf(socket);
    sockets.splice(i, 1); //splice(index, howmany)
  });
});

server.listen(8000);