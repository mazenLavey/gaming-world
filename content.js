
// articles

const articlesCardsContainer = document.querySelector('.articles__card-container');

fetch("json/articles.json").then(res => res.json()).then((data)=>{
    data.forEach(element => {
        
        articlesCardsContainer.insertAdjacentHTML("beforeend", 
        `<div class="articles__card">
            <img src=${element.img.src} alt=${element.img.alt} width=${element.img.width} height=${element.img.height} loading=${element.img.loading}>
            <h3>${element.title}</h3>
            <p>${element.description}</p>
            <div class="card__link">
                <a href=${element.link}>Read More<i class="fa-solid fa-arrow-right"></i></a>
            </div>
        </div>`
        )
    });
});

// games

const gamesNewsWrapper = document.querySelector(".games-news__wrapper");

fetch("json/games.json").then(res => res.json()).then((data)=>{
    data.forEach(element => {
        gamesNewsWrapper.insertAdjacentHTML("beforeend", 
        `
        <div class="games-news__card">
            <img src=${element.img.src} alt=${element.img.alt} width=${element.img.width} height=${element.img.height} loading=${element.img.loading}>
            <div class="card__info">
                <div class="card__info__text">
                    <h2>${element.title}</h2>
                    <p>${element.description}</p>
                    <a href=${element.link}>Read More...</a>
                </div>
                <div class="card__info__statics">
                    <span><i class="fa-regular fa-eye"></i>${element.views}</span>
                    <span><i class="fa-solid fa-heart"></i>${element.likes}</span>
                </div>
            </div>
        </div>
        `)
    });

});


// mini games

const marqueeSlider = document.getElementById('marquee-slider');
const marqueeSliderDuplicate = document.getElementById('marquee-slider-duplicate');


fetch("json/mini_games.json").then(res => res.json()).then((data)=>{
    data.forEach((element)=>{
        marqueeSlider.insertAdjacentHTML("beforeend", `
        <div class="mini-games__card">
            <div class="card__upper">
                <img src=${element.img.src} alt=${element.img.alt} width=${element.img.width} height=${element.img.height} loading=${element.img.loading}>
                <div class="mini-games_stars">
                    <a herf=${element.facebookLink}><i class="fa-brands fa-facebook-f"></i></a>
                    <a herf=${element.twitterLink}><i class="fa-brands fa-twitter"></i></a>
                    <a herf=${element.youtubeLink}><i class="fa-brands fa-youtube"></i></a>
                </div>
            </div>
            <div class="card__lower">
                <h3>${element.title}</h3>
                <p>${element.description}</p>
                <a href=${element.link}>Play Now</a>
            </div>
        </div>
        `);
        
        marqueeSliderDuplicate.insertAdjacentHTML("beforeend", `
        <div class="mini-games__card">
            <div class="card__upper">
                <img src=${element.img.src} alt=${element.img.alt} width=${element.img.width} height=${element.img.height} loading=${element.img.loading}>
                <div class="mini-games_stars">
                    <a herf=${element.facebookLink}><i class="fa-brands fa-facebook-f"></i></a>
                    <a herf=${element.twitterLink}><i class="fa-brands fa-twitter"></i></a>
                    <a herf=${element.youtubeLink}><i class="fa-brands fa-youtube"></i></a>
                </div>
            </div>
            <div class="card__lower">
                <h3>${element.title}</h3>
                <p>${element.description}</p>
                <a href=${element.link}>Play Now</a>
            </div>
        </div>
        `);
    });
}).finally(()=>{
    const miniGamesSliderWrapper = document.querySelector('.marquee-wrapper');
    const miniGamesSlider = document.querySelector('.marquee-group');
    let startX;
    let isPressed = false;
    let sliderWidth = miniGamesSlider.offsetWidth - miniGamesSliderWrapper.offsetWidth;

    const moveMiniGamesSlider = (moveTo)=>{
        if (moveTo > 0) {
            moveTo = 0;
        } else if (-moveTo > sliderWidth) {
            moveTo = -sliderWidth;
        };

        miniGamesSlider.style.left = `${moveTo}px`
    }

    window.addEventListener('resize', ()=>{
        sliderWidth = miniGamesSlider.offsetWidth - miniGamesSliderWrapper.offsetWidth;
        moveMiniGamesSlider(0);
    })

    miniGamesSliderWrapper.addEventListener('touchstart', (e)=>{
        isPressed = true;
        startX = e.touches[0].pageX - miniGamesSlider.offsetLeft;
    });

    miniGamesSliderWrapper.addEventListener('touchmove', (e)=>{
        if(!isPressed) return;
        e.preventDefault();
        let moveTo = e.touches[0].pageX - startX;
        moveMiniGamesSlider(moveTo);
    });
    
    miniGamesSliderWrapper.addEventListener('touchend', ()=> isPressed = false);
});



// testimonials
const testimonialCardWrapper = document.querySelector(".testimonial__card__wrapper");

fetch("json/testimonials.json").then(res => res.json()).then((data)=>{
    data.forEach(element =>{
        testimonialCardWrapper.insertAdjacentHTML("beforeend", `
        <div class="testimonial__card">
            <img src=${element.img.src} alt=${element.img.alt} width=${element.img.width} height=${element.img.height} loading=${element.img.loading}>
            <h3>${element.name}</h3>
            <span>${element.profession}</span>
            <div class="testimonials_stars">
                ${(element.stars === 5)? 
                    '<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>'
                    :'<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i>'}
            </div>
            <p>${element.text}</p>
        </div>
        `)
    });
});




