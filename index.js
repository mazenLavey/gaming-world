
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


// skills bar
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


// VR Games slider

const sliderBg = document.querySelector('.vr-games');
const moveSlider = document.querySelector('.vr-games__slider__img');
const sliderContainer =document.querySelector('.vr-games__slider');
const prevImg = document.getElementById('prev-img');
const nextImg = document.getElementById('next-img');
const sliderTitle = document.querySelector('.vr-games__title'); 
const sliderP = document.querySelector('.vr-games__pragraph'); 

let imgCount = 0;
let width = sliderContainer.offsetWidth;
let importData;


fetch("json/vr_games.json").then(res=> res.json()).then(data => {
    importData = data;
    data.forEach((element)=>{
        moveSlider.insertAdjacentHTML("beforeend", `
        <img src=${element.img.src} width=${element.img.width} height=${element.img.height} srcset=${element.img.srcset} alt=${element.img.alt} data-num=${element.img.num} class=${(element.img.active)? 'active': null}>
        `)
    })

    }).finally(()=>{

        const sliderImgs = Array.from(document.querySelectorAll('.vr-games__slider__img > img'));

        function changeSliderBg(imgCount) {
            sliderBg.style = `background-image: url(${sliderImgs[imgCount].src});`;
            sliderImgs.forEach((img)=>{
                img.classList.remove('active');
            });
            sliderImgs[imgCount].classList.add('active');
        }

        function moveImg(imgCount) {
            moveSlider.style = `transform: translateX(-${(width * imgCount) + (imgCount * 25)}px)`;
            sliderTitle.textContent = `${importData[imgCount].title}`;
            sliderP.textContent =`${importData[imgCount].description}`
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

        const onLoad = ()=> {
            sliderTitle.textContent = `${importData[imgCount].title}`;
            sliderP.textContent =`${importData[imgCount].description}`
        }

        onLoad();

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
    });

    
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


