import $ from 'jquery';
import slick from 'slick-carousel';
export default () => {

const form = document.querySelector('.modal-gallery');
const close = document.querySelector('.modal-gallery-close');
const overlay = document.querySelector('.modal-overlay');
const login = form.querySelector('[name=userphone]');

const showForm = () => {
  form.classList.add('modal-gallery-show');
  overlay.classList.add('modal-overlay-show');
  login.focus();
}

const startBtnEvents = (enter, elem1) => {
  enter.addEventListener('mouseover', () => {
    elem1.style.textDecoration = 'underline';
    elem1.classList.add('buy-kitchen-hover');
  });
  enter.addEventListener('mouseout', () => {
    elem1.style.textDecoration = '';
    elem1.classList.remove('buy-kitchen-hover');
  });
  enter.addEventListener('click', () => {
    showForm();
  });
}

//events
close.addEventListener("click", function(event){
  event.preventDefault();
  form.classList.remove("modal-gallery-show");
  overlay.classList.remove("modal-overlay-show");
});

overlay.addEventListener("click", function(event){
  event.preventDefault();
  overlay.classList.remove("modal-overlay-show");
  form.classList.remove("modal-gallery-show");
});

$(document).ready(function(){
  let btn = document.querySelector('.info-btn');
  let heading = document.querySelector('.buy-kitchen');
  startBtnEvents(btn, heading);
  $('.slick-gallery').on('afterChange', function(event, slick, currentSlide){
    btn = document.querySelector('.info-btn');
    heading = document.querySelector('.buy-kitchen');
    startBtnEvents(btn, heading);
  });

});
};
