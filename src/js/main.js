import init from './partials/init'
//import { removeError } from './partials/remove-error';
const initAll = init();

function removeError(element) {
  element.classList.remove('error');
};
