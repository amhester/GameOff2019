import Peer from 'peerjs';
import EventBus from './EventBus';

let instance = null;

/**
 * P2P Schema
 * {
 *    event: <string>,
 *    source: <string>,
 *    metaData: <nested-json-specific-for-command>
 * }
 */

export default class Host {
  constructor() {
    this.clientConnections = [];
    this.EventBus = EventBus.getInstance();
    this.peer = new Peer();

    this.peer.on('open', id => {
      this.id = id;
      console.log(id);
      this.peer.on('connection', conn => {
        this.clientConnections.push(conn);
        // Setting up listener for incoming
        // TODO: Maybe move this to a webworker
        conn.on('data', data => this.handlePeerData(data));
      });
    });
  }

  static getInstance() {
    if (instance == null) {
      instance = new Host();
    }
    return instance;
  }

  handlePeerData(messageObj) {
    if (messageObj.event) {
      this.EventBus.emit(messageObj.event, messageObj);
    }
  }

  sendMessage(jsonObject) {
    if (!this.clientConnections) {
      console.log('No connected clients throwing to the abyss');
      return;
    }
    this.clientConnections.forEach(conn => conn.send(jsonObject));
  }
}
