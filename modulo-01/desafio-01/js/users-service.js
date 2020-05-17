const usersService = (function UsersService() {

  const API_URL = 'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo';

  async function list() {
    const res = await fetch(API_URL);
    const users = await res.json();

    return users.results.map(u => ({
      name      : u.name.first,
      lastname  : u.name.last,
      picture   : u.picture.large,
      age       : u.dob.age,
      gender    : u.gender
    }));
  }

  return { list };

})();
