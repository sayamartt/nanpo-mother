// 占いの結果のリスト（配列）を定義
const fortunes = [
    "大吉！今日は新しい挑戦に最適な日です。",
    "中吉！計画通りに進みますが、油断は禁物です。",
    "吉！誰かに親切にすると、良い運気が返ってきます。",
    "小吉。トラブルを避けて静かに過ごすのが吉です。",
    "末吉。諦めていたことに、思わぬチャンスが訪れるかもしれません。",
    "凶... ではありません。運勢は自分で切り開くものです！"
];

// HTMLのボタンと結果表示エリアを取得（DOM操作）
const button = document.getElementById('fortune-button');
const resultArea = document.getElementById('fortune-result');

// ボタンがクリックされた時の動作を定義（イベントリスナー）
button.addEventListener('click', () => {
    // 1. ランダムな数字を生成
    // fortunes配列の長さ（6）を上限にした、0から5までの数字をランダムで生成
    const randomIndex = Math.floor(Math.random() * fortunes.length);
    
    // 2. その数字に対応する運勢のメッセージを取得
    const fortuneMessage = fortunes[randomIndex];

    // 3. 結果表示エリアにメッセージを書き込む（DOM操作）
    resultArea.innerText = fortuneMessage;
    // --------------------------------------------------
    // ▼▼▼ ここから運勢によって色を変えるロジックを追記 ▼▼▼
    
    // 結果の文字色を格納する変数
    let resultColor = '#F5F5F0'; // デフォルトは生成り色

    if (fortuneMessage.startsWith('大吉')) {
        // 大吉ならゴールド
        resultColor = '#FFD700'; 
    } else if (fortuneMessage.startsWith('凶')) { 
        // 凶なら赤 (今回は「運勢は自分で切り開く」なので、凶ではないが、予備として)
        resultColor = '#C0392B'; 
    } else {
        // それ以外なら白
        resultColor = '#FFFFFF'; 
    }

    // 4. 結果表示エリアのスタイルを変更する（DOM操作）
    resultArea.style.color = resultColor;

    // ボタンを一旦無効化（連打防止）
    button.disabled = true;
    
    // 3秒後にボタンを再度有効化
    setTimeout(() => {
        button.disabled = false;
    }, 3000);
});