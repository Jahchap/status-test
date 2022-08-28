import store from "./packages/state-manager/store/index.js";

import List from "./components/list.js";

import { fetcher } from "./services/fetcher.js";

// Working
// fetcher()
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// Working
// const me = fetcher()
// me.then((res) => {
//   return console.log(res);
// }).catch((err) => {
//   return console.log(err);
// });

// Working

const listInstance = new List({
  items: store.state.planets,
  elSelector: "#app",
});

listInstance.yield();

try {
  const me = await fetcher();
  console.log(me);
  //   store.actions.addPlanets()

  store.dispatch("addPlanets", me[1]);
} catch (err) {
  console.log({ errorInMain: err });
}
