import Peer from 'peerjs';
import EventBus from './EventBus';

export default class Client {
  constructor(hostId) {
    this.eventBus = EventBus.getInstance();
    this.peer = new Peer();
    this.isConnected = false;

    this.connection = this.peer.connect(hostId);
    this.connection.on('data', data => this.eventBus.handleMessage(data));
  }

  handleMessage(peerMessage) {
    if (peerMessage.event) {
      this.eventBus.emit(peerMessage.event, peerMessage);
    }
  }

  sendMessage(jsonObject) {
    this.connection.send(jsonObject);
  }
}
