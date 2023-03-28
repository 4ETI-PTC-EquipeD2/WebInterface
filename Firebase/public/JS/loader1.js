function loader() {
    fetch("HTML/header1.html")
    .then(response => {
        return response.text();
    })
    .then(data => {
        document.querySelector("header").innerHTML = data;
        const liens = document.querySelectorAll("nav a");
        liens.forEach(a => {
        console.log(location.protocol + '//' + location.host + location.pathname);
        console.log(a.href);
        if (a.href == location.protocol + '//' + location.host + location.pathname) {
            a.classList.add('active');
        }
        });
    });
}
  
document.addEventListener('DOMContentLoaded', loader);