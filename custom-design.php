<?php $pagename = 'custom_design' ?>
<?php include('includes/top.php'); ?>
<style> 
.modal-content{
  border: 1px solid #cbcbcb !important;
}
.modal-2xl {
        width: 80% !important;
        max-width:none !important;
}
.modal-dialog-full-width {
        width: 100% !important;
        height: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        max-width:none !important;

    }

    .modal-content-full-width  {
        height: auto !important;
        min-height: 100% !important;
        border-radius: 0 !important;
        background-color: #ececec !important 
    }

    .modal-header-full-width  {
        border-bottom: 1px solid #9ea2a2 !important;
    }

    .modal-footer-full-width  {
        border-top: 1px solid #9ea2a2 !important;
    }
</style>
<div id="wrapper">
    <?php include('includes/header.php'); ?>
    <style>
        .f-2 {
            font-size: 10px !important;
        }
    </style>
    <div class="content-page">
        <div class="content">
            <!-- Start Content-->
            <div class="container-fluid">
                <div class="row">
                <div class="col-md-12">
                        <div class="card">
                            <div class="card-header bg-dark">
                                <span ><h5 style="color:#ffffff;display:inline-block;">Custom Designs</h5></span>
                                <span style="float:right;display:inline-block;"><button type="button" id="addNew" class="btn btn-sm btn-success"> Add Design </button></span>
                            </div>
                            <div class="card-body">
                                <div class="table-rep-plugin">
                                    <div class="table-responsive mb-0" data-pattern="priority-columns">
                                        <table id="datatable" class="table table-bordered  dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                        <thead>
                                        <tr>
                                            <th class="print-col">Sr No.</th>
                                            <th class="print-col">Enquiry No.</th>
                                            <th class="print-col">Start Date</th>
                                            <th class="print-col">Updated Date</th>
                                            <th class="print-col">Current Status</th>
                                            <th class="print-col">View</th>
                                        </tr>
                                        </thead>
                                        <tbody id="product_div">
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                                <form id="orderform" name="orderform" method="POST" enctype="multipart/form-data">
                                    <input type="hidden" id="custom_design_id" name="custom_design_id" value="0">
                                    <input type="hidden" id="custom_design_detail_id" name="custom_design_detail_id" value="0">
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end row -->
            </div> <!-- end container-fluid -->
        </div> <!-- end content -->
        <!-- Footer Start -->
        <!-- end Footer -->
    </div>
    <!-- ============================================================== -->
    <!-- End Page content -->
    <!-- ============================================================== -->
</div>
<?php include('includes/script.php'); ?>
<script src="assets/js/custom-design.js?i=<?= time();?>"></script>


<!-- Modal Windows  -->
<!-- View All -->
<div id="MyViewAll" class="modal fade" role="dialog" data-keyboard="true" aria-modal="true"  tabindex='-1'>
  <div class="modal-dialog modal-dialog-full-width">
    <!-- Modal content-->
    <div class="modal-content-full-width modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Custom Design History</h4>
      </div>
      <div class="modal-body" style="overflow: auto;">
        <div class="row">
          <div class="col-12">
            <div class="card-box table-responsive">
              <table id="table-history" class="table table-striped table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                <thead>
                  <tr>
                    <th class="print-col">Sr No.</th>
                    <!-- <th class="print-col">Customer Name</th> -->
                    <th class="print-col">Enquiry No.</th>
                    <th class="print-col">Description</th>
                    <th class="print-col">Link</th>
                    <th class="print-col">No of Image</th>
                    <th class="print-col">Status</th>
                    <th class="print-col">Updated Date</th>
                    <th class="print-col">Action</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
          </div>
        </div>      
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-sm btn-warning" data-dismiss="modal">Close</button>
        </form>
      </div>
    </div>
  </div>
</div>

<!-- View Full Details -->
<div id="MyDetails" class="modal fade" role="dialog" data-keyboard="true" aria-modal="true"  tabindex='-1'>
  <div class="modal-dialog modal-dialog-full-width">
    <!-- Modal content-->
    <div class="modal-content-full-width modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Custom Design Details <span id="enquiry_no" style="color:blue;"></span><span id="status" style="color:red;"></span></h4>
      </div>
      <div class="modal-body"  id="details" style="overflow: auto;">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-sm btn-warning" data-dismiss="modal">Close</button>
        </form>
      </div>
    </div>
  </div>
</div>

<!-- View Details -->
<div id="MyDetail" class="modal fade" role="dialog" data-keyboard="true" aria-modal="true"  tabindex='-1'>
  <div class="modal-dialog modal-dialog-full-width">
    <!-- Modal content-->
    <div class="modal-content-full-width modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Custom Design <span id="vd_enquiry_no" style="color:blue;"></span></h4>
      </div>
      <div class="modal-body"  id="vd_details" style="overflow: auto;">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-sm btn-success" id="approve_btn">Approve</button>
        <button type="button" class="btn btn-sm btn-danger" id="reject_btn">Reject</button>
        <button type="button" class="btn btn-sm btn-info" id="edit_btn">Edit</button>
        <button type="button" class="btn btn-sm btn-warning" data-dismiss="modal">Close</button>
        </form>
      </div>
    </div>
  </div>
</div>

<!-- Approve Price -->
<div id="MyApprovePrice" class="modal fade" role="dialog" data-keyboard="true" aria-modal="true">
  <div class="modal-dialog modal-dialog-full-width">
    <!-- Modal content-->
    <div class="modal-content-full-width modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Approve Custom Design Price</h4>
      </div>
      <div class="modal-body" style="overflow: auto;">
        <div class="main-grid">
          <form id="approvepriceform" name="approvepriceform" method="POST" enctype="multipart/form-data">
            <div class="row">
              <div class="col-md-12 mb-2">
                <div class="card-box table-responsive">
                  <div class="inner-repeater" style="min-width:1200px;">
                      <table class="table mb-0 table-bordered; width:400px;">
                          <thead class="thead-light">
                              <tr>
                                  <th width="5%"><input data-repeater-create type="button" value="+" id="createrow" class="btn btn-primary btn-sm createrow" title="Add Design" />
                                  <th width="15%">Gold Weight</th>
                                  <th width="25%">Color</th>
                                  <th width="25%">Quality</th>
                                  <th width="10%">Rate</th>
                                  <th width="10%">Quantity</th>
                                  <th width="10%">Total</th>
                                  </th>
                              </tr>
                          </thead>
                          <tbody data-repeater-list="design_data">
                              <tr data-repeater-item>
                                  <td class="nowrap"><input data-repeater-delete type='button' value='x' class='delete btn btn-danger btn-xs' title='Delete Row' /></td>
                                  <td>
                                      <select name="gold_wt" class="form-control selectpicker1" data-style="btn-outline-secondary" data-live-search="true" title="Select Gold Weight" >
                                          <option value="">Select Gold Weight</option>
                                          <option value="9kt">9kt</option>
                                          <option value="10kt">10kt</option>
                                          <option value="14kt">14kt</option>
                                          <option value="18kt">18kt</option>
                                          <option value="925s">925s</option>
                                      </select>
                                  </td>
                                  <td><input type="text" class="form-control" name="color" value=""></td>
                                  <td><input type="text" class="form-control" name="quality" value=""></td>
                                  <td><input type="text" class="form-control calculate" name="rate" value=""></td>
                                  <td><input type="text" class="form-control calculate" name="quantity" value=""></td>
                                  <td><input type="text" class="form-control" name="total" READONLY value="0"></td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-6 mt-2 mb-1">
                <label for="style_no">Order Description</label>
                  <textarea name="order_description" id="order_description" class="form-control"
                      placeholder="Order Description" title="Order Description"
                      style="height:180px;resize:none;border:1px solid #000000;"></textarea>
              </div>
              <div class="col-md-6 col-lg-6 mt-2 mb-1">
                <label for="style_no">Upload Reference Images (If Any. Max 5)</label>
                <div id="previewsApproveContainer" class="dropzone dz-clickable">
                  <div class="fallback">
                    <input name="file" type="file" multiple />
                  </div>
                  <div class="dz-message needsclick">
                    <div class="dz-msg">
                      <i class="h1 text-muted dripicons-cloud-upload"></i>
                      <h4 class="mt-3">Drop Photos here or click to upload.</h4>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-12 mb-2">
                <input type="hidden" id="approve_custom_design_id" name="custom_design_id" value="0">
                <input type="hidden" id="approve_custom_design_detail_id" name="custom_design_detail_id" value="0">
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-sm btn-danger save_data" id="approve_confirm_btn">Confirm</button>
        <button type="button" class="btn btn-sm btn-warning" data-dismiss="modal">Cancel</button>
      </div>
    </div>
  </div>
</div>

<!-- Reject Price -->
<div id="MyRejectPrice" class="modal fade" role="dialog" data-keyboard="true" aria-modal="true">
  <div class="modal-dialog">
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Reject Custom Design Price</h4>
      </div>
      <div class="modal-body" style="overflow: auto;">
        <div class="main-grid">
          <form id="rejectpriceform" name="rejectpriceform" method="POST" enctype="multipart/form-data">
            <div class="row">
              <div class="col-md-12 mb-2">
                <label class="control-label">Reason</label>
                <textarea name="reason" id="reason" class="form-control" placeholder="Reject Reason" title="Reject Reason" style="height:100px;resize:none;" ;></textarea>
                <input type="hidden" id="reject_custom_design_id" name="custom_design_id" value="0">
                <input type="hidden" id="reject_custom_design_detail_id" name="custom_design_detail_id" value="0">
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-sm btn-danger" id="reject_confirm_btn">Confirm</button>
        <button type="button" class="btn btn-sm btn-warning" data-dismiss="modal">Cancel</button>
      </div>
    </div>
  </div>
</div>

<!-- Add Custom Design  -->
<div id="AddModal" class="modal fade" role="dialog" data-keyboard="true" aria-modal="true" tabindex='-1'>
    <div class="modal-dialog modal-dialog-full-width">
        <!-- Modal content-->
        <div class="modal-content-full-width modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Add Custom Design</h4>
            </div>
            <div class="modal-body" style="overflow: auto;">
                <div class="row">
                    <div class="col-12">
                        <div class="card-box">
                            <form id="addform" name="addform" method="POST" enctype="multipart/form-data">
                                <div class="main-grid">
                                    <div class="row">
                                        <div class="col-md-12 col-lg-12 mt-2 mb-1">
                                            <label for="style_no">Upload Images (Max 5)</label>
                                            <div id="previewsContainer" class="dropzone dz-clickable">
                                                <div class="fallback">
                                                    <input name="file" type="file" multiple />
                                                </div>
                                                <div class="dz-message needsclick">
                                                    <div class="dz-msg">
                                                        <i class="h1 text-muted dripicons-cloud-upload"></i>
                                                        <h4 class="mt-3">Drop Photos here or click to upload.</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 col-lg-12 mt-2 mb-1">
                                        <label for="style_no">Description</label>
                                        <textarea name="description" id="description" class="form-control"
                                            placeholder="Description" title="Description"
                                            style="height:100px;resize:none;" ;></textarea>
                                    </div>
                                    <div class="col-md-12 col-lg-12 mt-2 mb-1">
                                        <label for="style_no">Link (Optional)</label>
                                        <input type="text" name="link" class="form-control" id="link"
                                            placeholder="Link (Ooptional)" title="Link (Ooptional)" value="">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-2 col-md-6 mt-3 mb-1">
                                        <input type="hidden" name="custom_design_id" id="add_custom_design_id"
                                            value="0">
                                        <input type="hidden" name="custom_design_detail_id"
                                            id="add_custom_design_detail_id" value="0">
                                    </div>
                                    <div class="col-lg-10 mb-1">
                                        <div class="alert alert-info" id="msgbox" style="display: none;">
                                            <span class="message"><img src="assets/images/loading.gif" width="20px">
                                                Adding
                                                Custom Design, Please wait....</span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer" id="btnform">
                <button type="button" class="btn btn-sm btn-success save_data">Save</button>
                <button type="button" class="btn btn-sm btn-warning" data-dismiss="modal">Cancel</button>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Reject Final Approval -->
<div id="MyRejectApproval" class="modal fade" role="dialog" data-keyboard="true" aria-modal="true">
  <div class="modal-dialog">
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Reject Final Approval</h4>
      </div>
      <div class="modal-body" style="overflow: auto;">
        <div class="main-grid">
          <form id="reject_approvalform" name="reject_approvalform" method="POST" enctype="multipart/form-data">
            <div class="row">
              <div class="col-md-12 mb-2">
                <label class="control-label">Reason</label>
                <textarea name="reject_reason" id="reject_reason" class="form-control" placeholder="Reject Reason" title="Reject Reason" style="height:100px;resize:none;" ;></textarea>
                <input type="hidden" id="reject_approval_custom_design_id" name="custom_design_id" value="0">
                <input type="hidden" id="reject_approval_custom_design_detail_id" name="custom_design_detail_id" value="0">
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-sm btn-danger" id="rejectapprovalbtn">Confirm</button>
        <button type="button" class="btn btn-sm btn-warning" data-dismiss="modal">Cancel</button>
      </div>
    </div>

  </div>
</div>

<!-- Accept Final Approval -->
<div id="MyAcceptApproval" class="modal fade" role="dialog" data-keyboard="false" aria-modal="true">
  <div class="modal-dialog">
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Accept Final Approval</h4>
      </div>
      <div class="modal-body" style="overflow: auto;">
        <div class="main-grid">
          <form id="acceptapprovalform" name="acceptapprovalform" method="POST" enctype="multipart/form-data">
            <div class="row">
              <div class="col-md-12 mb-2">
                  Are you sure You want to <span style="color:red; font-weight:bold;">Accept Final Approval</span> ?
                <input type="hidden" id="accept_approval_custom_design_id" name="custom_design_id" value="0">
                <input type="hidden" id="accept_approval_custom_design_detail_id" name="custom_design_detail_id" value="0">
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-sm btn-danger" id="acceptapprovalbtn">Confirm</button>
        <button type="button" class="btn btn-sm btn-warning" data-dismiss="modal">Cancel</button>
      </div>
    </div>

  </div>
</div>
</body>
</html>