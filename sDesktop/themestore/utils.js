//used by both theme and release
//
function createElement(tag, className, text)
{
    const element = document.createElement(tag);

    if (className)
    {
        element.className = className;
    }
    if (text !== undefined)
    {
        // if someone tries to run code from github
        element.textContent = text;
    }

    return element;
}

function createLink(href, className, text)
{
    const link = createElement("a", className, text);
    link.href = href;

    return link;
}

//seperates owner and name from the link
function parseRepoLink(link)
{
    //github.com/emexthecat/sDesktop-exampletheme
    const match = link.match(/github\.com\/([^\/\s]+)\/([^\/\s#?]+)/);

    if (!match)
    {
        return null;
    }

    return {
        owner: match[1], name: match[2].replace(/\.git$/, "")
    };
}

//if there is a sDesktop- in front of the name it gets removed
// cuz the name is already long (proly)
function displayName(name)
{
    const shortName = name.replace(/^sDesktop-/i, "");

    return shortName || name;
}
