var map, marker ;
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

function initMap() {
  const myLatLng = { lat: dlat, lng: dlng };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: myLatLng,
  });
  marker = new google.maps.Marker({
    position: myLatLng,
    map,
    title: "Company Location",
    draggable:false,
  });
  
  $("#loader-wrapper").hide();
}
 


function loadPageData(){
  var url = api_url + 'v2/profile';
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
                  var data = response['data'][0];
                  // console.log(data);
                  // Profile Header //

                  var image_path = profile_data['customer_image_path'];
                  var logo_image = data['logo_image'];
                  var photo_url = image_path + logo_image;

                  $("#pr_company_name").html(data['company_name']);
                  $("#pr_company_address").html(data['address']);
                  $("#pr_company_email").html(data['company_email']);
                  $("#pr_company_phone").html(data['company_phone']);
                  $("#pr_company_website").html(data['company_website']);
                  $("#pr_companytax_id").html(data['company_tax_id']);
                  $("#pr_company_logo").attr("src", photo_url);
                  
                  $("#pr_contact_name").html(data['contact_name']);
                  $("#pr_contact_mobile").html(data['contact_phone']);
                  $("#pr_contact_email").html(data['contact_email']);
                  if(data['latitude'] != null){
                    var location = {
                        lat : parseFloat(data['latitude']),
                        lng : parseFloat(data['longitude'])
                    };
                    map.setCenter(location);
                    marker.setPosition(location);
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
