// ==================================================
// 1. おみくじ機能
// ==================================================
const fortunes = [
    "大吉！今日は新しい挑戦に最適な日です。",
    "中吉！計画通りに進みますが、油断は禁物です。",
    "吉！誰かに親切にすると、良い運気が返ってきます。",
    "小吉。トラブルを避けて静かに過ごすのが吉です。",
    "末吉。諦めていたことに、思わぬチャンスが訪れるかもしれません。",
    "凶... ではありません。運勢は自分で切り開くものです！"
];

const button = document.getElementById('fortune-button');
const resultArea = document.getElementById('fortune-result');

// ボタンが存在する場合のみイベントを設定（エラー防止）
if (button) {
    button.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * fortunes.length);
        const fortuneMessage = fortunes[randomIndex];
        resultArea.innerText = fortuneMessage;

        let resultColor = '#F5F5F0';
        if (fortuneMessage.startsWith('大吉')) {
            resultColor = '#FFD700'; 
        } else if (fortuneMessage.startsWith('凶')) { 
            resultColor = '#C0392B'; 
        } else {
            resultColor = '#FFFFFF'; 
        }

        resultArea.style.color = resultColor;
        button.disabled = true;
        setTimeout(() => {
            button.disabled = false;
        }, 3000);
    });
}
// ==================================================
// 2. スムーズスクロール機能（ナビゲーション内リンク限定）
// ==================================================

// 読み込みが完了したことをコンソールに表示
console.log("script.js は正しく読み込まれています");

// メインナビゲーション内のアンカーリンクだけを対象にする
document.querySelectorAll('.main-nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        
        // リンク先（hrefの中身）を取得
        const href = this.getAttribute('href');

        // ★ hrefが「#」だけ、または空の場合は何もしない（エラー防止）
        if (!href || href === "#") {
            return; 
        }

        // 1. デフォルトのジャンプ動作をキャンセル
        e.preventDefault();

        // 2. ターゲット要素を取得
        const targetElement = document.querySelector(href);

        // 3. ターゲットが存在すればスムーズスクロール
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================================================
// 3. ハンバーガーメニューの開閉機能
// ==================================================

// 要素を取得
const menuButton = document.querySelector('.hamburger-menu-button');
const navMenu = document.querySelector('.main-nav');

// ボタンが存在する場合のみイベントを設定
if (menuButton) {
    // クリックイベントリスナーを追加
    menuButton.addEventListener('click', () => {
        // ハンバーガーボタンに 'open' クラスを付け外しする
        menuButton.classList.toggle('open');
        // ナビゲーションメニュー本体に 'open' クラスを付け外しする
        navMenu.classList.toggle('open'); 
    });
    
    // メニュー項目をクリックしたらメニューを閉じる処理（UX向上）
    const navLinks = navMenu.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuButton.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });
}