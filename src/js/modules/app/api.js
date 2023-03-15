const REPOSITORIES_PER_PAGE = 30; // max 100
const URL = 'https://api.github.com/';

export default class Api {

  constructor() {
  }

  async loadSearchResult(searchValue) {

    return await fetch(`${URL}search/repositories?q=${searchValue}&per_page=${REPOSITORIES_PER_PAGE}`);
  }
}
