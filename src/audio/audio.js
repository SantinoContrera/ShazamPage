export class AudioManager {
  constructor() {
    this.bgMusic = new Audio('references/sonido/musica_fondo.mp3');
    this.bgMusic.loop = true;
    this.bgMusic.volume = 0.45;

    this.nodeSfx = new Audio('references/sonido/nucleo_sonido.mp3');
    this.nodeSfx.volume = 0.75;

    this.eminemAudio = new Audio('references/sonido/eminem.mp3');
    this.eminemAudio.volume = 0.40;

    this.prayerInCAudio = new Audio('references/sonido/Prayer in C.mp3');
    this.prayerInCAudio.volume = 0.40;

    this.keshaAudio = new Audio('references/sonido/Kesha - TiK ToK.mp3');
    this.keshaAudio.volume = 0.40;

    this.gotyeAudio = new Audio('references/sonido/Gotye, Kimbra - Somebody That I Used To Know.mp3');
    this.gotyeAudio.volume = 0.40;

    this.isBgPlaying = false;
    this.savedBgTime = 0;

    this.isEminemPlaying = false;
    this.eminemListeners = new Set();

    this.isPrayerInCPlaying = false;
    this.prayerInCListeners = new Set();

    this.isKeshaPlaying = false;
    this.keshaListeners = new Set();

    this.isGotyePlaying = false;
    this.gotyeListeners = new Set();

    // Listen for track natural completions
    this.eminemAudio.addEventListener('ended', () => {
      console.log('🎤 Eminem Track ended naturally');
      this.stopEminemAudio();
    });

    this.prayerInCAudio.addEventListener('ended', () => {
      console.log('🎵 Prayer in C Track ended naturally');
      this.stopPrayerInCAudio();
    });

    this.keshaAudio.addEventListener('ended', () => {
      console.log('✨ Kesha Track ended naturally');
      this.stopKeshaAudio();
    });

    this.gotyeAudio.addEventListener('ended', () => {
      console.log('🎨 Gotye Track ended naturally');
      this.stopGotyeAudio();
    });
  }

  // Backward-compatible listener setters/getters
  set onEminemStateChange(fn) {
    if (typeof fn === 'function') this.eminemListeners.add(fn);
  }
  get onEminemStateChange() {
    return (isPlaying) => this.notifyEminem(isPlaying);
  }

  set onPrayerInCStateChange(fn) {
    if (typeof fn === 'function') this.prayerInCListeners.add(fn);
  }
  get onPrayerInCStateChange() {
    return (isPlaying) => this.notifyPrayerInC(isPlaying);
  }

  set onKeshaStateChange(fn) {
    if (typeof fn === 'function') this.keshaListeners.add(fn);
  }
  get onKeshaStateChange() {
    return (isPlaying) => this.notifyKesha(isPlaying);
  }

  set onGotyeStateChange(fn) {
    if (typeof fn === 'function') this.gotyeListeners.add(fn);
  }
  get onGotyeStateChange() {
    return (isPlaying) => this.notifyGotye(isPlaying);
  }

  notifyEminem(isPlaying) {
    this.eminemListeners.forEach((fn) => {
      try { fn(isPlaying); } catch (e) { console.error('Eminem listener err:', e); }
    });
  }

  notifyPrayerInC(isPlaying) {
    this.prayerInCListeners.forEach((fn) => {
      try { fn(isPlaying); } catch (e) { console.error('Prayer in C listener err:', e); }
    });
  }

  notifyKesha(isPlaying) {
    this.keshaListeners.forEach((fn) => {
      try { fn(isPlaying); } catch (e) { console.error('Kesha listener err:', e); }
    });
  }

  notifyGotye(isPlaying) {
    this.gotyeListeners.forEach((fn) => {
      try { fn(isPlaying); } catch (e) { console.error('Gotye listener err:', e); }
    });
  }

  /**
   * Stops all active interactive audio tracks except the specified one
   */
  stopAllInteractiveTracks(exceptId = null) {
    if (exceptId !== 'eminem' && this.isEminemPlaying) {
      if (this.eminemAudio) {
        this.eminemAudio.pause();
        this.eminemAudio.currentTime = 0;
      }
      this.isEminemPlaying = false;
      this.notifyEminem(false);
    }

    if (exceptId !== 'prayer' && this.isPrayerInCPlaying) {
      if (this.prayerInCAudio) {
        this.prayerInCAudio.pause();
        this.prayerInCAudio.currentTime = 0;
      }
      this.isPrayerInCPlaying = false;
      this.notifyPrayerInC(false);
    }

    if (exceptId !== 'kesha' && this.isKeshaPlaying) {
      if (this.keshaAudio) {
        this.keshaAudio.pause();
        this.keshaAudio.currentTime = 0;
      }
      this.isKeshaPlaying = false;
      this.notifyKesha(false);
    }

    if (exceptId !== 'gotye' && this.isGotyePlaying) {
      if (this.gotyeAudio) {
        this.gotyeAudio.pause();
        this.gotyeAudio.currentTime = 0;
      }
      this.isGotyePlaying = false;
      this.notifyGotye(false);
    }
  }

  /**
   * Helper to pause background music saving exact position
   */
  pauseBgMusicForInteractiveTrack() {
    if (this.bgMusic && !this.bgMusic.paused) {
      this.savedBgTime = this.bgMusic.currentTime;
      this.bgMusic.pause();
      this.isBgPlaying = false;
      console.log(`🎵 Background Music Paused at exact currentTime: ${this.savedBgTime.toFixed(2)}s`);
    } else if (this.bgMusic && this.bgMusic.currentTime > 0 && !this.isAnyInteractivePlaying()) {
      this.savedBgTime = this.bgMusic.currentTime;
    }
  }

  /**
   * Helper to resume background music if no interactive song is playing
   */
  resumeBgMusicIfNeeded() {
    if (this.isAnyInteractivePlaying()) return;

    if (this.bgMusic && !this.isBgPlaying && this.savedBgTime >= 0) {
      this.bgMusic.currentTime = this.savedBgTime;
      this.bgMusic.play().then(() => {
        this.isBgPlaying = true;
        console.log(`🎵 Background Music Resumed from exact currentTime: ${this.savedBgTime.toFixed(2)}s`);
      }).catch((err) => {
        console.warn('⚠️ Background music resume error:', err);
      });
    }
  }

  isAnyInteractivePlaying() {
    return this.isEminemPlaying || this.isPrayerInCPlaying || this.isKeshaPlaying || this.isGotyePlaying;
  }

  /**
   * Starts background music loop (satisfies browser autoplay requirement)
   */
  startBackgroundMusic() {
    if (this.isBgPlaying || this.isAnyInteractivePlaying()) return;

    this.bgMusic.play().then(() => {
      this.isBgPlaying = true;
      console.log('🎵 Background Music Loop Started');
    }).catch((err) => {
      console.warn('⚠️ Audio autoplay waiting for user interaction:', err);
    });
  }

  /**
   * Plays single-shot sound effect when clicking/navigating to a Nucleus (1, 2, 3, 4)
   */
  playNodeSfx() {
    if (!this.isBgPlaying && !this.isAnyInteractivePlaying()) {
      this.startBackgroundMusic();
    }

    try {
      this.nodeSfx.currentTime = 0;
      this.nodeSfx.play().catch((err) => {
        console.warn('⚠️ Node sound playback issue:', err);
      });
    } catch (e) {
      console.warn('⚠️ Node sound error:', e);
    }
  }

  // --- EMINEM TRACK ---
  playEminemAudio() {
    if (this.isEminemPlaying) return;
    this.stopAllInteractiveTracks('eminem');
    this.pauseBgMusicForInteractiveTrack();

    this.isEminemPlaying = true;
    if (this.eminemAudio.ended) {
      this.eminemAudio.currentTime = 0;
    }

    const attemptPlay = (audioSrc) => {
      if (audioSrc) this.eminemAudio.src = audioSrc;
      return this.eminemAudio.play();
    };

    attemptPlay().then(() => {
      console.log('🎤 Eminem Track Playing successfully');
      this.notifyEminem(true);
    }).catch((err) => {
      console.warn('⚠️ Eminem audio initial play failed, trying alternative paths:', err);
      attemptPlay('./REFERENCES/sonido/eminem.mp3').then(() => {
        console.log('🎤 Eminem Track Playing via ./REFERENCES/sonido/eminem.mp3');
        this.notifyEminem(true);
      }).catch((err2) => {
        attemptPlay('./references/sonido/eminem.mp3').then(() => {
          console.log('🎤 Eminem Track Playing via ./references/sonido/eminem.mp3');
          this.notifyEminem(true);
        }).catch((err3) => {
          console.error('❌ All Eminem audio playback attempts failed:', err3);
          this.isEminemPlaying = false;
          this.notifyEminem(false);
          this.resumeBgMusicIfNeeded();
        });
      });
    });
  }

  pauseEminemAudio() {
    if (!this.isEminemPlaying) return;
    this.eminemAudio.pause();
    this.isEminemPlaying = false;
    this.notifyEminem(false);
    this.resumeBgMusicIfNeeded();
  }

  toggleEminemAudio() {
    if (this.isEminemPlaying) {
      this.pauseEminemAudio();
    } else {
      this.playEminemAudio();
    }
  }

  stopEminemAudio() {
    if (this.eminemAudio) {
      this.eminemAudio.pause();
      this.eminemAudio.currentTime = 0;
    }
    this.isEminemPlaying = false;
    this.notifyEminem(false);
    this.resumeBgMusicIfNeeded();
  }

  cleanupNucleo2Audio() {
    this.stopAllInteractiveTracks();
  }

  // --- PRAYER IN C TRACK ---
  playPrayerInCAudio() {
    if (this.isPrayerInCPlaying) return;
    this.stopAllInteractiveTracks('prayer');
    this.pauseBgMusicForInteractiveTrack();

    this.isPrayerInCPlaying = true;
    if (this.prayerInCAudio.ended) {
      this.prayerInCAudio.currentTime = 0;
    }

    const attemptPlay = (audioSrc) => {
      if (audioSrc) this.prayerInCAudio.src = audioSrc;
      return this.prayerInCAudio.play();
    };

    attemptPlay().then(() => {
      console.log('🎵 Prayer in C Track Playing successfully');
      this.notifyPrayerInC(true);
    }).catch((err) => {
      console.warn('⚠️ Prayer in C initial play failed, trying alternative paths:', err);
      attemptPlay('./REFERENCES/sonido/Prayer in C.mp3').then(() => {
        console.log('🎵 Prayer in C Track Playing via ./REFERENCES/sonido/Prayer in C.mp3');
        this.notifyPrayerInC(true);
      }).catch((err2) => {
        attemptPlay('./references/sonido/Prayer in C.mp3').then(() => {
          console.log('🎵 Prayer in C Track Playing via ./references/sonido/Prayer in C.mp3');
          this.notifyPrayerInC(true);
        }).catch((err3) => {
          console.error('❌ All Prayer in C audio playback attempts failed:', err3);
          this.isPrayerInCPlaying = false;
          this.notifyPrayerInC(false);
          this.resumeBgMusicIfNeeded();
        });
      });
    });
  }

  pausePrayerInCAudio() {
    if (!this.isPrayerInCPlaying) return;
    this.prayerInCAudio.pause();
    this.isPrayerInCPlaying = false;
    this.notifyPrayerInC(false);
    this.resumeBgMusicIfNeeded();
  }

  togglePrayerInCAudio() {
    if (this.isPrayerInCPlaying) {
      this.pausePrayerInCAudio();
    } else {
      this.playPrayerInCAudio();
    }
  }

  stopPrayerInCAudio() {
    if (this.prayerInCAudio) {
      this.prayerInCAudio.pause();
      this.prayerInCAudio.currentTime = 0;
    }
    this.isPrayerInCPlaying = false;
    this.notifyPrayerInC(false);
    this.resumeBgMusicIfNeeded();
  }

  cleanupNucleo3Audio() {
    this.stopAllInteractiveTracks();
  }

  // --- KESHA TIK TOK TRACK ---
  playKeshaAudio() {
    if (this.isKeshaPlaying) return;
    this.stopAllInteractiveTracks('kesha');
    this.pauseBgMusicForInteractiveTrack();

    this.isKeshaPlaying = true;
    this.keshaAudio.currentTime = 0;

    const attemptPlay = (audioSrc) => {
      if (audioSrc) this.keshaAudio.src = audioSrc;
      return this.keshaAudio.play();
    };

    attemptPlay().then(() => {
      console.log('✨ Kesha Track Playing successfully');
      this.notifyKesha(true);
    }).catch((err) => {
      console.warn('⚠️ Kesha audio initial play failed, trying alternative paths:', err);
      attemptPlay('./references/sonido/Kesha - TiK ToK.mp3').then(() => {
        console.log('✨ Kesha Track Playing via ./references/sonido/Kesha - TiK ToK.mp3');
        this.notifyKesha(true);
      }).catch((err2) => {
        attemptPlay(encodeURI('references/sonido/Kesha - TiK ToK.mp3')).then(() => {
          console.log('✨ Kesha Track Playing via encodeURI');
          this.notifyKesha(true);
        }).catch((err3) => {
          console.error('❌ All Kesha audio playback attempts failed:', err3);
          this.isKeshaPlaying = false;
          this.notifyKesha(false);
          this.resumeBgMusicIfNeeded();
        });
      });
    });
  }

  pauseKeshaAudio() {
    if (!this.isKeshaPlaying) return;
    this.keshaAudio.pause();
    this.isKeshaPlaying = false;
    this.notifyKesha(false);
    this.resumeBgMusicIfNeeded();
  }

  toggleKeshaAudio() {
    if (this.isKeshaPlaying) {
      this.pauseKeshaAudio();
    } else {
      this.playKeshaAudio();
    }
  }

  stopKeshaAudio() {
    if (this.keshaAudio) {
      this.keshaAudio.pause();
      this.keshaAudio.currentTime = 0;
    }
    this.isKeshaPlaying = false;
    this.notifyKesha(false);
    this.resumeBgMusicIfNeeded();
  }

  // --- GOTYE TRACK ---
  playGotyeAudio() {
    if (this.isGotyePlaying) return;
    this.stopAllInteractiveTracks('gotye');
    this.pauseBgMusicForInteractiveTrack();

    this.isGotyePlaying = true;
    this.gotyeAudio.currentTime = 0;

    const attemptPlay = (audioSrc) => {
      if (audioSrc) this.gotyeAudio.src = audioSrc;
      return this.gotyeAudio.play();
    };

    attemptPlay().then(() => {
      console.log('🎨 Gotye Track Playing successfully');
      this.notifyGotye(true);
    }).catch((err) => {
      console.warn('⚠️ Gotye audio initial play failed, trying alternative paths:', err);
      attemptPlay('./references/sonido/Gotye, Kimbra - Somebody That I Used To Know.mp3').then(() => {
        console.log('🎨 Gotye Track Playing via ./references/sonido/Gotye...');
        this.notifyGotye(true);
      }).catch((err2) => {
        attemptPlay(encodeURI('references/sonido/Gotye, Kimbra - Somebody That I Used To Know.mp3')).then(() => {
          console.log('🎨 Gotye Track Playing via encodeURI');
          this.notifyGotye(true);
        }).catch((err3) => {
          console.error('❌ All Gotye audio playback attempts failed:', err3);
          this.isGotyePlaying = false;
          this.notifyGotye(false);
          this.resumeBgMusicIfNeeded();
        });
      });
    });
  }

  pauseGotyeAudio() {
    if (!this.isGotyePlaying) return;
    this.gotyeAudio.pause();
    this.isGotyePlaying = false;
    this.notifyGotye(false);
    this.resumeBgMusicIfNeeded();
  }

  toggleGotyeAudio() {
    if (this.isGotyePlaying) {
      this.pauseGotyeAudio();
    } else {
      this.playGotyeAudio();
    }
  }

  stopGotyeAudio() {
    if (this.gotyeAudio) {
      this.gotyeAudio.pause();
      this.gotyeAudio.currentTime = 0;
    }
    this.isGotyePlaying = false;
    this.notifyGotye(false);
    this.resumeBgMusicIfNeeded();
  }

  cleanupNucleo4Audio() {
    this.stopAllInteractiveTracks();
  }
}
