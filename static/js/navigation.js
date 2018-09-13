let navigatingBack = false;
function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

function loadError(oError) {
    throw new URIError("The script " + oError.target.src + " didn't load correctly.");
}

function affixScriptToHead(url, onloadFunction) {
    var newScript = document.createElement("script");
    newScript.onerror = loadError;
    if (onloadFunction) {
        newScript.onload = onloadFunction;
    }
    document.head.appendChild(newScript);
    newScript.src = url;
}

let navigateIndex = function () {
    parser = new DOMParser();
    let data = {isFetch: 'true'};
    fetch(`/`,
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": getCookie("csrftoken"),
            }
        }
    ).then(function (response) {
        return response.text();
    }).then(function (data) {
        doc = parser.parseFromString(data, "text/html");
        if (navigatingBack !== true) {
            let stateObj = {homePage: "homepage"};
            history.pushState(stateObj, "homePage", `/`);
            navigatingBack = false;
        }
        document.getElementById('shell').innerHTML = doc.body.innerHTML;
        if (doc.head.children[1]) {
            eval(doc.head.children[1].textContent);
        }
        affixScriptToHead(doc.head.children[0].src, function () {
            console.log(location);
        });
    })
};

let navigateShow = function (show_logname) {
    parser = new DOMParser();
    let data = {isFetch: 'true'};
    fetch(`/shows/${show_logname}/`,
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": getCookie("csrftoken"),
            }
        }
    ).then(function (response) {
        return response.text();
    }).then(function (data) {
        doc = parser.parseFromString(data, "text/html");
        if (navigatingBack !== true) {
            let stateObj = {showLogName: show_logname};
            history.pushState(stateObj, "showPage", `/shows/${show_logname}/`);
            navigatingBack = false;
        }
        document.getElementById('shell').innerHTML = doc.body.innerHTML;
        eval(doc.head.children[1].textContent);
        affixScriptToHead(doc.head.children[0].src, function () {
            console.log(location);
        });
    })
};

let navigateEpisode = function (show_logname, episode_identifier) {
    parser = new DOMParser();
    let data = {isFetch: 'true'};
    fetch(`/shows/${show_logname}/${episode_identifier}/`,
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": getCookie("csrftoken"),
            }
        }
    ).then(function (response) {
        return response.text();
    }).then(function (data) {
        doc = parser.parseFromString(data, "text/html");
        if (show_logname === "undefined") {
            show_logname = currentShow;
        }
        if (navigatingBack !== true) {
            let stateObj = {
                showLogname: show_logname,
                episodeIdentifier: episode_identifier
            };
            history.pushState(stateObj, show_logname + '/' + "episodePage", `/shows/${show_logname}/${episode_identifier}/`);
            navigatingBack = false;
        }

        document.getElementById('shell').innerHTML = doc.body.innerHTML;
        eval(doc.head.children[1].textContent);
        affixScriptToHead(doc.head.children[0].src, function () {
            console.log(location);
        });
    })
};

let navigateApply = function () {
    parser = new DOMParser();
    let data = {isFetch: 'true'};
    fetch(`/apply/`,
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": getCookie("csrftoken"),
            }
        }
    ).then(function (response) {
        return response.text();
    }).then(function (data) {
        doc = parser.parseFromString(data, "text/html");
        if (navigatingBack !== true) {
            let stateObj = {applyPage: 'applyPage'};
            history.pushState(stateObj, "applyPage", `/apply/`);
            navigatingBack = false;
        }
        document.getElementById('shell').innerHTML = doc.body.innerHTML;
        if (doc.head.children[1]) {
            eval(doc.head.children[1].textContent);
        }
        affixScriptToHead(doc.head.children[0].src, function () {
            console.log(location);
        });
    })
};

window.onpopstate = function (event) {
    console.log(event.state);

    if (event.state.showLogName) {
        navigatingBack = true;
        currentShow = event.state.showLogName;
        navigateShow(event.state.showLogName);
    } else if (event.state.episodeIdentifier) {
        navigatingBack = true;
        currentEpisode = event.state.episodeIdentifier;
        currentShow = event.state.showLogName;
        navigateEpisode(event.state.showLogName, event.state.episodeIdentifier);
    } else if (event.state.homePage) {
        navigatingBack = true;
        navigateIndex();
    } else if (event.state.applyPage) {
        navigatingBack = true;
        navigateApply();
    }
};