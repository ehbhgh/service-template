
const websocketChat=(ctx)=>{
    ctx.websocket.on("message", (message) => {
        console.log(`Received on /chat: ${message}`);
        ctx.websocket.send(`You sent on /chat: ${message}`);
      });
}


const websocketNotice=(ctx)=>{
    ctx.websocket.on("message", (message) => {
        console.log(`Received on /notice: ${message}`);
        ctx.websocket.send(`You sent on /chat: ${message}`);
      });
}
module.exports={
    websocketChat,
    websocketNotice
}