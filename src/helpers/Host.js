import Peer from 'peerjs';

let instance = null;
export default class Host {
  constructor() {
    this.clientConnections = [];
    this.peer = new Peer();

    this.peer.on('connection', conn => {
      this.clientConnections.push(conn);
      // Setting up listener for incoming
      // TODO: Maybe move this to a webworker
      conn.on('data', data => this.handlePeerData(data));
    });
  }

  static getInstance() {
    if (instance == null) {
      instance = new Host();
    }
    return instance;
  }

  handlePeerData(messageObj) {
    this.foo = null;
    // TODO: do stuff with incoming messages
    console.log(messageObj);
  }

  sendMessage(jsonObject) {
    if (!this.clientConnections) {
      console.log('No connected clients throwing to the abyss');
      return;
    }
    this.clientConnections.forEach(conn => conn.send(jsonObject));
  }
}
