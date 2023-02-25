let dismissButton = document.getElementById("dismiss");

dismissButton.addEventListener("click", function() {
	document.getElementById("topnav").style.display = "none";
});

// Register service worker to control making site work offlin

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('sw.js')
    .then(() => { console.log('Service Worker Registered'); });
}

// Code to handle install prompt on desktop

let deferredPrompt;
const addBtn = document.querySelector('.install');
const adddiv = document.querySelector('.adddiv');

adddiv.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeinstallprompt called');
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
    console.log('preventDefault called');
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
    console.log('defereed prompt called');
  
  // Update UI to notify the user they can add to home screen
  adddiv.style.display = 'block';
  console.log('div block');
  addBtn.addEventListener('click', () => {
    // hide our user interface that shows our A2HS button
    adddiv.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  });
});