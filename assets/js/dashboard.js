var token ;
$(document).ready(function () {
    var x = localStorage.getItem("arina_data");
    if (null !== x) {
        obj = $.parseJSON(x);
        console.log(obj);
        token = obj['token'];
        // $("#loader-wrapper").hide();
        loaddashboard();
    } else {
        window.location = 'login';
    }
});

function loaddashboard(){
    var url = api_url + 'v2/dashboard';
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
                    var data = response['data'];
                    var profile = data['profile'][0];
                    var latest_design = data['latest_design'];
                    var oustanding = data['oustanding'];
                    // console.log(profile);
                    // Profile Header //
                    var company_name = profile['company_name'];
                    var company_email = profile['company_email'];
                    var company_phone = profile['company_phone'];
                    var logo_image = profile['logo_image'];
                    var image_path = profile_data['customer_image_path'];
                    var photo_url = image_path + logo_image;
                    $("#db_company_name").html(company_name);
                    $("#db_company_email").html(company_email);
                    $("#db_company_phone").html(company_phone);
                    $("#db_company_logo").attr("src", photo_url);

                    // panel Boxes
                    console.log(data['total_order']);
                    $("#db_total_order").html(data['total_order']);
                    $("#db_pending_order").html(data['pending_order']);
                    $("#db_pending_amount").html(data['pending_amount']);

                    //latest design
                    if (latest_design != null) {
                        var image_path = profile_data['product_image_path'];
                        var imagestr = '';
                        var cnt = 1;
                        $.each(latest_design, function (index, value) {
                            var img = image_path + value['img'];
                            imagestr = imagestr + `<tr>
                                                        <td><a href='${img}' data-lightbox='#single-image-${cnt}'><img id='single-image-${cnt}' alt='${value['style_no']}' src='${img}' class='nav-design'></a></td>
                                                        <td>${value['category']}</td>
                                                        <td>${value['style_no']}</td>
                                                        <td>9 KT : ${value['gold_9kt']}<br />
                                                        10 KT : ${value['gold_10kt']}<br />
                                                        14 KT : ${value['gold_14kt']}<br />
                                                        18 KT : ${value['gold_18kt']}<br />
                                                        925S : ${value['gold_925s']}</td>
                                                        <td>${value['diamond_weight']}</td>
                                                        <td>${value['createdAt']}</td>
                                                        <td>
                                                            <div class="btn-group btn-group-justified text-white mb-2">
                                                                <a class="btn btn-sm btn-warning btn_enquiry waves-effect waves-light" data-name="${value['style_no']}" data-title="${value['title']}" data-id="${value['id']}" role="button">Enquire</a>
                                                                <a class="btn btn-sm btn-danger btn_reject waves-effect waves-light" data-id="${value['id']}"  role="button">Reject</a>
                                                            </div>
                                                        </td>
                                                    </tr>`;
                            cnt++;

                        });
                        $("#db_latest_design").html(imagestr);
                    }

                    //Outstanding Payments
                    if (oustanding != null) {
                        var imagestr = '';
                        var cnt = 1;
                        $.each(oustanding, function (index, value) {
                            var img = image_path + value['img'];
                            imagestr = imagestr + `<tr>
                                                        <td>${cnt}</td>
                                                        <td>${value['invoice_no']}</td>
                                                        <td>$ ${value['invoice_amount']}</td>
                                                        <td>$ ${value['paid_amount']}</td>
                                                        <td>$ ${value['pending_amount']}</td>
                                                        <td>
                                                            <i class="mdi mdi-clock-outline text-success"></i> ${value['due_date']}
                                                        </td>
                                                    </tr>`;
                            cnt++;

                        });
                        $("#db_outstanding").html(imagestr);
                    }
                    removeloader();
                    $("#loader-wrapper").hide();
                }else{
                    window.location = 'login';
                }
            }else{
                window.location = 'login';
            }
        },
        error: function (xhr, status, error) {
        }
    });
}
