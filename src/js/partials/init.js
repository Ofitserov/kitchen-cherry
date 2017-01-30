import scrollingToAnchor from './scrolling-to-anchor';
import burgerNav from './burger-nav';
import modalForm from './modal-form';
import sendData from './send-data';
import removeError from './remove-error';
import slick from './slick';
import { WOW } from 'wowjs';


export default () => {
 const initScrollingToAnchor = scrollingToAnchor();
 const initBurgerNav = burgerNav();
 const initModalForm = modalForm();
 const initSendData = sendData();
 const initRemoveError = removeError();
 const initSlick = slick();
 const wow = new WOW().init();
}
