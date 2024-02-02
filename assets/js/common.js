var profile_data ;
function toaster( msg, header, type, hide_after = 3e3){
    $.toast({ heading: header, text: msg, hideAfter: hide_after, position: "top-right", icon: type, stack:1 });
}


$(document).on('click',"#logout",function () {
    localStorage.removeItem("arina_data");
    window.location = 'login'; 
});
function ShowOverdue(overdue){
    if(parseInt(overdue) > 0){
        $("#overdue_span").text(overdue);
        toaster('<b>'+overdue +' Invoice(s)</b> are Overdue for Payment', 'Payment Overdue', 'error',5000);
    }
}

$(document).ready(function () {
    var x = localStorage.getItem("arina_data");
    if(null !== x){
        profile_data = $.parseJSON(x);
        var company_name = profile_data['company_name'];
        var logo_image = profile_data['logo_image'];
        var image_path = profile_data['customer_image_path'];
        $("#hdr_company_name").html(company_name);
        var photo_url = image_path + logo_image;
        $("#hdr_company_logo").attr("src",photo_url);
    }
});


// Enquiry Button //
$(document).on('click', ".btn_enquiry", function () {
    var id = $(this).attr('data-id');
    var name = $(this).attr('data-name');
    var title = $(this).attr('data-title');
    $("#product_name").html(name);
    $("#title").html(title);
    $("#enquiry_design_id").val(id);
    // console.log(id);
    $("#EnquiryModal").modal('show');
});


$(document).on('click', "#enquiry_submit", function () {
    $(".btn").prop('disabled', true);
    // $("#msgbox").show();
    var url = api_url + 'v2/design/enquire';
    var formdata = $("#enquiryform").serializeToJSON();
    $.ajax({
        type: 'post',
        url: url,
        headers: { 'Authorization': token },
        data: formdata,
        processData: false,  // Important!
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        success: function (resData) {
            var response = resData;
            console.log(response);
            if (response['validate'] === true) {
                if (response['status'] == true) {
                    toaster(response['message'], 'Success', 'success');
                    $(".btn").prop('disabled', false);
                    $('#enquiryform')[0].reset();
                    $("#EnquiryModal").modal('hide');
                } else if (response['status'] == false) {
                    toaster(response['message'], 'Error', 'error');
                    $(".btn").prop('disabled', false);
                    return false;
                }
            } else {
                $.each(response['message'], function (key, value) {
                    if (value != '') {
                        toaster(value, 'Error', 'error');
                        $("#" + key).focus();
                        $(".btn").prop('disabled', false);
                        return false;
                    }
                });
            }
        },
        error: function (xhr, status, error) {
            var errorMessage = xhr.status + ': ' + xhr.statusText
            if (xhr.status = 409) {
                errorMessage = xhr.responseJSON.message;
            }
            toaster(errorMessage, 'Error', 'error');
            $(".btn").prop('disabled', false);
        }
    });
});

$(document).on('click', "#enquiry_cancel", function () {
    $('#enquiryform')[0].reset();
    $("#EnquiryModal").modal('hide');
});

// Reject Button //
$(document).on('click', ".btn_reject", function () {
    var id = $(this).attr('data-id');
    $("#reject_design_id").val(id);
    $("#RejectModal").modal('show');
});

$(document).on('click', "#reject_submit", function () {
    $(".btn").prop('disabled', true);
    // $("#msgbox").show();
    var url = api_url + 'v2/design/reject';
    var formdata = $("#rejectform").serializeToJSON();
    $.ajax({
        type: 'post',
        url: url,
        headers: { 'Authorization': token },
        data: formdata,
        processData: false,  // Important!
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        success: function (resData) {
            var response = resData;
            console.log(response);
            if (response['validate'] === true) {
                if (response['status'] == true) {
                    toaster(response['message'], 'Success', 'success');
                    $(".btn").prop('disabled', false);
                    loadPageData();
                    $("#RejectModal").modal('hide');
                } else if (response['status'] == false) {
                    toaster(response['message'], 'Error', 'error');
                    $(".btn").prop('disabled', false);
                    return false;
                }
            } else {
                $.each(response['message'], function (key, value) {
                    if (value != '') {
                        toaster(value, 'Error', 'error');
                        $("#" + key).focus();
                        $(".btn").prop('disabled', false);
                        return false;
                    }
                });
            }
        },
        error: function (xhr, status, error) {
            var errorMessage = xhr.status + ': ' + xhr.statusText
            if (xhr.status = 409) {
                errorMessage = xhr.responseJSON.message;
            }
            toaster(errorMessage, 'Error', 'error');
            $(".btn").prop('disabled', false);
        }
    });
});

function removeloader(){
    $("span").removeClass('is-loading');
}

//Filter in Product and Catalog page
$(document).on('change', ".checkbtn", function () {
    $(".search_btn").prop('disabled', true);
    if($("#category").val().length > 0){
        $(".search_btn").prop('disabled', false);
    }else if($("#style_no").val() != ''){
        $(".search_btn").prop('disabled', false);
    }else if($("#filter").val() != 0 && $("#min_value").val() != '' && $("#max_value").val() != ''){
        $(".search_btn").prop('disabled', false);
    }
});

$(document).on('click', "#clear_btn", function () {
    $("#category").val(0);
    $("#filter").val(0);
    $("#min_value").val(0);
    $("#max_value").val(0);
    $("#category").selectpicker('refresh');
    loadProducts(true);
});

$(document).on('click', "#search_btn", function () {
    loadProducts(false);
});

$(document).on('click', ".download-pdf", function () {
    var id      = $(this).attr('data-id');
    var type    = $(this).attr('data-type');
    var url     = api_url + 'api/data/downloadpdf/'+type+'/'+id;
    window.open(url);
    return false;
});

$(document).on('click', ".download-xls", function () {
    var id      = $(this).attr('data-id');
    var type    = $(this).attr('data-type');
    var url     = api_url + 'api/data/downloadexcel/'+type+'/'+id;
    window.open(url);
    return false;
});

function showVideo(me){
    var video_link = $(me).attr('video-link');
    var shorts_regex = new RegExp(/((http(s)?:\/\/)?)(www\.)?((youtube\.com\/)|(youtu.be\/))(shorts\/)([a-zA-Z0-9\-_])[\S]+/g);
    var watch_regex = new RegExp(/((http(s)?:\/\/)?)(www\.)?((youtube\.com\/)|(youtu.be\/))(watch?)([a-zA-Z0-9\-_])[\S]+/g);
    var direct_regex = new RegExp(/((http(s)?:\/\/)?)(www\.)?((youtube\.com\/)|(youtu.be\/))([a-zA-Z0-9\-_])[\S]+/g);
    var video_id = '';
    if (shorts_regex.test(video_link)) {  // check for youtube Shorts link
        video_id = /[^/]*$/.exec(video_link)[0];
    }else if (watch_regex.test(video_link)) { // check for youtube watch link
        video_id = video_link.substring(video_link.indexOf('v=') + 2);
    }else if (direct_regex.test(video_link)) { // check for youtube direct link
        video_id = /[^/]*$/.exec(video_link)[0];
    }
    console.log(video_id);
    if(video_id != ''){
        var videoURL = "https://www.youtube-nocookie.com/embed/"+video_id+"?mode=opaque&rel=0&autohide=1&showinfo=0&wmode=transparent&autoplay=1";
        $("#videolightbox").fadeIn(1000);
        $(me).hide();
        // var videoURL = $('#video').prop('src');
        // videoURL = videoURL.replace('&autoplay=1', ''); // removing autoplay form url
        // videoURL += "&autoplay=1";
        $('#video').prop('src', videoURL);
    }else{
        alert('Sorry Video is Not Playable');
    }

}

// When the close button is clicked make the lightbox fade out in the span of 0.5 seconds and show the play button
$(document).on('click', "#close-btn, #videolightbox", function () {
    $('#video').prop('src', '');
    $("#videolightbox").fadeOut(500);
    $(".btn-youtube").show(250);
});


//Filter in Product and Catalog page