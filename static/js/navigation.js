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
    fetch(`http://127.0.0.1:8000/`,
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
        var stateObj = {homePage: "homepage"};
        history.pushState(stateObj, "homePage", `/`);
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
    fetch(`http://127.0.0.1:8000/shows/${show_logname}/`,
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
        var stateObj = {showLogName: show_logname};
        history.pushState(stateObj, "showPage", `/shows/${show_logname}/`);
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
    fetch(`http://127.0.0.1:8000/shows/${show_logname}/${episode_identifier}/`,
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
        var stateObj = {
            showLogname: show_logname,
            episodeIdentifier: episode_identifier
        };
        history.pushState(stateObj, show_logname + '/' + "episodePage", `/shows/${show_logname}/${episode_identifier}/`);
        document.getElementById('shell').innerHTML = doc.body.innerHTML;
        eval(doc.head.children[1].textContent);
        affixScriptToHead(doc.head.children[0].src, function () {
            console.log(location);
        });
    })
};

window.onpopstate = function (event) {
    if (event.state.showLogName) {
        console.log(event.state);
        navigateShow(event.state.showLogName);
        currentShow = event.state.showLogName;
    } else if (event.state.episodeIdentifier) {
        console.log(event.state);
        navigateEpisode(event.state.showLogName, event.state.episodeIdentifier);
        currentShow = event.state.showLogName;
        currentEpisode = event.state.episodeIdentifier;
    } else if (event.state.homePage) {
        console.log(event.state);
        navigateIndex();
    }
};