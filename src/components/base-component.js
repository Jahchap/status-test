import Store from "../packages/state-manager/store/store.js";

class BaseComponent {
  constructor(props = {}) {
    let baseCompSelf = this;

    this.yield = this.yield || function () {};
    // this.yield = this.yield || function () {};

    if (props.store instanceof Store) {
      props.store.events.append("stateChange", () => baseCompSelf.yield());
    }

    if (Object.keys(props).includes("el")) {
      this.el = props.el;
      console.log(props.el);
    }
  }
}

export default BaseComponent;
