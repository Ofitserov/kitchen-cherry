import scrollingToAnchor from './scrolling-to-anchor';
import burgerNav from './burger-nav';
import modalForm from './modal-form';
import sendData from './send-data';
import removeError from './remove-error';
import slick from './slick';
import animate from './animate';
import kitchenInfo from './kitchen-info';
import infoBtn from './info-btn';

export default () => {
 const initScrollingToAnchor = scrollingToAnchor();
 const initBurgerNav = burgerNav();
 const initModalForm = modalForm();
 const initSendData = sendData();
 const initRemoveError = removeError();
 const initSlick = slick();
 const initAnimate = animate();
 const initKitchenInfo = kitchenInfo();
 const initInfoBtn = infoBtn();
}
