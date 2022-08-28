class Messenger {
  constructor() {
    this.events = {};
  }

  append(event, callback) {
    let messengerSelf = this;

    if (!messengerSelf.events.hasOwnProperty(event)) {
      messengerSelf.events[event] = [];
    }

    return messengerSelf.events[event].push(callback);
  }

  broadcast(event, data = {}) {
    let messengerSelf = this;

    if (!Object.keys(messengerSelf.events).includes(event)) {
      // if (!messengerSelf.events.hasOwnProperty(event)) {
      return [];
    }

    return messengerSelf.events[event].map((func) => func(data));
  }
}

export default Messenger;
