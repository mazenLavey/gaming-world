
//  count down for events
const days = document.getElementById('countdown__card__day');
const hours = document.getElementById('countdown__card__hours');
const minutes = document.getElementById('countdown__card__minutes');
const seconds = document.getElementById('countdown__card__seconds');

let endDate = new Date(2023, 11, 31, 23, 59, 59).getTime();
let counter = setInterval(() => {
    let dateNow = new Date().getTime();
    let distance = (endDate - dateNow) / 1000; // in seconds
    if (distance > 0) {
        let daysNum = Math.floor(distance / (60 * 60 * 24));
        let hoursNum = Math.floor(distance % (60 * 60 * 24) / (60 * 60));
        let minutesNum = Math.floor(distance % (60 * 60 ) / (60));
        let secondsNum = Math.floor(distance % (60 ));

        days.innerHTML = daysNum < 10 ? `0${daysNum}`: daysNum;
        hours.innerHTML = hoursNum < 10 ? `0${hoursNum}`: hoursNum;
        minutes.innerHTML = minutesNum < 10 ? `0${minutesNum}`: minutesNum;
        seconds.innerHTML = secondsNum < 10 ? `0${secondsNum}`: secondsNum;
    } else if (distance <= 0) {
        window.clearInterval(counter);
    }
}, 1000);


// progress bar
let progressBar = Array.from(document.getElementsByClassName('progress-bar'));
let sectionSkills = document.getElementsByClassName('skills')[0];

window.addEventListener('scroll', ()=>{
    if (window.scrollY >= sectionSkills.offsetTop - 400) {
        progressBar.forEach(function(el){
            el.style.width = el.dataset.progress;
        });
    } else if (window.scrollY < sectionSkills.offsetTop + 400) {
        progressBar.forEach(function(el){
            el.style.width = '0%';
        });
    }
});


// slider
const sliderImgs = Array.from(document.querySelectorAll('.vr-games__slider__img > img'));
const sliderBg = document.getElementsByClassName('vr-games')[0];
const moveSlider = document.getElementsByClassName('vr-games__slider__img')[0];
const sliderContainer =document.querySelector('.vr-games__slider');
const prevImg = document.getElementById('prev-img');
const nextImg = document.getElementById('next-img');
const sliderTitle = document.querySelector('.vr-games__title'); 
const sliderP = document.querySelector('.vr-games__pragraph'); 

let imgCount = 0;
let width = sliderContainer.offsetWidth;

function changeSliderBg(imgCount) {
    sliderBg.style = `background-image: url(${sliderImgs[imgCount].src});`;
    sliderImgs.forEach((img)=>{
        img.classList.remove('active');
    });
    sliderImgs[imgCount].classList.add('active');
}

function moveImg(imgCount) {
    moveSlider.style = `transform: translateX(-${(width * imgCount) + (imgCount * 25)}px)`;
    sliderTitle.textContent = `${sliderImgs[imgCount].alt}`;
    sliderP.textContent =`${sliderImgs[imgCount].dataset.info}`
}

function toNext() {
    imgCount++;
    imgCount >= sliderImgs.length? imgCount = 0: null;
    moveImg(imgCount);
    changeSliderBg(imgCount);
    
}

function toPrev() {
    imgCount--;
    imgCount < 0? imgCount = sliderImgs.length -1 : null;
    moveImg(imgCount);
    changeSliderBg(imgCount);
}

window.onload = ()=> {
    sliderTitle.textContent = `${sliderImgs[imgCount].alt}`;
    sliderP.textContent =`${sliderImgs[imgCount].dataset.info}`
}

sliderImgs.forEach((img)=>{
    img.addEventListener('click', ()=>{
        imgCount = img.dataset.num;
        moveImg(imgCount);
        changeSliderBg(imgCount);
    });
});

nextImg.addEventListener('click', ()=>{
    toNext();
})

prevImg.addEventListener('click', ()=>{
    toPrev();
})

// swape settings for slider
let x1;
let y1;

sliderImgs.forEach((img)=>{
    img.addEventListener('touchstart', (e)=>{
        x1 = e.touches[0].clientX;
        y1 = e.touches[0].clientY;
    }, {passive: true});

    img.addEventListener('touchmove', (e)=>{
        if (x1 || y1) {
            let x2 = e.touches[0].clientX;
            let y2 = e.touches[0].clientY;
            
            let diffX = x2 - x1;
            let difY = y2 - y1;
        
            if (Math.abs(diffX) > Math.abs(difY)) {
                if (diffX > 0) {
                    toPrev();
        
                } else if (diffX < 0) {
                    toNext();
                }
            };
        
            x1 = null;
            y1 = null;
        }
    }, {passive: true});
})

// counter

let count = document.querySelectorAll('.count');
let sectionStatus = document.querySelector('.status');
let countStatus = false;

window.addEventListener('scroll', ()=>{
    if (window.scrollY > sectionStatus.offsetTop - 400) {
        if (countStatus === false) {
            count.forEach((elem)=>{
                let goal = elem.dataset.goal;
                let counter = setInterval(()=>{
                    elem.textContent++;
                    if (elem.textContent === goal) {
                        clearInterval(counter);
                    }
                }, 3000/goal);
            })
            countStatus = true;
        }
    }
})

// scroll to top btn 

const upBtn = document.getElementsByClassName('up-btn')[0];

window.addEventListener('scroll', (e)=>{
    if (window.scrollY > 800) {
        upBtn.style.display = 'block';
    } else {
        upBtn.style.display = 'none';
    }
})

// mega menu

const linksBtn =document.getElementById('links');
const megaMenu = document.getElementsByClassName('mega-menu')[0];

linksBtn.addEventListener('click', ()=>{
    megaMenu.classList.toggle('active');
});

window.addEventListener('click', (e)=>{
    if (megaMenu.classList.contains('active')) {
        if (e.target !== megaMenu && e.target.innerHTML !== linksBtn.innerHTML) {
            megaMenu.classList.remove('active');
        }
    }
});


// swap marquee-group for mobile

const marqueeSlider = document.querySelector('.marquee-group');
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