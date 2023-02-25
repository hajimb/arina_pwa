
    <!-- Vendor js -->
    <script src="assets/js/vendor.min.js"></script>

    <!-- App js -->
    <script src="assets/js/app.js"></script>
    
    <!-- LightBox js -->
    <script src="assets/libs/lightbox2/lightbox.min.js"></script>
    <script src="assets/js/jquery.serializeToJSON.js"></script>
    <script src="assets/libs/jquery-toast/jquery.toast.min.js"></script>
    <script src="assets/js/common.js?i=<?= time();?>"></script>

    <!-- Required datatable js -->
    <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
    <script src="assets/libs/datatables/dataTables.bootstrap4.min.js"></script>
    <script src="assets/js/moment.js"></script>

    <!-- Responsive Table js -->
    <!-- <script src="assets/libs/rwd-table/rwd-table.min.js"></script> -->
    
<?php if($pagename == "catalog"){ ?>
      <script type="text/javascript" src="assets/js/dataTables.checkboxes.min.js"></script>
<?php } if($pagename == "custom_design"){ ?>
      <script type="text/javascript" src="assets/libs/dropzone/dropzone.min.js"></script>
      <script type="text/javascript" src="assets/js/jquery.repeater.min.js"></script>
<?php } if($pagename == "dashboard") {?>
    <!-- Sparkline charts -->
    <script src="assets/libs/jquery-sparkline/jquery.sparkline.min.js"></script>
    <script src="assets/js/pages/profile.init.js"></script>
<?php }else if($pagename == "login"){ ?>
    <script src="script.js"></script>
<?php }else if($pagename == "profile"){ ?>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCunoKdw5Q4F_XWdetqy7JhmrZWpinb4zQ&callback=initMap&libraries=&v=weekly" defer></script>
<?php } ?>
<?php include('local_script.php'); ?>
<?php if($pagename != "login"){ ?>

<footer class="footer">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                2022 © Arina Jewellery
            </div>
        </div>
    </div>
</footer>
<div id="EnquiryModal" class="modal fade" role="dialog" data-keyboard="false" data-backdrop="static" aria-modal="true">
  <div class="modal-dialog">
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <div>
            <h4>Enquiry for : <span id="product_name"></span></h4>
            <span id="title" class="text-gray-400">store credit</span>
        </div>
      </div>
      <div class="modal-body" style="overflow: auto;">
        <div class="main-grid">
          <form id="enquiryform" name="enquiryform" method="POST" enctype="multipart/form-data">
            <div class="row">
              <div class="col-md-12 mb-2">
                <label class="control-label">Description</label>
                <textarea name="description" id="description" class="form-control" placeholder="Description" title="Description" style="height:100px;resize:none;" ;></textarea>
              </div>
              <div class="col-md-12 mb-2">
                <label class="control-label">Quantity</label>
                <input type="number" min ="0" name="quantity" class="form-control" id="quantity" placeholder="Quantity" title="Quantity" value="">
                <input type="hidden" id="enquiry_design_id" name="design_id" value="0">
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" id="enquiry_submit">Enquire</button>
        <button type="button" class="btn btn-warning" id="enquiry_cancel">Cancel</button>
      </div>
    </div>

  </div>
</div>
<div id="RejectModal" class="modal fade" role="dialog" data-keyboard="false" data-backdrop="static" aria-modal="true">
  <div class="modal-dialog ">
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Reject Design</h4>
      </div>
      <div class="modal-body" style="overflow: auto;">
        <div class="main-grid">
            <form id="rejectform" name="rejectform" method="POST" enctype="multipart/form-data">
            <input type="hidden" id="reject_design_id" name="design_id" value="0">
            </form>
            <div class="col-md-12" id="del_msg">
                <h5>Are you sure You want to <span style="color:red;">Reject this Design</span> ?</h5>
            </div>
        </div>
      </div>
      <div class="modal-footer">
          <button type="button" data-id="" class="btn btn-danger" id="reject_submit">Confirm</button>
          <button type="button" class="btn btn-warning" data-dismiss="modal">Cancel</button>
      </form>
      </div>
    </div>

  </div>
</div>
<?php } ?>
