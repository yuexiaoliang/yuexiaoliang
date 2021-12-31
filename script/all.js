const locationEl = document.querySelector('.location');
const successEl = document.querySelector('.success');
const failEl = document.querySelector('.fail');

showObj(locationEl, location);

lightAppJssdk.user.getTicket({
  success: function (data) {
    if (data === '未登录') {
      appLogin();
      return;
    }
    showObj(successEl, data);
  },
  fail: function (data) {
    showObj(failEl, data);
  }
});

function appLogin() {
  lightAppJssdk.user.loginapp({
    success: function (data) {
      showObj(successEl, data);
    },
    fail: function (data) {
      showObj(failEl, data);
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
