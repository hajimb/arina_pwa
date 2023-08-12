<?php $pagename = 'dashboard' ?>
<?php include('includes/top.php'); ?>
<div id="wrapper">
    <?php include('includes/header.php'); ?>
<!-- ============================================================== -->
<!-- Start Page Content here -->
<!-- ============================================================== -->
<div class="content-page">
    <div class="content">
        
        <!-- Start Content-->
        <div class="container-fluid">
            
            <div class="row">
                <div class="col-sm-12">
                    <div class="profile-bg-picture" style="background-image:url('assets/images/bg-profile.jpg')">
                        <span class="picture-bg-overlay"></span><!-- overlay -->
                    </div>
                    <!-- meta -->
                    <div class="profile-user-box">
                        <div class="row">
                            <div class="col-sm-12">
                                <span class="float-left mr-3"><img src="assets/images/no-photo.jpg" alt="" id="db_company_logo" class="avatar-xl rounded-circle"></span>
                                <div class="media-body">
                                    <h4 class="mt-1 mb-1 font-18 ellipsis"><span class="is-loading" id="db_company_name"></span></h4>
                                    <p class="font-13"> <span class="is-loading" id="db_company_email"></span></p>
                                    <p class="text-muted mb-0"><span class="is-loading" id="db_company_phone"></span></p>
                                </div>
                            </div>
                            <!-- <div class="col-sm-6">
                                <div class="text-right">
                                    <button type="button" class="btn btn-success waves-effect waves-light">
                                        <i class="mdi mdi-account-settings-variant mr-1"></i> Edit Profile
                                    </button>
                                </div>
                            </div> -->
                        </div>
                    </div>
                    <!--/ meta -->
                </div>
            </div>
            <div class="row">
                <div class="col-xl-12">
                    <div class="card-box widget-box-two widget-two-custom">
                        <div class="table-responsive">
                            <!-- <table class="table mb-0"> -->
                            <table class="tablesaw table mb-0" data-tablesaw-mode="stack">
                                <thead id="dashboard_head">
                                </thead>
                                <tbody id="dashboard_body">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end row -->
            <div class="row">
                <div class="col-xl-12 col-lg-12">
                    <div class="card-box">
                        <h4 class="header-title">Latest Designs</h4>
                        <div class="table-rep-plugin">
                            <div class="table-responsive mb-0" data-pattern="priority-columns">
                                <table id="tech-companies-1" class="table  table-striped">
                                <thead>
                                <tr>
                                    <th data-priority="1">Image</th>
                                    <th data-priority="2">Category</th>
                                    <th data-priority="1">Stlye No</th>
                                    <th data-priority="3">Gold Weight</th>
                                    <th data-priority="3">Diamond weight</th>
                                    <th data-priority="4">Creation Date</th>
                                    <th data-priority="1">Action</th>
                                </tr>
                                </thead>
                                <tbody id="db_latest_design">
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
        
                </div>
            </div>
            <div class="row">
            <div class="col-xl-12 col-lg-12">
                <div class="card-box">
                    <h4 class="header-title">Outstanding Payment</h4>
                    <div class="table-responsive mb-0">
                        <table class="table table-hover m-0 table-actions-bar">
                            <thead>
                                <tr>
                                    <th>Sr</th>
                                    <th>Invoice Number</th>
                                    <th>Invoice Amount</th>
                                    <th>Paid Amount</th>
                                    <th>Pending Amount</th>
                                    <th>Due Date</th>
                                </tr>
                            </thead>
                            <tbody id="db_outstanding">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
            <!-- end row -->
        </div> <!-- end container-fluid -->
    </div> <!-- end content -->
</div>
<!-- ============================================================== -->
<!-- End Page content -->
<!-- ============================================================== -->

</div>


<?php include('includes/script.php'); ?>
</body>
<script src="assets/js/dashboard.js?i=<?= time();?>"></script>

</html>
<script>

// $(function(){
//     $(".table-responsive").responsiveTable({
//         addDisplayAllBtn:"btn btn-secondary"
//     })
// });

</script>
