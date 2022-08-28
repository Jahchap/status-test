import Messenger from "../utils/messenger.js";

class Store {
  constructor(args) {
    let storeSelf = this;

    storeSelf.state = {};
    storeSelf.status = "idle";
    storeSelf.actions = {};
    storeSelf.mutations = {};

    storeSelf.events = new Messenger();

    if (Object.keys(args).includes("actions")) {
      // if (args.hasOwnProperty("actions")) {
      storeSelf.actions = args.actions;
    }

    if (Object.keys(args).includes("mutations")) {
      // if (args.hasOwnProperty("mutations")) {
      storeSelf.mutations = args.mutations;
    }

    storeSelf.state = new Proxy(args.state || {}, {
      set(state, key, value) {
        state[key] = value;

        console.log(`stateChange: ${key}: ${value}`);
        console.dir(state[key]);
        storeSelf.events.broadcast("stateChange", storeSelf.state);

        if (storeSelf.status !== "mutation") {
          console.warn(`You should use a mutation to set ${key}`);
        }

        storeSelf.status = "idle";

        return true;
      },
    });
  }

  dispatch(actionKey, payload) {
    let storeSelf = this;

    if (typeof storeSelf.actions[actionKey] !== "function") {
      console.error(`The action "${actionKey} not found.`);
      return false;
    }

    console.groupCollapsed(`ACTION: ${actionKey}`);

    storeSelf.status = "action";

    storeSelf.actions[actionKey](storeSelf, payload);

    console.groupEnd();

    return true;
  }

  commit(mutationKey, payload) {
    let storeSelf = this;

    if (typeof storeSelf.mutations[mutationKey] !== "function") {
      console.log(`The mutation "${mutationKey}" not found`);
      return false;
    }

    storeSelf.status = "mutation";

    let newState = storeSelf.mutations[mutationKey](storeSelf.state, payload);

    storeSelf.state = Object.assign(storeSelf.state, newState);

    return true;
  }
}

export default Store;
