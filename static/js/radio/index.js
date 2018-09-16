function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

function getSchedule() {
    fetch("/api/radio/schedule/today/").then(function (response) {
        response.json().then(function (data) {
            for (let current_show of data) {
                let show_info = {};
                show_info.startTime = current_show.episode_start;
                fetch(`/api/radio/shows/${current_show.episode_show_id}/`).then(function (response) {
                    response.json().then(function (data) {
                        show_info.showName = data.show_name;
                        show_info.showLogname = data.show_logname;
                        show_info.showLink = `https://subcity.org/shows/${data.show_logname}/`;
                        fetch(`/api/radio/image/${data.show_image_id}/`).then(function (response) {
                            response.json().then(function (data) {
                                show_info.showImageSrc = data.image_src;
                                applySchedule(show_info);
                            });
                        });
                    })
                })
            }
        });
    });

}

function applySchedule(show_info) {
    if (show_info) {
        htmlContent = `<div class="schedule-item">
                    <img src="https://old.subcity.org/images/cms/${show_info.showImageSrc}"
                 style="max-width: 100px; max-height: 100px;">
                    <div class="schedule-item-info">
                        <a onclick="navigateShow('${show_info.showLogname}');"><h3>${show_info.showName}</h3></a>
                        <p>
                            ${show_info.startTime}
                        </p>
                    </div>
                </div>`;
    } else {
        htmlContent = 'Unfortunately, no data was returned.'
    }
    let responseContainer = document.getElementById('indexpage-schedule-list');


    responseContainer.insertAdjacentHTML('afterbegin', htmlContent);

}

function getNews() {
    fetch("/api/radio/news/").then(function (response) {
        response.json().then(function (data) {
            for (let current_news of data.results) {
                let news_info = {};
                news_info.newsTitle = current_news.news_title;
                news_info.newsBody = current_news.news_body;
                news_info.newsDate = current_news.news_date;

                fetch(`/api/radio/shows/${current_news.news_show_id}/`).then(function (response) {
                    response.json().then(function (data) {
                        news_info.showName = data.show_name;
                        news_info.showLogname = data.show_logname;
                        fetch(`/api/radio/episodes/episodeid/${current_news.news_episode_id}/`).then(function (response) {
                            response.json().then(function (data) {
                                news_info.episodeIdentifier = data.episode_identifier;
                                applyNews(news_info);
                            });
                        });
                    })
                })
            }
        });
    });

}


function applyNews(news_info) {
    if (news_info) {
        htmlContent = `<div class="episode-list-item">
                    <img onclick="navigateEpisode('${news_info.showLogname}','${news_info.episodeIdentifier}')" src="/static/img/subcity_default.jpg"
                         style="max-width: 400px; max-height: 190px;">
                    <div class="episode-info-home">
                        <h2 class="episode-title-home" onclick="navigateEpisode('${news_info.showLogname}','${news_info.episodeIdentifier}')">${news_info.newsTitle}</h2>
                        <h3 class="episode-showname-home" onclick="navigateShow('${news_info.showLogname}');">${news_info.showName}</h3>
                        <div class="news-body">${news_info.newsBody}</div>
                    </div>
                </div>`
    } else {
        htmlContent = 'Unfortunately, no data was returned.'
    }
    let responseContainer = document.getElementById('indexpage-episode-list');

    responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
}


function loadData() {
    getSchedule();
    getNews();
    return false;
}

loadData();