(function (global) {
  var PHASE = {
    new: {
      vibe: "Dark room. Seed, not show. The sky is a closed fist around a beginning.",
      focus: "Name one thing that wants to exist but has no audience yet.",
      release: "Release the need to be mid-cycle. You are allowed to be unlit.",
      intention: "I plant one true sentence and do not ask it to bloom tonight.",
      prompts: [
        "What am I willing to begin without witnesses?",
        "Which old story am I done rehearsing in the dark?",
        "If this cycle had one honest job, what would it be?"
      ]
    },
    waxing_crescent: {
      vibe: "A thin blade of light. Tend, don't perform.",
      focus: "Give the seed a condition: time, tool, or ally.",
      release: "Release the fantasy that it should already look like a harvest.",
      intention: "I add one real hour to what I planted.",
      prompts: [
        "What does this beginning need from me this week that is not more thinking?",
        "Where am I still hiding the work because it is small?",
        "Who can hold this with me without turning it into a brand?"
      ]
    },
    first_quarter: {
      vibe: "Half the face is decision. Friction is information.",
      focus: "Choose the next locked action. Not the whole mountain.",
      release: "Release the second plan that exists only to avoid the first.",
      intention: "I meet the resistance as a teacher, not a verdict.",
      prompts: [
        "What am I postponing that a Monday lock would settle?",
        "Where is the obstacle actually a boundary I needed?",
        "If I could only keep one commitment until full, which?"
      ]
    },
    waxing_gibbous: {
      vibe: "Almost-full. Refine. The light is greedy — stay precise.",
      focus: "Edit the work. Sharpen the ask. Prepare the reveal.",
      release: "Release extra orbits. Complexity is not devotion.",
      intention: "I finish the last honest 10%.",
      prompts: [
        "What still needs cutting so the true thing can be seen?",
        "Where have I been polishing instead of shipping?",
        "What would 'good enough to lock' look like by Friday?"
      ]
    },
    full: {
      vibe: "The whole disk. See it. Be seen. Do not add more light than the work can hold.",
      focus: "Witness what actually grew. Name it without inflating it.",
      release: "Release the mask you wore to get this far.",
      intention: "I tell the truth about this cycle, including the unpretty part.",
      prompts: [
        "What is unmistakably alive that I have been minimizing?",
        "What did this brightness cost my nervous system?",
        "Who needs to hear the real result, not the story?"
      ]
    },
    waning_gibbous: {
      vibe: "The gift after the peak. Teach, share, compost the surplus.",
      focus: "Offer what you learned. Keep what still feeds you.",
      release: "Release the climax. The work continues in a quieter register.",
      intention: "I give away one insight and keep one boundary.",
      prompts: [
        "What from this peak belongs to other people now?",
        "What praise or panic am I still metabolizing?",
        "How do I thank the cycle without clinging to it?"
      ]
    },
    last_quarter: {
      vibe: "Half-dark again. Cut the cord with kindness.",
      focus: "Close accounts. End a loop. Make room.",
      release: "Release the identity that only worked at full.",
      intention: "I complete or compost. I do not carry dead weight into the dark.",
      prompts: [
        "What am I done being loyal to?",
        "Which obligation was a season, not a vow?",
        "What would a clean ending look like this week?"
      ]
    },
    waning_crescent: {
      vibe: "A last sliver. Rest is a skill. The next new is already leaning in.",
      focus: "Sleep, water, silence. Empty the desk.",
      release: "Release the need to be useful every hour.",
      intention: "I rest as if the next seed depends on it — because it does.",
      prompts: [
        "What does my body know that my calendar is ignoring?",
        "Where can I be unfinished without apology?",
        "What do I want to be empty of before the next new moon?"
      ]
    }
  };

  var LUNA_HOUSE = {
    aries: {
      vibe: "Luna in Aries — heat in the chest. Beginnings want a pulse, not a committee.",
      color: "Courage first. Small brave acts over perfect maps."
    },
    taurus: {
      vibe: "Luna in Taurus — the body is the altar. Slow is not stuck.",
      color: "Worth, food, money, land. Make the life thicker, not louder."
    },
    gemini: {
      vibe: "Luna in Gemini — two windows open. Language is a tool; gossip is a leak.",
      color: "Name it clearly. Ask the second question."
    },
    cancer: {
      vibe: "Luna at home in Cancer — the tide comes into the kitchen.",
      color: "Shelter, kin, the night shift of care. Feed what you want to keep."
    },
    leo: {
      vibe: "Luna in Leo — the heart wants a stage and a witness.",
      color: "Offer warmth without performing your wound."
    },
    virgo: {
      vibe: "Luna in Virgo — devotion looks like a clean instrument.",
      color: "Serve the real problem. Skip the self-scolding."
    },
    libra: {
      vibe: "Luna in Libra — the room wants balance, not people-pleasing.",
      color: "Beauty as justice. One honest conversation over ten polite ones."
    },
    scorpio: {
      vibe: "Luna in Scorpio — the underworld has office hours.",
      color: "Go to the true depth. Leave the drama that only looks deep."
    },
    sagittarius: {
      vibe: "Luna in Sagittarius — horizon hunger. Meaning wants air.",
      color: "A bigger why. A walk. A promise you can actually keep off-world."
    },
    capricorn: {
      vibe: "Luna in Capricorn — the mountain does not care about your mood. It will hold your work.",
      color: "Structure as love. Lock the hour. Climb once."
    },
    aquarius: {
      vibe: "Luna in Aquarius — the future sits down at the table like a shy guest.",
      color: "The we, not the brand. Liberate one person including you."
    },
    pisces: {
      vibe: "Luna in Pisces — the membrane is thin. Music, mercy, sleep.",
      color: "Let the dream speak. Then give it one earthbound next step."
    }
  };

  var MARS_HOUSE = {
    aries: {
      vibe: "Mars in his own fire. New Martians move first and file the report later.",
      settler: "Initiative is the air mix. Check that courage is not just adrenaline."
    },
    taurus: {
      vibe: "Mars in Taurus — the push is tectonic. Slow force, real mass.",
      settler: "Build habitat, not headlines. The soil will not be rushed."
    },
    gemini: {
      vibe: "Mars in Gemini — two radios, one will. Words are propulsion.",
      settler: "Split tasks cleanly. Do not split the crew."
    },
    cancer: {
      vibe: "Mars in Cancer — defend the nest. Mood is a weather system.",
      settler: "Protect the commons. Anger here is often homesickness in a suit."
    },
    leo: {
      vibe: "Mars in Leo — pride as fuel. The settlement wants a story it can stand in.",
      settler: "Lead by doing the hot job. Leave the throne empty if you must."
    },
    virgo: {
      vibe: "Mars in Virgo — the fight is with error bars and dust in the filter.",
      settler: "Maintenance is heroism. Fix the small leak before the speech."
    },
    libra: {
      vibe: "Mars in Libra — conflict wants a table, not a crater.",
      settler: "Negotiate the air, the hours, the fairness. Charm is not consent."
    },
    scorpio: {
      vibe: "Mars in Scorpio — all-in or not at all. Secrets have mass.",
      settler: "Trust is infrastructure. Betrayal here costs more than delta-v."
    },
    sagittarius: {
      vibe: "Mars in Sagittarius — the rover wants the next ridge.",
      settler: "Explore with a return plan. Belief without ISRU is a sermon."
    },
    capricorn: {
      vibe: "Mars in Capricorn — command climate. Ambition with a hard hat.",
      settler: "Cadence, contracts, night shift. Build a ladder someone else can climb."
    },
    aquarius: {
      vibe: "Mars in Aquarius — the revolution is a network.",
      settler: "Hack the system for the crew, not the myth of the lone genius."
    },
    pisces: {
      vibe: "Mars in Pisces — will dissolves into compassion or fog. Pick.",
      settler: "Serve the tired. Then put the dream in a checklist so it survives sol."
    }
  };

  function fmtDeg(d) {
    var x = Math.max(0, d);
    var deg = Math.floor(x);
    var min = Math.floor((x - deg) * 60);
    return deg + "° " + (min < 10 ? "0" : "") + min + "′";
  }

  function moonMoonLine(m) {
    var side = m.dayside
      ? "over Mars’s dayside — a fast bright needle"
      : "in Mars’s night — a dim stitch across the dark";
    var h = m.hoursToLap;
    var when = h < 1
      ? Math.round(h * 60) + " minutes to lap"
      : h.toFixed(1) + " hours to complete this lap";
    return m.name + " is " + Math.round(m.frac * 100) + "% through a " +
      (m.periodHours < 10 ? "7h 39m" : "30h 18m") + " orbit, " + side +
      ". " + when + ".";
  }

  function lunaOnMars(sky) {
    var phase = sky.phase.name.toLowerCase();
    var ls = sky.lunaSign.name;
    return "From the new Martian floor, Luna is not a calendar — she is a distant silver coin in a butterscotch sky, " +
      phase + " in the house of " + ls + ". " +
      "Her pull on Mars is a whisper (tides here are a rounding error). The influence is human: she sets the emotional weather the crew imported from Earth. " +
      "Tonight that weather is " + sky.aspect + ".";
  }

  function render(sky) {
    var p = PHASE[sky.phase.key];
    var lh = LUNA_HOUSE[sky.lunaSign.key];
    var mh = MARS_HOUSE[sky.marsSign.key];
    if (!p || !lh || !mh) return;

    function set(id, text) {
      var el = document.getElementById(id);
      if (el) el.textContent = text;
    }

    set("luna-phase-name", sky.phase.name);
    set("luna-phase-lit", Math.round(sky.phase.illum * 100) + "% illuminated");
    set("luna-house", sky.lunaSign.glyph + " " + sky.lunaSign.name);
    set("luna-house-deg", fmtDeg(sky.lunaSign.degInSign) + " · tropical · " + sky.lunaSign.element + " / " + sky.lunaSign.modality);
    set("luna-vibe", lh.vibe);
    set("luna-vibe-color", lh.color);
    set("luna-focus", p.focus);
    set("luna-release", p.release);
    set("luna-intention", p.intention);
    set("luna-phase-vibe", p.vibe);

    var list = document.getElementById("luna-prompts");
    if (list) {
      list.innerHTML = "";
      p.prompts.forEach(function (q) {
        var li = document.createElement("li");
        li.textContent = q;
        list.appendChild(li);
      });
      var extra = document.createElement("li");
      extra.textContent = "Luna is in " + sky.lunaSign.name + ". " + lh.color + " How does that color the answer above?";
      list.appendChild(extra);
    }

    set("mars-house", sky.marsSign.glyph + " " + sky.marsSign.name);
    set("mars-house-deg", fmtDeg(sky.marsSign.degInSign) + " · tropical · " + sky.marsDistAu.toFixed(2) + " AU from Earth");
    set("mars-vibe", mh.vibe);
    set("mars-settler", mh.settler);
    set("mars-luna", lunaOnMars(sky));
    set("phobos-line", moonMoonLine(sky.phobos));
    set("deimos-line", moonMoonLine(sky.deimos));
    set("mars-aspect", sky.aspect);

    var stamp = document.getElementById("sky-stamp");
    if (stamp) {
      stamp.textContent = "Live tropical ecliptic · updated " +
        sky.date.toLocaleString([], { dateStyle: "medium", timeStyle: "short" }) +
        " · Meeus-class, not an observatory";
    }

    var km = document.getElementById("kairos-moon");
    if (km) {
      km.textContent = sky.phase.name + " · " + Math.round(sky.phase.illum * 100) + "% lit · " + sky.lunaSign.name;
    }
  }

  function tick() {
    if (!global.Sky) return;
    render(global.Sky.now(new Date()));
  }

  global.JournalSky = { render: render, tick: tick, PHASE: PHASE };
})(window);
