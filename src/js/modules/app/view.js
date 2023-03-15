import { html } from '../../utils/utils';

const ALERT_SHOW_TIME = 3000;

export default class View {

  constructor() {
    this.app = document.querySelector('#app');

    this.title = this.createElement('h1', 'search-title', 'Github search repositories');
    this.searchCounter = this.createElement('div');
    this.searchInput = this.createElement('input', 'search-input');
    this.searchInput.type = 'search';
    this.searchInput.autofocus = true;
    this.searchInput.placeholder = 'Введите название';
    this.searchButton = this.createElement('button', 'btn btn--green', 'Найти');
    this.searchButton.type = 'button';
    this.inputWrapper = this.createElement('div', 'input-wrapper');
    this.reposListWrapper = this.createElement('div', 'wrapper-list');
    this.reposList = this.createElement('ul', 'repos-list');
    this.loadMore = this.createElement('button', 'load-more btn', 'Загрузить ещё');
    this.loadMore.style.display = 'none';

    this.reposListWrapper.append(this.reposList, this.loadMore);
    this.inputWrapper.append(this.searchInput, this.searchButton);
    this.app.append(this.title, this.inputWrapper, this.searchCounter, this.reposListWrapper);
  }

  createElement(elemTag, elemClass, text) {
    const element = document.createElement(elemTag);

    element.className = elemClass ? elemClass : '';
    element.textContent = text ? text : '';

    return element;
  }

  createUnit(repos) {
    const element = this.createElement('li', 'user-prev');

    element.innerHTML = html`<a class="result-link" href="${repos.html_url}" target="_blank">
                              <div class="img-wrapper">
                                <img class="user-photo" src="${repos.owner.avatar_url}" alt="${repos.owner.login}_photo">
                              </div>
                              <h4 class="user-name">Репозиторий: <i>${repos.name}</i></h4>
                              <div>Язык: <i>${repos.language ? repos.language : 'не указан'}</i></div>
                              <p>Описание: <i>"${repos.description ? repos.description : 'отсутствует'}"</i></p>
                              <div>Создан: ${repos.created_at.substr(0, 10)}</div>
                            </a>
                            <div class="user-content">
                              <a class="user-content__link" href="https://github.com/${repos.owner.login}?tab=repositories"   target="_blank">Все репозитории пользователя ${repos.owner.login}</a>
                            </div>
                            `;

    this.reposList.append(element);
  }

  toggleStateLoadMoreButton(flag) {
    this.loadMore.style.display = flag ? 'block' : 'none';
  }

  clearList() {
    this.reposList.innerHTML = '';
  }

  counterMessage(reposCount) {

    return (reposCount > 0) ? `Найдено: ${reposCount} ` : 'По вашему запросу ничего не найдено';
  }

  errorMessage(message) {
    const alertContainer = document.createElement('div');

    alertContainer.style.zIndex = '100';
    alertContainer.style.position = 'absolute';
    alertContainer.style.left = '0';
    alertContainer.style.top = '0';
    alertContainer.style.right = '0';
    alertContainer.style.padding = '20px 5px';
    alertContainer.style.fontSize = '40px';
    alertContainer.style.textAlign = 'center';
    alertContainer.style.backgroundColor = 'red';
    alertContainer.style.color = 'black';
    alertContainer.textContent = message;

    document.body.append(alertContainer);

    setTimeout(() => {
      alertContainer.remove();
    }, ALERT_SHOW_TIME);
  }
}
