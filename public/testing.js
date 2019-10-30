function testingHandler (msg) {
  console.log(msg);
}

function messageSubmitHandlerFactory(socket) {
  return (event) => {
    event.preventDefault();

    const message = $('#messageText')[0].value;
    console.log(message);
    socket.emit('testing', { message });

    return false;
  };
}
