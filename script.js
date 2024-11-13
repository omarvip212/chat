document.addEventListener('DOMContentLoaded', () => {
    const auth = firebase.auth();
    const database = firebase.database();
    
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const initialScreen = document.getElementById('initial-screen');
    const successScreen = document.getElementById('success-screen');
    const usernameSpan = document.getElementById('username');
    const logoutBtn = document.getElementById('logout-btn');
    
    // التحقق من حالة تسجيل الدخول
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            // إظهار اسم المستخدم
            const userRef = database.ref(`users/${user.uid}`);
            const snapshot = await userRef.once('value');
            const userData = snapshot.val();
            if (userData && userData.username) {
                usernameSpan.textContent = `مرحباً، ${userData.username}`;
            }
        } else {
            window.location.href = 'login.html';
        }
    });

    // معالجة زر تسجيل الخروج
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            try {
                await auth.signOut();
                window.location.href = 'login.html';
            } catch (error) {
                console.error('Error logging out:', error);
            }
        });
    }

    // معالجة زر "لا"
    if (noBtn) {
        noBtn.addEventListener('mouseover', () => {
            const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
            const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
            noBtn.style.position = 'absolute';
            noBtn.style.left = `${x}px`;
            noBtn.style.top = `${y}px`;
        });
    }

    // معالجة زر "نعم"
    if (yesBtn) {
        yesBtn.addEventListener('click', () => {
            initialScreen.style.display = 'none';
            successScreen.style.display = 'block';
            document.querySelector('.cat').classList.add('happy');
        });
    }

    // معالجة زر إنشاء غرفة جديدة
    document.getElementById('create-room')?.addEventListener('click', async () => {
        try {
            const roomId = await createChatRoom();
            window.location.href = `chat-room.html?room=${roomId}`;
        } catch (error) {
            console.error('Error creating room:', error);
            alert('حدث خطأ في إنشاء الغرفة');
        }
    });

    // معالجة زر الانضمام للغرفة
    document.getElementById('join-room')?.addEventListener('click', () => {
        const roomId = prompt('أدخل كود الغرفة:');
        if (roomId) {
            window.location.href = `chat-room.html?room=${roomId}`;
        }
    });
});

// دالة إنشاء غرفة جديدة
async function createChatRoom() {
    const roomId = Math.random().toString(36).substr(2, 9);
    try {
        const roomRef = firebase.database().ref(`rooms/${roomId}`);
        await roomRef.set({
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            active: true
        });
        return roomId;
    } catch (error) {
        console.error('Error creating room:', error);
        throw error;
    }
} 