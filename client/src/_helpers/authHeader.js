// Add authorization headers to each Axios request

function addAuth(config) {
  const modifiedConfig = config;
  modifiedConfig.headers.Authorization = localStorage.getItem('jwt');
  if (JSON.parse(localStorage.getItem('is_admin') != null)) modifiedConfig.headers.IsAdmin = JSON.parse(localStorage.getItem('user')).is_admin;
  else modifiedConfig.headers.IsAdmin = 'false';
  return modifiedConfig;
}

module.exports = addAuth;
