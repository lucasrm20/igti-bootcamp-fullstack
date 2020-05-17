const usersController = (function UsersController() {

  let users = [];

  // window elements
  const form = document.querySelector('form');
  const searchInput = form.querySelector('input');
  const usersList = document.querySelector('.users-list');
  const usersLength = document.querySelector('.users-length');
  const usersStatistics = document.querySelector('.users-statistics');

  async function init() {
    users = await usersService.list();
    _render(users);

    // set up listeners
    form.addEventListener('submit', event => {
      event.preventDefault();
      _doSearch();
    });

    searchInput.addEventListener('keyup', event => {
      // prevents searching twice
      if (event.keyCode === 13) return;
      
      _doSearch();
    });
  }

  function _doSearch() {
    const query = searchInput.value.toLowerCase();
    const filteredUsers = users.filter(user => {
      return user.name.toLowerCase().includes(query) || user.lastname.toLowerCase().includes(query)
    });

    _render(filteredUsers);
  }

  function _render(users) {
    _renderUsersQuantity(users);
    _renderUsers(users);
    _renderStatistics(users);
  }

  function _renderUsers(users) {
    const html = users.map(user => `
      <li class="mb-2">
        <img
          class="photo img-fluid img-thumbnail rounded-circle"
          src="${user.picture}"
          alt="${user.name}"
        >
        <span class="name">${user.name} ${user.lastname}</span>,
        <span class="age">${user.age} anos</span>
      </li>
    `)
    .join('');

    usersList.innerHTML = html;
  }

  function _renderUsersQuantity(users) {
    const html = users.length ?
      `${users.length} usuário(s) encontrado(s).` :
      `Nenhum usuário encontrado.`;

    usersLength.innerHTML = html;
  }

  function _renderStatistics(users) {
    let html;

    if (!users.length) {
      html = '<h5 class="card-title text-center">Nada a ser exibido.</h5>';
    } else {
      const statistics = _calcStatistics(users);

      html = `
        <dl class="row">
          <dt class="col-8 col-md-6">Sexo Masculino:</dt>
          <dd class="col-4 col-md-6">${statistics.mens}</dd>

          <dt class="col-8 col-md-6">Sexo Feminino:</dt>
          <dd class="col-4 col-md-6">${statistics.womens}</dd>

          <dt class="col-8 col-md-6">Soma das Idades:</dt>
          <dd class="col-4 col-md-6">${statistics.agesTotal}</dd>

          <dt class="col-8 col-md-6">Média das Idades:</dt>
          <dd class="col-4 col-md-6">${statistics.agesAvg}</dd>
        </dl>
      `;
    }

    usersStatistics.innerHTML = html;
  }

  function _calcStatistics(users) {
    const statistics = users.reduce((statistics, user) => {
      statistics.agesTotal += user.age;
      user.gender === 'female' ? statistics.womens += 1 : statistics.mens += 1;

      return statistics;
    }, {
      mens: 0,
      womens: 0,
      agesTotal: 0
    });

    return {
      ...statistics,
      agesAvg: _formatNumber(statistics.agesTotal / users.length)
    }
  }

  function _formatNumber(num) {
    return Intl
      .NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
      .format(num);
  }

  return { init };

})(usersService);
