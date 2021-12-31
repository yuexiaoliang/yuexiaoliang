const locationEl = document.querySelector('.location');
const successEl = document.querySelector('.success');
const failEl = document.querySelector('.fail');

showObj(locationEl, location);

lightAppJssdk.user.getTicket({
  success: function (data) {
    showObj(successEl, data);
  },
  fail: function (data) {
    showObj(failEl, data);
  }
});

function showObj(el, obj) {
  obj.typeof = typeof obj;
  el.style.display = 'block';
  el.innerHTML = JSON.stringify(obj, null, 2);
}
