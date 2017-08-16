/**
 * じゃんけんプログラム
 * 
 * Yuto Kawamoto
 */

window.onload = () => { // ウィンドウの読み込みが終わってから以下の処理を行う
    // 手の種類を変数に代入
    const hands = ['goo', 'choki', 'pa'];
    const handsJa = ['ぐー', 'ちょき', 'ぱー'];

    // 各ボタンのオブジェクトを配列に格納
    const buttons = hands.reduce((result, hand) =>
        result.concat([document.getElementById(hand)])
    , []);

    // イベントリスナを追加
    buttons.forEach((button, index) => 
        button.addEventListener('click', event => janken(hands[index]))
    );

    /**
     * じゃんけんの処理
     * 
     * @param string hand 
     */
    function janken(playerHand) {
        // ボタンを無効化
        disabledButtons();
        
        // 相手の手を決定する
        const enemyHand = getEnemyHand();

        // プレーヤーの手と相手の手から結果を取得する
        const result = judge(playerHand, enemyHand);

        // 選んだ手の確認メッセージを表示する
        message(`あなたは"${trans(playerHand)}"を選びました。`);
        
        // ２秒後に相手の手を表示
        setTimeout(() => {
            message(`わたしの手${result ? 'は' : 'も'}"${trans(enemyHand)}"なので、`);
        }, 2000);

        // さらに２秒後に結果メッセージを表示
        setTimeout(() => {
            // 結果によって表示するメッセージを分岐させる
            if (result === 1) {
                message('あなたの勝ちです。');
            } else if (result === 0) {
                message('あいこです。');
            } else {
                message('わたしの勝ちです。');
            }
        }, 4000);

        // さらに１秒後に再挑戦のリンクを表示
        setTimeout(() => {
            message('<a href="./index.html">再挑戦</a>');
        }, 5000);
    }

    /**
     * ボタンを選択無効化する
     */
    function disabledButtons() {
        buttons.forEach(button => button.setAttribute('disabled', 'true'));
    };

    /**
     * 相手の手をランダムに取得する
     */
    function getEnemyHand() {
        return hands[random(0, 2)];
    }

    /**
     * minからmaxまでの間の整数をランダムで返す
     * 
     * @param int min 
     * @param int max
     */
    function random(min, max) {
        return Math.floor(Math.random() * (max + 1 - min)) + min;
    }

    /**
     * 渡された手の値から判断して、勝ちの場合は1、負けの場合は-1、あいこの場合は0を返す
     * 
     * @param string playerHand 
     * @param string enemyHand 
     */
    function judge(playerHand, enemyHand) {
        if (playerHand === enemyHand) {
            //あいこ
            return 0; 
        } else if (
            playerHand === 'goo' && enemyHand === 'choki' ||
            playerHand === 'choki' && enemyHand === 'pa' ||
            playerHand === 'pa' && enemyHand === 'goo'
        ) {
            //プレーヤーの勝ち
            return 1;
        } else {
            //相手の勝ち
            return -1; 
        }
    }

    /**
     * 引数で与えられた文字列を画面に表示する（既に表示されている場合は行を追加する）
     * 
     * @param string msg 
     */
    function message(msg) {
        const current = document.getElementById("message").innerHTML;
        document.getElementById("message").innerHTML = current.length ? current + '<br>' + msg : msg;
    }

    /**
     * 渡された手の種類の文字列（アルファベット）を日本語に変換して返す
     * 
     * @param string hand 
     */
    function trans(hand) {
        const index = hands.indexOf(hand);
        return handsJa[index];
    }
}