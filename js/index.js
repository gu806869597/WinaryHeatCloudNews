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
    $.getJSON("http://121.41.82.6:1990/HeatCloudService.svc/AppLogin?jsoncallback=?", {
            userId: account,
            pwd:password
        },
        function(data) {
            var result = jsonFormat(data);
            var companyId = result[0].CompanyID;
            localStorage.setItem("CompanyId",companyId);
            localStorage.setItem("Account",account);
            localStorage.setItem("Password",password);
            window.open("main.html",'_parent');
        });
}


function jsonFormat(json){
    var resultData = JSON.parse(json);
    return resultData ;
}
