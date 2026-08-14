(function () {
  var y = document.getElementById("y");
  if (y) y.textContent = String(new Date().getFullYear());

  function tickKairos() {
    var now = new Date();
    var moon = window.Sky
      ? (function () {
          var s = window.Sky.now(now);
          return { name: s.phase.name + " · " + s.lunaSign.name, illum: s.phase.illum };
        })()
      : { name: "Moon", illum: 0 };
    var timeEl = document.getElementById("kairos-time");
    var moonEl = document.getElementById("kairos-moon");
    var lightEl = document.getElementById("kairos-light");
    var lockEl = document.getElementById("kairos-lock");
    if (timeEl) {
      timeEl.textContent = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    }
    if (moonEl) {
      moonEl.textContent = moon.name + " · " + Math.round(moon.illum * 100) + "% lit";
    }
    if (lightEl) {
      lightEl.textContent = "1.28 light-seconds";
    }
    if (lockEl) {
      var day = now.getDay();
      lockEl.textContent = day === 1 ? "Monday lock is today." : day === 5 ? "Friday strip is today." : "The lock is the one you keep.";
    }
  }
  tickKairos();
  setInterval(tickKairos, 1000);
  if (window.JournalSky) {
    window.JournalSky.tick();
    setInterval(window.JournalSky.tick, 60000);
  }

  var orb = document.getElementById("orb");
  var orbWord = document.getElementById("orb-word");
  var breathBtn = document.getElementById("breath-toggle");
  var breathing = false;
  var breathTimer;
  var inhale = true;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function stepBreath() {
    if (!orb || !orbWord) return;
    if (inhale) {
      orb.classList.remove("exhale");
      orb.classList.add("inhale");
      orbWord.textContent = "in";
    } else {
      orb.classList.remove("inhale");
      orb.classList.add("exhale");
      orbWord.textContent = "out";
    }
    inhale = !inhale;
  }

  function startBreath() {
    breathing = true;
    if (breathBtn) {
      breathBtn.setAttribute("aria-pressed", "true");
      breathBtn.textContent = "Rest the breath";
    }
    inhale = true;
    stepBreath();
    var period = reduce ? 8000 : 5500;
    breathTimer = setInterval(stepBreath, period);
  }

  function stopBreath() {
    breathing = false;
    clearInterval(breathTimer);
    if (breathBtn) {
      breathBtn.setAttribute("aria-pressed", "false");
      breathBtn.textContent = "Begin coherence";
    }
    if (orbWord) orbWord.textContent = "still";
    if (orb) {
      orb.classList.remove("inhale");
      orb.classList.add("exhale");
    }
  }

  if (breathBtn) {
    breathBtn.addEventListener("click", function () {
      if (breathing) stopBreath();
      else startBreath();
    });
  }

  var audioCtx = null;
  var osc = null;
  var gain = null;
  var currentHz = null;

  function ensureAudio() {
    if (!audioCtx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AC();
    }
    if (audioCtx.state === "suspended") audioCtx.resume();
  }

  function stopTone() {
    if (gain && osc && audioCtx) {
      var t = audioCtx.currentTime;
      gain.gain.cancelScheduledValues(t);
      gain.gain.setValueAtTime(gain.gain.value, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
      osc.stop(t + 0.28);
    }
    osc = null;
    gain = null;
    currentHz = null;
    document.querySelectorAll(".hz-grid button").forEach(function (b) {
      b.setAttribute("aria-pressed", "false");
    });
    var label = document.getElementById("tone-now");
    if (label) label.textContent = "Silent. Sound is a choice.";
  }

  function playTone(hz, name, btn) {
    ensureAudio();
    if (currentHz === hz) {
      stopTone();
      return;
    }
    stopTone();
    osc = audioCtx.createOscillator();
    gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.value = hz;
    var t = audioCtx.currentTime;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.06, t + 0.4);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    currentHz = hz;
    if (btn) btn.setAttribute("aria-pressed", "true");
    var label = document.getElementById("tone-now");
    if (label) label.textContent = name + " · " + hz + " Hz";
  }

  document.querySelectorAll(".hz-grid button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var hz = parseFloat(btn.getAttribute("data-hz"));
      var name = btn.getAttribute("data-name");
      playTone(hz, name, btn);
    });
  });

  var silence = document.getElementById("tone-stop");
  if (silence) silence.addEventListener("click", stopTone);
})();
