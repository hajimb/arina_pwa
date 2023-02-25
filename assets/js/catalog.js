var token ;
var categories = {};
var products ;
var table;
var selectedIds = [];
$(document).ready(function () {
    var x = localStorage.getItem("arina_data");
    if (null !== x) {
        obj = $.parseJSON(x);
        // console.log(obj);
        token = obj['token'];
        calllist();
        // console.log(table)
        loadPageData(true);
        
    } else {
        window.location = 'login';
    }
});


function calllist() {
    table = $('#datatable').dataTable({
        "bProcessing": true, "bServerSide": false, "bSortClasses": false, "destroy": true,
        "columnDefs": [
            { "orderable": false, "targets": [0] },
            { "targets": [8], "className": 'hide' },
            // { "targets": [0], "className": 'width-100 text-center' },
            {
                "targets": [7], "render": function (data, type) {
                    return type === 'sort' ? data : moment(data).format('Do MMM YYYY');
                }
            },
            {
                'targets': 0,
                'checkboxes': {
                   'selectRow': true
                }
             }
        ],
        'select': {
           'style': 'multi'
        },
        'order': [[1, 'asc']]
    });
}

function loadPageData(){
    var url = api_url + 'v2/getdesign';
    $.ajax({
        type: 'post',
        url: url,
        headers: { 'Authorization': token },
        processData: false,  // Important!
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        success: function (resData) {
            var response = resData;
            if (response['validate'] === true) {
                if (response['status'] == true) {
                    products    = response['data']['details'];
                    categories  = response['data']['categories'];
                    var rt = loadProducts(true);
                    var tr = FillCombo();
                }else{
                    window.location = 'login';
                }
            }
        },
        error: function (xhr, status, error) {
        }
    });
}

function FillCombo(){
    // console.log(`Fill Combo index`);
    $("#category").empty();
    $("#category").append('<option value="0" selected="selected">Select Category</option>');
    $.each(categories, function(i) {
      var opt = $('<option />');
      //console.log('inside each :' + this.price);
      opt.val(categories[i]);
      opt.text(categories[i]);
      $("#category").append(opt);
    });
    // $("#category").selectpicker('refresh');
    // console.log(`Fill Combo ended`);
    // return true;
}

// $(document).on('change', "#alldesigns", function () {
//     $('.designcheckbox').not(this).prop('checked', this.checked);
// });


$(document).on('click', "#save_pdf", function () {
    var rowcollection = table.$(".dt-checkboxes:checked", {"page": "all"});
    selectedIds = [];
    var cnt = 0;
    rowcollection.each(function(index,elem){
        var $row            = $(elem).closest('tr');
        var $columns        = $row.find('td');
        var id              = $columns[8].innerHTML;
        // var res = course.split(",");
        // console.log(cnt, id); 
        selectedIds.push(id); 
        cnt++; 
    });
    if(cnt == 0){
        toaster('Please select alteast 1 Design', 'Error', 'error');
    }else{
        $("#design_id").val(JSON.stringify(selectedIds));
        $(".btn").prop('disabled', true);
        var url = api_url + 'v2/catalogpdf';
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
                return false;
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
    }
    // console.log(rows_selected.join(","));
});

function loadProducts(flg){
    var srh_category    = $("#category").val();
    var srh_filter      = $("#filter").val();
    var srh_min_value   = $("#min_value").val();
    var srh_max_value   = $("#max_value").val();
    if (products != null) {
        // table = $("#datatable").dataTable();
        table.fnDestroy();
        var image_path = profile_data['product_image_path'];
        var imagestr = '';
        var cnt = 0;
        $("#product_div").html('');
        // console.log('imagestr: '+imagestr);
        $.each(products, function (index, value) {
            var flag = true;
            var images      = value['images'];
            var category    = value['category'];
            
            // console.log(srh_category, category );
            if(srh_category != 0 && srh_category != category && flg == false){
                // console.log(' srh_category true');
                flag = false;
            }
            if(srh_filter != 0){
                // flag = false;
                // console.log(srh_filter, srh_min_value, srh_max_value, value[srh_filter] );
                if(!(parseFloat(srh_min_value) <= parseFloat(value[srh_filter]) && parseFloat(srh_max_value) >= parseFloat(value[srh_filter])) && flg == false ){
                    // console.log('srh_min_value true');
                    flag = false;
                }
            }
            // console.log('end :'+flag);
            if(flag == true){
                // console.log('inside');
                cnt++;
                var d_img = '';
                $.each(images, function (i, img) {
                    var imgpath = image_path + img['image'];
                    d_img = `<a href='${imgpath}' data-lightbox='#single-image-${cnt}'><img id='single-image-${cnt}' alt='${value['style_no']}' src='${imgpath}' class='nav-design'></a>`;
                    // return true;
                });
                imagestr = imagestr + ` <tr>
                                            <td>${value['id']}</td>
                                            <td>${cnt}</td>
                                            <td>${d_img}</td>
                                            <td>${category}</td>
                                            <td>${value['style_no']}</td>
                                            <td>   
                                            <ul class="list-unstyled">
                                            <li>9 kt : ${value['gold_9kt']} gm</li>
                                            <li>10 kt : ${value['gold_10kt']} gm</li>
                                            <li>14 kt : ${value['gold_14kt']} gm</li>
                                            <li>18 kt : ${value['gold_18kt']} gm</li>
                                            <li>925 S : ${value['gold_925s']} gm</li>
                                            </ul>
                                            </td>
                                            <td>${value['diamond_weight']}</td>
                                            <td>${value['create_date']}</td>
                                            <td>${value['id']}</td>
                                        </tr>`;
            }

        });
        // console.log('imagestr: '+imagestr);
        $("#product_div").html(imagestr);
        calllist();

    }
    $("#loader-wrapper").hide();
    return true;
}
