// export async function fetcher() {

async function fetcher() {
  const baseUrl = "https://swapi.dev/api";
  const reptiles = [];
  const planetsInMultipleMovies = [];
  const planetsWithPeopleWithReptiles = [];

  try {
    let hasNext = null;
    let nextPage = 1;
    const speciesUrl = "/species/?format=json&page=";

    do {
      const getReptiles = await fetch(baseUrl + speciesUrl + nextPage);
      const repts = await getReptiles.json();

      repts.results
        .filter((rept) => rept.classification.includes("reptil"))
        .forEach((rep) => {
          reptiles.push(rep);
        });

      if (!repts.next) {
        hasNext = null;
        nextPage = 1;
        break;
      }
      hasNext = true;
      nextPage += 1;
    } while (hasNext);
  } catch (err) {
    console.log(err);
  }

  return new Promise(async (resolve, reject) => {
    try {
      let hasNext = null;
      let nextPage = 1;
      const planetsUrl = "/planets/?format=json&page=";

      // Get people with Reptiles
      const peopleWithReptiles = [];
      reptiles.forEach((reptile) => {
        reptile.people.forEach((person) => peopleWithReptiles.push(person));
      });

      do {
        const getPlanets = await fetch(baseUrl + planetsUrl + nextPage);
        if (getPlanets.status > 399) {
          return reject("Has ERRROROROR");
        }

        const planets = await getPlanets.json();

        planets.results.forEach((planet) => {
          if (planet.films.length > 1) {
            planetsInMultipleMovies.push(planet);
          }
          for (let i = 0; i < planet.residents.length; i++) {
            if (peopleWithReptiles.includes(planet.residents[i])) {
              planetsWithPeopleWithReptiles.push(planet);
              break;
            }
          }
        });
        let currentPage = nextPage;
        console.log("Before increment", {
          currentPage,
          //   planets,
          planetsInMultipleMovies,
          peopleWithReptiles,
        });
        if (!planets.next) {
          hasNext = null;
          nextPage = 1;
          break;
        }

        hasNext = true;
        nextPage += 1;
      } while (hasNext);

      return resolve([planetsInMultipleMovies, planetsWithPeopleWithReptiles]);
    } catch (err) {
      return reject(err);
    }
  });
}

export { fetcher };
