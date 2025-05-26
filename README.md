
<a href="https://alfo0924.github.io/TearableScreen/">TearableScreen</a>

## TearableScreen 網站介紹

**特點與優點**
*   **互動性高:** 使用者可以直接與畫面元素互動，提供有趣的視覺回饋。
*   **流暢體驗:** 經過優化，拖曳過程順暢，減少卡頓感。
*   **響應式操作:** 同時支援滑鼠與觸控裝置，擴大適用範圍。
*   **效能提升:** 採用了 CSS `transform` 和 `requestAnimationFrame` 等技術，有效利用硬體加速，提升渲染效能。
*   **自訂性高:** 雖然目前僅為拖曳效果，但其基礎架構可擴展實現更複雜的撕裂效果。

**使用者族群**
*   **網頁開發者:** 尋找互動特效範例或想學習相關技術的開發者。
*   **網頁設計師:** 希望在作品中加入動態視覺元素的設計師。
*   **專案需求方:** 需要在網站或應用程式中實現類似拖曳或撕裂效果的專案。
*   **對互動技術有興趣者:** 想要了解如何透過程式碼實現此類效果的學習者。

**程式碼邏輯原理與運作方法**

這個專案的運作主要依賴 HTML、CSS 和 JavaScript 的協同工作：

*   **HTML (結構層):**
    *   `index.html` 檔案定義了網頁的基本結構。
    *   `div` 元素 (`class="container"`) 作為圖片的容器。
    *   `img` 元素 (`id="tearable"`) 是主要互動的圖片，`draggable="false"` 屬性防止了瀏覽器預設的圖片拖曳行為。

*   **CSS (樣式層):**
    *   `style.css` 檔案負責網頁的外觀和部分效能優化。
    *   `body`: 設定頁面佈局，使其置中並隱藏滾動條。`user-select: none;` 防止拖曳時選取到文字。
    *   `.container`: 設定圖片容器的相對定位、尺寸等。
    *   `#tearable`:
        *   `position: absolute;`: 讓圖片可以相對於其容器自由定位。
        *   `cursor: grab;` 和 `:active { cursor: grabbing; }`: 改變滑鼠游標樣式，提供拖曳的視覺提示。
        *   `will-change: transform;`: 提前告知瀏覽器該元素的 `transform` 屬性將會改變，讓瀏覽器可以進行優化。
        *   `transition: none;`: 確保在拖曳過程中沒有不必要的 CSS 過渡動畫干擾。

*   **JavaScript (行為層):**
    *   `script.js` 檔案是實現互動效果的核心。
    *   **初始化:**
        *   等待 DOM 內容載入完成 (`DOMContentLoaded`) 後執行。
        *   獲取圖片元素 (`tearable`)。
        *   初始化拖曳狀態 (`isDragging`)、起始座標 (`startX`, `startY`)、當前偏移量 (`currentX`, `currentY`) 和動畫幀 ID (`animationId`)。
    *   **位置更新函式 (`updatePosition`):**
        *   使用 `tearable.style.transform = \`translate(${currentX}px, ${currentY}px)\`;` 來改變圖片的位置。`transform: translate()` 比直接修改 `left` 和 `top` 屬性效能更好，因為它通常能觸發 GPU 硬體加速，且不會引起頁面重排 (reflow)。
    *   **動畫循環函式 (`animate`):**
        *   呼叫 `updatePosition()` 更新圖片位置。
        *   如果仍在拖曳中 (`isDragging`)，則使用 `requestAnimationFrame(animate)` 請求瀏覽器在下一次重繪前再次呼叫 `animate` 函式。這能確保動畫與瀏覽器的刷新率同步，使動畫更平滑，並節省不必要的運算。
    *   **事件監聽:**
        *   **滑鼠按下 (`mousedown`) / 觸控開始 (`touchstart`):**
            *   阻止預設行為 (`e.preventDefault()`)，例如圖片的預設拖曳或頁面滾動。
            *   設定 `isDragging = true` 表示開始拖曳。
            *   記錄滑鼠/觸控點相對於圖片當前偏移量的起始位置 (`startX`, `startY`)。
            *   如果之前有動畫幀，先取消 (`cancelAnimationFrame`)。
            *   啟動 `animate()` 動畫循環。
        *   **滑鼠移動 (`mousemove`) / 觸控移動 (`touchmove`):**
            *   僅在 `isDragging` 為 `true` 時執行。
            *   阻止預設行為。
            *   計算新的圖片偏移量 `currentX` 和 `currentY`（當前滑鼠/觸控位置減去初始相對位置）。
            *   注意：實際的位置更新是在 `animate` 函數中透過 `requestAnimationFrame` 執行的，這裡只更新座標變數。
        *   **滑鼠放開 (`mouseup`) / 觸控結束 (`touchend`):**
            *   如果正在拖曳，則設定 `isDragging = false`。
            *   取消動畫幀 (`cancelAnimationFrame`)，停止動畫循環。
        *   **圖片拖曳開始 (`dragstart`):**
            *   始終阻止預設的圖片拖曳行為 (`e.preventDefault()`)。

**運作流程總結**

1.  **載入:** 瀏覽器載入 HTML、CSS 和 JavaScript。
2.  **準備:** JavaScript 等待 DOM 載入完成後，獲取圖片元素並設定初始狀態。
3.  **互動開始 (按下滑鼠/觸摸螢幕):**
    *   使用者在圖片上按下左鍵或手指觸摸。
    *   `mousedown` 或 `touchstart` 事件被觸發。
    *   程式記錄開始拖曳的狀態和初始座標。
    *   啟動 `requestAnimationFrame` 循環，準備更新圖片位置。
4.  **互動過程 (移動滑鼠/滑動手指):**
    *   使用者移動滑鼠或在螢幕上滑動手指。
    *   `mousemove` 或 `touchmove` 事件持續觸發。
    *   程式不斷計算圖片應有的新偏移量。
    *   在每個 `requestAnimationFrame` 回調中，`animate` 函數會使用最新的偏移量透過 `transform` 更新圖片的實際顯示位置。
5.  **互動結束 (放開滑鼠/手指離開螢幕):**
    *   使用者放開滑鼠左鍵或手指離開螢幕。
    *   `mouseup` 或 `touchend` 事件被觸發。
    *   程式停止拖曳狀態，並取消 `requestAnimationFrame` 循環。

**使用的方法或技術**

*   **DOM 操作:** 使用 `document.getElementById` 獲取網頁元素。
*   **事件監聽:** 使用 `addEventListener` 監聽滑鼠 (`mousedown`, `mousemove`, `mouseup`) 和觸控 (`touchstart`, `touchmove`, `touchend`) 事件。
*   **CSS `transform: translate()`:** 用於高效移動元素，利用 GPU 加速。
*   **CSS `will-change`:** 提示瀏覽器某屬性將要變動，以便瀏覽器進行優化。
*   **`requestAnimationFrame`:** 用於創建平滑的 JavaScript 動畫，與瀏覽器刷新同步。
*   **`e.preventDefault()`:** 阻止事件的預設行為。
*   **`clientX/clientY`:** 獲取滑鼠或觸控點相對於瀏覽器可視區域的座標。

此專案未使用外部的 JavaScript 函式庫或框架，完全基於原生的 Web API 實現。

---
