function newURL(url) {
    let newUrl = url;
    if (!newUrl.includes('sort=')) {
        if (newUrl.includes("?")) {
            newUrl += '&sort=productSimpleView.pricePerUnitCents';
        } else {
            newUrl += '?sort=productSimpleView.pricePerUnitCents';
        }
    }
    if (newUrl.includes("/s?") && !newUrl.includes('s?filters[Facet_vendeurs][0]')) {
        newUrl = newUrl.replace("s?", 's?filters[Facet_vendeurs][0]=Carrefour&');
    }
    return newUrl;
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
