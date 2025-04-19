const audio = document.getElementById("audio");
let audioContext, sourceNode, delayNode, noiseNode, noiseGain;

// Khởi tạo AudioContext và các node xử lý khi người dùng bắt đầu play
audio.addEventListener("play", () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    sourceNode = audioContext.createMediaElementSource(audio);

    // Echo effect
    delayNode = audioContext.createDelay();
    delayNode.delayTime.value = 0.25;

    // White noise effect
    const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 2, audioContext.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < buffer.length; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    noiseNode = audioContext.createBufferSource();
    noiseNode.buffer = buffer;
    noiseNode.loop = true;

    noiseGain = audioContext.createGain();
    noiseGain.gain.value = 0.01;

    noiseNode.connect(noiseGain);
    noiseGain.connect(audioContext.destination);

    // Kết nối chuỗi: source → delay → output
    sourceNode.connect(delayNode);
    delayNode.connect(audioContext.destination);

    // Đồng thời kết nối trực tiếp để nghe âm thanh gốc
    sourceNode.connect(audioContext.destination);
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  if (noiseNode && noiseContextStopped) {
    noiseNode.start();
    noiseContextStopped = false;
  }
  try {
    noiseNode.start();
  } catch (e) {
    // đã chạy rồi
  }
});

// Khi pause hoặc dừng thì tắt hiệu ứng
audio.addEventListener("pause", () => {
  if (noiseNode) {
    try {
      noiseNode.stop();
    } catch (e) {}
    noiseNode.disconnect();
    noiseGain.disconnect();
    noiseNode = null;
  }
});
