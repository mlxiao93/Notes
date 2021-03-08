import lottie from 'lottie-web'
import animationData from './lottie.json'


lottie.loadAnimation({
  container: document.querySelector("#demo"), // the dom element that will contain the animation
  renderer: 'svg',
  loop: true,
  autoplay: true,
  animationData: animationData // the path to the animation json
});