// Dán cấu hình Firebase của bạn vào đây (Project settings > Your apps > Web app)
import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {getFirestore} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import {getAuth} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
const app=initializeApp({
  apiKey:'YOUR_API_KEY',
  authDomain:'YOUR_PROJECT.firebaseapp.com',
  projectId:'YOUR_PROJECT',
  appId:'YOUR_APP_ID'
});
export const db=getFirestore(app), auth=getAuth(app);

// Thông báo đơn mới qua ntfy (miễn phí). Đặt tên topic dài, ngẫu nhiên, khó đoán. Để trống nếu không dùng.
export const NOTIFY={ntfyTopic:''}; // vd: 'thuexe-8f3k2x9q7m'

// Email quản trị duy nhất được đăng nhập admin.html (viết đúng, vd: ten@gmail.com)
export const ADMIN_EMAIL='YOUR_EMAIL@gmail.com';
