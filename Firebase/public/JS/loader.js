function loader() {
    // if the page is not the index.html page :
    console.log(location.pathname);
    if (location.pathname != "/Firebase/public/index.html") {
        fetch("header.html")
        .then(response => {
            return response.text();
        })
        .then(data => {
            document.querySelector("header").innerHTML = data;
            liens = document.querySelectorAll("nav a");

            liens.forEach(a => {
                console.log(a.href);
                if (a.href == location.protocol + '//' + location.host + location.pathname)
                    a.classList.add('active');
            });
        });
    }
    else {
        fetch("HTML/header.html")
        .then(response => {
            return response.text();
        })
        .then(data => {
            document.querySelector("header").innerHTML = data;
            liens = document.querySelectorAll("nav a");

            liens.forEach(a => {
                console.log(a.href);
                if (a.href == location.protocol + '//' + location.host + location.pathname)
                    a.classList.add('active');
            });
        });
    }
}
loader()