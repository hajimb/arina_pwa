<?php $pagename = 'dashboard' ?>
<?php include('includes/top.php'); ?>
<div id="wrapper">
<?php include('includes/header.php'); ?>

<style>
    .maxheight{
        overflow: auto;
        height: 70vh;
    }
</style>
<!-- ============================================================== -->
<!-- Start Page Content here -->
<!-- ============================================================== -->
<div class="content-page">
    <div class="content">
        
        <!-- Start Content-->
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-12 col-lg-12">
                    <div class="card-box">
                        <h4 class="header-title">Order List</h4>
                        <div class="table-rep-plugin">
                            <div class="table-responsive mb-0" data-pattern="priority-columns">
                                <table id="datatable" class="table table-bordered  dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                <thead>
                                <tr>
                                    <th data-priority="1">Sr No.</th>
                                    <th data-priority="1">Invoice Number</th>
                                    <th data-priority="2">Invoice Date</th>
                                    <th data-priority="1">Total Quantity</th>
                                    <th data-priority="1">Total Amount</th>
                                    <th data-priority="1">Paid Amount</th>
                                    <th data-priority="1">Balance Amount</th>
                                    <th data-priority="1">Due Date</th>
                                    <th data-priority="1">Over Due</th>
                                    <th data-priority="1">Action</th>
                                </tr>
                                </thead>
                                <tbody id="orders_div">
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th colspan="3" style="text-align:right"></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th colspan="3" style="text-align:right"></th>
                                    </tr>
                                </tfoot>                            
                            </table>
                            </div>
                        </div>
                        <form id="invoiceform" name="invoiceform">
                            <input type="hidden" id="invoice_id" name="invoice_id" value="0">
                        </form>

                    </div>
                </div>
            </div>
        </div> <!-- end container-fluid -->

    </div> <!-- end content -->
</div>

<!-- ============================================================== -->
<!-- End Page content -->
<!-- ============================================================== -->

</div>


<?php include('includes/script.php'); ?>
<script src="assets/js/invoice.js?i=<?= time();?>"></script>
</body>
</html>
<div id="PaymentDetailsModal" class="modal fade" role="dialog" data-keyboard="false" aria-modal="true">
  <div class="modal-dialog modal-xl">
    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Payment Details : <span id="invoice_number"></span></h4>
      </div>
      <div class="modal-body">
        <div class="card-box table-responsive maxheight">
            <table id="datatable-designs" class="table table-striped table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                <thead>
                <tr>
                    <th>Sr. No</th>
                    <th>Invoice Number</th>
                    <th>Invoice Date</th>
                    <th>Amount Paid</th>
                    <th>Payment Date</th>
                    <th>Payment Type</th>
                    <th>Cheque / UTR No</th>
                    <th>Cheque / Transfer Date</th>
                </tr>
                </thead>
                <tbody id="dv_order_details">
                </tbody>
                <tfooter>
                    <td colspan="3" class="text-right">Total</td>
                    <td  class="text-right" id="grandtotal"></td>
                    <td colspan="4"></td>
                </tfooter>
            </table>
        </div>
      </div>
      <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
      </form>
      </div>
    </div>
  </div>
</div>