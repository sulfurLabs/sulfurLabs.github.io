const releaseList = document.getElementById("releaseList");
const releaseTitle = document.getElementById("releaseTitle");
const releaseSubtitle = document.getElementById("releaseSubtitle");

//using ?repo=owner/name e.g. emexthecat/sDesktop-exampletheme
const params = new URLSearchParams(window.location.search);
const match = (params.get("repo") || "").match(/^([\w.-]+)\/([\w.-]+)$/);

function showInfo(text)
{
    releaseList.textContent = "";
    releaseList.appendChild(createElement("p", null, text));
}

async function fetchReleases(fullName)
{
    const response = await fetch(`https://api.github.com/repos/${fullName}/releases`);

    if (!response.ok)
    {
        throw new Error(response.status);
    }

    return response.json();
}

function renderRelease(fullName, release)
{
    const section = createElement("section", "project");
    const top = createElement("div", "project-top");

    top.appendChild(createElement("h4", null, release.name || release.tag_name));
    top.appendChild(createElement("span", null, (release.published_at || release.created_at).slice(0, 10)));

    section.appendChild(top);

    section.appendChild(createElement("p", null, release.tag_name + (release.prerelease ? " (pre-release)" : "")));

    const links = createElement("div", "release-links");

    if (release.assets.length > 0)
    {
        // files the author uploaded to the release
        release.assets.forEach((asset) =>
        {
            links.appendChild(createLink(asset.browser_download_url, "button1", asset.name));
        });
    } else
    {
        //we need the source files anyway, so we just download the source
        // if there are no uploaded files
        // but for advanced themes are maybe other compiled programms needed too
        links.appendChild(createLink(
            `https://github.com/${fullName}/archive/refs/tags/${release.tag_name}.zip`,
            "button1",
            "source.zip"
        ));

    }

    links.appendChild(createLink(release.html_url, "button1", "release page"));
    section.appendChild(links);

    return section;
}

async function loadReleases(fullName)
{
    showInfo("loading release/s..");

    try
    {
        const releases = await fetchReleases(fullName);

        if (releases.length === 0)
        {
            showInfo("no releases yet :c");

            return;
        }

        releaseList.textContent = "";
        releases.forEach((release) =>
        {
            releaseList.appendChild(renderRelease(fullName, release));
        });

    } catch (error)
    {
        // github has a 60 times per hour limit
        showInfo("couldnt load releases... you probably reloaded the page too often, or there are no available releases for this theme yet/anymore");
    }
}

if (!match)
{
    showInfo("Did you really try to just open releases.html... ._.");
} else
{
    const owner = match[1];
    const name = match[2];
    const shownName = displayName(name);

    document.title = `sulfurLabs | ${shownName}`;
    //releaseTitle.textContent = `${shownName} : releases`;
    releaseTitle.textContent = `${shownName}`;
    releaseSubtitle.textContent = `pick a release from "${shownName}" by ${owner}, and make sure it matches your sDesktop version`;

    loadReleases(`${owner}/${name}`);
}
