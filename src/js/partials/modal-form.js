;(function(){
const link = document.querySelector('.order-btn-cooperation');
const modalContent = document.querySelector('.modal-content');
const close = document.querySelector('.modal-content-close');
const overlay = document.querySelector('.modal-overlay');


link.addEventListener("click", function(event){
	event.preventDefault();
	modalContent.classList.add("modal-content-show");
	overlay.classList.add("modal-overlay-show");

});

close.addEventListener("click", function(event){
	event.preventDefault();
	modalContent.classList.remove("modal-content-show");
	overlay.classList.remove("modal-overlay-show");

});

overlay.addEventListener("click", function(event){
	event.preventDefault();
	overlay.classList.remove("modal-overlay-show");
  modalContent.classList.remove("modal-content-show");
  
});
})();
