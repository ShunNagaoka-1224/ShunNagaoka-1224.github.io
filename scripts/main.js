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

async function loadNews() {
    try {
        // JSONデータを読み込む
        const response = await fetch('data/news.json');
        const newsData = await response.json();

        // それぞれのリストの場所を探す
        const homeList = document.getElementById('news-list-home');
        const fullList = document.getElementById('news-list-full');

        // 日付を整形する関数
        const formatDate = (dateString) => {
            return dateString.replace(/-/g, '.');
        };

        // ★ここがポイント！表示モードを変えられるようにしたよ
        const createList = (targetElement, limit, showBody) => {
            // limitがあればその件数だけ、なければ全部
            const displayData = limit ? newsData.slice(0, limit) : newsData;

            targetElement.innerHTML = ''; // 一旦クリア

            displayData.forEach(item => {
                const li = document.createElement('li');
                
                // まずは基本の日付と見出しを作る
                let htmlContent = `
                    <div class="news-header">
                        <time datetime="${item.date}">${formatDate(item.date)}</time>
                        <span class="news-title">${item.title}</span>
                    </div>
                `;

                // ★もし「本文を表示するモード(showBodyがtrue)」で、かつ「本文(body)」があれば追加
                if (showBody && item.body) {
                    htmlContent += `<p class="news-body" style="margin-top: 0.5em; font-size: 0.9em; color: #666;">${item.body}</p>`;
                }

                li.innerHTML = htmlContent;
                targetElement.appendChild(li);
            });
        };

        // index.html用：3件まで、本文は「なし(false)」
        if (homeList) {
            createList(homeList, 3, false);
        }

        // news.html用：全件表示、本文は「あり(true)」
        if (fullList) {
            createList(fullList, null, true);
        }

    } catch (error) {
        console.error('ニュースの読み込みに失敗しました:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadNews);