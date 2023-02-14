
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
        `)
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
        `)
    });
}).finally(()=>{
    // swap marquee-group for mobile
    
    const marqueeCards = document.querySelectorAll('.mini-games__card');
    
    let marqueeCardWidth = marqueeCards[0].offsetWidth;
    let cardCount = 0;
    let cardsNum = 8;
    
    marqueeCards.forEach((card)=>{
        card.addEventListener('touchstart', (e)=>{
            x1 = e.touches[0].clientX;
            y1 = e.touches[0].clientY;
        }, {passive: true});
    
        card.addEventListener('touchmove', (e)=>{
            if (x1 || y1) {
                let x2 = e.touches[0].clientX;
                let y2 = e.touches[0].clientY;
                
                let diffX = x2 - x1;
                let difY = y2 - y1;
            
                if (Math.abs(diffX) > Math.abs(difY)) {
                    if (diffX > 0) {
                        toPrevCard();
                        
            
                    } else if (diffX < 0) {
                        toNextCard();
                        
                    }
                };
            
                x1 = null;
                y1 = null;
            }
        }, {passive: true});
    })
    
    function toNextCard() {
        cardCount++;
        cardCount >= cardsNum? cardCount = 0: null;
        moveCard(cardCount);
    }
    
    function toPrevCard() {
        cardCount--;
        cardCount < 0? cardCount = cardsNum -1 : null;
        moveCard(cardCount);
    }
    
    function moveCard(cardCount) {
        marqueeSlider.style = `transform: translateX(-${(marqueeCardWidth * cardCount) + (cardCount * 20)}px) !important`;
    }
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




