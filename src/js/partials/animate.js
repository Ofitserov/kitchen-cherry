import { InView, isInView } from 'inview';
export default () => {
  const elems = document.querySelectorAll('.animate');
  const animations = [ 'bounceInDown', 'bounceInLeft', 'bounceInRight', 'bounceInLeft', 'bounceInRight', 'bounceInUp' ];
  for (let i = 0; i <= elems.length - 1; i++) {
    InView(elems[i], (isInView) => {
      if (isInView) {
        elems[i].classList.add(animations[i] ,'animated');
      };
    });
  };
};
