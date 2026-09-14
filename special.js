// The last photo ends at about 29 seconds. Then the special words appear.
const photoSection = document.querySelector('#photoArea');
const wordsSection = document.querySelector('#specialWords');
const photoDuration = 30000;

setTimeout(() => {
  photoSection.hidden = true;
  wordsSection.hidden = false;
}, photoDuration);
