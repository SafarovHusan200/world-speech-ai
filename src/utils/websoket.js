export const connectWebSocket = (token, onMessage, onError, onClose) => {
  const socket = new WebSocket(
    `wss://worldspeechai.com/ws/connect/?token=${token}`
  );

  socket.onopen = function (e) {
    console.log("[open] Connection established");
  };

  socket.onmessage = function (event) {
    const data = JSON.parse(event.data);
    console.log("[message] Data received from server:", data);
    onMessage(data);
  };

  socket.onerror = function (error) {
    console.error(`[error] ${error.message}`);
    onError && onError(error);
  };

  socket.onclose = function (event) {
    if (event.wasClean) {
      console.log(
        `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
      );
    } else {
      console.error("[close] Connection died");
      onClose && onClose(event);
    }
  };

  return socket;
};
