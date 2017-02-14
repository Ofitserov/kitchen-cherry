import $ from 'jquery';
import slick from 'slick-carousel';
import { kitchenData } from './kitchen-data';

export default () => {
  const getKitchenIndex = (currentSlideName) => {
    let result;
    kitchenData.forEach((item, i) => {
      if (item.name === currentSlideName) {
        result = i;
      }
    });
  return result;
  };

  const showData = (kitchen) => {
    if (!kitchen ) {
      document.querySelector('.kitchen-info').innerHTML = '';
  //    console.log('no kitchen description');
    } else {
      document.querySelector('.kitchen-info').innerHTML = `<h3 class="buy-kitchen"> Кухня ${ kitchen.name } <span class="info-btn"></span> </h3>
                                                          <div> размер кухни: ${ kitchen.size } </div>
                                                          <div> фасады верх: ${ kitchen.topFasad } </div>
                                                          <div> фасады низ: ${ kitchen.bottomFasad } </div>
                                                          <div> РЕАЛЬНАЯ цена: <span class="price"> ${ kitchen.price } </span></div>`;
            }
  };

$(document).ready(function(){
  let currentSlideName = document.querySelector('.slick-current').getAttribute('name') ? document.querySelector('.slick-current').getAttribute('name') : 'noSlideName';
  const kitchen = kitchenData[getKitchenIndex(currentSlideName)];
//  console.log(currentSlideName);
//  console.log(getKitchenIndex(currentSlideName));
  showData(kitchen);

  $('.slick-gallery').on('afterChange', function(event, slick, currentSlide){
    currentSlideName = document.querySelector('.slick-current').getAttribute('name') ? document.querySelector('.slick-current').getAttribute('name') : 'noSlideName';
  //  console.log(currentSlideName);
  //  console.log(getKitchenIndex(currentSlideName));
    showData(kitchenData[getKitchenIndex(currentSlideName)]);

  });
});

}
