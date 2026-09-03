const AUDIO_BASE = `${import.meta.env.BASE_URL}assets/audio/`;

class AudioManagerClass {
  constructor() {
    this.backgroundMusic = null;
    this.backgroundVolume = 0.12;
    this.sfxVolume = 0.38;
    this.speechEnabled = true;
    this._preferredVoice = null;
    this._voicesReady = false;
    this._speechRequestId = 0;

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        this._preferredVoice = this._pickEnglishVoice(voices);
        this._voicesReady = voices.length > 0;
      };
      loadVoices();
      window.speechSynthesis.addEventListener?.('voiceschanged', loadVoices);
    }
  }

  _createAudio(file) {
    const audio = new Audio(`${AUDIO_BASE}${file}`);
    audio.preload = 'auto';
    return audio;
  }

  playSfx(file, volume = this.sfxVolume) {
    try {
      const audio = this._createAudio(file);
      audio.volume = volume;
      const promise = audio.play();
      if (promise?.catch) promise.catch(() => {});
    } catch (_) {}
  }

  playBackgroundMusic() {
    if (!this.backgroundMusic) {
      this.backgroundMusic = this._createAudio('background_music.wav');
      this.backgroundMusic.loop = true;
      this.backgroundMusic.volume = this.backgroundVolume;
    }
    if (this.backgroundMusic.paused) {
      const promise = this.backgroundMusic.play();
      if (promise?.catch) promise.catch(() => {});
    }
  }

  stopBackgroundMusic() {
    if (!this.backgroundMusic) return;
    this.backgroundMusic.pause();
    this.backgroundMusic.currentTime = 0;
  }

  stopSpeech() {
    // Invalidate any speech that is queued by our short reliability delay.
    this._speechRequestId++;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  _pickEnglishVoice(voices) {
    const english = voices.filter((voice) => /^en(-|_)/i.test(voice.lang || ''));
    if (!english.length) return null;

    return (
      english.find((voice) => /en-US/i.test(voice.lang) && /Google US English|Microsoft|Samantha|Natural|Jenny|Aria/i.test(voice.name)) ||
      english.find((voice) => /en-US/i.test(voice.lang)) ||
      english[0]
    );
  }

  speak(text) {
    if (!this.speechEnabled || !text || typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const synth = window.speechSynthesis;
    const requestId = ++this._speechRequestId;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(String(text).trim());
    utterance.lang = 'en-US';
    utterance.rate = 0.78;
    utterance.pitch = 1;
    utterance.volume = 1;

    if (!this._preferredVoice) {
      this._preferredVoice = this._pickEnglishVoice(synth.getVoices());
    }
    if (this._preferredVoice) {
      utterance.voice = this._preferredVoice;
      utterance.lang = this._preferredVoice.lang || 'en-US';
    }

    // A tiny delay makes speech more reliable in browsers that need a fresh
    // speech-synthesis task after cancelling a previous utterance.
    setTimeout(() => {
      // Do not start a speech request that was cancelled while waiting.
      if (requestId !== this._speechRequestId) return;
      try {
        synth.speak(utterance);
      } catch (_) {}
    }, 30);
  }

  speakNames(names) {
    const validNames = (names || []).filter(Boolean).map((name) => String(name).trim());
    if (!validNames.length) return;
    let phrase = validNames[0];
    if (validNames.length === 2) phrase = `${validNames[0]} and ${validNames[1]}`;
    if (validNames.length > 2) phrase = `${validNames.slice(0, -1).join(', ')}, and ${validNames[validNames.length - 1]}`;
    this.speak(phrase);
  }
}

export const AudioManager = new AudioManagerClass();
