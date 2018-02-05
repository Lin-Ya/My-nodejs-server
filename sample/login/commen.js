function $(selector) {
    return document.querySelector(selector);
}
function $$(selector) {
    return document.querySelectorAll(selector);
}

var xhr = new XMLHttpRequest();
xhr.timeout = 3000 ;
xhr.open('POST','https://easy-mock.com/mock/5a756b1440dab25fe4c3b082/example/upload','true');
xhr.send('helloworld')
xhr.onload = function(e) {
    console.log(this.value);
}


$('.header').addEventListener('click', function (e) {
    e.stopPropagation();
    if (e.target.tagName == 'I') {
        $('.main').style.display = 'block';
    }
});

$('.modal').addEventListener('click',function (e) {
    e.stopPropagation();
    if (e.target.classList.contains('login')){
        $('.modal').classList.add('login');
        $('.modal').classList.remove('register');
    }
    if(e.target.classList.contains('register')) {
        $('.modal').classList.add('register');
        $('.modal').classList.remove('login');
    }
    if (e.target.classList.contains('close')) {
        $('.main').style.display = 'none';
    }
})
document.addEventListener('click', function () {
    $('.main').style.display = 'none';
})
var nameReg = /^\w{3,8}$/;
var passwordReg = /^\w{6,10}$/;

$('#login-form form').addEventListener('submit',function (e) {
    e.preventDefault();
    if (!nameReg.test($('#login-form input[name=username]').value)) {
        $('#login-form #errormsg').innerText = '用户名需要输入3-8个字符，包括字母数字下划线';
        return false;
    }
    if (!passwordReg.test($('#login-form input[name=password]').value)) {
        $('#login-form #errormsg').innerText = '密码为6-10个字符，包括字母数字下划线';
        return false;
    }
    this.submit();
});

$('#register-form form').addEventListener('submit', function (e) {
    e.preventDefault();
    if (!nameReg.test($('#register-form input[name=username]').value)) {
        $('#register-form #errormsg').innerText = '用户名需要输入3-8个字符，包括字母数字下划线';
        return false;
    }
    if (!passwordReg.test($('#register-form input[name=password]').value)) {
        $('#register-form #errormsg').innerText = '密码为6-10个字符，包括字母数字下划线';
        return false;
    }
    if ($('#register-form input[name=password]').value !== $('#register-form input[name=password2]').value) {
        $('#register-form #errormsg').innerText = '两次输入的密码不一致，请重新输入';
        return false;
    }
    this.submit();
});