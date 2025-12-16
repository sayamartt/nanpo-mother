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
// 2. スムーズスクロール機能（ナビゲーション内、予約ボタンは除く）
// 【★修正点：スムーズスクロール後にメニューを閉じる処理を追加★】
// ==================================================

// 要素を取得
const menuButton = document.querySelector('.hamburger-menu-button'); // ハンバーガーボタンを定義
const navMenu = document.querySelector('.main-nav'); // ナビゲーションメニューを定義

// メインナビゲーション内のアンカーリンクだけを対象にする
document.querySelectorAll('.main-nav a[href^="#"]:not(.cta-button)').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        
        const href = this.getAttribute('href');

        if (!href || href === "#") {
            return; 
        }

        e.preventDefault();

        const targetElement = document.querySelector(href);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // ★修正ポイント: スムーズスクロール後、メニューが開いていたら閉じる
        if (navMenu && navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
            // ボタンも一緒に×印から三本線に戻す
            if (menuButton) {
                menuButton.classList.remove('open');
            }
        }
    });
});

// ==================================================
// 3. ハンバーガーメニューの開閉機能
// 【★修正点：スムーズスクロール処理に移動したため、この部分のコードを整理★】
// ==================================================

if (menuButton) {
    // クリックイベントリスナーを追加
    menuButton.addEventListener('click', () => {
        menuButton.classList.toggle('open');
        navMenu.classList.toggle('open'); 
    });
    
    // メニュー項目をクリックしたらメニューを閉じる処理 (※セクション2のスムーズスクロール処理に移動し、不要になったため削除)
    /*
    const navLinks = navMenu.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuButton.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });
    */
}

// ==================================================
// 4. 予約モーダルウィンドウの開閉機能 
// 【★修正点：モーダル表示時にハンバーガーメニューを閉じる処理を追加★】
// ==================================================

const reservationButtons = document.querySelectorAll('.reserve-button'); 
const modal = document.getElementById('reservation-modal');
const closeButton = document.querySelector('.close-button');

if (modal) {
    // ------------------------------------
    // 1. 各予約ボタンがクリックされたらモーダルを開く
    // ------------------------------------
    reservationButtons.forEach(button => {
        if (button.id === 'fortune-button') {
            return; 
        }

        button.addEventListener('click', (e) => {
            if (button.tagName === 'A') {
                e.preventDefault(); 
            }
            
            modal.classList.add('open');

            // ★修正ポイント: モーダル表示時、ハンバーガーメニューが開いていたら閉じる
            if (navMenu && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                if (menuButton) {
                    menuButton.classList.remove('open');
                }
            }
        });
    });
    
    // ------------------------------------
    // 2. 閉じるボタン（×印）がクリックされたらモーダルを閉じる
    // ------------------------------------
    closeButton.addEventListener('click', () => {
        modal.classList.remove('open');
    });

    // ------------------------------------
    // 3. モーダルの外側（暗い背景）がクリックされたらモーダルを閉じる
    // ------------------------------------
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('open');
        }
    });
}
// ==================================================
// 5. トップに戻るボタンの機能
// ==================================================

// 1. ボタン要素と、ボタンを表示するスクロール量（しきい値）を取得
const toTopButton = document.getElementById('scroll-to-top');
const scrollThreshold = 500; // 500pxスクロールしたらボタンを表示する設定

// ------------------------------------
// 2. スクロールイベントを監視
// ------------------------------------
window.addEventListener('scroll', () => {
    // 現在のスクロール量を取得
    const scrollPosition = document.body.scrollTop || document.documentElement.scrollTop;

    // スクロール量が設定値（500px）を超えたら表示、そうでなければ非表示
    if (scrollPosition > scrollThreshold) {
        toTopButton.style.display = 'block';
    } else {
        toTopButton.style.display = 'none';
    }
});

// ------------------------------------
// 3. ボタンがクリックされた時の処理
// ------------------------------------
toTopButton.addEventListener('click', () => {
    // ページをトップ（0px）までスムーズにスクロールさせる
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // スムーズなアニメーションを有効にする
    });
});