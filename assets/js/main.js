
"use strict";
(function () {
    const menu = document.getElementById('main-menu');
    const navs = menu.getElementsByClassName('nav-link');

    function getPosition(obj) {
        let currenttop = 0;
        if (obj.offsetParent) {
            do {
                currenttop += obj.offsetTop;
            } while ((obj = obj.offsetParent));
            return currenttop;
        }
    }

    function activeNavSection(section) {
        for (const nav of navs) {
            nav.classList.remove("active");
            nav.classList.remove("fw-bolder");
        }
        const current_element = document.getElementById(section.button_id);
        current_element.classList.add("active");
        current_element.classList.add("fw-bolder");
    }

    const sections = [
        {
            button_id: 'home-btn',
            section_id: 'home',
            position: getPosition(document.getElementById('home'))
        },
        {
            button_id: 'specialties-btn',
            section_id: 'specialties',
            position: getPosition(document.getElementById('specialties')),
        },
        {
            button_id: 'knowledge-btn',
            section_id: 'knowledge',
            position: getPosition(document.getElementById('knowledge')),
        },
        {
            button_id: 'projects-btn',
            section_id: 'projects',
            position: getPosition(document.getElementById('projects')),
        },
    ];

    let current_section = sections[0];
    const first_milestone = 0;
    const second_milestone = (sections[1].position - sections[0].position) * 0.75;
    const third_milestone = sections[1].position + (sections[2].position - sections[1].position) * 0.75;
    const fourth_milestone = sections[2].position + (sections[3].position - sections[2].position) * 0.75;

    window.onscroll = function () {
        const scroll_top = document.documentElement.scrollTop;
        if (first_milestone <= scroll_top && scroll_top <= second_milestone) {
            if (current_section.section_id != sections[0].section_id) {
                current_section = sections[0];
                activeNavSection(current_section);
            }
        }

        if (second_milestone < scroll_top && scroll_top <= third_milestone) {
            if (current_section.section_id != sections[1].section_id) {
                current_section = sections[1];
                activeNavSection(current_section);
            }
        }

        if (third_milestone < scroll_top) {
            if (current_section.section_id != sections[2].section_id) {
                current_section = sections[2];
                activeNavSection(current_section);
            }
        }

        if (fourth_milestone < scroll_top) {
            if (current_section.section_id != sections[3].section_id) {
                current_section = sections[3];
                activeNavSection(current_section);
            }
        }

    }

    const audio = new Audio('./assets/audios/aqui-estan-mis-nenas.mp3');
    let is_audio_played = false;

    document.getElementById("tanque-evans-img").addEventListener("click", function (event) {
        if (is_audio_played === false) {
            audio.play();
            is_audio_played = true;
        }
    }, false);






})();