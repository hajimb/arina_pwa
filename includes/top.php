<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>Arina Jewellery Application</title>
    <meta name = "viewport" content = "width=device-width, minimum-scale=1.0, maximum-scale = 1.0, user-scalable = no">
    <meta content="Arina Jewellery Application for customers" name="description" />
    <meta content="Badri Computers" name="author" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!-- App favicon -->
    <link rel="shortcut icon" href="assets/images/favicon.ico">

    <!-- App css -->
    <link href="assets/css/bootstrap.css" rel="stylesheet" type="text/css" id="bootstrap-stylesheet" />
    <link href="assets/css/icons.css" rel="stylesheet" type="text/css" />
    <link href="assets/libs/jquery-toast/jquery.toast.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/app.css?i=<?= time();?>" rel="stylesheet" type="text/css"  id="app-stylesheet" />
    <link href="assets/css/video.css?i=<?= time();?>" rel="stylesheet" type="text/css"  id="app-stylesheet" />

    <!-- third party css -->
    <link href="assets/libs/datatables/dataTables.bootstrap4.css" rel="stylesheet" type="text/css" />
    <link href="assets/libs/datatables/buttons.bootstrap4.css" rel="stylesheet" type="text/css" />
    <link href="assets/libs/datatables/responsive.bootstrap4.css" rel="stylesheet" type="text/css" />

    <!--  loader  -->
    <link href="assets/libs/spinkit/spinkit.css" rel="stylesheet" type="text/css" >

    
    <!-- Logitbox css -->
    <link href="assets/libs/lightbox2/lightbox.min.css" rel="stylesheet" type="text/css">
    
    <!-- Responsive Table css -->
    <!-- <link href="assets/libs/rwd-table/rwd-table.min.css" rel="stylesheet" type="text/css" /> -->
    
    <link href="assets/libs/bootstrap-select/bootstrap-select.min.css" rel="stylesheet" type="text/css" >
    <?php if($pagename == "catalog"){ ?>
        <link type="text/css" href="assets/css/dataTables.checkboxes.css" rel="stylesheet" />
    <?php } if($pagename == "custom_design"){ ?>
        <link type="text/css" href="assets/libs/dropzone/dropzone.min.css" rel="stylesheet" />
    <?php } if($pagename == "login"){ ?>
        <link rel="manifest" href="manifest.json?i=<?= time();?>" />
    <?php } if($pagename == "dashboard"){ ?>
        <style type="text/css">
            .jqstooltip { position: absolute;left: 0px;top: 0px;visibility: hidden;background: rgb(0, 0, 0) transparent;background-color: rgba(0,0,0,0.6);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000);-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)";color: white;font: 10px arial, san serif;text-align: left;white-space: nowrap;padding: 5px;border: 1px solid white;box-sizing: content-box;z-index: 10000;}.jqsfield { color: white;font: 10px arial, san serif;text-align: left;}
        </style>
    <?php } ?>

    <!--  Firebase  -->
    <script src="https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js"></script>
<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/8.1.1/firebase-analytics.js"></script>

    <script src="https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.6.1/firebase-messaging.js"></script>

</head>
<?php if($pagename=="login"){ ?>
<body class="authentication-bg bg-primary authentication-bg-pattern d-flex align-items-center pb-0 vh-100">
    <!--  Firebase  -->
    <script src="https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js"></script>
    <!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
    <script src="https://www.gstatic.com/firebasejs/8.1.1/firebase-analytics.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.1.1/firebase-messaging.js"></script>

    <script>
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
        apiKey: "AIzaSyCrpjnrq8dLYbGf2ZncW23-q7cV__sdmlM",
        authDomain: "arin-pwa-app.firebaseapp.com",
        projectId: "arin-pwa-app",
        storageBucket: "arin-pwa-app.appspot.com",
        messagingSenderId: "25965293200",
        appId: "1:25965293200:web:5883628f4864fb021e7215",
        measurementId: "G-7JNYFNXCR4"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
//     if ('serviceWorker' in navigator) {
//   const messaging = firebase.messaging()
//   navigator.serviceWorker.register('firebase-messaging-sw.js')
//     .then((register) => {
//       messaging.requestPermission().then(() => {
//         messaging.getToken()
//           .then((fcmToken) => {
//             console.log(fcmToken)
//             messaging.onMessage((payload) => {
//               console.log("onMessage event fired", payload)
//             })
//           });
//       });
//     })
// } else {
//   console.log('Service Worker not supported')
// }
</script>
<?php }else{ ?>
<body data-layout="horizontal" cz-shortcut-listen="true">
<?php } ?>
