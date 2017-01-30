export default () =>
{
  const hamburger = document.querySelector('.hamburger'),
        nav = document.querySelector('.main-navigation'),
        navOverlay = document.querySelector('.nav-overlay'),
        navLinks = nav.getElementsByTagName('a');

    hamburger.addEventListener('click', function() {
      if (nav.classList.contains('main-navigation-show')) {
        nav.classList.remove('main-navigation-show');
        navOverlay.classList.remove('nav-overlay-show');
      } else {
        nav.classList.add('main-navigation-show');
        navOverlay.classList.add('nav-overlay-show');
      }
    });

    navOverlay.addEventListener("click", function(){
      nav.classList.remove('main-navigation-show');
      navOverlay.classList.remove('nav-overlay-show');
    });

    for(var i = 0; i <= navLinks.length - 1; i++)
    {
      navLinks[i].addEventListener("click", function(){
        nav.classList.remove('main-navigation-show');
        navOverlay.classList.remove('nav-overlay-show');
      });
    };
};
