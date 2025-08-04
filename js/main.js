// This injects all the data from the JSON into the proper placeholders
let currentRefreshToken = null;

function autoResizeText(selector, maxSize = 80, minSize = 12, step = 1) {
  const elements = document.querySelectorAll(selector);

  elements.forEach(el => {
    el.style.fontSize = '';
    el.style.whiteSpace = 'nowrap';
    el.style.overflow = 'visible';
    el.style.textOverflow = 'unset';

    let fontSize = maxSize;
    el.style.fontSize = fontSize + 'px';

    while ((el.scrollWidth > el.clientWidth + 0.5) && fontSize > minSize) {
      fontSize -= step;
      el.style.fontSize = fontSize + 'px';
    }
  });
}

function resizeTextAll() {
  autoResizeText('.beer-name-wrapper', 72, 16);
  autoResizeText('.beer-info', 36, 12);
}

// Main code!
Promise.all([
  fetch('json/red-beers.json', { cache: 'no-store' }).then(res => res.json()),
  fetch('json/beer-database.json').then(res => res.json())
])
.then(([data, masterList]) => {
  // 1. Apply theme
  document.body.setAttribute('data-theme', data.theme || 'default');
  void document.body.offsetWidth; // Force reflow for new CSS vars

  // 1.5. (NEW) Theme the taplist logo!
  const logo = document.getElementById('taplist-logo');
  if (logo) {
    // If already loaded (sometimes the object is cached and ready)
    if (logo.contentDocument && logo.contentDocument.readyState === 'complete') {
      styleTaplistLogo({
        shadow: getComputedStyle(document.body).getPropertyValue('--logo-shadow').trim(),
        face: getComputedStyle(document.body).getPropertyValue('--logo-face').trim(),
        highlight: getComputedStyle(document.body).getPropertyValue('--logo-highlight').trim()
      });
    }
    // Always attach event in case it loads asynchronously
    logo.addEventListener('load', () => {
      styleTaplistLogo({
        shadow: getComputedStyle(document.body).getPropertyValue('--logo-shadow').trim(),
        face: getComputedStyle(document.body).getPropertyValue('--logo-face').trim(),
        highlight: getComputedStyle(document.body).getPropertyValue('--logo-highlight').trim()
      });
    });
  }

  // 2. Refresh token logic
  if (currentRefreshToken === null) {
    currentRefreshToken = data.refreshToken;
  } else if (data.refreshToken !== currentRefreshToken) {
    location.reload();
  }

  // 3. Render beer list
  const beers = data.beers; // [{id, soldOut}, ...]
  const logoPlaceholders = document.querySelectorAll('.cell img.logo, .cell object.logo');
  const texts = document.querySelectorAll('.cell.text .text');

  beers.forEach((tap, i) => {
    // Look up full beer info by id
    const beer = masterList.find(b => b.id === tap.id);
    if (!beer) {
      console.warn(`Beer not found for tap id: ${tap.id}`);
      return;
    }

    const logoImg = logoPlaceholders[i];
    const text = texts[i];
    if (!logoImg || !text) return;

    const objectEl = document.createElement('object');
    objectEl.setAttribute('type', 'image/svg+xml');
    objectEl.setAttribute('data', `/logos/${beer.logoPath}`);
    objectEl.classList.add('logo');
    objectEl.style.width = '100%';
    objectEl.style.height = '100%';
    if (tap.soldOut === true) objectEl.classList.add('sold-out');

    logoImg.replaceWith(objectEl);

    objectEl.addEventListener('load', () => {
      let attempts = 0;
      const maxAttempts = 10;

      function tryStyleLogo() {
        const svgDoc = objectEl.contentDocument;
        if (svgDoc) {
          const logoFace = svgDoc.querySelector('.logo-face');
          const color = getComputedStyle(document.body).getPropertyValue('--logo-face').trim();
          if (logoFace) {
            logoFace.style.fill = color;
          }
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(tryStyleLogo, 100);
        } else {
          console.warn(`Logo for ${beer.brewery} failed to load in time`);
        }
      }

      tryStyleLogo();
    });

    const soldOut = tap.soldOut === true;
    text.innerHTML = `
      <div class="beer-name-wrapper ${soldOut ? 'sold-out' : ''}">
        <span class="beer-name-combined">
          <span class="brewery">${beer.brewery}</span>
          <span class="beer-title">${beer.title}</span>
        </span>
      </div>
      <div class="beer-info ${soldOut ? 'sold-out' : ''}">
        ${soldOut ? 'TEMPORARILY SOLD OUT' : `${beer.city}, ${beer.state} • ${beer.style} • ${beer.abv}% ABV`}
      </div>
    `;
  });

  // (Optional) Run your resize logic after render
  requestAnimationFrame(resizeTextAll);
});

// End Populate //
// This handles the resizing of the text elements etc //
 function autoResizeText(selector, maxSize = 80, minSize = 12, step = 1) {
  const elements = document.querySelectorAll(selector);

  elements.forEach(el => {
    el.style.fontSize = '';
    el.style.whiteSpace = 'nowrap';
    el.style.overflow = 'visible';
    el.style.textOverflow = 'unset';

    let fontSize = maxSize;
    el.style.fontSize = fontSize + 'px';

    while ((el.scrollWidth > el.clientWidth + 0.5) && fontSize > minSize) {
      fontSize -= step;
      el.style.fontSize = fontSize + 'px';
    }
  });
}
// End Resize 

// This styles the logo at the top of the screen //
function styleTaplistLogo({ shadow, face, highlight }) {
  console.log('SVG Theming with:', {shadow, face, highlight});

  const logo = document.getElementById('taplist-logo');
  if (!logo) return;
  let attempts = 0, maxAttempts = 25;

  function tryTheme() {
    const svgDoc = logo.contentDocument;
    if (!svgDoc) {
      if (attempts++ < maxAttempts) return setTimeout(tryTheme, 50);
      return;
    }
    const shadowEl = svgDoc.querySelector('.logo-shadow');
    const faceEl = svgDoc.querySelector('.logo-face');
    const highlightEl = svgDoc.querySelector('.logo-highlight');
    if (shadowEl && faceEl && highlightEl) {
      shadowEl.style.fill = shadow;
      faceEl.style.fill = face;
      highlightEl.style.fill = highlight;
      // console.log('Logo themed successfully!');
    } else if (attempts++ < maxAttempts) {
      setTimeout(tryTheme, 50);
    } else {
      console.warn('Taplist logo could not be themed (SVG not ready)');
    }
  }
  // Initial slight delay helps in some browsers
  setTimeout(tryTheme, 50);
}

window.addEventListener('DOMContentLoaded', () => {
  const logo = document.getElementById('taplist-logo');
  if (logo) {
    logo.addEventListener('load', () => {
      // Always retry multiple times even after load
      styleTaplistLogo({
        shadow: getComputedStyle(document.body).getPropertyValue('--logo-shadow').trim(),
        face: getComputedStyle(document.body).getPropertyValue('--logo-face').trim(),
        highlight: getComputedStyle(document.body).getPropertyValue('--logo-highlight').trim()
      });
    });
    // Sometimes, the SVG is cached and already loaded, so you need to check!
    if (logo.contentDocument && logo.contentDocument.readyState === 'complete') {
      styleTaplistLogo({
        shadow: getComputedStyle(document.body).getPropertyValue('--logo-shadow').trim(),
        face: getComputedStyle(document.body).getPropertyValue('--logo-face').trim(),
        highlight: getComputedStyle(document.body).getPropertyValue('--logo-highlight').trim()
      });
    }
  }
});

// END Logo Style //