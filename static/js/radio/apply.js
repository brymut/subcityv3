function applyApplicationInfo(team, show) {

    if (teamApps === 'true') {
        teamAppsHTMLContent = `<p>Subcity Radio is run as a team of approximately 20 people, loosely subdivided into teams to ensure the smooth running of the station's output which is broadly comprised of our radio content, website and events. Team members are encouraged to develop skills across various aspects of the station, so a knowledge of or interest in more than one aspect of the station is beneficial in an application. Dedication, creativity and interpersonal skills are all essential and a knowledge of the station and our output is recommended, but you do not have to be a student to apply. However, it should be expected that team members attend the weekly team meeting and help with running events on the night. Applications are currently closed, but keep an eye on our social media for when they reopen.</p>`;
    } else {
        teamAppsHTMLContent = `<p> COme on in</p>`
    }
    if (showApps === 'true') {
        showHtmlContent = `<p>Subcity Radio is run as a team of approximately 20 people, loosely subdivided into teams to ensure the smooth running of the station's output which is broadly comprised of our radio content, website and events. Team members are encouraged to develop skills across various aspects of the station, so a knowledge of or interest in more than one aspect of the station is beneficial in an application. Dedication, creativity and interpersonal skills are all essential and a knowledge of the station and our output is recommended, but you do not have to be a student to apply. However, it should be expected that team members attend the weekly team meeting and help with running events on the night. Applications are currently closed, but keep an eye on our social media for when they reopen.</p>`;
    } else {
        showHtmlContent = `<p>We are now recruiting for new shows on Subcity Radio. As a freeform radio station our presenters have complete creative control over their shows. There are shows dedicated to music and shows dedicated to chat plus everything in between, nothing is too outlandish. We look for well thought out ideas and the belief than you can carry them out. This semester we are especially interested in applications for morning and daytime shows, although we'll still of course consider your application if it doesn't fall within those categories.</p>
<p>The application form is below, alongside it you'll find some application notes to help out with it. We would also recommend having a look at some of the many shows available to listen back to, past and present, to get a sense of the flavour of the station.</p>
<p>Any questions regarding applications can be directed to <a href="mailto:programmes@subcity.org" class="blue slideBlue">programmes@subcity.org</a></p>
<p>Please expect a response time of around 28 days.</p>
<p><b>
<a href="https://old.subcity.org/apply">Apply Here</a>
//
<a href="https://drive.google.com/file/d/0B6W9Cm6RykHASnpSbWJqUTVQck0/view?usp=sharing">Application Guide</a>`
    }
    let teamContainer = document.getElementById('team-applications-body');
    teamContainer.insertAdjacentHTML('afterbegin', teamAppsHTMLContent);

    let showsContainer = document.getElementById('show-applications-body');
    showsContainer.insertAdjacentHTML('afterbegin', showHtmlContent);

}

applyApplicationInfo(teamApps, showApps);