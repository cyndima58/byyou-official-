# BY YOU｜白柚老師　個人品牌官網

純靜態網站（HTML / CSS / JavaScript），**沒有任何編譯步驟**。
GitHub Desktop 推上去、Vercel 匯入就會跑，不需要安裝 Node.js，也不需要改任何建置設定。

---

## 一、先改這個檔案（重要）

打開 **`assets/js/site-config.js`**，把你真正的資料填進去。全站六個頁面的聯絡資訊都吃這一個檔案，改一次全部一起更新。

已經幫你填好的內容：

| 項目 | 目前的值 |
| --- | --- |
| LINE 社群 | 白柚遊戲俱樂部（邀請連結已填入） |
| Email | swb0623@gmail.com |
| Instagram | @whiteyoteacher |
| 網址 | byyou.life |
| 公司 | 珩忠誠共創股份有限公司 |
| 電話／統編／地址／Facebook | 留空 → 網站上自動隱藏，公司成立後填進去就會出現 |

> 留空 `""` 的欄位不會產生破掉的連結，整列會自動隱藏，不用去動 HTML。

---

## 二、佈署步驟（GitHub Desktop ＋ Vercel）

### 1. 建立儲存庫
1. 開啟 **GitHub Desktop** → `File` → `New repository`
2. Name 填 `byyou-website`，Local path 選你要放的位置 → `Create repository`
3. 把本資料夾裡的**所有檔案**（含 `assets` 資料夾）複製到剛剛建立的資料夾裡

### 2. 推上 GitHub
1. GitHub Desktop 左側會列出所有變更 → 下方 Summary 填 `first commit` → 按 **Commit to main**
2. 右上角按 **Publish repository**
3. 取消勾選 `Keep this code private`（要保持私人也可以，Vercel 一樣讀得到）→ **Publish**

### 3. 匯入 Vercel
1. 到 [vercel.com](https://vercel.com) → 用 GitHub 帳號登入
2. **Add New…** → **Project** → 找到 `byyou-website` → **Import**
3. 設定畫面**全部保持預設，什麼都不用改**：
   - Framework Preset：`Other`
   - Build Command：**留空**
   - Output Directory：**留空**
   - Install Command：**留空**
4. 按 **Deploy**，等約 30 秒

完成後會拿到一個 `xxx.vercel.app` 的網址。

### 4. 之後要改內容
在電腦上改檔案 → 回 GitHub Desktop → Commit → **Push origin**。
Vercel 會自動偵測並重新佈署，大約一分鐘後生效。

### 5. 接自己的網域（可選）
Vercel 專案 → **Settings** → **Domains** → 輸入網域 → 依畫面指示到網域商設定 DNS。

---

## 三、檔案結構

```
├─ index.html          首頁
├─ about.html          關於白柚
├─ unlock.html         人生解鎖局（五道關卡）
├─ services.html       服務方案與合作流程
├─ gallery.html        活動花絮
├─ contact.html        聯絡邀約
├─ 404.html            找不到頁面
├─ favicon.svg         瀏覽器分頁小圖示
├─ robots.txt / sitemap.xml   搜尋引擎用
├─ vercel.json         靜態資源快取設定（刪掉也不影響運作）
└─ assets/
   ├─ css/style.css        全站樣式（顏色都在最上方的 :root）
   ├─ js/site-config.js    ★ 聯絡資訊都在這裡
   ├─ js/main.js           選單、動畫、燈箱
   └─ img/
      ├─ logo.png              完整 LOGO（頁尾用）
      ├─ logo-mark.png         精簡 LOGO（頁首用）
      ├─ og-cover.jpg          分享到 LINE／FB 時的預覽圖
      ├─ gallery/              大圖（點開放大用）
      ├─ thumbs/               縮圖（頁面上顯示用）
      └─ pending-consent/      ★ 尚未使用的照片，見下方說明
```

---

## 四、常見修改

| 想改什麼 | 改哪裡 |
| --- | --- |
| LINE、Email、公司資訊 | `assets/js/site-config.js` |
| 網站文字 | 對應的 `.html` 檔，用記事本或 VS Code 打開直接改 |
| 主色（青綠／金） | `assets/css/style.css` 最上方 `:root` 裡的 `--teal`、`--gold` |
| 換照片 | 把新圖放進 `assets/img/gallery/`，同一張縮到 760px 寬放進 `assets/img/thumbs/`，再改 HTML 裡的檔名 |
| 分享預覽圖 | 換掉 `assets/img/og-cover.jpg`（建議 1200×630） |
| 網域 | `sitemap.xml` 裡的網址，以及 `site-config.js` 的 `siteUrl` |

---

## 五、需要你確認的事項

網站已經可以直接佈署，但下面幾項我是用推測或暫定值，上線前請確認：

1. **課程時數與人數** —— `services.html` 四張卡片下方的「2–3 小時／8–30 人」等是我依現場照片推估的合理區間，請依實際狀況調整。
4. **公司登記資料** —— 統編、地址、電話成立後填進 `site-config.js`，聯絡頁與頁尾會自動出現。企業合作與公部門標案通常會看這個。
2. **照片肖像同意** —— `assets/img/pending-consent/` 裡有四張照片（大合照、致贈禮物、學員操作圖卡、一對一諮詢），因為清楚拍到學員正面，**預設沒有放上網站**。取得同意後，把檔案移到 `assets/img/gallery/`、另存一份 760px 寬的縮圖到 `assets/img/thumbs/`，再到 `gallery.html` 仿照現有寫法新增一組即可。
3. **合作單位名單** —— 我沒有把照片裡看到的單位名稱寫進網站（怕辨識錯誤）。`about.html` 的「授課場域」目前只寫類別，你可以自行改成實際單位名稱，對信任感幫助很大。

---

## 六、已經內建的東西

- 六個頁面共用同一套頁首／頁尾，手機版有全螢幕選單
- 五道關卡捲動到畫面時會依序「開鎖」（尊重系統的「減少動態效果」設定）
- 花絮照片可點開放大，支援鍵盤左右鍵與 Esc 關閉
- 分享到 LINE／Facebook 會顯示自訂預覽圖與說明
- 每頁都有獨立的 title 與 description，利於搜尋
- 圖片已壓縮（原始 42 MB → 約 4 MB），並使用延遲載入
- 支援鍵盤操作與螢幕閱讀器（跳至主要內容、focus 外框、圖片替代文字）

---

© BY YOU｜白柚老師．珩忠誠共創股份有限公司
