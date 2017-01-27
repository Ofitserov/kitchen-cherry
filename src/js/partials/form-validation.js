//;(function(){
const headerForm = document.getElementById('header-form');
const callBackForm = document.getElementById('call-back');
const fileForm = document.getElementById('file-form');
const modalForm = document.getElementById('modal-form');
const modalSuccess = document.querySelector('.modal-success');
const modalSuccessClose = document.querySelector('.modal-success-close');
const overlay = document.querySelector('.modal-overlay');
const modalContent = document.querySelector('.modal-content');
const myFileInput = document.getElementById('myfile');
const labelFile = document.querySelector('.file');


function isValid(form) {
    var errors = [];
    var arr = form.elements;
    for(var i = 0; i <= arr.length - 1; i++)
    {
      if (arr[i].nodeName === "INPUT" )
      {
        //no empty value
        if (!(arr[i]).value && arr[i].type !== 'file')
        {
          errors[errors.length] = 'i am error';
          showError(arr[i]);
        }
        // telephone check
        if (arr[i].type === 'tel' && arr[i].value)
        {
          if(arr[i].value.match(/^[0-9\+\-\(\)\s]+$/) === null || arr[i].value.length < 7)
          {
          showError(arr[i]);
            errors[errors.length] = 'i am error';
          }
        }
        // file check
        if (arr[i].type === 'file' && arr[i].value)
        {
          if (arr[i].files[0].size > 5000000)
          {
            showError(labelFile);
            errors[errors.length] = 'i am error';
          }
        }
      }
    }
    return errors.length === 0;
}

function removeError(element) {
   element.classList.remove('error');
}

function showError(element) {
  element.classList.add('error');
  element.classList.add('shake-error');
  setTimeout(function(){
    element.classList.remove("shake-error");
  }, 600);
}

function sendData(form, phpfile) {
  const data = $(form).serialize();
  console.log(data);
  $.ajax({
    type: 'POST',
    url: 'php/' + phpfile,
    data: data,
    success: successModal(form),
  });
}
function sendDataFile(form, phpfile) {
  var fd = new FormData;
  fd.append('username', form.elements.username.value);
  fd.append('userphone', form.elements.userphone.value);
  fd.append('file', myFileInput.files[0]);
  $.ajax({
    type: 'POST',
    processData: false,
    contentType: false,
    url: 'php/'+ phpfile,
    data: fd,
    success: successModal(form),
  });
}

function successModal(form) {
  overlay.classList.add('modal-overlay-show');
  modalSuccess.classList.add('modal-success-show');
  clearValue(form);
}

function clearValue(form) {
  var arr = form.elements;
  for(var i = 0; i <= arr.length - 1; i++)
  {
    if(arr[i].value)
    {
      arr[i].value = '';
    }
  }
}

// events
headerForm.addEventListener("submit", function(e){
  e.preventDefault();
  if(isValid(this)) {
      sendData(this, 'mail.php');
  }
});

callBackForm.addEventListener("submit", function(e){
  e.preventDefault();
  if(isValid(this)) {
      sendData(this, 'mail.php');
  }
});

fileForm.addEventListener("submit", function(e){
  e.preventDefault();
  if(isValid(this)) {
      sendDataFile(this, 'mailfile.php');
  }
});

modalForm.addEventListener("submit", function(e){
  e.preventDefault();
  if(isValid(this)) {
      sendData(this, 'mail.php');
      modalContent.classList.remove("modal-content-show");
  }
});
// close SucceessModal
modalSuccessClose.addEventListener("click", function(event){
	event.preventDefault();
	modalSuccess.classList.remove("modal-success-show");
	overlay.classList.remove("modal-overlay-show");

});
// remove overlay
overlay.addEventListener("click", function(event){
	event.preventDefault();
	modalSuccess.classList.remove("modal-success-show");
	overlay.classList.remove("modal-overlay-show");
  modalContent.classList.remove("modal-content-show");

});
//})();
