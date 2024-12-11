chrome.runtime.onMessage.addListener((response) => {
  switch (response.signal) {
    case 'play':
      playAudio(response.soundNumber)
      break;
  }
});

function playAudio(soundNumber) {
  const audio = new Audio('sounds/' + soundNumber + '.mp3');
  audio.play();
}
