/* =========================================================
   CERTIFICATE DATA
========================================================= */

const certificates = [

    {
        number: "01",

        title: "Executive Course in Data Science",

        issuer: "LPU",

        description:
            "Certificate in data science fundamentals and analytical concepts.",

        image:
            "/assets/certificates/Data science certification.png"
    },


    {
        number: "02",

        title: "Python essential Training",

        issuer: "Linkedin Learning",

        description:
            "Certification focused on clearing the basics of python concepts.",

        image:
            "/assets/certificates/Python.png"
    },


    {
        number: "03",

        title:"IBM Cognos Analytics",

        issuer: "IBM",

        description:
            "Certification covering all the essentials of Cognos analytics including reporting and dashboards.",

        image:
            "/assets/certificates/Cognos Analytics.png"
    },


    {
        number: "04",

        title: "Business Intelligence",

        issuer: "IBM",

        description:
            "Certificate on gaining knowledge on business Intelligence tools.",

        image:
            "/assets/certificates/Business Intelligence.png"
    },


    {
        number: "05",

        title: "MERN Stack",

        issuer: "ThinkNext Technologies",

        description:
            "Gained hands-on experience working with MongoDB, NodeJS, React and Express .",

        image:
            "/assets/certificates/MERN.png"
    },


    {
        number: "06",

        title: "Predictive Analytics",

        issuer: "IBM",

        description:
            "Gained knowledge of Predictive Analytics using SPSS Modeler.",

        image:
            "/assets/certificates/predicitive.png"
    }

];



/* =========================================================
   ELEMENTS
========================================================= */

const grid =
    document.getElementById("certificationsGrid");

const modal =
    document.getElementById("certificateModal");

const modalImage =
    document.getElementById("modalImage");

const modalClose =
    document.getElementById("modalClose");

const themeToggle =
    document.getElementById("themeToggle");

const menuButton =
    document.getElementById("menuButton");

const navigationOverlay =
    document.getElementById("navigationOverlay");

const navigationClose =
    document.getElementById("navigationClose");

const pageLoader =
    document.getElementById("pageLoader");



/* =========================================================
   CREATE CERTIFICATE CARDS
========================================================= */

function createCertificateCards() {

    if (!grid) {
        return;
    }


    grid.innerHTML = "";


    certificates.forEach((certificate, index) => {

        const card =
            document.createElement("article");


        card.className =
            "certificate-card";


        card.style.animationDelay =
            `${0.25 + index * 0.09}s`;


        card.setAttribute(
            "tabindex",
            "0"
        );


        card.setAttribute(
            "role",
            "button"
        );


        card.setAttribute(
            "aria-label",
            `View ${certificate.title} certificate`
        );


        card.innerHTML = `

            <div class="certificate-content">

                <div class="certificate-number">
                    ${certificate.number}
                </div>


                <div class="certificate-icon">

                    <i class="fa-solid fa-certificate"></i>

                </div>


                <h3>
                    ${certificate.title}
                </h3>


                <p>
                    ${certificate.description}
                </p>

            </div>


            <div class="certificate-view">

                <i class="fa-solid fa-arrow-up-right"></i>

            </div>

        `;


        /* Click */

        card.addEventListener(
            "click",
            () => {

                openCertificate(
                    certificate.image,
                    certificate.title
                );

            }
        );


        /* Keyboard */

        card.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    openCertificate(
                        certificate.image,
                        certificate.title
                    );

                }

            }
        );


        grid.appendChild(card);

    });

}



/* =========================================================
   OPEN CERTIFICATE
========================================================= */

function openCertificate(
    imagePath,
    title
) {

    if (!modal || !modalImage) {
        return;
    }


    modalImage.src = imagePath;

    modalImage.alt =
        `${title} certificate`;


    modal.classList.add("active");


    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "no-scroll"
    );


    /* If image path is wrong */

    modalImage.onerror = () => {

        console.error(
            "Certificate image could not be loaded:",
            imagePath
        );

        modalImage.alt =
            "Certificate image could not be loaded.";
    };

}



/* =========================================================
   CLOSE CERTIFICATE
========================================================= */

function closeCertificate() {

    if (!modal) {
        return;
    }


    modal.classList.remove(
        "active"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "no-scroll"
    );


    setTimeout(() => {

        if (modalImage) {

            modalImage.src = "";

        }

    }, 400);

}



/* =========================================================
   MODAL EVENTS
========================================================= */

if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeCertificate
    );

}


const modalBackdrop =
    document.querySelector(
        ".modal-backdrop"
    );


if (modalBackdrop) {

    modalBackdrop.addEventListener(
        "click",
        closeCertificate
    );

}


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            modal &&
            modal.classList.contains("active")
        ) {

            closeCertificate();

        }

    }
);



/* =========================================================
   NAVIGATION
========================================================= */

function openNavigation() {

    if (!navigationOverlay) {
        return;
    }


    navigationOverlay.classList.add(
        "active"
    );


    document.body.classList.add(
        "no-scroll"
    );

}


function closeNavigation() {

    if (!navigationOverlay) {
        return;
    }


    navigationOverlay.classList.remove(
        "active"
    );


    document.body.classList.remove(
        "no-scroll"
    );

}


if (menuButton) {

    menuButton.addEventListener(
        "click",
        openNavigation
    );

}


if (navigationClose) {

    navigationClose.addEventListener(
        "click",
        closeNavigation
    );

}



/* Close when clicking outside panel */

if (navigationOverlay) {

    navigationOverlay.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                navigationOverlay
            ) {

                closeNavigation();

            }

        }
    );

}



/* =========================================================
   CLOSE MENU WHEN LINK IS CLICKED
========================================================= */

document
    .querySelectorAll(".navigation-card")
    .forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                closeNavigation();

            }
        );

    });



/* =========================================================
   DARK / LIGHT MODE
========================================================= */

function setTheme(theme) {

    if (theme === "light") {

        document.body.classList.add(
            "light-theme"
        );

    } else {

        document.body.classList.remove(
            "light-theme"
        );

    }


    localStorage.setItem(
        "portfolio-theme",
        theme
    );


    updateThemeIcon(theme);

}



function updateThemeIcon(theme) {

    if (!themeToggle) {
        return;
    }


    const icon =
        themeToggle.querySelector("i");


    if (!icon) {
        return;
    }


    if (theme === "light") {

        icon.className =
            "fa-solid fa-moon";

    } else {

        icon.className =
            "fa-solid fa-sun";

    }

}



if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            const isLight =
                document.body.classList.contains(
                    "light-theme"
                );


            setTheme(
                isLight
                    ? "dark"
                    : "light"
            );

        }
    );

}



/* =========================================================
   LOAD SAVED THEME
========================================================= */

const savedTheme =
    localStorage.getItem(
        "portfolio-theme"
    );


if (savedTheme === "light") {

    setTheme("light");

} else {

    setTheme("dark");

}



/* =========================================================
   PAGE LOADING
========================================================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                if (pageLoader) {

                    pageLoader.classList.add(
                        "hide"
                    );

                }

            },
            350
        );

    }
);



/* =========================================================
   INITIALIZE
========================================================= */

createCertificateCards();