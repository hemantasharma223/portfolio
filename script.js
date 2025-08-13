(async () => {
    function safe(value) {
      try { return value === undefined ? null : value; }
      catch { return null; }
    }

    const ua = safe(navigator.userAgent);
    const platform = safe(navigator.platform);
    const language = safe(navigator.language || (navigator.languages && navigator.languages[0]));
    const cookiesEnabled = safe(navigator.cookieEnabled);
    const deviceMemory = safe(navigator.deviceMemory || null);
    const hardwareConcurrency = safe(navigator.hardwareConcurrency || null);
    const doNotTrack = safe(navigator.doNotTrack || navigator.msDoNotTrack || null);

    const screenRes = safe(`${screen.width}x${screen.height}`);
    const colorDepth = safe(screen.colorDepth || null);

    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || null;
    const connectionInfo = connection ? {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData
    } : null;

    let plugins = null;
    try {
      plugins = Array.from(navigator.plugins || []).map(p => ({
        name: p.name,
        filename: p.filename,
        description: p.description
      }));
    } catch { plugins = null; }

    let timezone = null;
    try {
      timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || null;
    } catch {}

    let batteryInfo = null;
    try {
      if (navigator.getBattery) {
        const b = await navigator.getBattery();
        batteryInfo = {
          charging: b.charging,
          level: b.level,
          chargingTime: b.chargingTime,
          dischargingTime: b.dischargingTime
        };
      }
    } catch {}

    const pointerTypes = [];
    try {
      if (window.matchMedia) {
        if (window.matchMedia("(pointer: coarse)").matches) pointerTypes.push("coarse");
        if (window.matchMedia("(pointer: fine)").matches) pointerTypes.push("fine");
        if (window.matchMedia("(pointer: none)").matches) pointerTypes.push("none");
      }
    } catch {}

    const touchSupport = ('ontouchstart' in window) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ? 1 : 0;

    const referrer = document.referrer || null;

    const payload = {
      user_agent: ua,
      platform,
      language,
      cookiesEnabled,
      deviceMemory,
      hardwareConcurrency,
      doNotTrack,
      screenRes,
      colorDepth,
      connectionInfo,
      plugins,
      timezone,
      batteryInfo,
      pointerTypes,
      touchSupport,
      referrer
    };

    try {
      const response = await fetch("https://karkiandasuppliers.com/kshitishbhurtel.com.np/save_users.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const text = await response.text();
      console.log("Server response:", text);
    } catch (e) {
      console.error("Error sending visitor info:", e);
    }
  })();







// $(document).ready(function () {
//     $(window).scroll(function () {
//         // checks if window is scrolled more than 500px, adds/removes solid class
//         if ($(this).scrollTop() > 550) {
//             $('.navbar').addClass('solid');
//             $('.back-to-top').addClass('visible');
//         } else {
//             $('.navbar').removeClass('solid');
//             $('.back-to-top').removeClass('visible');
//         }

//     });
// });


// $(document).ready(function () {
//     // Add smooth scrolling to all links
//     $("a").on('click', function (event) {

//         // Make sure this.hash has a value before overriding default behavior
//         if (this.hash !== "") {
//             // Prevent default anchor click behavior
//             event.preventDefault();

//             // Store hash
//             var hash = this.hash;

//             // Using jQuery's animate() method to add smooth page scroll
//             // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
//             $('html, body').animate({
//                 scrollTop: $(hash).offset().top
//             }, 800, function () {

//                 // Add hash (#) to URL when done scrolling (default click behavior)
//                 window.location.hash = hash;
//             });
//         } // End if
//     });
// });
