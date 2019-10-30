$(function () {
  var socket = io(
    // query: {
    //   gameId: localStorage.getItem('gameId'),
    //   playerId: localStorage.getItem('playerId'),
    // }
  );

  $('#gameSubmit').click(gameSubmitHandlerFactory(socket));
  socket.on('gameJoinFail', gameJoinFailHandler);
  socket.on('gameJoinResume', gameJoinResumeHandler);
  socket.on('gameJoinSuccess', gameJoinSuccessHandler);

  $('#messageSubmit').click(messageSubmitHandlerFactory(socket));
  socket.on('testing', testingHandler);
});
