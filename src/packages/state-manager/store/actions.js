export default {
  addPlanet(context, payload) {
    context.commit("addPlanet", payload);
  },
  addPlanets(context, payload) {
    context.commit("addPlanets", payload);
  },
  clearPlanet(context, payload) {
    context.commit("clearPlanet", payload);
  },
  clearPlanets(context, payload) {
    context.commit("clearPlanets", payload);
  },
};
