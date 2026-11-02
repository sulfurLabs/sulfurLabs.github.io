const BRANCH = "main";
const SHOWOFF_NAMES = ["showoff.png", "showoff.jpg", "showoff.jpeg", "showoff.webp"];

const themeList = document.getElementById("themeList");

// png then jpg, then jpeg and finally webp
// raw.githubusercontent.com doesnt count for the api limit
function loadShowoff(fullName, image, index)
{
    if (index >= SHOWOFF_NAMES.length)
    {
        image.replaceWith(createElement("div", "theme-noimage", "no showoff image :c"));
        return;
    }

    image.onerror = () => loadShowoff(fullName, image, index + 1);

    image.src = `https://raw.githubusercontent.com/${fullName}/${BRANCH}/${SHOWOFF_NAMES[index]}`;
}

function buildTheme(repo, index)
{
    const fullName = `${repo.owner}/${repo.name}`;
    const section = createElement("section", "project");
    const top = createElement("div", "project-top");
    const number = String(index + 1).padStart(2, "0");
    const body = createElement("div", "theme-body");
    const image = createElement("img", "theme-image");
    const info = createElement("div", "theme-info");
    const links = createElement("div", "project-links");

    top.appendChild(createElement("h4", null, displayName(repo.name)));
    top.appendChild(createElement("span", null, number));
    section.appendChild(top);

    // image is left
    image.alt = `showoff of ${displayName(repo.name)}`;
    body.appendChild(image);
    loadShowoff(fullName, image, 0);

    info.appendChild(createElement("div", "theme-creator", repo.owner));
    links.appendChild(createLink(`https://github.com/${fullName}`, "button1", "GitHub"));
    links.appendChild(createLink(`releases.html?repo=${encodeURIComponent(fullName)}`, "button1", "Download"));
    info.appendChild(links);

    body.appendChild(info);
    section.appendChild(body);

    return section;
}

const repos = [];

themeLinks.forEach((link) =>
{
    const repo = parseRepoLink(link);

    if (repo)
    {
        repos.push(repo);
    } else
    {
        console.warn(`isnt a github link: ${link}`);
    }
});

if (repos.length === 0)
{
    themeList.appendChild(createElement("p", null, "no themes here yet"));
}

repos.forEach((repo, index) =>
{
    themeList.appendChild(buildTheme(repo, index));
});
