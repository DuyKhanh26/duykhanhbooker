// Dán cấu hình Firebase của bạn vào đây (Project settings > Your apps > Web app)
import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {getFirestore} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import {getAuth} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
const app=initializeApp({
  apiKey:'AIzaSyCFY-Hq5Fu9Mi61NECcr8CjNbwhbeNYV88',
  authDomain:'thuexe-84663.firebaseapp.com',
  projectId:'thuexe-84663',
  appId:'1:721684541824:web:51b22477beb0e75eb31165'
});
export const db=getFirestore(app), auth=getAuth(app);

// Thông báo đơn mới qua ntfy (miễn phí). Đặt tên topic dài, ngẫu nhiên, khó đoán. Để trống nếu không dùng.
export const NOTIFY={ntfyTopic:'duykhanhbookerdaophuquy'}; // vd: 'thuexe-8f3k2x9q7m'

// Email quản trị duy nhất được đăng nhập admin.html (viết đúng, vd: ten@gmail.com)
export const ADMIN_EMAIL='duykhanh2605.pq@gmail.com';
