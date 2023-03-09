importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-messaging.js');
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