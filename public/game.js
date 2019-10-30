function gameSubmitHandlerFactory(socket) {
  return (event) => {
    event.preventDefault();

    let gameId = $('#gameId')[0].value;
    if (gameId === '') {
      gameId = null;
    }

    socket.emit('joinGame', gameId);

    return false;
  }
}

function gameJoinFailHandler (msg) {
  // this can happen for various reasons - if the gameId entered has already finished, for instance

  localStorage.removeItem('gameId');
  localStorage.removeItem('playerId');

  // display an error message
}

function gameJoinResumeHandler (msg) {
  localStorage.setItem('gameId', msg.gameId);
  localStorage.setItem('playerId', msg.playerId);

  // this can happen if game has already started, and you're joining as a spectator
  // or if are already in the game and your playerid matches an existing player
  // show game view (skip card generation)
}

function gameJoinSuccessHandler (msg) {
  console.log(msg);

  localStorage.setItem('gameId', msg.gameId);
  localStorage.setItem('playerId', msg.playerId);

  // show player info and card generation form
};
