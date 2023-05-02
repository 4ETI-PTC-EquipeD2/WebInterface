function loader() {
    fetch("header.html")
    .then(response => {
        return response.text();
    })
    .then(data => {
        document.querySelector("header").innerHTML = data;
        const liens = document.querySelectorAll("nav a");
        liens.forEach(a => {
        if (a.href == location.protocol + '//' + location.host + location.pathname) {
            a.classList.add('active');
        }
        });

        // Dispatch a custom event when the header content is loaded
        const headerLoadedEvent = new Event('headerLoaded');
        document.dispatchEvent(headerLoadedEvent);
    });
}

document.addEventListener('DOMContentLoaded', loader);
