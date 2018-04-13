$(function(){
    
    function checkForm(params){
        return new Promise(function(resolve,reject){
            // 这里进行验证
            let reg = /^\d{11}$/g;
            if(!params.username || !reg.test(params.username)){
                reject('手机号格式错误');
            }
            if(!params.password || params.password.length < 6){
                reject('密码至少是6位！');
            }
            resolve(params);
        });
    }
    // 调用登录验证接口
    function login(params){
        return axios.post('login',params)
    }
    // 验证成功与否
    function check(data) {
        return new Promise(function(resolve,reject){
            if(data.meta.status === 200){
                // 登录成功
                // 保存token和用户信息
                let info = JSON.stringify(data.data);
                localStorage.setItem('userInfo',info);
                resolve();
            }else{
                // 登录失败
                reject(data.meta.msg);
            }
        })
    }
    $('#loginBtn').on('click',function(){
        // 获取页面表单信息
        let mobile = $('#mobile').val();
        let password = $('#password').val();
        // 调用接口要提交的参数
        let params = {
            username : mobile,
            password : password
        }
        // 执行登录
        checkForm(params)
            .then(login)
            .then(check)
            .then(function(){
                // 登录成功
                location.href = '/index.html';
            })
            .catch(function(err){
                // 显示错误信息
                $.toast(err);
            })
    });


    // 页面初始化完成之后，触发该事件
    $(document).on("pageInit", function(e, pageId, $page) {
        // 从本地缓存中取出用户信息，显示到输入框中
        let info = localStorage.getItem('userInfo');
        let uname = JSON.parse(info).username;
        $('#mobile').val(uname);
    });
   // 必须显示的调用该方法，从而触发pageInit事件
    $.init();
});