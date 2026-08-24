
const API_URL = "http://localhost:3000";


let currentScreen = 1;

let selectedTime = "";

let noClicks = 0;


/* --------------------------------
   NO BUTTON MESSAGES
-------------------------------- */

const noMessages = [

    "Are you sure? 🥺",

    "Think about one day away from hostel... ❤️",

    "A movie, good food and a little happiness? 🍿",

    "Just one beautiful day... please think about it. 🥺❤️",

    "Okay... I respect your choice. ❤️"

];



/* --------------------------------
   START EXPERIENCE + MUSIC
-------------------------------- */

function startExperience() {

    const music =
        document.getElementById(
            "backgroundMusic"
        );


    if (music) {

        music.volume = 0.35;


        music.play().catch(function (error) {

            console.log(
                "Music could not start:",
                error
            );

        });

    }


    nextScreen(2);

}



/* --------------------------------
   SCREEN NAVIGATION
-------------------------------- */

function nextScreen(number) {

    const current =
        document.querySelector(
            `#screen${currentScreen}`
        );


    const next =
        document.querySelector(
            `#screen${number}`
        );


    if (current) {

        current.classList.remove(
            "active"
        );

    }


    if (next) {

        next.classList.add(
            "active"
        );

    }


    currentScreen = number;


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}



/* --------------------------------
   YES BUTTON
-------------------------------- */

function chooseYes() {

    nextScreen(5);

}



/* --------------------------------
   PLAYFUL NO BUTTON
-------------------------------- */

function handleNo() {

    const message =
        document.getElementById(
            "noMessage"
        );


    const button =
        document.getElementById(
            "noButton"
        );


    message.textContent =
        noMessages[
            Math.min(
                noClicks,
                noMessages.length - 1
            )
        ];


    noClicks++;



    /*
        Move the NO button
        for the first few clicks.
    */

    if (noClicks <= 3) {

        const x =
            Math.random() * 160 - 80;


        const y =
            Math.random() * 100 - 50;


        button.style.transform =
            `translate(${x}px, ${y}px)`;

    }



    /*
        Return button normally
        after a few attempts.
    */

    if (noClicks === 4) {

        button.style.transform =
            "none";


        button.textContent =
            "Still No 🥺";

    }

}



/* --------------------------------
   TIME SELECTION
-------------------------------- */

function selectTime(button, value) {

    document
        .querySelectorAll(
            ".options button"
        )
        .forEach(function (item) {

            item.classList.remove(
                "selected"
            );

        });


    button.classList.add(
        "selected"
    );


    selectedTime = value;

}



/* --------------------------------
   GET SELECTED SNACKS
-------------------------------- */

function getSnacks() {

    return [

        ...document.querySelectorAll(
            ".checks input:checked"
        )

    ].map(function (item) {

        return item.value;

    });

}



/* --------------------------------
   SUBMIT RESPONSE
-------------------------------- */

async function submitResponse() {


    const name =
        document
            .getElementById("name")
            .value
            .trim();


    const movie =
        document
            .getElementById("movie")
            .value;


    const date =
        document
            .getElementById("date")
            .value;


    const message =
        document
            .getElementById("message")
            .value
            .trim();


    const snacks =
        getSnacks();


    const status =
        document.getElementById(
            "submitStatus"
        );



    /* -----------------------------
       VALIDATION
    ----------------------------- */


    if (!name) {

        status.textContent =
            "Please enter your name ❤️";

        return;

    }


    if (!movie) {

        status.textContent =
            "Choose what you want to watch 🎬";

        return;

    }


    if (!date) {

        status.textContent =
            "Choose our date ❤️";

        return;

    }



    status.textContent =
        "Sending your response... ❤️";



    try {


        const response =
            await fetch(
                `${API_URL}/api/send-response`,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },


                    body: JSON.stringify({

                        name: name,

                        answer:
                            "YES ❤️",

                        movie: movie,

                        date: date,

                        time:
                            selectedTime ||
                            "We'll decide together 😌",

                        snacks:
                            snacks.length
                                ? snacks.join(", ")
                                : "Surprise 🍿",

                        message:
                            message ||
                            "No message"

                    })

                }
            );



        const data =
            await response.json();



        if (!data.success) {

            throw new Error(
                data.message
            );

        }



        /* -----------------------------
           UPDATE FINAL TICKET
        ----------------------------- */


        document
            .getElementById("finalMovie")
            .textContent =
                `Movie: ${movie}`;


        document
            .getElementById("finalTime")
            .textContent =
                `Time: ${
                    selectedTime ||
                    "We'll decide together 😌"
                }`;


        document
            .getElementById("finalSnacks")
            .textContent =
                `Snacks: ${
                    snacks.length
                        ? snacks.join(", ")
                        : "Surprise 🍿"
                }`;



        /* -----------------------------
           SHOW SUCCESS SCREEN
        ----------------------------- */

        nextScreen(6);


        createConfetti();



    } catch (error) {


        console.log(
            "Email Error:",
            error
        );


        status.textContent =
            "Something went wrong. Please try again ❤️";

    }

}



/* --------------------------------
   CONFETTI
-------------------------------- */

function createConfetti() {


    for (
        let i = 0;
        i < 60;
        i++
    ) {


        const item =
            document.createElement(
                "span"
            );


        item.className =
            "confetti-piece";


        item.textContent =
            [
                "❤️",
                "✨",
                "🎉",
                "🍿"
            ][
                Math.floor(
                    Math.random() * 4
                )
            ];


        item.style.left =
            `${Math.random() * 100}%`;


        item.style.animationDelay =
            `${Math.random() * 2}s`;


        document.body.appendChild(
            item
        );


        setTimeout(
            function () {

                item.remove();

            },
            4500
        );

    }

}