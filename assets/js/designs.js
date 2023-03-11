var token ;
var categories = {};
var products ;
$(document).ready(function () {
    var x = localStorage.getItem("arina_data");
    if (null !== x) {
        obj = $.parseJSON(x);
        // console.log(obj);
        token = obj['token'];
        var rt = loadPageData();
        
    } else {
        window.location = 'login';
    }
});

function loadPageData(){
    var url = api_url + 'v2/getdesign';
    var formdata = $("#productform").serializeToJSON();
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
                    products = response['data']['details'];
                    categories = response['data']['categories'];

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
    //   console.log('inside each :' + this.price);
      opt.val(categories[i]);
      opt.text(categories[i]);
      $("#category").append(opt);
    });
    // $("#category").selectpicker('refresh');
    // console.log(`Fill Combo ended`);
    return true;
}

function loadProducts(flg){
    var srh_category    = $("#category").val();
    var srh_filter      = $("#filter").val();
    var srh_min_value   = $("#min_value").val();
    var srh_max_value   = $("#max_value").val();

    if (products != null) {
        var image_path = profile_data['product_image_path'];
        var imagestr = '';
        var cnt = 0;
        $("#product_div").html('');
        $.each(products, function (index, value) {
            var flag = true;
            var images      = value['images'];
            var category    = value['category'];
            
            // console.log('start :'+flag);
            // if(!(category in categories)){
            //     categories[category] = category;
            // }
            // console.log(srh_category, category );
            if(srh_category != 0 && srh_category != category && flg == false){
                // console.log('true');
                flag = false;
            }
            if(srh_filter != 0){
                // flag = false;
                // console.log(srh_filter, srh_min_value, srh_max_value, value[srh_filter] );
                if(!(parseFloat(srh_min_value) <= parseFloat(value[srh_filter]) && parseFloat(srh_max_value) >= parseFloat(value[srh_filter])) && flg == false ){
                    // console.log('true');
                    flag = false;
                }
            }
            // console.log('end :'+flag);
            if(flag){
                cnt++;
                var carousel_indicators = '';
                var carousel_inner = '';
                var img_cnt = 0;
                $.each(images, function (i, img) {
                    var active = '';
                    if(img_cnt == 0){
                        active = 'active';
                    }
                    var imgpath = image_path + img['image'];
                    carousel_indicators = carousel_indicators + `<li data-target="#carouselExample" data-slide-to="${img_cnt}" class="${active}"></li>`;
                    carousel_inner = carousel_inner + ` <div class="carousel-item ${active}">
                                            <a href='${imgpath}' data-lightbox='#title_${cnt}'><img id='title_${cnt}' alt='${value['style_no']}' src='${imgpath}' class='img-thumbnail'></a>    
                                        </div>`;
                    img_cnt++;
                });
                imagestr = imagestr + `<div class="col-lg-3 col-md-6">
                                            <div class="card-box">
                                                <div class="member-card-alt">
                                                    <h4 class="mb-1 mt-0">${category}</h4>
                                                    <h5 class="mb-2 mt-0">${value['title']}</h5>
                                                    <div class="avatar-xxl member-thumb mb-2 float-left">
                                                        <div id="carouselExample" class="carousel slide" data-ride="carousel">
                                                            <ol class="carousel-indicators">
                                                               ${carousel_indicators}
                                                            </ol>
                                                            <div class="carousel-inner" role="listbox">
                                                                ${carousel_inner}
                                                            </div>
                                                        </div>    
                                                    </div>
                                                    <div class="member-card-alt-info">
                                                        <h6 class="mb-1 mt-1">Style: ${value['style_no']}</h6>
                                                        <h6 class="mb-1 mt-1">Diamond Wg: ${value['diamond_weight']} K</h6>
                                                        <h6 class="mb-1 mt-1">Gold Wg:</h6>
                                                        <ul class="list-unstyled">
                                                            <li>9 kt : ${value['gold_9kt']} gm</li>
                                                            <li>10 kt : ${value['gold_10kt']} gm</li>
                                                            <li>14 kt : ${value['gold_14kt']} gm</li>
                                                            <li>18 kt : ${value['gold_18kt']} gm</li>
                                                            <li>925 S : ${value['gold_925s']} gm</li>
                                                        </ul>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-12 text-right">
                                                            <div class="btn-group btn-group-justified text-white mb-2">
                                                                <a class="btn btn-sm btn-warning btn_enquiry waves-effect waves-light" data-name="${value['style_no']}" data-title="${value['title']}" data-id="${value['id']}" role="button">Enquire</a>
                                                                <a class="btn btn-sm btn-danger btn_reject waves-effect waves-light" data-id="${value['id']}"  role="button">Reject</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`;
            }

        });
        $("#product_div").html(imagestr);
        $("#product_count").html(cnt);
    }
    $("#loader-wrapper").hide();
    return true;
}