import lottie from 'lottie-web'
import animationData from './lottie.json'
import Countdown from './countdown'

const container = document.querySelector("#demo");

const item = lottie.loadAnimation({
  container, // the dom element that will contain the animation
  renderer: 'svg',
  loop: false,
  autoplay: false,
  animationData: animationData, // the path to the animation json

});

item.setSpeed(item.getDuration() / 3);

item.play()
// item.goToAndStop(10, true);
// item.goToAndStop(item.totalFrames, true);

item.addEventListener('DOMLoaded', () => {
  setTotalCountDown()
  startCountDown();
});

function setTotalCountDown() {
  const countDownTip = container.querySelector('#Paymentwithin30min') as SVGAElement;
  countDownTip.innerHTML = `<text text-anchor="middle">Payment within 30mins</text>`
}

function startCountDown () {
  new Countdown({
    total: 29 * 60 * 1000,
    onCountdown: (({remainingCount}) => {
      console.log(remainingCount);
      const countText = new Date(remainingCount * 1000).toISOString().replace(/.+T\d+?:(.+?)\.\d+?Z/, '$1');
      container.querySelector('#Countdown').innerHTML = `<text x="-13" font-weight="bold" text-anchor="left">${countText}</text>`;
    })
  })
}