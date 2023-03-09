var profile_data ;
function toaster( msg, header, type){
    $.toast({ heading: header, text: msg, hideAfter: 3e3, position: "top-right", icon: type, stack:1 });
}


$(document).on('click',"#logout",function () {
    localStorage.removeItem("arina_data");
    window.location = 'login'; 
});

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
    if($("#category").val() != 0){
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
    loadProducts(true);
});

$(document).on('click', "#search_btn", function () {
    loadProducts(false);
});
//Filter in Product and Catalog page