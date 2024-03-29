var token ;
var categories = {};
var products ;
var table;
var deleted = [];
var selectedIds = [];
var gold_type;
var golds = {
    '1' : { 'name': "9 kt" , 'key': "gold_9kt" } ,
    '2' : { 'name': "10 kt" ,  'key': "gold_10kt" } ,
    '3' : { 'name': "14 kt" ,  'key': "gold_14kt" } ,
    '4' : { 'name': "18 kt" ,  'key': "gold_18kt" } ,
    '5' : { 'name': "925 S" ,  'key': "gold_925s" }  
    };
$(document).ready(function () {
    var x = localStorage.getItem("arina_data");
    if (null !== x) {
        obj = $.parseJSON(x);
        // console.log(obj);
        // console.log(JSON.stringify(obj['gold_type']));
        
        token = obj['token'];
        gold_type = obj['gold_type'];
        $("#user_id").val(obj['id']);
        calllist();
        // console.log(table)
        loadPageData(true);
        // var selectpickerInstance = $('#category');

        // // Add a click event handler to optgroup labels
        // $('.optgroup').on('click', function() {
        //     var optgroupLabel = $(this).data('optgroup');

        //     // Find options within the clicked optgroup
        //     var optionsInOptgroup = $('option[data-optgroup="' + optgroupLabel + '"]');

        //     // Toggle the selected state of options within the optgroup
        //     optionsInOptgroup.each(function() {
        //     var optionValue = $(this).val();
        //     selectpickerInstance.selectpicker('toggleOption', optionValue);
        //     });
        // });
    } else {
        window.location = 'login';
    }
});


function calllist() {
    table = $('#datatable').dataTable({
        "bProcessing": true, "bServerSide": false, "bSortClasses": false, "destroy": true,
        "columnDefs": [
            { "orderable": false, "targets": [0] },
            { "targets": [10], "className": 'hide' },
            { "targets": [7,8], "className": 'text-right' },
            {
                "targets": [9], "render": function (data, type) {
                    // console.log(data);
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
        footerCallback: function (row, data, start, end, display) {
            var api = this.api();
 
            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === 'string' ? i.replace(/[\$,]/g, '') * 1 : typeof i === 'number' ? i : 0;
            };
 
            // Total over all pages
            total_qty = api
                .column(7)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
 
            // Total over this page
            pageTotal_qty = api
                .column(7, { page: 'current' })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
 
            total_amt = api
                .column(8)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
 
            // Total over this page
            pageTotal_amt = api
                .column(8, { page: 'current' })
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
 
            // Update footer
            $(api.column(7).footer()).html(pageTotal_qty + '<br> (' + total_qty + ' total)');
            $(api.column(8).footer()).html(pageTotal_amt + '<br> (' + total_amt + ' total)');
        },
        'select': {
           'style': 'multi'
        },
        'order': [[1, 'asc']]
    });
}

function loadPageData(){
    var url = api_url + 'v2/getdesign';
    var formdata = $("#catalogform").serializeToJSON();
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
                    products    = response['data']['details'];
                    categories  = response['data']['categories'];
                    var overdue = response['data']['overdue'];
                    ShowOverdue(overdue);
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
    // var select_items = ["1","3","4"];
    // console.log(JSON.stringify(gold_type));
    $('#gold_type').selectpicker('val', gold_type);
    HideOptions();
}

function FillCombo(){
    // console.log(`Fill Combo index`);
    // console.log(categories);
    $("#category").empty();
    // $("#category").append('<option value="0" selected="selected">Select Category</option>');
    $.each(categories, function(i) {
      var opt = $('<option />');
    //   console.log('inside each :' + categories[i]);
      opt.val(categories[i]);
      opt.text(categories[i]);
      $("#category").append(opt);
    });
    $("#category").selectpicker('refresh');
    // console.log(`Fill Combo ended`);
    return true;
}

function HideOptions(){
    $("#filter").children("option[hideid*='1']").hide();
    jQuery.each(gold_type, function(index, item) {
        console.log(item);
        $("#filter").children("option[dataid*='"+item+"']").show();
        // do something with `item` (or `this` is also `item` if you like)
    });
    $("#filter").selectpicker('refresh');

}
// $(document).on('change', "#alldesigns", function () {
//     $('.designcheckbox').not(this).prop('checked', this.checked);
// });


$(document).on('click', "#save_pdf", function () {
    var rowcollection = table.$(".dt-checkboxes:checked", {"page": "all"});
    selectedIds = [];
    // selectedIds = '';
    var cnt = 0;
    console.log(deleted);
    rowcollection.each(function(index,elem){
        var $row            = $(elem).closest('tr');
        var $columns        = $row.find('td');
        var id              = $columns[10].innerHTML;
        var cn              = $columns[1].innerHTML;
        console.log('['+cn+']');
        if($.inArray(parseInt(cn), deleted) == -1){
            selectedIds.push(id); 
            cnt++; 
        }
        // var res = course.split(",");
        // console.log(cnt, id);
        
        // selectedIds = selectedIds + id + ','; 
    });
    if(cnt == 0){
        toaster('Please select alteast 1 Design', 'Error', 'error');
    }else{
        
        var res = selectedIds.toString();
        // console.log(res);
        // return false;
        $("#design_id").val(selectedIds.toString());
        $(".btn").prop('disabled', true);
        var url = api_url + 'v2/catalogpdf';
        $('#orderform').attr('action',url);
        $('#orderform').submit();
        $(".btn").prop('disabled', false);
    }
    // console.log(rows_selected.join(","));
});

function loadProducts(flg){
    var srh_category    = $("#category").val();
    var srh_style_no    = $("#style_no").val();
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
        deleted = [];
        $.each(products, function (index, value) {
            var flag = true;
            var images      = value['images'];
            var category    = value['category'];
            var style_no    = value['style_no'];
            
            // console.log(srh_category, category );
            if(srh_category.length > 0 && $.inArray(category, srh_category) === -1  && flg == false){
                // console.log('srh_category true for ',category);
                flag = false;
            }
            // console.log(srh_style_no, style_no );
            if(srh_style_no != '' && style_no.indexOf(srh_style_no) == -1 && flg == false){
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
                    if(img['is_default'] == 1){
                        var imgpath = image_path + img['image'];
                        d_img = `<a href='${imgpath}' data-lightbox='#single-image-${cnt}'><img id='single-image-${cnt}' alt='${value['style_no']}' src='${imgpath}' class='nav-design'></a>`;
                    }
                    // return true;
                });
                val = value['id'];
                cl = '';
                if(value['deleted'] == 1){
                    // console.log(cnt);
                    // console.log(value['id']);
                    val = '';
                    cl = 'style="background-color:#f0629259 !important;"';
                    deleted.push(cnt);
                }
                gold_kt = '';
                jQuery.each(gold_type, function(index, item) {
                    gold_kt += `<li>${golds[item]['name']} : ${value[golds[item]['key']]} gm</li>`;
                    // $("#filter").children("option[dataid*='"+item+"']").show();
                    // do something with `item` (or `this` is also `item` if you like)
                });

                imagestr = imagestr + ` <tr ${cl}>
                                            <td>${val}</td>
                                            <td>${cnt}</td>
                                            <td>${d_img}</td>
                                            <td>${category}</td>
                                            <td>${value['style_no']}</td>
                                            <td>   
                                            <ul class="list-unstyled">
                                            ${gold_kt}
                                            </ul>
                                            </td>
                                            <td>${value['diamond_weight']} kt</td>
                                            <td>${value['total_order']}</td>
                                            <td>${value['open_order']}</td>
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


// Update Gold Type

$(document).on('click', "#change_goldtype", function () {
    $(".btn").prop('disabled', true);
    // $("#msgbox").show();
    var url = api_url + 'v2/changegoldtype';
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
                    
                    console.log(response['data']);
                    localStorage.setItem("arina_data", JSON.stringify(response['data']));
                    
                    console.log(gold_type);
                    gold_type = response['data']['gold_type'];
                    console.log(gold_type);
                    HideOptions();
                    loadProducts(true);
                    $(".btn").prop('disabled', false);
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