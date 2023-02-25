<?php $pagename = 'profile' ?>
<?php include('includes/top.php'); ?>
<style>
    #map {
        height: 100%;
        border: 1px solid #cecece;
    }
</style>
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
                <div class="col-md-12">
                    <div class="profile-bg-picture" style="background-image:url('assets/images/bg-profile.jpg')">
                        <span class="picture-bg-overlay"></span><!-- overlay -->
                    </div>
                    <!-- meta -->
                    <div class="profile-user-box">
                        <div class="row">
                            <div class="col-md-6">
                                <span class="float-left mr-3"><img src="assets/images/no-photo.jpg" alt="" class="avatar-xl rounded-circle"  id="pr_company_logo"></span>
                                <div class="media-body">
                                    <h3 class="mt-4 mb-1 ellipsis"><span class="is-loading" id="pr_company_name"></span></h3>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="text-right">
                                    <!-- <button type="button" class="btn btn-success waves-effect waves-light">
                                        <i class="mdi mdi-account-settings-variant mr-1"></i> Edit Profile
                                    </button> -->
                                </div>
                            </div>
                            <div class="col-md-12 mt-3">
                                <hr>
                            </div>
                            <div class="col-md-6 mt-3">
                                <h4 class="header-title mt-0 mb-4">Company Address</h4>
                                <div class="panel-body">
                                    <p class="text-muted font-13"><span class="is-loading" id="pr_company_address"></span></p>
                                    <hr>
                                    <h4 class="header-title mt-0 mb-4">Company Details</h4>
                                    <p class="text-muted font-13"><strong>Email ID :</strong> <span id="pr_company_email" class="is-loading ml-3"></span></p>
                                    <p class="text-muted font-13"><strong>Phone No :</strong> <span id="pr_company_phone" class="is-loading ml-3"></span></p>
                                    <p class="text-muted font-13"><strong>Website :</strong> <span id="pr_company_website" class="is-loading ml-3"></span></p>
                                    <p class="text-muted font-13"><strong>Tax ID no :</strong> <span id="pr_companytax_id" class="is-loading ml-3"></span></p>
                                    <hr>
                                    <h4 class="header-title mt-0 mb-4">Contact Person Details</h4>
                                    <p class="text-muted font-13"><strong>Full Name :</strong> <span id="pr_contact_name" class="is-loading ml-3"></span></p>
                                    <p class="text-muted font-13"><strong>Mobile :</strong><span id="pr_contact_mobile" class="is-loading ml-3"></span></p>
                                    <p class="text-muted font-13"><strong>Email :</strong> <span id="pr_contact_email" class="is-loading ml-3"></span></p>
                                </div>
                            </div>
                            <div class="col-md-6 mb-2" style="min-height:200px;">
                                <div id="map"></div>
                            </div>
                        </div>
                    </div>
                    <!--/ meta -->
                </div>
            </div>
            <!-- end row -->
            
        </div> <!-- end container-fluid -->

    </div> <!-- end content -->
</div>
</div>
<?php include('includes/script.php'); ?>
<script>
var dlat = 19.153903855786677;
var dlng = 72.83898421740493;
</script>
<script src="assets/js/profile.js?i=<?= time();?>"></script>
</body>
</html>