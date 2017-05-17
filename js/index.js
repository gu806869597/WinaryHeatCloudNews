/**
 * Created by guhaoran on 2017/5/16.
 */
$('window').ready(function () {
    $('#login_button').click(function () {
        var account = $('#edit_account').val();
        var password = $('#edit_password').val();
        login(account,password);
    });
});

$('document').ready(function () {
    var account = localStorage.getItem("Account");
    var password = localStorage.getItem("Password");

    $('#edit_account').val(account);
    $('#edit_password').val(password);
})

function login(account , password){
    $('#login_button').disabled;    //设置按钮不可被点击
    $.getJSON("http://121.41.82.6:1990/HeatCloudService.svc/AppLogin?jsoncallback=?", {
            userId: account,
            pwd:password
        },
        function(data) {
            var result = jsonFormat(data);
            if(result != null && result != ""){
                var companyId = result[0].CompanyID;
                localStorage.setItem("CompanyId",companyId);
                localStorage.setItem("Account",account);
                localStorage.setItem("Password",password);
                window.open("main.html",'_parent');
            }else{
                $('#login_button').text('帐号或密码错误请重新输入,两秒后重试');
                $('#login_button').css('background','#f01414');
                setTimeout(function () {
                    $('#login_button').text('登录系统');
                    $('#login_button').css('background','#03a9f3');
                },2000);
            }
        });
}


function jsonFormat(json){
    var resultData = JSON.parse(json);
    return resultData ;
}
