import Peer from 'peerjs';
import EventBus from './EventBus';

export default class Client {
  constructor(hostId) {
    this.eventBust = EventBus.getInstance();
    this.peer = new Peer();
    this.isConnected = false;

    this.connection = this.peer.connect(hostId);
    this.connection.on('data', data => this.eventBust.handleMessage(data));
  }

  sendMessage(jsonObject) {
    this.connection.send(jsonObject);
  }
}
