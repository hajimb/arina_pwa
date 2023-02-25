$(document).ready(function () {
    var x = localStorage.getItem("arina_data");
    if(null !== x){
        obj = $.parseJSON(x);
        var token = obj['token'];
        var url = api_url+'v1/check_session';
        $.ajax({
            type    : 'post',
            url     : url,
            headers: { 'Authorization': token },
            processData: false,  // Important!
            contentType:"application/json; charset=utf-8",
            dataType  : "json",
            cache   : false,
            success : function(resData){
                var response = resData;
                if(response['validate'] === true){
                    if(response['status'] == true){
                        // console.log(response['data']);
                        localStorage.setItem("arina_data", JSON.stringify(response['data']));
                        window.location = 'dashboard'; 
                    }
                }
                $("#loader-wrapper").hide();
            },
            error: function(xhr, status, error){
            }
        });
    }else{
        $("#loader-wrapper").hide();
    }
});

$(document).on('click',"#LoginButton",function () { 
    $(".btn").prop('disabled',true);
    $("#msgbox").show();
    var url = api_url+'v1/login';
    var formdata = $("#loginform").serializeToJSON();
	$.ajax({
        type    : 'post',
        url     : url,
        data    : formdata,
        processData: false,  // Important!
        contentType:"application/json; charset=utf-8",
        dataType  : "json",
        cache   : false,
        success : function(resData){
            var response = resData;
            if(response['validate'] === true){
                if(response['status'] == true){
                    // console.log(response['data']);
                    localStorage.setItem("arina_data", JSON.stringify(response['data']));
                    toaster(response['message'], 'Success', 'success');
                    $('input[type=text]').val('');
                    setTimeout(function(){window.location = 'dashboard'; }, 1000);
                }else if(response['status'] == false){
                    toaster(response['message'], 'Error', 'error');
                    $(".btn").prop('disabled',false);
                    $("#msgbox").hide();
                    return false;
                }
            }else{
                $.each(response['message'], function(key, value) {
                    if(value != ''){
                        toaster(value, 'Error', 'error');
                        $("#"+key).focus();
                        $(".btn").prop('disabled',false);
                        $("#msgbox").hide();
                        return false;
                    }
                });
            }
         },
        error: function(xhr, status, error){
            var errorMessage = xhr.status + ': ' + xhr.statusText
            if(xhr.status = 409){
                errorMessage = xhr.responseJSON.message;
            }
            toaster(errorMessage, 'Error', 'error');
            $(".btn").prop('disabled',false);
            $("#msgbox").hide();
        }
    });
  });
  