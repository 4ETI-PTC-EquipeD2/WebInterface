export class header {
    constructor(file="header.html",){
        this.file=file;
    }

    loader() {
        fetch(this.file)
            .then(response => {
                return response.text();
            })
            .then(data => {
                document.querySelector("header").innerHTML = data;
                let liens = document.querySelectorAll("nav a");
                liens.forEach(a => {
                    if (a.href == location.protocol + '//' + location.host + location.pathname)
                        a.classList.add('active');
                });
            });
        }
}