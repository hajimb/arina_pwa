var token ;
var table;

var repeater;
var totaluploads = 0;
var total_approved = 1;
var myDropzone;
var dropzonecreated = false;
var custom_design_id;
var custom_design_detail_id;
var repaterloaded = false;
Dropzone.autoDiscover = false;

$(document).ready(function () {
    var x = localStorage.getItem("arina_data");
    if (null !== x) {
        obj = $.parseJSON(x);
        token = obj['token'];
        calllist(); 
    } else {
        window.location = 'login';
    }
});


function calllist() {
    table = $('#datatable').dataTable({
        "bProcessing": true, "bServerSide": false, "bSortClasses": false, "destroy": true,
        "columnDefs": [
            { "orderable": false, "targets": [0] },
            // { "targets": [8], "className": 'hide' },
            // { "targets": [0], "className": 'width-100 text-center' },
            {
                "targets": [2,3], "render": function (data, type) {
                    return type === 'sort' ? data : moment(data).format('Do MMM YYYY hh:mm a');
                }
            },
        ],
        'order': [[1, 'asc']],
        "ajax":{
            "url": api_url + 'v2/getcustomdesign',
            "type": "POST",
            "headers": { 'Authorization': token },
            "processData": false,  // Important!
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "dataSrc": function (data) {
                // console.log(data);
                if (data.status == true){
                    $("#loader-wrapper").hide();
                    return data.data;
                }else{
                    window.location = 'login';
                    data.data = [] //since datatables will be checking for the object as array
                    return data.data;
                }                           
            }
        }
    });
}

//Add New Custom Design Button Click
$(document).on('click', "#addNew", function () {
    loadDrop("#addform", 'add');
    $("#AddModal").modal('show');
});


function loadDrop(frm, $todo){
    if(dropzonecreated)
        myDropzone.destroy()
    
        var myurl, preview;

    if($todo == "add"){
        preview = "#previewsContainer"
        myurl = api_url + "v2/savecustomdesign";
    }else{
        preview = "#previewsApproveContainer"
        myurl = api_url + 'v2/approvecustomdesign';
    }

    new Dropzone(frm, {
        clickable: ".dropzone",
        url: myurl,
        previewsContainer: preview,
        autoProcessQueue: false,
        uploadMultiple: true,
        parallelUploads: 5,
        addRemoveLinks: true,
        acceptedFiles: ".jpeg,.jpg,.png,.gif",
        maxFiles: 5,
        headers: { 'Authorization': token },
        init() {
            myDropzone = this;
            dropzonecreated = true;
            // console.log('inside init');
            document.querySelectorAll('.save_data').forEach(item => {
                item.addEventListener("click", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    // console.log(myDropzone.getQueuedFiles().length);
                    if (totaluploads === 0 && $todo == "add") {
                        toaster('Atleast 1 Photo is required.', 'Error', 'error');
                        return false;
                    } else if (myDropzone.getQueuedFiles().length > 0) {
                        // var form = $('#addform')[0];
                        // var data = new FormData(form);
                        // form.append('myfile', 'sdsadsa');
                        myDropzone.processQueue();
                        // SubmitForm();
                    } else {
                        if($todo == "add"){
                            SubmitForm();
                        }else{
                            SubmitApproveForm();
                        }
                    }
                    //   myDropzone.processQueue();
                });
            });
            this.on("addedfile", function (file) {
                console.log('addedfile');
                $(".dz-msg").css('display', 'none');
                totaluploads++;
                console.log('totaluploads:'+totaluploads);
            });
            this.on("removedfile", function (file) {
                console.log('removedfile');
                totaluploads--;
                if (totaluploads === 0) {
                    $(".dz-msg").css('display', 'block');
                }
                console.log('totaluploads:'+totaluploads);
            });
            this.on("sendingmultiple", function (file, xhr, formData) {
                console.log('sendingmultiple');
                $(".btn").prop('disabled', true);
                $("#msgbox").show();
                // Gets triggered when the form is actually being sent.
                // Hide the success button or the complete form.
            });
            this.on("successmultiple", function (files, resData) {
                $.each(files, function (index, file) {
                    file.status = "queued";
                    // alert( index + ": " + value );
                });
                console.log('successmultiple');
                console.log(resData);
                
                if($todo == "add"){
                    ShowResponse(resData);
                }else{
                    ShowApproveResponse(resData);
                }

            });
            this.on("errormultiple", function (files, response) {
                $.each(files, function (index, file) {
                    file.status = "queued";
                    // alert( index + ": " + value );
                });
                // console.log('Form Error')
                // console.log(response);
                $("#msgbox").hide();
                // Maybe show form again, and notify user of error
                // Gets triggered when there was an error sending the files.
            });
        }
    });
}

function SubmitForm() {
    console.log('submit form called');
    // $(".btn").prop('disabled',true);
    $("#msgbox").show();
    var url = api_url + "v2/savecustomdesign";
    var form = $('#addform')[0];
    var data = new FormData(form);
    // data.append('myfile', $('input[type=file]')[0].files[1]);
    // console.log(data);
    $.ajax({
        type: 'post',
        url: url,
        data: data,
        headers: { 'Authorization': token },
        mimeType: "multipart/form-data",
        processData: false,  // Important!
        contentType: false,
        cache: false,
        success: function (resData) {
            $("#msgbox").hide();
            console.log('SubmitForm');
            console.log(resData);
            ShowResponse(resData);
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
    return false;
}

function ShowResponse(resData) {

    $("#msgbox").hide();
    console.log('ShowResponse');
    console.log(resData);
    var response = resData;
    // var response = jQuery.parseJSON(resData);
    // console.log(response);
    if (response['validate'] === true) {
        // console.log('validated');
        if (response['status'] == true) {
            // console.log('status true');
            toaster(response['message'], 'Success', 'success');
            $(".btn").prop('disabled', false);
            $("#AddModal").modal('hide');
            callhistory(custom_design_id);
            calllist();
        } else if (response['status'] == false) {
            toaster(response['message'], 'Error', 'error');
            $("#msgbox").hide();
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
}

// View All button Click
$(document).on('click', "#show_history", function () {
    custom_design_id = $(this).attr('data-id');
    // $("#custom_design_id").val(custom_design_id);
    callhistory(custom_design_id);
    $("#MyViewAll").modal('show');
});

// function called on View All button Click
function callhistory(id) {
    var url =  api_url + 'v2/getcustomdesignhistory/'+id;
    $('#table-history').dataTable({
        "bProcessing": true, "bServerSide": false, "bSortClasses": false, "destroy": true,
        "columnDefs": [
            { "orderable": false, "targets": [0] },
            { "targets": [0], "className": 'width-100 text-center' },
            {
                "targets": [6], "render": function (data, type) {
                    return type === 'sort' ? data : moment(data).format('DD/MM/YYYY hh:mm a');
                }
            }
        ],
        order: [[3, 'desc']],
        ajax:{
            type: 'get',
            url: url,
            headers: { 'Authorization': token },
            processData: false,  // Important!
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            "dataSrc": function (data) {
                // console.log(data);
                if (data.status == true){
                    $("#loader-wrapper").hide();
                    return data.data;
                }else{
                    window.location = 'login';
                    data.data = [] //since datatables will be checking for the object as array
                    return data.data;
                }                           
            }
        }
        // "sAjaxSource": base_url + 'api/tables/customdesignhistory/' + id
    });
}


// Show Details Buttton
$(document).on('click', "#show_details", function () {
    var id = $(this).attr('data-id');
    $.get(api_url + 'api/data/customdesigndetails/' + id,  // url
        function (data, textStatus, jqXHR) {  // success callback
            obj = $.parseJSON(data);
            // console.log(obj);
            if(obj['status']){
                $("#details").html(obj['details']);
                $("#enquiry_no").html(" No.: " + obj['enquiry_no']);
                $("#status").html(' ('+obj['current_status']+')');
                $("#MyDetails").modal('show');
            }else{
                toaster('No Details Available', 'Error', 'error');
            }
        });
    // customerdetails
});

// Show Update Buttton
$(document).on('click', "#update", function () {
    var id = $(this).attr('data-id');
    callcustomdesigndetail(id);
});

function callcustomdesigndetail(id){
    $.get(api_url + 'api/data/customdesigndetail/' + id,  // url
        function (data, textStatus, jqXHR) {  // success callback
            obj = $.parseJSON(data);
            // console.log(obj);
            if(obj['status']){
                $("#vd_details").html(obj['details']);
                $("#vd_enquiry_no").html(" No.: " + obj['enquiry_no']);
                $("#MyDetail").modal('show');
            }else{
                toaster('No Details Available', 'Error', 'error');
            }
        });
}

// Reject Price Button
$(document).on('click', "#reject_btn", function () {

    custom_design_id = $("#dv_custom_design_id").val();
    custom_design_detail_id = $("#dv_custom_design_detail_id").val();
    $("#reject_custom_design_id").val(custom_design_id);
    $("#reject_custom_design_detail_id").val(custom_design_detail_id);
    $("#MyRejectPrice").modal('show');
});

$(document).on('click', "#reject_confirm_btn", function () {
    $(".btn").prop('disabled', true);
    var url = api_url + 'v2/rejectcustomdesign';
    var formdata = $("#rejectpriceform").serializeToJSON();
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
            // return false;
            $(".btn").prop('disabled', false);
            if (response['validate'] === true) {
                if (response['status'] == true) {
                    toaster(response['message'], 'Success', 'success');
                    $(".btn").prop('disabled', false);
                    $("#MyRejectPrice").modal('hide');
                    $("#MyDetail").modal('hide');
                    callhistory(custom_design_id);
                    // callcustomdesigndetail(custom_design_id);
                    calllist();
                } else if (response['status'] == false) {
                    toaster(response['message'], 'Error', 'error');
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
    return false;
});

// Edit Button

$(document).on('click', "#edit_btn", function () {
    console.log('edit_btn');
    custom_design_id = $("#dv_custom_design_id").val();
    console.log(custom_design_id);
    custom_design_detail_id = $("#dv_custom_design_detail_id").val();
    $("#add_custom_design_id").val(custom_design_id);
    $("#add_custom_design_detail_id").val(custom_design_detail_id);
    loadDrop();
    $("#AddModal").modal('show');
});

// Approve Price Button

$(document).on('click', "#approve_btn", function () {
    custom_design_id = $("#dv_custom_design_id").val();
    custom_design_detail_id = $("#dv_custom_design_detail_id").val();
    $("#approve_custom_design_id").val(custom_design_id);
    $("#approve_custom_design_detail_id").val(custom_design_detail_id);
    if(repaterloaded == true){
        $('[data-repeater-list]').empty();
        $('[data-repeater-create]').click();
        total_approved = 1;
    }else{
        loadrepeater();
    }
    loadDrop("#approvepriceform", 'approve');
    $("#MyApprovePrice").modal('show');
});

$(document).on('click', "#approve_confirm_btn", function () {
   // SubmitApproveForm();
});


function SubmitApproveForm() {
    console.log('submit approval form called');
    $("#msgbox").show();
     var url = api_url + 'v2/approvecustomdesign';
     var form = $('#approvepriceform')[0];
     var formdata = new FormData(form);
     $.ajax({
         type: 'post',
         url: url,
         headers: { 'Authorization': token },
         data: formdata,
         // processData: false,  // Important!
         mimeType    : "multipart/form-data",
         dataType    : "json",
         // contentType: "application/json; charset=utf-8",
         processData : false,  // Important!
         contentType : false,
         cache       : false,
         success: function (resData) {
             $("#msgbox").hide();
             console.log('ShowApproveResponse');
             console.log(resData);
             ShowApproveResponse(resData);
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
     return false;
 
 }
 
 function ShowApproveResponse(resData) {
    var response = resData;
    console.log('ShowApproveResponse:'+response);
    // return false;
    $(".btn").prop('disabled', false);
    if (response['validate'] === true) {
        if (response['status'] == true) {
            toaster(response['message'], 'Success', 'success');
            $(".btn").prop('disabled', false);
            $("#MyApprovePrice").modal('hide');
            $("#MyDetail").modal('hide');
            callhistory(custom_design_id);
            // callcustomdesigndetail(custom_design_id);
            calllist();
        } else if (response['status'] == false) {
            toaster(response['message'], 'Error', 'error');
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
 }

function loadrepeater(){
    repaterloaded = true;
    repeater = $('.inner-repeater').repeater({
        // initEmpty: true,
        isFirstItemUndeletable: false,
        show: function () {
          console.log(`called add : ${total_approved}`);
          total_approved++;
          $(this).slideDown();   
          $(".btn").prop('disabled',false); 
        },
        hide: function (deleteElement) {
          console.log(`called delete : ${total_approved}`);
          if(total_approved == 1 ){
            toaster('Atleast 1 item is required', 'Error', 'error');
            return false;
          }else{
            if(confirm('Are you sure you want to delete this row ?')) {
                $(this).slideUp(deleteElement);
                total_approved--;
            }
            // setTimeout(function(){calculate();},1000);
          }
        },
        ready: function (setIndexes) {
            // selectDefault(".select2",0);
            // $(".selectpicker1").selectpicker();
        }
    }); 
}

$(document).on('change',".calculate",function (event) {
    calculate();
    event.stopImmediatePropagation();
});

function calculate(){
    var val = $('.inner-repeater').repeaterVal();
    var total = 0;
    $.each(val['design_data'], function( index, value ) {
        console.log( index + ": " + JSON.stringify(value) );
        var quantity    = value['quantity'];
        var rate        = value['rate'];
        // var gold_wt      = value['gold_wt'];
        console.log('Rate:'+ rate);
        console.log('Quantity:'+ quantity);
        if(rate != '' && $.isNumeric(rate) && quantity != '' && $.isNumeric(quantity)){
            var total = quantity * rate ;
            $("input[name='design_data["+index+"][rate]']").val(parseFloat(rate).toFixed(2));
            $("input[name='design_data["+index+"][total]']").val(total.toFixed(2));
        }else{
          $("input[name='design_data["+index+"][total]']").val('0.00');
        }
      });
}

// Accept Approval Button
$(document).on('click', "#accept", function () {

    custom_design_id = $(this).attr('data-id');
    custom_design_detail_id = $(this).attr('data-detail-id');
    $("#accept_approval_custom_design_id").val(custom_design_id);
    $("#accept_approval_custom_design_detail_id").val(custom_design_detail_id);
    $("#MyAcceptApproval").modal('show');
});

$(document).on('click', "#acceptapprovalbtn", function () {
    $(".btn").prop('disabled', true);
    var url = api_url + 'v2/acceptapproval';
    var formdata = $("#acceptapprovalform").serializeToJSON();
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
            // return false;
            $(".btn").prop('disabled', false);
            if (response['validate'] === true) {
                if (response['status'] == true) {
                    toaster(response['message'], 'Success', 'success');
                    $(".btn").prop('disabled', false);
                    $("#MyAcceptApproval").modal('hide');
                    $("#MyDetail").modal('hide');
                    callhistory(custom_design_id);
                    // callcustomdesigndetail(custom_design_id);
                    calllist();
                } else if (response['status'] == false) {
                    toaster(response['message'], 'Error', 'error');
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
    return false;
});

// Reject Approval Button
$(document).on('click', "#reject", function () {

    custom_design_id = $(this).attr('data-id');
    custom_design_detail_id = $(this).attr('data-detail-id');
    $("#reject_approval_custom_design_id").val(custom_design_id);
    $("#reject_approval_custom_design_detail_id").val(custom_design_detail_id);
    $("#MyRejectApproval").modal('show');
});

$(document).on('click', "#rejectapprovalbtn", function () {
    $(".btn").prop('disabled', true);
    var url = api_url + 'v2/rejectapproval';
    var formdata = $("#reject_approvalform").serializeToJSON();
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
            // return false;
            $(".btn").prop('disabled', false);
            if (response['validate'] === true) {
                if (response['status'] == true) {
                    toaster(response['message'], 'Success', 'success');
                    $(".btn").prop('disabled', false);
                    $("#MyRejectApproval").modal('hide');
                    $("#MyDetail").modal('hide');
                    callhistory(custom_design_id);
                    // callcustomdesigndetail(custom_design_id);
                    calllist();
                } else if (response['status'] == false) {
                    toaster(response['message'], 'Error', 'error');
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
    return false;
});
