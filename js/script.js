'use strict';
// smooth scrolling for learn more button
const learn_more = document.querySelector('.scroll-btn');
const section1 = document.querySelector('.section1');
learn_more.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});
// smooth scrolling for nav links
const nav = document.querySelector('.navbar');
nav.addEventListener('click', function (e) {
  e.preventDefault();
  const id = e.target.getAttribute('href');
  if (e.target.classList.contains('nav-links')) {
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
// nav fade animation
const navHover = function (e, opacity) {
  if (e.target.classList.contains('nav-links') || e.target.classList.contains('open-acc')) {
    const link = e.target;
    const links = link.closest('nav').querySelectorAll('.nav-links');
    const logo = link.closest('nav').querySelector('.nav-logo');
    links.forEach(function (el) {
      if (el != link) {
        el.style.opacity = opacity;
      }
    });
    logo.style.opacity = opacity;
  }
};
nav.addEventListener('mouseover', function (e) {
  navHover(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  navHover(e, 1);
});
// tabbed component
const tabs = document.querySelectorAll('.tab-btn')
const opContainer = document.querySelector('.operations')
const opContent = document.querySelectorAll('.op-content')
tabs[0].classList.add('btn-active')
tabs.forEach(t=> t.addEventListener('click' , function(e){
  const clicked = e.target
  // console.log(clicked)
  opContent.forEach(c=> c.classList.add('hidden'))
  tabs.forEach(t=> t.classList.remove('btn-active'))
  clicked.classList.add('btn-active')
  document.querySelector(`.op-content-${clicked.dataset.tab}`).classList.remove('hidden')
}))

// sticky navbar
const header = document.querySelector('.myheader');
const high = nav.getBoundingClientRect().height;
// console.log(high)
const navCall = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const navobs = new IntersectionObserver(navCall, {
  root: null,
  threshold: 0,
  rootMargin: `-${high}px`,
});
navobs.observe(header);
// Reveal on scroll
const sections = document.querySelectorAll('.section');
const secCall = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.classList.remove('section-hidden');
    observer.unobserve(entry.target);
  }
};
const secObs = new IntersectionObserver(secCall, {
  root: null,
  threshold: 0.15,
});
sections.forEach(function (sec) {
  secObs.observe(sec);
  sec.classList.add('section-hidden');
});
// lazy images
const imgs = document.querySelectorAll('img[data-src]');
const imgCall = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy');
    });
    observer.unobserve(entry.target);
  }
};
const imgObs = new IntersectionObserver(imgCall, {
  root: null,
  threshold: 0,
  // rootMargin:'200px',
});
imgs.forEach(img => imgObs.observe(img));



// slider
let curSlide = 0
const maxSlides = 3
const slider = document.querySelector('.slider')
const slides = document.querySelectorAll('.slide')
const dot = document.querySelector('.dot')
const dots = document.querySelectorAll('.dots__dot')
const leftBtn = document.querySelector('.slider__btn--left')
const rightBtn = document.querySelector('.slider__btn--right')
slider.style.overflowX = 'visible'
// slider.style.transform = 'scale(0.2)'
slides.forEach(function(s,i){
  s.style.transform = `translateY(${100 * i}%)`
})
rightBtn.addEventListener('click',function(){
  curSlide=curSlide+1
  slides.forEach(function(s,i){
    s.style.transform = `translateY(${100 * (i-curSlide)}%)`
  })
})