const locationEl = document.querySelector('.location');
const successEl = document.querySelector('.success');
const failEl = document.querySelector('.fail');
const loginEl = document.querySelector('.login');
const logoutEl = document.querySelector('.logout');

showObj(locationEl, location);
logoutEl.addEventListener('click', logout);
loginEl.addEventListener('click', login);

function login() {
  lightAppJssdk.user.getTicket({
    success: function (data) {
      if (data === '未登录') {
        appLogin();
        return;
      }
      logoutEl.style.display = 'block';
      showObj(successEl, data);
    },
    fail: function (data) {
      logoutEl.style.display = 'none';
      showObj(failEl, data);
    }
  });
}

function logout() {
  lightAppJssdk.user.logout({
    success: function (data) {
      showObj(successEl, '未登录');
      logoutEl.style.display = 'none';
      alert('logout success: ' + data);
    },
    fail: function (data) {
      logoutEl.style.display = 'block';
      alert('logout fail: ' + data);
    }
  });
}

function appLogin() {
  lightAppJssdk.user.loginapp({
    success: function (data) {
      showObj(successEl, data);
      logoutEl.style.display = 'block';
    },
    fail: function (data) {
      showObj(failEl, data);
      logoutEl.style.display = 'none';
    }
  });
}

function showObj(el, data) {
  const result = {
    type: typeof data
  };

  if (typeof data === 'string') {
    let _data;
    try {
      _data = JSON.parse(data);
    } catch (error) {
      _data = data;
    }
    result.data = _data;
  }

  if (typeof data === 'object') {
    result.data = data;
  }

  el.style.display = 'block';
  el.innerHTML = JSON.stringify(result, null, 2);
}
