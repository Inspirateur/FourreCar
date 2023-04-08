let newUrl = document.location.href;
if (!document.location.href.includes('&sort=')) {
    newUrl += '&sort=facet_price';
}
if (!document.location.href.includes('s?filters[Facet_vendeurs][0]')) {
    newUrl = newUrl.replace(/s\?.*?&/, 's?filters[Facet_vendeurs][0]=Carrefour&');
}

if (document.location.href !== newUrl) {
    document.location = newUrl;
}