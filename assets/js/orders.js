var token ;
var orders;
$(document).ready(function () {
    var x = localStorage.getItem("arina_data");
    if (null !== x) {
        obj = $.parseJSON(x);
        // console.log(obj);
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
            { "targets": [3,4], "className": 'text-right' },
            {
                "targets": [2], "render": function (data, type) {
                    return type === 'sort' ? data : moment(data).format('Do MMM YYYY');
                }
            }
        ],
        footerCallback: function (row, data, start, end, display) {
            var api = this.api();
 
            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === 'string' ? i.replace(/[\$,]/g, '') * 1 : typeof i === 'number' ? i : 0;
            };
 
            // Total over all pages
            total_qty = api
                .column(3)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
 
            // Total over this page
            pageTotal_qty = api
                .column(3, { page: 'current' })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
 
            total_amt = api
                .column(4)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
 
            // Total over this page
            pageTotal_amt = api
                .column(4, { page: 'current' })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
 
            // Update footer
            $(api.column(3).footer()).html(pageTotal_qty + '<br> (' + total_qty + ' total)');
            $(api.column(4).footer()).html('$' + pageTotal_amt + '<br> ( $' + total_amt + ' total)');
        },
        "ajax":{
            "url": api_url + 'v2/getorders',
            "type": "POST",
            "headers": { 'Authorization': token },
            "processData": false,  // Important!
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "dataSrc": function (data) {
                // console.log(data);
                if (data.status == true){
                    $("#loader-wrapper").hide();
                    var overdue = data.overdue;
                    ShowOverdue(overdue);
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
            // console.log(response);
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
