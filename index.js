import App from "./lib/App.js";
import Router from "./lib/Router.js";
import API from "./lib/API.js";

const app = new App("#app");
const router = new Router(app);

const movieTemplate = (movie) => `
<div>
<a href="#/movies/${movie?.userId?._id}">${movie?.bio?.username}</a>
<p>${movie?.bio?.username}</p>
<p>${movie?.isContestant}</p>
<p>${movie?.isFinalist}</p>
</div>
`;

app.addComponent({
  name: "movies",
  model: {
    movies: [],
  },

  view(model) {
    return `
    <ul>
    ${model.movies.map((movie) => `<li>${movieTemplate(movie)}</li>`).join("")}
    </ul>
      `;
  },

  async controller(model) {
    const movies = await API.getMovies();

    model.movies = movies.data.profiles;
  },
});

app.addComponent({
  name: "movie",
  model: {
    movie: {},
  },

  view(model) {
    return movieTemplate(model.movie);
  },

  async controller(model) {
    const movie = await API.getMovie(router.params[1]);

    model.movie = movie.data;
  },
});

app.showComponent("movies");

router.addRoute("movies", "^#/movies$");
router.addRoute("movie", "^#/movies/([a-z0-9]+)$");
