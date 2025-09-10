document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navUl = document.querySelector('nav ul');
    const printButton = document.querySelector('.print-button'); // 印刷ボタンを取得

    hamburger.addEventListener('click', function() {
        const isExpanded = navUl.classList.toggle('show');
        hamburger.classList.toggle('active'); // ボタンにactiveクラスをトグル
    });

    // 印刷ボタンのクリックイベントリスナー
    if (printButton) {
        printButton.addEventListener('click', function() {
            window.print(); // 印刷ダイアログを表示
        });
    }
});