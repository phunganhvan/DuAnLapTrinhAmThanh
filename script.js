const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const stopBtn = document.getElementById("stop");
const speedControl = document.getElementById("speedControl");
const noiseToggle = document.getElementById("noiseToggle");
const echoToggle = document.getElementById("echoToggle");

let audioContext, sourceNode, gainNode, noiseNode, delayNode;
let isPlaying = false;

upload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      audio.src = url;
      audio.load();
      audio.style.display = "block";
      hasFile = true;
      setupAudioContext();
    }
  });

function setupAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    sourceNode = audioContext.createMediaElementSource(audio);
    gainNode = audioContext.createGain();
    delayNode = audioContext.createDelay();
    delayNode.delayTime.value = 0.2;

    sourceNode.connect(gainNode);
    gainNode.connect(audioContext.destination);
  }
}

function addNoise() {
  noiseNode = audioContext.createBufferSource();
  let buffer = audioContext.createBuffer(1, audioContext.sampleRate * 2, audioContext.sampleRate);
  let data = buffer.getChannelData(0);

  for (let i = 0; i < buffer.length; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  noiseNode.buffer = buffer;
  noiseNode.loop = true;
  const noiseGain = audioContext.createGain();
  noiseGain.gain.value = 0.02;

  noiseNode.connect(noiseGain);
  noiseGain.connect(audioContext.destination);
  noiseNode.start();
}

function removeNoise() {
  if (noiseNode) {
    noiseNode.stop();
    noiseNode.disconnect();
    noiseNode = null;
  }
}

function addEcho() {
  sourceNode.disconnect();
  sourceNode.connect(delayNode);
  delayNode.connect(audioContext.destination);
}

function removeEcho() {
  delayNode.disconnect();
  sourceNode.disconnect();
  sourceNode.connect(gainNode);
  gainNode.connect(audioContext.destination);
}

playBtn.addEventListener("click", () => {
  setupAudioContext();
  audio.play();
  isPlaying = true;
});

pauseBtn.addEventListener("click", () => {
  audio.pause();
});

stopBtn.addEventListener("click", () => {
  audio.pause();
  audio.currentTime = 0;
  removeNoise();
  removeEcho();
});

speedControl.addEventListener("input", (e) => {
  audio.playbackRate = parseFloat(e.target.value);
});

noiseToggle.addEventListener("change", (e) => {
  if (e.target.checked) {
    addNoise();
  } else {
    removeNoise();
  }
});

echoToggle.addEventListener("change", (e) => {
  if (e.target.checked) {
    addEcho();
  } else {
    removeEcho();
  }
});
