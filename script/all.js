const locationEl = document.querySelector('.location');
const successEl = document.querySelector('.success');
const failEl = document.querySelector('.fail');
const loginEl = document.querySelector('.login');
const logoutEl = document.querySelector('.logout');

logoutEl.addEventListener('click', logout);
loginEl.addEventListener('click', login);

setElementHTMLByData(locationEl, location);
setLoginStatus(false);

function login() {
  lightAppJssdk.user.getTicket({
    success: function (data) {
      if (data === '未登录') {
        appLogin();
        return;
      }
      setLoginStatus(true);
      setElementHTMLByData(successEl, data);
    },
    fail: function (data) {
      setLoginStatus(false);
      setElementHTMLByData(failEl, data);
    }
  });
}

function appLogin() {
  lightAppJssdk.user.loginapp({
    success: function (data) {
      setElementHTMLByData(successEl, data);
      setLoginStatus(true);
    },
    fail: function (data) {
      setElementHTMLByData(failEl, data);
      setLoginStatus(false);
    }
  });
}

function logout() {
  lightAppJssdk.user.logout({
    success: function (data) {
      setElementHTMLByData(successEl, '未登录');
      setLoginStatus(false);
      alert('logout success: ' + data);
    },
    fail: function (data) {
      setLoginStatus(true);
      alert('logout fail: ' + data);
    }
  });
}

function setElementHTMLByData(el, data) {
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

function setLoginStatus(bool) {
  loginEl.style.display = !bool ? 'block' : 'none';
  logoutEl.style.display = bool ? 'block' : 'none';
}
