const locationEl = document.querySelector('.location');
const successEl = document.querySelector('.success');
const failEl = document.querySelector('.fail');
const loginEl = document.querySelector('.login');
const logoutEl = document.querySelector('.logout');

locationEl && setElementHTMLByData(locationEl, location);
setLoginStatus(false);

function login() {
  lightAppJssdk.user.getTicket({
    success: function (data) {
      if (data === '未登录') {
        appLogin();
        return;
      }
      setLoginStatus(true);
      successEl && setElementHTMLByData(successEl, data);
    },
    fail: function (data) {
      setLoginStatus(false);
      failEl && setElementHTMLByData(failEl, data);
    }
  });
}

function appLogin() {
  lightAppJssdk.user.loginapp({
    success: function (data) {
      successEl && setElementHTMLByData(successEl, data);
      setLoginStatus(true);
    },
    fail: function (data) {
      failEl && setElementHTMLByData(failEl, data);
      setLoginStatus(false);
    }
  });
}

function logout() {
  lightAppJssdk.user.logout({
    success: function (data) {
      successEl && setElementHTMLByData(successEl, '未登录');
      setLoginStatus(false);
      alert('logout success: ' + data);
    },
    fail: function (data) {
      setLoginStatus(true);
      alert('logout fail: ' + data);
    }
  });
}

function openPageShowNav() {
  lightAppJssdk.navigation.show({
    url: 'https://blog.yuexiaoliang.com/test.html',
    success: function (data) {
      //成功回调
    },
    fail: function (data) {
      //错误返回
    }
  });
}

function openPageHideNav() {
  lightAppJssdk.navigation.hide({
    url: 'https://blog.yuexiaoliang.com/test.html',
    success: function (data) {
      //成功回调
    },
    fail: function (data) {
      //错误返回
    }
  });
}

function closePage() {
  lightAppJssdk.navigation.close({
    success: function (data) {
      //成功回调
    },
    fail: function (data) {
      //错误返回
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
  if (loginEl) {
    loginEl.style.display = !bool ? 'block' : 'none';
  }
  if (logoutEl) {
    logoutEl.style.display = bool ? 'block' : 'none';
  }
}
