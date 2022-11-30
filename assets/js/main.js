/**
 * Template Name: Vesperr - v4.9.1
 * Template URL: https://bootstrapmade.com/vesperr-free-bootstrap-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function() {
    "use strict";

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim();
        if (all) {
            return [...document.querySelectorAll(el)];
        } else {
            return document.querySelector(el);
        }
    };

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all);
        if (selectEl) {
            if (all) {
                selectEl.forEach((e) => e.addEventListener(type, listener));
            } else {
                selectEl.addEventListener(type, listener);
            }
        }
    };

    /**
     * Easy on scroll event listener
     */
    const onscroll = (el, listener) => {
        el.addEventListener("scroll", listener);
    };

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select("#navbar .scrollto", true);
    const navbarlinksActive = () => {
        let position = window.scrollY + 200;
        navbarlinks.forEach((navbarlink) => {
            if (!navbarlink.hash) return;
            let section = select(navbarlink.hash);
            if (!section) return;
            if (
                position >= section.offsetTop &&
                position <= section.offsetTop + section.offsetHeight
            ) {
                navbarlink.classList.add("active");
            } else {
                navbarlink.classList.remove("active");
            }
        });
    };
    window.addEventListener("load", navbarlinksActive);
    onscroll(document, navbarlinksActive);

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let header = select("#header");
        let offset = header.offsetHeight;

        if (!header.classList.contains("header-scrolled")) {
            offset -= 20;
        }

        let elementPos = select(el).offsetTop;
        window.scrollTo({
            top: elementPos - offset,
            behavior: "smooth",
        });
    };

    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select("#header");
    if (selectHeader) {
        const headerScrolled = () => {
            if (window.scrollY > 100) {
                selectHeader.classList.add("header-scrolled");
            } else {
                selectHeader.classList.remove("header-scrolled");
            }
        };
        window.addEventListener("load", headerScrolled);
        onscroll(document, headerScrolled);
    }

    const glightbox = GLightbox({
        selector: '.glightbox'
    });
    /**
     * Mobile nav toggle
     */
    on("click", ".mobile-nav-toggle", function(e) {
        select("#navbar").classList.toggle("navbar-mobile");
        this.classList.toggle("bi-list");
        this.classList.toggle("bi-x");
    });

    /**
     * Mobile nav dropdowns activate
     */
    on(
        "click",
        ".navbar .dropdown > a",
        function(e) {
            if (select("#navbar").classList.contains("navbar-mobile")) {
                e.preventDefault();
                this.nextElementSibling.classList.toggle("dropdown-active");
            }
        },
        true
    );

    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on(
        "click",
        ".scrollto",
        function(e) {
            if (select(this.hash)) {
                e.preventDefault();

                let navbar = select("#navbar");
                if (navbar.classList.contains("navbar-mobile")) {
                    navbar.classList.remove("navbar-mobile");
                    let navbarToggle = select(".mobile-nav-toggle");
                    navbarToggle.classList.toggle("bi-list");
                    navbarToggle.classList.toggle("bi-x");
                }
                scrollto(this.hash);
            }
        },
        true
    );

    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener("load", () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash);
            }
        }
    });

    /**
     * Testimonials slider
     */
    new Swiper(".testimonials-slider", {
        speed: 600,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        slidesPerView: "auto",
        pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
            },

            1200: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
        },
    });

    /**
     * Porfolio isotope and filter
     */
    window.addEventListener("load", () => {
        let projectContainer = select(".project-container");
        if (projectContainer) {
            let projectIsotope = new Isotope(projectContainer, {
                itemSelector: ".project-item",
                filter: ".filter-resort"

            });

            let projectFilters = select(".project-flters li", true);

            on(
                "click",
                ".project-flters li",
                function(e) {
                    e.preventDefault();
                    console.log("đây");
                    projectFilters.forEach(function(el) {
                        el.classList.remove("filter-active");
                    });
                    this.classList.add("filter-active");

                    projectIsotope.arrange({
                        filter: this.getAttribute("data-filter"),
                    });
                    projectIsotope.on("arrangeComplete", function() {
                        AOS.refresh();
                    });
                },
                true
            );
        }
    });

    /**
     * project details slider
     */
    new Swiper(".project-details-slider", {
        speed: 400,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable: true,
        },
    });

    /**
     * Animation on scroll
     */
    window.addEventListener("load", () => {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
        });
    });
    var swiper = new Swiper(".step", {
        loop: false,
        spaceBetween: 20,
        slidesPerView: 6,
        freeMode: true,
        watchSlidesProgress: true,
    });
    var swiper2 = new Swiper(".procedure-swiper", {
        spaceBetween: 30,
        slidesPerView: 1.2,
        centeredSlides: true,
        loop: true,
        loopAdditionalSlides: 30,

        thumbs: {
            swiper: swiper,
        },
    });

    var form = document.querySelector("#form-contact");
    var medium = document.referrer;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        headers.append('Access-Control-Allow-Origin', 'http://localhost:5500');
        headers.append('Access-Control-Allow-Credentials', 'true');
        headers.append('X-API-KEY', 'TOc9NNNACqe3ZK9BqQNJ0ghVz7wJJ9');

        headers.append('GET', 'POST', 'OPTIONS');

        const obj = {
            "account": {
                "account_name": document.getElementById("name").value,
                "phone_office": document.getElementById("phone").value,
                "email": document.getElementById("email").value,
                "dich_vu_tu_van": document.getElementById("content").value
            }
        };
        console.log(obj);
        $.ajax({
            type: "POST",
            url: "https://munkas.getflycrm.com/api/v3/accounts/",
            data: obj,
            headers: headers,
            dataType: "json",
            contentType: 'application/json',
            success: function(rs) {

                if (rs.error_code === 200) {
                    // modal_thanks.modal('show');
                    alert('thanhf coonf');
                } else if (rs.error_code === 401) {
                    alert('chiuj');
                } else
                    alert('vo day');
            },
        });
    });
    /**
     * Initiate Pure Counter
     */
    new PureCounter();
})();