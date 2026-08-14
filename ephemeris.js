/* Live tropical ecliptic positions. Meeus-style, good to ~0.3–1° — enough for sign weather, not landing. */
(function (global) {
  var SIGNS = [
    { key: "aries", name: "Aries", glyph: "♈", element: "fire", modality: "cardinal" },
    { key: "taurus", name: "Taurus", glyph: "♉", element: "earth", modality: "fixed" },
    { key: "gemini", name: "Gemini", glyph: "♊", element: "air", modality: "mutable" },
    { key: "cancer", name: "Cancer", glyph: "♋", element: "water", modality: "cardinal" },
    { key: "leo", name: "Leo", glyph: "♌", element: "fire", modality: "fixed" },
    { key: "virgo", name: "Virgo", glyph: "♍", element: "earth", modality: "mutable" },
    { key: "libra", name: "Libra", glyph: "♎", element: "air", modality: "cardinal" },
    { key: "scorpio", name: "Scorpio", glyph: "♏", element: "water", modality: "fixed" },
    { key: "sagittarius", name: "Sagittarius", glyph: "♐", element: "fire", modality: "mutable" },
    { key: "capricorn", name: "Capricorn", glyph: "♑", element: "earth", modality: "cardinal" },
    { key: "aquarius", name: "Aquarius", glyph: "♒", element: "air", modality: "fixed" },
    { key: "pisces", name: "Pisces", glyph: "♓", element: "water", modality: "mutable" }
  ];

  function deg(x) { return x * 180 / Math.PI; }
  function rad(x) { return x * Math.PI / 180; }
  function wrap(d) { d = d % 360; return d < 0 ? d + 360 : d; }
  function sind(d) { return Math.sin(rad(d)); }
  function cosd(d) { return Math.cos(rad(d)); }

  function julianDate(date) {
    return date.getTime() / 86400000 + 2440587.5;
  }

  function centuries(jd) {
    return (jd - 2451545.0) / 36525;
  }

  function signFromLon(lon) {
    var i = Math.floor(wrap(lon) / 30) % 12;
    var s = SIGNS[i];
    var degIn = wrap(lon) - i * 30;
    return {
      index: i,
      key: s.key,
      name: s.name,
      glyph: s.glyph,
      element: s.element,
      modality: s.modality,
      degInSign: degIn,
      lon: wrap(lon)
    };
  }

  function kepler(M, e) {
    M = rad(wrap(M));
    var E = M;
    for (var i = 0; i < 12; i++) {
      E = E - (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
    }
    return E;
  }

  function trueAnomaly(M, e) {
    var E = kepler(M, e);
    var v = 2 * Math.atan2(Math.sqrt(1 + e) * Math.sin(E / 2), Math.sqrt(1 - e) * Math.cos(E / 2));
    return wrap(deg(v));
  }

  function sunLon(T) {
    var L0 = wrap(280.46646 + 36000.76983 * T + 0.0003032 * T * T);
    var M = wrap(357.52911 + 35999.05029 * T - 0.0001537 * T * T);
    var C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * sind(M)
      + (0.019993 - 0.000101 * T) * sind(2 * M)
      + 0.000289 * sind(3 * M);
    return wrap(L0 + C);
  }

  function moonLon(T) {
    var Lp = 218.3164477 + 481267.88123421 * T - 0.0015786 * T * T + T * T * T / 538841 - T * T * T * T / 65194000;
    var D = 297.8501921 + 445267.1114034 * T - 0.0018819 * T * T + T * T * T / 545868 - T * T * T * T / 113065000;
    var M = 357.5291092 + 35999.0502909 * T - 0.0001536 * T * T + T * T * T / 24490000;
    var Mp = 134.9633964 + 477198.8675055 * T + 0.0087414 * T * T + T * T * T / 69699 - T * T * T * T / 14712000;
    var F = 93.2720950 + 483202.0175233 * T - 0.0036539 * T * T - T * T * T / 3526000 + T * T * T * T / 863310000;
    var E = 1 - 0.002516 * T - 0.0000074 * T * T;
    var sl = 0;
    sl += 6288774 * sind(Mp);
    sl += 1274027 * sind(2 * D - Mp);
    sl += 658314 * sind(2 * D);
    sl += 213618 * sind(2 * Mp);
    sl += -185116 * E * sind(M);
    sl += -114332 * sind(2 * F);
    sl += 58793 * sind(2 * D - 2 * Mp);
    sl += 57066 * E * sind(2 * D - M - Mp);
    sl += 53322 * sind(2 * D + Mp);
    sl += 45758 * E * sind(2 * D - M);
    sl += -40923 * E * sind(M - Mp);
    sl += -34720 * sind(D);
    sl += -30383 * E * sind(M + Mp);
    sl += 15327 * sind(2 * D - 2 * F);
    sl += -12528 * sind(Mp + 2 * F);
    sl += 10980 * sind(Mp - 2 * F);
    sl += 10675 * sind(4 * D - Mp);
    sl += 10034 * sind(3 * Mp);
    sl += 8548 * sind(4 * D - 2 * Mp);
    sl += -7888 * E * sind(2 * D + M - Mp);
    sl += -6766 * E * sind(2 * D + M);
    sl += -5163 * sind(D - Mp);
    sl += 4987 * E * sind(D + M);
    sl += 4036 * E * sind(2 * D - M + Mp);
    return wrap(Lp + sl / 1e6);
  }

  /* Mars: Keplerian J2000 + century rates (Meeus / standalone). Geocentric ecliptic longitude. */
  function marsLon(T, sun) {
    var a = 1.52371034;
    var e = 0.09339410 + 0.00007882 * T;
    var I = 1.84969142 - 0.00813131 * T;
    var L = wrap(355.45332 + 19141.48181397 * T);
    var wbar = wrap(336.04084 + 0.44441088 * T);
    var Om = wrap(49.55953891 - 0.2949123 * T);
    var w = wrap(wbar - Om);
    var M = wrap(L - wbar);
    var v = trueAnomaly(M, e);
    var r = a * (1 - e * e) / (1 + e * cosd(v));
    var u = wrap(v + w);
    var x = r * (cosd(Om) * cosd(u) - sind(Om) * sind(u) * cosd(I));
    var y = r * (sind(Om) * cosd(u) + cosd(Om) * sind(u) * cosd(I));
    var z = r * sind(u) * sind(I);
    var Rsun = 1.000001018;
    var xs = Rsun * cosd(sun);
    var ys = Rsun * sind(sun);
    var xg = x + xs;
    var yg = y + ys;
    var zg = z;
    return {
      lon: wrap(deg(Math.atan2(yg, xg))),
      helioLon: wrap(deg(Math.atan2(y, x))),
      r: r,
      dist: Math.sqrt(xg * xg + yg * yg + zg * zg)
    };
  }

  function phaseFromElong(elong) {
    var e = wrap(elong);
    var illum = 0.5 * (1 - Math.cos(rad(e)));
    var key, name;
    if (e < 22.5 || e >= 337.5) { key = "new"; name = "New Moon"; }
    else if (e < 67.5) { key = "waxing_crescent"; name = "Waxing crescent"; }
    else if (e < 112.5) { key = "first_quarter"; name = "First quarter"; }
    else if (e < 157.5) { key = "waxing_gibbous"; name = "Waxing gibbous"; }
    else if (e < 202.5) { key = "full"; name = "Full Moon"; }
    else if (e < 247.5) { key = "waning_gibbous"; name = "Waning gibbous"; }
    else if (e < 292.5) { key = "last_quarter"; name = "Last quarter"; }
    else { key = "waning_crescent"; name = "Waning crescent"; }
    var synodic = 29.530588853;
    var age = (e / 360) * synodic;
    return { key: key, name: name, illum: illum, elong: e, age: age };
  }

  /* Mean orbits, J2000-ish. Minutes-level story, not a flight plan. */
  function marsMoon(days, L0, n, periodHours, name) {
    var lon = wrap(L0 + n * days);
    var frac = lon / 360;
    var hoursLeft = periodHours * (1 - frac);
    var dayside = lon < 90 || lon > 270;
    return {
      name: name,
      lon: lon,
      frac: frac,
      hoursInto: periodHours * frac,
      hoursToLap: hoursLeft,
      dayside: dayside,
      periodHours: periodHours
    };
  }

  function skyNow(date) {
    date = date || new Date();
    var jd = julianDate(date);
    var T = centuries(jd);
    var days = jd - 2451545.0;
    var sun = sunLon(T);
    var luna = moonLon(T);
    var mars = marsLon(T, sun);
    var phase = phaseFromElong(luna - sun);
    var lunaSign = signFromLon(luna);
    var marsSign = signFromLon(mars.lon);
    var phobos = marsMoon(days, 35.06, 1128.844747, 7.6536, "Phobos");
    var deimos = marsMoon(days, 79.4, 285.161897, 30.298, "Deimos");
    var sep = wrap(luna - mars.lon);
    var aspect = "open sky";
    if (sep < 10 || sep > 350) aspect = "conjunction — Luna sits on Mars";
    else if (Math.abs(sep - 180) < 10) aspect = "opposition — Luna faces Mars";
    else if (Math.abs(sep - 90) < 8 || Math.abs(sep - 270) < 8) aspect = "square — tension across the belt";
    else if (Math.abs(sep - 120) < 8 || Math.abs(sep - 240) < 8) aspect = "trine — easy air between them";
    return {
      date: date,
      jd: jd,
      sunLon: sun,
      lunaLon: luna,
      marsLon: mars.lon,
      marsDistAu: mars.dist,
      phase: phase,
      lunaSign: lunaSign,
      marsSign: marsSign,
      phobos: phobos,
      deimos: deimos,
      lunaMarsSep: sep,
      aspect: aspect
    };
  }

  global.Sky = {
    SIGNS: SIGNS,
    now: skyNow,
    signFromLon: signFromLon
  };
})(window);
