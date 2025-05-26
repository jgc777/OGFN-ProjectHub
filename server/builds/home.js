var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

async function fetchBuilds() {
    try {
        const response = await fetch('./builds.json');
        const data = await response.json();

        const buildList = document.getElementById('build-list');
        buildList.innerHTML = '';

        const allBuilds = [...data.windows];

        // Attach search events
        document.getElementById('search-bar').addEventListener('input', () => searchBuilds(allBuilds));

        displayBuilds(allBuilds);
    } catch (error) {
        console.error("Error fetching builds:", error);
    }
}

function searchBuilds(allBuilds) {
    const searchQuery = document.getElementById('search-bar').value.trim().toLowerCase();
    const buildList = document.getElementById('build-list');
    buildList.innerHTML = '';

    if (searchQuery === '') {
        displayBuilds(allBuilds);
    } else {
        const filteredBuilds = allBuilds.filter(build => 
            build.version.toLowerCase().startsWith(searchQuery)
        );

        if (filteredBuilds.length > 0) {
            displayBuilds(filteredBuilds);
        } else {
            buildList.innerHTML = '<p class="not-found">Build Not Found</p>';
        }
    }
}

function displayBuilds(builds) {
    const buildList = document.getElementById('build-list');
    buildList.innerHTML = builds.map(build => createBuildCard(build)).join('');
}

function createBuildCard(build) {
    const { version, season, date, ue_version, status, links } = build;
    const isAvailable = status === 'available';

    return `
        <div class="build-card">
                <img src="fortnite.png" alt="Fortnite Icon">
                <h3>Fortnite ${version}</h3>
                <p class="season">Season: ${season || 'N/A'}</p>
                <p class="release-date">Release Date: ${date || 'N/A'}</p>
                <p class="ue-version">UE Version: ${ue_version || 'N/A'}</p>
            <button class="download-btn ${isAvailable ? 'available' : 'unavailable'}" 
                    ${isAvailable ? '' : 'disabled'}
                    data-version="${version}"
                    data-links='${JSON.stringify(links)}'>
                    ${isAvailable ? 'Download' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
        </div>
    `;
}

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("download-btn") && !event.target.disabled) {
        const version = event.target.getAttribute("data-version");
        const links = JSON.parse(event.target.getAttribute("data-links"));
        showDownloadMenu(version, links);
    }
});

async function showDownloadMenu(version, links) {
    const downloadLinks = await Promise.all(links.map(async (linkObj) => {
        const { provider, link } = linkObj;
        const iconAvailable = await isIconAvailable(provider);
        const iconPath = `../assets/${provider.toLowerCase()}.png`; 

        return `
            <div class="download-card">
                ${iconAvailable ? `<img src="${iconPath}" alt="${provider}">`
                    : `<div class="download-icon">${provider.charAt(0).toLowerCase()}</div>`}
                <div class="download-info">
                    <h3>${provider}</h3>
                </div>
                <a href="${link}" target="_blank">Download</a>
            </div>
        `;
    }));

    const modal = document.createElement('div');
    modal.classList.add('download-modal');
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Downloads for Fortnite ${version}</h2>
            <div class="links-container">
                ${downloadLinks.join('')}
            </div>
            <button class="close-btn">Close</button>
        </div>
    `;

    document.body.appendChild(modal);
    modal.querySelector(".close-btn").addEventListener("click", () => modal.remove());
}

function isIconAvailable(provider) {
    return new Promise((resolve) => {
        const iconPath = `../assets/${provider.toLowerCase()}.png`;
        const img = new Image();

        img.onload = () => resolve(true);  
        img.onerror = () => resolve(false);  

        img.src = iconPath;  
    });
}

window.onload = fetchBuilds;


}
/*
     FILE ARCHIVED ON 05:41:39 Mar 29, 2025 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 18:41:16 May 05, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.623
  exclusion.robots: 0.023
  exclusion.robots.policy: 0.011
  esindex: 0.01
  cdx.remote: 13.695
  LoadShardBlock: 214.307 (3)
  PetaboxLoader3.datanode: 80.527 (4)
  PetaboxLoader3.resolve: 236.328 (2)
  load_resource: 167.347
*/