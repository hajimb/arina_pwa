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
            { "targets": [1,3,4,5], "className": 'text-center' },
            { "targets": [2], "className": 'text-right' },
            {
                "targets": [1,5], "render": function (data, type) {
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
                .column(2)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
 
            // Total over this page
            pageTotal_qty = api
                .column(2, { page: 'current' })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
 
 
            // Update footer
            $(api.column(2).footer()).html(pageTotal_qty + '<br> (' + total_qty + ' total)');
        },
        "ajax":{
            "url": api_url + 'v2/getpayment',
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

$(document).on('click', ".payment_btn", function () {
    var id = $(this).attr('data-id');
    $("#payment_id").val(id);
    var url = api_url + 'v2/getpaymentdetails';
    var formdata = $("#paymentform").serializeToJSON();
    console.log(formdata);
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
            if (response['validate'] === true) {
                if (response['status'] == true) {
                    var payment_details = response['data'];
                    // console.log(payment_details);
                    // return false;
                    if (payment_details != null) {
                        $("#PaymentDetailsModal").modal('show');
                        var total = 0;
                        var cnt = 1;
                        html = '';
                        $.each(payment_details, function (index, value) {
                            html = html + `<tr>
                                                <td>${cnt}</td>
                                                <td>${value['invoice_number']}</td>
                                                <td>${value['invoice_date']}</td>
                                                <td class="text-right">${value['amount']}</td>
                                                <td>${value['payment_date']}</td>
                                            </tr>`;
                            cnt++;
                            total = parseFloat(total) + parseFloat(value['amount']);

                        });
                        $("#dv_payment_details").html(html);
                        $("#grandtotal").html(total.toFixed(2));
                        // $("#invoice_number").html(invoice_number);
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
        }
    });
});
