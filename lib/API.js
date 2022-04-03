export default {
  async getMovies() {
    const url =
      "https://peagent.herokuapp.com/api/contestants/applicant/page?page=1&limit=10";

    const response = await fetch(url);

    return response.json();
  },

  async getMovie(id) {
    const url = `https://peagent.herokuapp.com/api/contestants/user/${id}`;

    const response = await fetch(url);

    return response.json();
  },
};
