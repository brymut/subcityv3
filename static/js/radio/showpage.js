function getLatestEpisodes(currentShow) {
    //" /api/radio/episodes/657/"  /api/radio/episodes/showlogname/${currentShow}/
    fetch(`/api/radio/news/showlogname/${currentShow}/`).then(function (response) {
        let show_info = {};
        response.json().then(function (data) {
            fetch(`/api/radio/shows/${data.results[0].news_show_id}/`).then(function (response) {
                response.json().then(function (data) {
                    show_info.showName = data.show_name;
                    show_info.showDescription = data.show_description;
                    show_info.showImageId = data.show_image_id;
                    show_info.showLogname = data.show_logname;
                    fetch(`/api/radio/image/${data.show_image_id}/`).then(function (response) {
                        response.json().then(function (data) {
                            show_info.showImageSrc = data.image_src;
                            show_info.showImageHeight = data.image_height;
                            show_info.showImageWidth = data.image_width;
                            applyShowInfo(show_info);
                        });
                    });
                })
            });
            for (let current_episode of data.results) {
                let episode_info = {};
                episode_info.episodeBody = current_episode.news_body;
                episode_info.showId = current_episode.news_show_id;
                episode_info.episodeId = current_episode.news_episode_id;
                episode_info.showLogname = show_info.showLogName;
                fetch(`/api/radio/episodes/episodeid/${episode_info.episodeId}/`).then(function (response) {
                    response.json().then(function (data) {
                        episode_info.episodeTitle = data.episode_title;
                        episode_info.episodeDate = data.episode_start;
                        episode_info.episodeIdentifier = data.episode_identifier;
                        applyLatestEpisodes(episode_info);
                    });
                });
            }
        });
    });
}

function applyShowInfo(show_info) {
    if (show_info) {
        htmlContent = `<img src="https://old.subcity.org/images/cms/${show_info.showImageSrc}"
                 style="max-width: ${show_info.showImageWidth}px; max-height: ${show_info.showImageHeight}px;">
            <div class="episode-info-home">
                <h2 class="episode-title-home">${show_info.showName}</h2>
                <h3 class="episode-showname-home">genre// genre</h3>
                <div class="news-body">${show_info.showDescription}</div>
            </div>`
    } else {
        htmlContent = 'Unfortunately, no data was returned.'
    }
    let responseContainer = document.getElementById('showpage-show-info');
    responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
}

function applyLatestEpisodes(episode_info) {
    if (episode_info) {
        htmlContent = `<div class="episode-list-item">
                    <img src="https://storage.googleapis.com/subcity-web-ui/static/img/subcity_default.jpg"
                         style="max-width: 400px; max-height: 190px;"
                         onclick="navigateEpisode('${episode_info.showLogname}','${episode_info.episodeIdentifier}')">
                    <div class="episode-info-home">
                        <h2 class="episode-title-home"
                        onclick="navigateEpisode('${episode_info.showLogname}','${episode_info.episodeIdentifier}')">${episode_info.episodeTitle}</h2>
                        <h3 class="episode-showname-home">${episode_info.episodeDate}</h3>
                        <div class="news-body">${episode_info.episodeBody}</div>
                    </div>
                </div>`
    } else {
        htmlContent = 'Unfortunately, no data was returned.'
    }

    let responseContainer = document.getElementById('showpage-episode-list');
    responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
}


function loadShowData() {
    getLatestEpisodes(currentShow);
}

loadShowData();