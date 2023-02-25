<?php $pagename = 'products' ?>
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
                    <div class="col-12">
                        <h4 class="page-title">Products List (<span id="product_count"></span> Found)</h4>
                    </div>
                </div>
                <div class="row" id="product_div">
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
<script src="assets/js/products.js?i=<?= time();?>"></script>
</body>

</html>