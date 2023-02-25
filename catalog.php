<?php $pagename = 'catalog' ?>
<?php include('includes/top.php'); ?>
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
                <?php include('product-filter.php'); ?>
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header bg-dark">
                                <span ><h5 style="color:#ffffff;display:inline-block;">Products Catalog</h5></span>
                                <span style="float:right;display:inline-block;"><button type="button" id="save_pdf" class="btn btn-sm btn-success"> Save PDF </button></span>
                            </div>
                            <div class="card-body">
                                <div class="table-rep-plugin">
                                    <div class="table-responsive mb-0" data-pattern="priority-columns">
                                        <table id="datatable" class="table table-bordered  dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                                        <thead>
                                        <tr>
                                            <!-- <th><input type="checkbox" name="alldesigns" id="alldesigns" class="checkboxes" value="1"> </th> -->
                                            <th></th>
                                            <th data-priority="1">Sr No.</th>
                                            <th data-priority="1">Image</th>
                                            <th data-priority="2">Category</th>
                                            <th data-priority="1">Style No</th>
                                            <th data-priority="1">Gold Weight</th>
                                            <th data-priority="1">Diamond Weight</th>
                                            <th data-priority="1">Creation Date</th>
                                            <th data-priority="1">ID</th>
                                        </tr>
                                        </thead>
                                        <tbody id="product_div">
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                                <form id="orderform" name="orderform" method="POST" enctype="multipart/form-data">
                                    <input type="hidden" id="design_id" name="design_id" value="0">
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
<style>
    .carousel-indicators li {
        background-color: #000 !important;
        width: 10px !important;
    }

    .carousel-indicators {
        bottom: -15px !important;

    }
</style>
<?php include('includes/script.php'); ?>
<script src="assets/js/catalog.js?i=<?= time();?>"></script>
</body>

</html>