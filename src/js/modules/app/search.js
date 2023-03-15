const AMOUNT_REPOSITORIES = 10;

export default class Search {
  #items;

  constructor(view, api) {
    this.view = view;
    this.api = api;
    this.#items = null;

    this.view.loadMore.addEventListener('click', this.handleLoadMoreClick.bind(this));
    this.view.searchButton.addEventListener('click', this.handleSearchButtonClick.bind(this));
    this.view.searchInput.addEventListener('keydown', this.handleSearchInputKey.bind(this));
    this.view.searchInput.addEventListener('input', this.handleSearchUsersInput.bind(this));
  }

  searchRepositories() {

    if (this.view.searchInput.value) {
      this.api.loadSearchResult(this.view.searchInput.value)
        .then((response) => {

          if (response.ok) {

            return response.json();
          } else {
            this.view.errorMessage(`Ошибка (response.status: ${response.status})`);
          }
        })
        .then((data) => this.renderRepos(data))
        .catch((error) => this.view.errorMessage(`Ошибка загрузки: ${error.message}`));
    }
  }

  renderRepos(data) {
    this.#items = data.items.slice();
    this.view.searchCounter.textContent = this.view.counterMessage(data.total_count);
    this.view.toggleStateLoadMoreButton(this.#items.length);

    this.showRepos();
  }

  showRepos() {

    if (this.#items.length) {
      this.#items.splice(0, AMOUNT_REPOSITORIES).forEach((repos) => this.view.createUnit(repos));
      this.view.toggleStateLoadMoreButton(this.#items.length);

      return this.#items;
    }
  }

  handleLoadMoreClick() {
    this.showRepos();
  }

  handleSearchUsersInput(event) {

    if (!event.currentTarget.value) {
      this.view.clearList();
      this.view.searchCounter.textContent = '';
      this.view.toggleStateLoadMoreButton('');
    }
  }

  handleSearchButtonClick() {
    this.view.clearList();
    this.searchRepositories();
  }

  handleSearchInputKey(event) {

    if (event.key === 'Enter') {
      this.view.clearList();
      this.searchRepositories();
    }
  }
}
