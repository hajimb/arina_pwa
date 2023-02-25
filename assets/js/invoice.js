var token ;
var orders;
$(document).ready(function () {
    var x = localStorage.getItem("arina_data");
    if (null !== x) {
        obj = $.parseJSON(x);
        console.log(obj);
        token = obj['token'];
        calllist()
        
    } else {
        window.location = 'login';
    }
});

function calllist() {
    $('#datatable').dataTable({
        "bProcessing": true, "bServerSide": false, "bSortClasses": false, "destroy": true,
        "columnDefs": [
            { "orderable": false, "targets": [0] },
            { "targets": [7], "className": 'text-center' },
            { "targets": [0,8], "className": 'text-center', "orderable": false },
            {
                "targets": [2,6], "render": function (data, type) {
                    return type === 'sort' ? data : moment(data).format('Do MMM YYYY');
                }
            }
        ],
        "ajax":{
            "url": api_url + 'v2/getinvoice',
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

$(document).on('click', ".btn_orders", function () {
    var id = $(this).attr('data-id');
    var order_number = $(this).attr('data-number');
    $("#order_id").val(id);
    $(".btn").prop('disabled', true);
    var url = api_url + 'v2/getorderdetails';
    var formdata = $("#orderform").serializeToJSON();
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
            $(".btn").prop('disabled', false);
            $("#OrderDetailsModal").modal('show');
            if (response['validate'] === true) {
                if (response['status'] == true) {
                    var latest_design = response['data']['items'];
                    var total_amount = response['data']['total_amount'];

                    if (latest_design != null) {
                        var image_path = profile_data['product_image_path'];
                        var imagestr = '';
                        var cnt = 1;
                        $.each(latest_design, function (index, value) {
                            var img = image_path + value['image'];
                            imagestr = imagestr + `<tr>
                                                        <td><a href='${img}' data-lightbox='#single-image-${cnt}'><img id='single-image-${cnt}' alt='${value['style_no']}' src='${img}' class='nav-design'></a></td>
                                                        <td>${value['title']}</td>
                                                        <td>${value['style_no']}</td>
                                                        <td class="text-right">${value['rate']}</td>
                                                        <td class="text-center">${value['quantity']}</td>
                                                        <td class="text-right">${value['total_amount']}</td>
                                                    </tr>`;
                            cnt++;

                        });
                        $("#dv_order_details").html(imagestr);
                        $("#grandtotal").html(total_amount.toFixed(2));
                        $("#order_number").html(order_number);
                    }

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
});
