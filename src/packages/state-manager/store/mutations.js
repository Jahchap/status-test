export default {
  addPlanet(state, payload) {
    state.planets.push(payload);

    return state;
  },
  addPlanets(state, payload) {
    if (Array.isArray(payload)) {
      payload.forEach((item) => state.planets.push(item));
      // return state;
    }

    return state;
  },
  clearPlanet(state, payload) {
    state.planets.splice(payload.index, 1);

    return state;
  },
};
