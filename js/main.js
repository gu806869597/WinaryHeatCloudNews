/**
 * Created by guhaoran on 2017/5/16.
 */
$('document').ready(function () {
    var companyId = localStorage.getItem('CompanyId');
    if(companyId == null){
        alert('登录Cookie已失效，请重新登录');
        window.close();
    }

    $('#news_submit_btn').click(function () {
        var title = $('#news_title').val();
        var content = $('#news_content').val();
        var picPath = $('#submit_news_pic').val();
        picPath = "http://121.41.82.6:8066/head1.jpeg";

        var checked = $('input[type=radio][name=IsImportant]:checked');
        var isImportant = checked.val();
        if(isImportant == 'No'){
            isImportant =  '0';
        }else if(isImportant == 'Yes'){
            isImportant = '1';
        }else{
            alert('请选择信息种类后重试');
            return ;
        }
        submitNews(title,content,picPath,isImportant);
    });

    $('#broadcast_submit_btn').click(function () {
        var title = $('#broadcast_title').val();
        var content = $('#broadcast_content').val();
        var picPath = $('#broadcast_submit_btn').val();
        picPath = "http://121.41.82.6:8066/head2.jpeg";

        var checked = $('input[type=radio][name=IsImportant]:checked');
        var isImportant = checked.val();
        if(isImportant == 'No'){
            isImportant =  '0';
        }else if(isImportant == 'Yes'){
            isImportant = '1';
        }else{
            alert('请选择信息种类后重试');
            return ;
        }
        submitBroadcast(title,content,isImportant,picPath,companyId);
    });

    $('#main_function_list li').click(function () {
       var text = $(this).text();
       $('.default_layout').hide();
       if(text == '新闻中心'){
           $('#news_center_layout').show();
           $('#broadcast_layout').hide();
       }else{
           $('#news_center_layout').hide();
           $('#broadcast_layout').show();
       }
    });
    
    $('#exit').click(function () {
        history.back();
        localStorage.removeItem('CompanyId');
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
            if(result.flag == true){
                window.alert("上传成功");
                $('#news_title').val('');
                $('#news_content').val('');
            }else{
                window.alert("上传失败");
            }
        });
}

function submitBroadcast(title,content,picPath,isImportant,companyId){
    $.getJSON("http://121.41.82.6:1990/HeatCloudService.svc/InsertBroadcast?jsoncallback=?", {
            title:title,
            content:content,
            check:isImportant,
            picPath:picPath,
            companyId:companyId
        },
        function(data) {
            var result = jsonFormat(data);
            if(result.flag == true){
                window.alert("上传成功");
                $('#broadcast_title').val('');
                $('#broadcast_content').val('');
            }else{
                alert('上传失败');
            }
        }
    );
}
function jsonFormat(json){
    var resultData = JSON.parse(json);
    return resultData ;
}
