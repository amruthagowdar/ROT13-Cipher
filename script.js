/**
 * ================================================================
 * ROT13 Cipher – script.js
 * Complete implementation for encryption, decryption, letter-by-letter
 * demonstration, alphabet mapping, and built-in test cases.
 * ================================================================
 */

// ── Utility: safely escape HTML to prevent XSS ──
function escapeHTML(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// ================================================================
// 1. ROT13 Core Algorithm
// ================================================================

/**
 * Apply the ROT13 cipher to a string.
 * Each English letter is shifted 13 positions forward (mod 26).
 * Non-alphabetic characters pass through unchanged.
 *
 * @param {string} text – The input string.
 * @returns {string} – The ROT13-transformed string.
 */
function rot13(text) {
  let result = '';

  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);

    // Uppercase A-Z (65–90)
    if (code >= 65 && code <= 90) {
      result += String.fromCharCode(((code - 65 + 13) % 26) + 65);

    // Lowercase a-z (97–122)
    } else if (code >= 97 && code <= 122) {
      result += String.fromCharCode(((code - 97 + 13) % 26) + 97);

    // Non-alphabetic → unchanged
    } else {
      result += text[i];
    }
  }

  return result;
}

// ================================================================
// 2. DOM References
// ================================================================

const inputText   = document.getElementById('inputText');
const outputText  = document.getElementById('outputText');
const charCounter = document.getElementById('charCounter');
const clearBtn    = document.getElementById('clearBtn');
const encryptBtn  = document.getElementById('encryptBtn');
const decryptBtn  = document.getElementById('decryptBtn');
const copyBtn     = document.getElementById('copyBtn');
const toastEl     = document.getElementById('toast');

const demoBtn       = document.getElementById('demoBtn');
const demoBody      = document.getElementById('demoBody');
const demoNote      = document.getElementById('demoNote');

const plainRow      = document.getElementById('plainRow');
const cipherRow     = document.getElementById('cipherRow');
const mappingInfo   = document.getElementById('mappingInfo');

const runTestsBtn   = document.getElementById('runTestsBtn');
const testBody      = document.getElementById('testBody');
const testSummary   = document.getElementById('testSummary');

const navToggle     = document.getElementById('navToggle');
const navLinks      = document.querySelector('.nav-links');

// ================================================================
// 3. Toast Notifications
// ================================================================

let toastTimer = null;

/**
 * Show a brief toast notification at the bottom of the screen.
 *
 * @param {string} message – The message text.
 * @param {'success'|'error'} type – Visual style.
 */
function showToast(message, type = 'success') {
  clearTimeout(toastTimer);
  toastEl.textContent = message;
  toastEl.className = 'toast ' + type + ' show';
  toastTimer = setTimeout(() => {
    toastEl.classList.remove('show');
  }, 2600);
}

// ================================================================
// 4. Character Counter
// ================================================================

function updateCharCounter() {
  const len = inputText.value.length;
  charCounter.textContent = len + ' character' + (len !== 1 ? 's' : '');
}

inputText.addEventListener('input', updateCharCounter);
updateCharCounter(); // initial count

// ================================================================
// 5. Encrypt / Decrypt / Clear / Copy
// ================================================================

encryptBtn.addEventListener('click', () => {
  const text = inputText.value;
  if (!text.trim()) {
    showToast('Please enter some text to encrypt.', 'error');
    return;
  }
  const cipher = rot13(text);
  outputText.textContent = cipher;
  showToast('Text encrypted with ROT13!', 'success');
});

decryptBtn.addEventListener('click', () => {
  const text = inputText.value;
  if (!text.trim()) {
    showToast('Please enter some ciphertext to decrypt.', 'error');
    return;
  }
  const plain = rot13(text);
  outputText.textContent = plain;
  showToast('Text decrypted with ROT13!', 'success');
});

clearBtn.addEventListener('click', () => {
  inputText.value = '';
  outputText.textContent = '';
  updateCharCounter();
  showToast('Input cleared.', 'success');
});

copyBtn.addEventListener('click', () => {
  const text = outputText.textContent;
  if (!text) {
    showToast('Nothing to copy.', 'error');
    return;
  }
  navigator.clipboard.writeText(text).then(() => {
    showToast('Copied to clipboard!', 'success');
  }).catch(() => {
    // Fallback for older browsers or restricted contexts
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast('Copied to clipboard!', 'success');
    } catch (e) {
      showToast('Copy failed. Please copy manually.', 'error');
    }
    document.body.removeChild(ta);
  });
});

// ================================================================
// 6. Letter-by-Letter Demonstration
// ================================================================

/**
 * Build the demonstration table showing each character's
 * transformation through the ROT13 cipher.
 */
demoBtn.addEventListener('click', () => {
  const text = inputText.value;
  if (!text) {
    showToast('Enter text first to generate the demonstration.', 'error');
    return;
  }

  demoBody.innerHTML = '';
  let nonAlphaCount = 0;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const code = ch.charCodeAt(0);
    const row = document.createElement('tr');
    row.style.setProperty('--i', i);

    const isUpper = code >= 65 && code <= 90;
    const isLower = code >= 97 && code <= 122;

    if (isUpper || isLower) {
      const base = isUpper ? 65 : 97;
      const pos = code - base + 1;           // 1-indexed position
      const newPos = ((code - base + 13) % 26) + 1;
      const result = String.fromCharCode(((code - base + 13) % 26) + base);

      row.innerHTML =
        '<td>' + (i + 1) + '</td>' +
        '<td class="letter-original">' + escapeHTML(ch) + '</td>' +
        '<td>' + pos + '</td>' +
        '<td>+13</td>' +
        '<td>' + newPos + '</td>' +
        '<td class="letter-result">' + escapeHTML(result) + '</td>';
    } else {
      // Non-alphabetic character
      nonAlphaCount++;
      let description = 'Non-letter';
      if (ch === ' ') description = 'Space';
      else if (/\d/.test(ch)) description = 'Digit';
      else if (/[^\w]/.test(ch)) description = 'Punctuation';

      row.innerHTML =
        '<td>' + (i + 1) + '</td>' +
        '<td class="letter-original">' + escapeHTML(ch) + '</td>' +
        '<td class="non-alpha">' + description + '</td>' +
        '<td class="non-alpha">—</td>' +
        '<td class="non-alpha">—</td>' +
        '<td class="letter-result">' + escapeHTML(ch) + '</td>';
    }

    demoBody.appendChild(row);
  }

  // Note about non-alphabetic characters
  if (nonAlphaCount > 0) {
    demoNote.textContent =
      'Note: ' + nonAlphaCount + ' non-alphabetic character' +
      (nonAlphaCount !== 1 ? 's' : '') +
      ' (spaces, digits, punctuation) remain unchanged — ROT13 only transforms English letters.';
  } else {
    demoNote.textContent = '';
  }

  showToast('Demonstration generated!', 'success');
});

// ================================================================
// 7. Interactive Alphabet Mapping
// ================================================================

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * Build the plain and cipher alphabet rows and attach
 * hover/click listeners that highlight matching pairs.
 */
function buildAlphabetMapping() {
  plainRow.innerHTML = '';
  cipherRow.innerHTML = '';

  for (let i = 0; i < 26; i++) {
    // Plain letter
    const pLetter = document.createElement('span');
    pLetter.className = 'mapping-letter';
    pLetter.textContent = ALPHABET[i];
    pLetter.setAttribute('data-index', i);
    pLetter.setAttribute('role', 'button');
    pLetter.setAttribute('tabindex', '0');
    pLetter.setAttribute('aria-label', ALPHABET[i] + ' maps to ' + ALPHABET[(i + 13) % 26]);

    // Cipher letter (shifted by 13)
    const cLetter = document.createElement('span');
    cLetter.className = 'mapping-letter';
    cLetter.textContent = ALPHABET[(i + 13) % 26];
    cLetter.setAttribute('data-index', i);
    cLetter.setAttribute('role', 'button');
    cLetter.setAttribute('tabindex', '0');
    cLetter.setAttribute('aria-label', ALPHABET[(i + 13) % 26] + ' maps from ' + ALPHABET[i]);

    plainRow.appendChild(pLetter);
    cipherRow.appendChild(cLetter);
  }

  // Event delegation for hover/focus highlighting
  const highlightPair = (index) => {
    clearMapping();
    const pLetters = plainRow.children;
    const cLetters = cipherRow.children;
    if (pLetters[index]) pLetters[index].classList.add('active');
    if (cLetters[index]) cLetters[index].classList.add('active');

    const plain  = ALPHABET[index];
    const cipher = ALPHABET[(index + 13) % 26];
    mappingInfo.textContent = plain + ' → ' + cipher + '  (position ' + (index + 1) + ' shifts +13 to position ' + (((index + 13) % 26) + 1) + ')';
  };

  const clearMapping = () => {
    Array.from(plainRow.children).forEach(el => el.classList.remove('active'));
    Array.from(cipherRow.children).forEach(el => el.classList.remove('active'));
  };

  const resetInfo = () => {
    mappingInfo.textContent = 'Hover or tap a letter to highlight its ROT13 pair.';
  };

  [plainRow, cipherRow].forEach(row => {
    row.addEventListener('mouseover', (e) => {
      const letter = e.target.closest('.mapping-letter');
      if (letter) highlightPair(parseInt(letter.dataset.index));
    });
    row.addEventListener('mouseout', () => {
      clearMapping();
      resetInfo();
    });
    row.addEventListener('focus', (e) => {
      const letter = e.target.closest('.mapping-letter');
      if (letter) highlightPair(parseInt(letter.dataset.index));
    }, true);
    row.addEventListener('blur', () => {
      clearMapping();
      resetInfo();
    }, true);
  });
}

buildAlphabetMapping();

// ================================================================
// 8. Built-in Test Cases
// ================================================================

const TEST_CASES = [
  {
    description: 'Uppercase letters',
    input: 'HELLO WORLD',
    expected: 'URYYB JBEYQ'
  },
  {
    description: 'Lowercase letters',
    input: 'hello world',
    expected: 'uryyb jbeyq'
  },
  {
    description: 'Mixed case',
    input: 'Hello World',
    expected: 'Uryyb Jbeyq'
  },
  {
    description: 'Alphabet wraparound (A→N, X→K, etc.)',
    input: 'ABCXYZ',
    expected: 'NOPKLM'
  },
  {
    description: 'Numbers & punctuation unchanged',
    input: 'Room 101!',
    expected: 'Ebbz 101!'
  },
  {
    description: 'Empty input → empty output',
    input: '',
    expected: ''
  },
  {
    description: 'Double ROT13 returns original (self-inverse)',
    input: 'Cryptography 123!',
    expected: 'Cryptography 123!',
    double: true // flag: apply ROT13 twice
  }
];

/**
 * Execute all test cases and display results in the table.
 */
runTestsBtn.addEventListener('click', () => {
  testBody.innerHTML = '';
  let passed = 0;

  TEST_CASES.forEach((tc, idx) => {
    const actual = tc.double ? rot13(rot13(tc.input)) : rot13(tc.input);
    const ok = actual === tc.expected;
    if (ok) passed++;

    const row = document.createElement('tr');
    row.innerHTML =
      '<td>' + (idx + 1) + '</td>' +
      '<td>' + escapeHTML(tc.description) + '</td>' +
      '<td><code>' + escapeHTML(tc.input || '(empty)') + '</code></td>' +
      '<td><code>' + escapeHTML(tc.expected || '(empty)') + '</code></td>' +
      '<td><code>' + escapeHTML(actual || '(empty)') + '</code></td>' +
      '<td><span class="badge ' + (ok ? 'badge-pass' : 'badge-fail') + '">' +
        (ok ? 'PASS' : 'FAIL') + '</span></td>';

    testBody.appendChild(row);
  });

  const total = TEST_CASES.length;
  const allPassed = passed === total;
  testSummary.innerHTML =
    '<span class="' + (allPassed ? 'test-pass' : 'test-fail') + '">' +
    passed + ' / ' + total + ' tests passed' +
    (allPassed ? ' ✓' : '') + '</span>';

  showToast(
    allPassed ? 'All tests passed!' : passed + ' of ' + total + ' tests passed.',
    allPassed ? 'success' : 'error'
  );
});

// ================================================================
// 9. Mobile Navigation Toggle
// ================================================================

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav when a link is clicked
navLinks.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    navLinks.classList.remove('open');
  }
});

// ================================================================
// 10. Hero Floating Particles (aesthetic background effect)
// ================================================================

(function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  const PARTICLE_COUNT = 30;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');

    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const delay = Math.random() * 12;
    const duration = Math.random() * 10 + 10;
    const hue = Math.random() > 0.5 ? '199' : '217'; // cyan / blue hue

    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = left + '%';
    p.style.bottom = '-10px';
    p.style.background = 'hsl(' + hue + ', 80%, 65%)';
    p.style.animationDelay = delay + 's';
    p.style.animationDuration = duration + 's';

    container.appendChild(p);
  }
})();
