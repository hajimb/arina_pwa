<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Service Worker Example</title>
	<link rel="manifest" href="manifest.json" />
	<link href="style.css" rel="stylesheet" />
	<link rel="apple-touch-icon" sizes="180x180" href="assets/images/apple-touch-icon.png">
    <link rel="icon" type="image/png" href="assets/images/favicon.ico" type="image/x-icon">
    <link rel="icon" type="image/png" sizes="32x32" href="assets/images/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/favicon-16x16.png">
    <link rel="mask-icon" href="image/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="apple-mobile-web-app-title" content="Arina Jewellery">
    <meta name="application-name" content="Arina Jewellery">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#000000">
</head>

<body>
<h1>Arina Jewellery App</h1>
<a href="page1">Page 1</a>
<br/><br/>
<a href="page2">Page 2</a>
<br/><br/>
<a href="login">Login Page</a>
<br/><br/>

<div>
	<p>Before you enable the PWA, check out how slow this website is.</p>
	<button id="enable">Enable the PWA</button>
</div>

<button id="install">Install this app</button>
<script src="script.js"></script>
</body>
