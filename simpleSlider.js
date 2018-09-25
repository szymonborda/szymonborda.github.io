function simpleSlider (className, paths) {
  var currentSlide = 1;
  document.getElementsByClassName(className)[0].style.backgroundImage = 'url("' + paths[0] + '")';

  setInterval(function () {
    document.getElementsByClassName(className)[0].style.backgroundImage = 'url("' + paths[currentSlide] + '")';
    if (currentSlide != paths.length - 1) {
      currentSlide++;
    } else {
      currentSlide = 0;
    }
  }, 4000);
}
