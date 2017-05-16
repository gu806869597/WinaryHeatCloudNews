/**
 * Created by guhaoran on 2017/5/16.
 */
$('document').ready(function () {
    $('#news_submit_btn').click(function () {
        var title = $('#title').val();
        var content = $('#content').val();
        var picPath = $('#submit_pic').val();
        picPath = "http://121.41.82.6:8066/head1.jpeg";

        var checked = $('input[type=radio][name=IsImportant]:checked');
        var isImportant = checked.val();
        if(isImportant == 'No'){
            isImportant =  '0';
        }else{
            isImportant = '1';
        }
        submitNews(title,content,picPath,isImportant);
    });
});

function submitNews(title,content,picPath,isImportant) {
    $.getJSON("http://121.41.82.6:1990/HeatCloudService.svc/InsertNews?jsoncallback=?", {
            title:title,
            content:content,
            picPath:picPath,
            check:isImportant
        },
        function(data) {
            var result = jsonFormat(data);
            window.alert("上传成功");
            $('#title').val('');
            $('#content').val('');
        });
}


function jsonFormat(json){
    var resultData = JSON.parse(json);
    return resultData ;
}
