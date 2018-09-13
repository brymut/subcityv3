function getEpisodeInfo(currentEpisodeIdentifier) {
    // /api/radio/episodes/episode/1222/
    fetch(`/api/radio/episodes/episodeidentifier/${currentEpisodeIdentifier}/`).then(function (response) {
        let episode_info = {};
        response.json().then(function (data) {
            episode_info.episodeStart = data.episode_start;
            episode_info.episodeEnd = data.episode_end;
            episode_info.episodeTitle = data.episode_title;
            episode_info.showId = data.episode_show_id;
            fetch(`/api/radio/news/${episode_info.showId}/${data.episode_id}/`).then(function (response) {
                response.json().then(function (data) {
                    episode_info.episodeBody = data.news_body;
                    episode_info.episodeBodyTitle = data.news_title;
                    fetch(`/api/radio/shows/${episode_info.showId}/`).then(function (response) {
                        response.json().then(function (data) {
                            episode_info.episodeShowName = data.show_name;
                            episode_info.episodeShowLogname = data.show_logname;
                            applyEpisodeInfo(episode_info);
                        });
                    });
                });
            });
        });
    });
}

function applyEpisodeInfo(episode_info) {
    if (episode_info) {
        htmlContent = `<img src="http://via.placeholder.com/400x190"
                         style="max-width: 400px; max-height: 190px;">
            <div class="episode-info-home">
                <h2 class="episode-title-home">${episode_info.episodeTitle}</h2>
                <h3 class="episode-showname-home" onclick="navigateShow('${episode_info.episodeShowLogname}')">${episode_info.episodeShowName}</h3>
                <h4 class="episode-news-title-home">${episode_info.episodeBodyTitle}</h4>
                <p class="episode-news-title-body">${episode_info.episodeBody}</p>
            </div>`
    } else {
        htmlContent = 'Unfortunately, no data was returned.'
    }
    let responseContainer = document.getElementById('episodepage-episode-info');
    responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
}

// function applyLatestEpisodes(episode_info) {
//     if (episode_info) {
//         htmlContent = `<div class="episode-list-item">
//                     <img src="http://via.placeholder.com/400x190"
//                          style="max-width: 400px; max-height: 190px;">
//                     <div class="episode-info-home">
//                         <h2 class="episode-title-home">${episode_info.episodeTitle}</h2>
//                         <h3 class="episode-showname-home">${episode_info.episodeDate}</h3>
//                         <div class="news-body">${episode_info.episodeBody}</div>
//                     </div>
//                 </div>`
//     } else {
//         htmlContent = 'Unfortunately, no data was returned.'
//     }
//
//     let responseContainer = document.getElementById('showpage-episode-list');
//     responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
// }


function loadEpisodeData() {
    getEpisodeInfo(currentEpisode);
}

loadEpisodeData();