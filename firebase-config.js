const firebaseConfig = {
  apiKey: "AIzaSyBinZnFtIKtTCzid4SiABoB-03hxAMfbBs",
  authDomain: "love-f-o.firebaseapp.com",
  projectId: "love-f-o",
  storageBucket: "love-f-o.firebasestorage.app",
  messagingSenderId: "196009771658",
  appId: "1:196009771658:web:9e3d4772fdee7cc9a4e373",
  measurementId: "G-SLJJJBGYEL"
};


// تهيئة Firebase
firebase.initializeApp(firebaseConfig);

const connectedRef = firebase.database().ref('.info/connected');
connectedRef.on('value', (snap) => {
  if (snap.val() === true) {
    console.log('متصل بقاعدة البيانات');
    const existingToast = document.querySelector('.toast.connection');
    if (existingToast) {
      existingToast.remove();
    }
  } else {
    console.log('غير متصل بقاعدة البيانات');
    showConnectionError();
  }
});

firebase.auth().onAuthStateChanged((user) => {
  const loadingOverlay = document.querySelector('.loading-overlay');
  if (loadingOverlay) {
    loadingOverlay.remove();
  }
});

function showConnectionError() {
  const existingToast = document.querySelector('.toast.connection');
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement('div');
  toast.className = 'toast connection';
  toast.innerHTML = `
    <i class="fas fa-wifi"></i>
    <span>يرجى التحقق من اتصال الإنترنت</span>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 100);
}

document.addEventListener('DOMContentLoaded', () => {
  const loadingOverlay = document.createElement('div');
  loadingOverlay.className = 'loading-overlay';
  loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
  document.body.appendChild(loadingOverlay);
});
