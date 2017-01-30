import $ from 'jquery';
import slick from 'slick-carousel';
export default () => {
  $(document).ready(function(){
    $('.slick-gallery').slick({
      autoplay: false,
      arrows: false,
      centerMode: false,
      dots: true,
      mobileFirst: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      lazyLoad: 'ondemand',

      responsive: [
      {
        breakpoint: 760,
        settings: {
          arrows: true,
          dots: false
        }
      },
      {
        breakpoint: 1200,
        settings: {
          arrows: true,
          dots: false
        }
      }
    ]
    });
  });

   $(document).ready(function(){
    $('.slick-reviews').slick({
      autoplay: false,
      arrows: true,
      centerMode: false,
      dots: false,
      mobileFirst: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      lazyLoad: 'ondemand',

      responsive: [
      {
        breakpoint: 760,
        settings: {
          arrows: true,
          dots: false
        }
      },
      {
        breakpoint: 1200,
        settings: {
          arrows: true,
          dots: false
        }
      }
    ]
    });
  });
}
