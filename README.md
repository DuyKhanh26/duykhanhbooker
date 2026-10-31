# HƯỚNG DẪN CÀI ĐẶT WEB DUY KHANH BOOKER (miễn phí 100%)

File trong thư mục: index.html (trang khách) · admin.html (trang quản trị) · firebase-config.js (cấu hình, bạn phải sửa) · style.css (giao diện).
Dùng: GitHub Pages + Firebase gói Spark + ntfy, đều miễn phí, không cần thẻ.
Giải nén file zip trước. Bạn sẽ sửa DUY NHẤT file **firebase-config.js** (4 giá trị Firebase, email admin, tên topic ntfy).

---
## PHẦN 1 – Tạo Firebase (project mới, riêng)

1. Vào https://console.firebase.google.com, đăng nhập Google → **Create a project** (hoặc Add project).
2. Đặt tên, ví dụ `thue-xe` → Continue → tắt Google Analytics → **Create project** → Continue.
3. Ở trang tổng quan, bấm biểu tượng **`</>`** (Web) → đặt nickname bất kỳ → **Register app**. KHÔNG tick Firebase Hosting.
4. Màn hình hiện đoạn `const firebaseConfig = {...}`. Bạn cần 4 giá trị: **apiKey, authDomain, projectId, appId**. Giữ trang này (hoặc vào ⚙️ Project settings → Your apps để xem lại).
5. Mở file **firebase-config.js** bằng Notepad (hoặc VS Code), thay 4 chỗ `YOUR_...` bằng giá trị vừa copy (giữ nguyên dấu nháy ' '). Lưu lại.
6. Cũng trong file đó, thay `YOUR_EMAIL@gmail.com` ở dòng `ADMIN_EMAIL` bằng email của bạn (email này là email DUY NHẤT vào được admin; phải là email nhận được thư).

## PHẦN 2 – Bật cơ sở dữ liệu, đăng nhập

1. Menu trái **Build → Firestore Database → Create database**.
2. Chọn vị trí `asia-southeast1` (Singapore) → Next → chọn **Start in production mode** → Create.
3. Vào tab **Rules** → bấm vào khung code → Ctrl+A → Delete → dán đoạn dưới. **Thay `ten@gmail.com` (1 chỗ) bằng đúng email admin của bạn** → bấm **Publish**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {
    function isAdmin() {
      return request.auth != null
        && request.auth.token.email == 'ten@gmail.com'
        && request.auth.token.email_verified == true;
    }
    match /settings/{d} { allow read: if true; allow write: if isAdmin(); }
    match /cars/{d}     { allow read: if true; allow write: if isAdmin(); }
    match /bookings/{d} { allow create: if true; allow read, update, delete: if isAdmin(); }
  }
}
```
4. Menu trái **Build → Authentication → Get started → tab Sign-in method → Add new provider → Google** → bật **Enable** → chọn email hỗ trợ (support email) là Gmail của bạn → **Save**. (Nếu Google đã hiện "Enabled" thì bỏ qua.)
5. KHÔNG cần tạo user, không cần bật Email/Password. Lần đầu bạn đăng nhập bằng Google, Firebase tự tạo tài khoản.
   Chỉ tài khoản Google có email trùng `ADMIN_EMAIL` mới vào được.

## PHẦN 3 – Cài thông báo ntfy trên điện thoại

1. Cài app **ntfy** (Android: Google Play / F-Droid; iPhone: App Store).
2. Mở app → dấu **+** → **Subscribe to topic** → nhập tên topic dài, ngẫu nhiên, ví dụ `thuexe-8f3k2x9q7m` → Subscribe.
   Đừng dùng tên dễ đoán như `thuexe`, vì ai biết tên đều gửi/nhận được.
3. Mở **firebase-config.js**, điền đúng tên đó:
   `export const NOTIFY={ntfyTopic:'thuexe-8f3k2x9q7m'};` → lưu lại.
4. Cho phép app ntfy gửi thông báo, và tắt tối ưu pin cho app (Android) để chuông không bị trễ.

## PHẦN 4 – Đưa lên GitHub (làm trên trình duyệt, không cần cài gì)

1. Vào https://github.com → đăng nhập (chưa có thì **Sign up**, miễn phí).
2. Bấm **+** góc phải trên → **New repository**.
   - Repository name: `thue-xe` (tên này sẽ nằm trong link web)
   - Chọn **Public** (GitHub Pages miễn phí yêu cầu Public)
   - Bấm **Create repository**.
3. Ở trang repo trống, bấm **uploading an existing file**.
4. Mở thư mục đã giải nén, chọn **4 file**: index.html, admin.html, firebase-config.js, style.css → kéo thả vào trang GitHub. (Không cần up HUONG_DAN.md.) Nhớ up file `firebase-config.js` ĐÃ SỬA.
5. Kéo xuống, bấm **Commit changes**.
6. Vào tab **Settings** của repo → menu trái **Pages**.
   - Source: **Deploy from a branch**
   - Branch: **main**, thư mục **/ (root)** → **Save**.
7. Đợi 1–3 phút, tải lại trang Pages sẽ hiện link dạng `https://TEN-GITHUB.github.io/thue-xe/`.
   - Trang khách: link đó
   - Trang admin: link đó + `admin.html`

## PHẦN 5 – Cho phép đăng nhập từ link GitHub (BẮT BUỘC)

1. Quay lại Firebase → **Authentication → Settings → Authorized domains → Add domain**.
2. Nhập `TEN-GITHUB.github.io` (chỉ phần tên miền: không có `https://`, không có `/thue-xe`) → Add.
Thiếu bước này sẽ không đăng nhập được admin.

## THÊM ẢNH (ảnh để trên GitHub, không tốn dung lượng Firebase)
Web KHÔNG còn upload ảnh vào Firebase. Bạn để ảnh trong thư mục `img` của repo GitHub, rồi dán đường dẫn vào admin.
1. **Chuẩn bị ảnh:** đặt tên không dấu, không khoảng trắng, chữ thường, vd `wave-alpha.jpg`, `avatar.jpg` (GitHub phân biệt hoa/thường). Nên thu nhỏ còn khoảng 800px chiều ngang, dưới 200KB (nén miễn phí tại https://squoosh.app hoặc https://tinypng.com).
2. **Lần đầu:** khi up file ở Phần 4, kéo thả luôn cả thư mục `img` (đã có sẵn trong zip) rồi bỏ ảnh vào đó trước khi up.
3. **Thêm ảnh sau này:** vào repo → bấm thư mục **img** → **Add file → Upload files** → chọn ảnh → **Commit changes**.
4. **Dán vào admin:** ô "Link ảnh xe" gõ `img/wave-alpha.jpg`; ô "Link ảnh đại diện" gõ `img/avatar.jpg`. Ô xem trước sẽ hiện ảnh nếu đúng. Ảnh mới up cần chờ 1–2 phút mới hiện.
- Cũng dán được link ảnh đầy đủ từ nơi khác (bắt đầu bằng `https://`).
- Ảnh đã upload kiểu cũ vẫn hiển thị bình thường; muốn bỏ thì dán link mới vào để thay.

## PHẦN 6 – Dùng lần đầu

1. Mở `.../admin.html` → bấm **Đăng nhập bằng Google** → chọn đúng tài khoản Google có email admin. Nếu chọn tài khoản khác sẽ bị báo không có quyền.
2. Tab **Giới thiệu**: nhập tên thương hiệu, SĐT/Zalo, giới thiệu, kinh nghiệm, khách hàng (mỗi dòng 1 khách), tiêu đề phần xe, dán link ảnh đại diện (xem mục THÊM ẢNH) → **Lưu**.
3. Tab **Xe**: thêm từng xe (tên, hạng mục, giá, thông số, mô tả, link ảnh). Tick **"Hiện ở mục Tất cả"** cho tối đa 4 xe muốn hiện ở tab Tất cả. Số thứ tự nhỏ hiện trước.
4. Mở trang khách, đặt thử 1 đơn → điện thoại phải kêu thông báo ntfy, và đơn hiện ở tab **Đơn đặt** trong admin → đổi trạng thái/xóa đơn thử.

## Cập nhật sau này
- Đổi nội dung, xe, giá: vào admin, không cần sửa code.
- Đổi code/giao diện: vào repo GitHub → bấm file → biểu tượng cây bút ✏️ sửa → Commit. Đợi 1–2 phút web tự cập nhật. Nếu không thấy thay đổi, bấm Ctrl+F5.

## Giới hạn miễn phí (Firebase Spark)
Firestore: 1GB lưu trữ, 50.000 lượt đọc/ngày, 20.000 lượt ghi/ngày, dư dùng cho tiệm cho thuê nhỏ. Ảnh để trên GitHub nên Firebase chỉ lưu chữ, rất nhẹ. KHÔNG bấm nâng cấp lên gói Blaze.

## Lỗi thường gặp
- **Trang trắng / không có xe:** firebase-config.js chưa dán đúng; bấm F12 → Console xem lỗi.
- **"Missing or insufficient permissions":** chưa Publish Rules ở Phần 2.
- **Không đăng nhập được admin:** chưa làm Phần 5; chưa bật Google ở Phần 2; `ADMIN_EMAIL` trong firebase-config.js chưa đúng/chưa commit lên GitHub; hoặc trình duyệt chặn popup (cho phép popup rồi thử lại).
- **Đăng nhập được nhưng không lưu được dữ liệu (permission denied):** email trong Rules chưa trùng đúng email admin.
- **Không có thông báo ntfy:** tên topic trong app và trong firebase-config.js phải GIỐNG HỆT nhau; nhớ commit lại file config lên GitHub sau khi sửa.
- **Link GitHub báo 404:** chờ thêm vài phút sau khi bật Pages, và kiểm tra repo đang để Public.

---
## ĐỔI TÊN WEB THÀNH duykhanhbooker
1. **Đổi tên repo trên GitHub:** vào repo → **Settings → General → Repository name** → gõ `duykhanhbooker` → **Rename**.
2. **Link mới:** `https://TEN-GITHUB.github.io/duykhanhbooker/` (admin: thêm `admin.html`). Link cũ `.../thue-xe/` sẽ không còn dùng được, nhớ cập nhật bookmark, QR, link đã gửi khách.
3. **Firebase KHÔNG cần làm gì thêm:** domain `TEN-GITHUB.github.io` vẫn giữ nguyên nên Authorized domains không đổi. Dữ liệu cũ vẫn còn.
4. **Đổi tên hiển thị trên web:** vào admin → tab **Giới thiệu** → ô **Tên thương hiệu** gõ `Duy Khanh Booker` → **Lưu**. Tên này hiện ở tiêu đề tab trình duyệt và đầu trang Giới thiệu.
5. (Tùy chọn) Tên project Firebase: ⚙️ Project settings → General → Project name. Project ID không đổi được và không ảnh hưởng gì.

## CÁC TRANG MỚI
Thứ tự: Giới thiệu · Đặt vé tàu · Đặt phòng · Thông tin xe · Đặt xe.
- **Đặt vé tàu / Đặt phòng:** khách điền form, đơn vào tab **Đơn đặt** trong admin (có biểu tượng 🚆 🏨 🚗) và báo qua ntfy.
- **Loại chỗ vé tàu, loại phòng:** nhập ở admin → tab **Giới thiệu** (mỗi dòng một loại).
- **Thông tin xe:** danh sách xe giờ nằm riêng ở tab này.
- Cập nhật lên GitHub: thay các file `index.html`, `admin.html`, `style.css` bằng bản mới rồi Commit. Không đụng tới `firebase-config.js` đã điền của bạn.
