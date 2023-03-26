var token ;
var categories = {};
var products ;
var table;
var deleted = [];
var selectedIds = [];
$(document).ready(function () {
    var x = localStorage.getItem("arina_data");
    if (null !== x) {
        obj = $.parseJSON(x);
        // console.log(obj);
        token = obj['token'];
        $("#user_id").val(obj['id']);
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
            { "targets": [10], "className": 'hide' },
            { "targets": [7,8], "className": 'text-right' },
            {
                "targets": [9], "render": function (data, type) {
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
        
        // var formdata = $("#orderform").serializeToJSON();
        // console.log(formdata);
        // $.ajax({
        //     type: 'post',
        //     url: url,
        //     headers: { 'Authorization': token },
        //     data: formdata,
        //     processData: false,  // Important!
        //     contentType: "application/json; charset=utf-8",
        //     dataType: "json",
        //     cache: false,
        //     xhr: function () {
        //         var xhr = new XMLHttpRequest();
        //         xhr.onreadystatechange = function () {
        //             if (xhr.readyState == 2) {
        //                 if (xhr.status == 200) {
        //                     xhr.responseType = "blob";
        //                 } else {
        //                     xhr.responseType = "text";
        //                 }
        //             }
        //         };
        //         return xhr;
        //     },
        //     success: function (data) {
        //         //Convert the Byte Data to BLOB object.
        //         var blob = new Blob([data], { type: "application/octetstream" });
 
        //         //Check the Browser type and download the File.
        //         var isIE = false || !!document.documentMode;
        //         if (isIE) {
        //             window.navigator.msSaveBlob(blob, fileName);
        //         } else {
        //             var url = window.URL || window.webkitURL;
        //             link = url.createObjectURL(blob);
        //             var a = $("<a />");
        //             a.attr("download", fileName);
        //             a.attr("href", link);
        //             $("body").append(a);
        //             a[0].click();
        //             $("body").remove(a);
        //         }
        //         $(".btn").prop('disabled', false);
        //     },
        //     error: function (xhr, status, error) {
        //         var errorMessage = xhr.status + ': ' + xhr.statusText
        //         toaster(errorMessage, 'Error', 'error');
        //         $(".btn").prop('disabled', false);
        //     }
        // });
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
        deleted = [];
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
                    if(img['is_default'] == 1){
                        var imgpath = image_path + img['image'];
                        d_img = `<a href='${imgpath}' data-lightbox='#single-image-${cnt}'><img id='single-image-${cnt}' alt='${value['style_no']}' src='${imgpath}' class='nav-design'></a>`;
                    }
                    // return true;
                });
                val = value['id'];
                cl = '';
                if(value['deleted'] == 1){
                    console.log(cnt);
                    console.log(value['id']);
                    val = '';
                    cl = 'style="background-color:#f0629259 !important;"';
                    deleted.push(cnt);
                }
                imagestr = imagestr + ` <tr ${cl}>
                                            <td>${val}</td>
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
