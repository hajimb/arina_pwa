importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-messaging.js');
var firebaseConfig = {
    apiKey: "AIzaSyCBJ20nvuqrCLSewKt3T805-DPA_c1-88s",
    authDomain: "pwa-arina.firebaseapp.com",
    projectId: "pwa-arina",
    storageBucket: "pwa-arina.appspot.com",
    messagingSenderId: "446943933151",
    appId: "1:446943933151:web:175eb95b1097d127b12f6a",
    measurementId: "G-1NEQ5Q757V"

};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };
    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});
self.addEventListener('notificationclick', event => {
    console.log(event)
});