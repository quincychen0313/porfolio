# Quincy Chen Portfolio

Quincy Chen（陳宏瑋）的個人作品集網站，包含捲動控制的沙粒人像聚合動畫、個人介紹、經歷與精選作品。

## 本機預覽

需要 Node.js 22.13 或更新版本。

```bash
npm install
npm run dev
```

開啟 `http://localhost:3000/?intro=replay`。

## 建置

```bash
npm run build
```

## 部署

- GitHub Pages：將此專案的全部檔案提交到 `main` branch，接著到 repository 的 **Settings → Pages → Build and deployment → Source** 選擇 **GitHub Actions**。之後每次更新 `main` 都會自動重新發布網站。
- Hostinger：請使用另外提供的 `quincy-portfolio-hostinger.zip`，解壓縮後把內容上傳到網域的 `public_html`。

## 主要內容

- `app/page.tsx`：頁面內容與沙粒動畫
- `app/globals.css`：視覺樣式與響應式版面
- `public/hero-sand-ray.png`：沙粒人像取樣素材
- `public/`：作品圖片與網站圖示
