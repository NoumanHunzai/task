/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyCudywCUTJgeuKJ9d1LCdiSNpf_DiPc-to",
  authDomain: "task-5a0c4.firebaseapp.com",
  projectId: "task-5a0c4",
  storageBucket: "task-5a0c4.appspot.com",
  messagingSenderId: "213423386669",
  appId: "1:213423386669:web:d820f00a017833e2aa88a4",
  measurementId: "G-640NLVQ64M",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
