function changeTheme()
{
    // from css [data-theme="..."]
    if (document.documentElement.getAttribute("data-theme") == "dark") //if dark, turn light
    {
        document.documentElement.setAttribute("data-theme", "light");
        document.getElementById("themeButton").innerHTML = "dm";
    } else //if light, turn dark
    {
        document.documentElement.setAttribute("data-theme", "dark");
        document.getElementById("themeButton").innerHTML = "lm";
    }
}
