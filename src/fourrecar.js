function parseArg(arg) {
    let i = arg.indexOf("=");
    if (i === -1) {
        return [arg, ""];
    }
    return [arg.slice(0, i), arg.slice(i+1)]
}

function addArgIfNotPresent(params, arg) {
    let [name, value] = parseArg(arg);
    if (!params.has(name)) {
        params.set(name, value)
    }
}

function isSearch(urlObj) {
    return urlObj.pathname.endsWith("/s");
}

function isCategory(urlObj) {
    return urlObj.pathname.startsWith("/r/");
}

function newURL(url) {
    const urlObj = new URL(url);
    if (!isSearch(urlObj) && !isCategory(urlObj)) {
        return url;
    }
    if (isSearch(urlObj)) {
        addArgIfNotPresent(urlObj.searchParams, "filters[Facet_vendeurs][0]=Carrefour");
    } else {
        addArgIfNotPresent(urlObj.searchParams, "filters[facet_enseignes][0]=Drive ou livraison à domicile");
    }
    addArgIfNotPresent(urlObj.searchParams, "sort=productSimpleView.pricePerUnitCents");
    return urlObj.href;
}

function redirect(requestDetails) {
    const targetUrl = newURL(requestDetails.url);
    if (requestDetails.url === targetUrl) {
        return;
    }
    console.log(`Redirecting: ${requestDetails.url}\nto ${targetUrl}`);
    return {
        redirectUrl: targetUrl
    };
}

browser.webRequest.onBeforeRequest.addListener(
    redirect,
    { urls: [
        "https://www.carrefour.fr/s*", 
        "https://www.carrefour.fr/r*"
    ] },
    ["blocking"]
);
