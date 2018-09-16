function applyContactInfo() {


    aboutHTMLContent = `<p>Subcity Radio is an independent, non-profit station based in Glasgow and broadcasting to the world.</p> <p>We provide a platform to creative individuals to create forward-thinking radio content. Over 200 contributors make up our community, they are editorially independent and follow no set playlist, all content is their own.</p> <p>The station was founded in 1995 as an alternative to the options on the FM dial in Glasgow, following an American freeform college radio format. The station went online in 2003, and the last FM broadcast was in 2009. Today the station continues to aim for unique content that is free from commercial restraints. We keep our ears to the ground and our heads in the clouds.</p><p> 
For opportunities to get involved, for events news, and for station updates, follow us on <a href="https://www.facebook.com/SubcityRadio" >facebook</a> and <a href="https://twitter.com/SubcityRadio">twitter</a>. For direct enquiries, please use the contacts listed below.
Subcity Radio is based at the University of Glasgow and is supported by Glasgow University Students' Representative Council.</p>`;


    teamHTMLContent = `<p>The Subcity Radio team look after the operation of the station. They are responsible for coordinating events and outreach projects, facilitating studio access and contributor training, running promotional strategies, designing, writing, photographing, videoing, archiving, programming, testing, upgrading, tweaking, breaking, and fixing everything to do with the station.</p> <p><b>Station Manager</b><br>
Hamish Leeson - <a href="mailto:manager@subcity.org">manager@subcity.org</a></p>`;


    showsHtmlContent = `<p>Subcity has no playlisted music and our shows are editorially independent so it's best to contact them directly for stuff like sending music promos, running competitions/give-aways, arranging sessions. Most shows are on Twitter and Facebook and have links to these on their profile pages. For general show enquiries contact <a href="mailto:programmes@subcity.org">programmes@subcity.org</a>.</p>`;


    featuresHtmlContent = `<p>Outwith our shows system we also create feature based content including live sessions, one off specials, festival coverage, collaborative content... If you have an idea that would fit with this side of the station then contact our Features Manager - <a href="mailto:features@subcity.org">features@subcity.org</a></p>`;
    complaintsHTMLContent = `<p>Subcity Radio has a zero-tolerance approach to homophobia, transphobia, racism, sexism, ableism, ageism, and any prejudice based on a person's identity. To register a complaint about any of our content, contact the station manager - <a href="mailto:manager@subcity.org">manager@subcity.org</a></p>`;
    phoneAndPostHTMLContent = `<p>Subcity Radio<br>
                                John McIntyre Building<br>
                                  University Avenue<br>
                                 GLASGOW<br>
                               G12 8QQ</p><p>Office: 0141 330 5438<br>
                                Studio: 0141 330 7033 </p>`;


    let aboutContainer = document.getElementById('about-body');
    aboutContainer.insertAdjacentHTML('afterbegin', aboutHTMLContent);
    let teamContainer = document.getElementById('team-body');
    teamContainer.insertAdjacentHTML('afterbegin', teamHTMLContent);
    let showsContainer = document.getElementById('shows-body');
    showsContainer.insertAdjacentHTML('afterbegin', showsHtmlContent);
    let featuresContainer = document.getElementById('features-body');
    featuresContainer.insertAdjacentHTML('afterbegin', featuresHtmlContent);
    let complaintsContainer = document.getElementById('complaints-body');
    complaintsContainer.insertAdjacentHTML('afterbegin', complaintsHTMLContent);
    let phoneAndPostContainer = document.getElementById('phone-and-post-body');
    phoneAndPostContainer.insertAdjacentHTML('afterbegin', phoneAndPostHTMLContent);


}

applyContactInfo();