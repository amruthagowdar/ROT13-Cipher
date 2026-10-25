# ROT13 Cipher — Mini Project

## 📌 Project Title

**ROT13 Cipher with Demonstration**

### Abstract

This project is an interactive web application that demonstrates the ROT13 substitution cipher — one of the simplest and best-known classical ciphers. The application allows users to encrypt and decrypt text using the ROT13 algorithm, view a step-by-step letter-by-letter transformation breakdown, explore an interactive alphabet mapping, and verify the implementation through built-in automated test cases. It serves as a practical, visual teaching aid for the subject **Data Security and Cryptography**.

---

## 🎯 Objectives

1. Understand the concept of substitution ciphers and the Caesar cipher family.
2. Implement the ROT13 algorithm using character codes and modular arithmetic.
3. Demonstrate that ROT13 is a self-inverse cipher (applying it twice returns the original text).
4. Provide a visual, interactive experience that explains each step of the cipher.
5. Evaluate the algorithm's correctness through automated test cases.
6. Highlight that ROT13 is an educational tool and is **not suitable** for real-world security.

---

## 🛠 Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and semantic markup |
| CSS3 | Styling, layout, responsive design, and animations |
| Vanilla JavaScript | ROT13 logic, DOM manipulation, and interactivity |

No frameworks, libraries, databases, or servers are used. The project runs entirely in the browser.

---

## ✨ Features

### A. Text Encryption & Decryption
- Multiline input text area with a default example (`HELLO WORLD`).
- Character counter and Clear button.
- Separate "Encrypt with ROT13" and "Decrypt with ROT13" buttons (both use the same algorithm).
- Output displayed in a dedicated read-only box.
- Copy-to-clipboard button with success/error toast notifications.

### B. Letter-by-Letter Demonstration
- A detailed table showing every character's transformation:
  - Character number, original character, alphabet position, shift value, new position, and result.
- Non-alphabetic characters (spaces, digits, punctuation) are clearly marked as unchanged.

### C. Interactive Alphabet Mapping
- Visual display of the full ROT13 mapping: `A↔N, B↔O, … , M↔Z`.
- Hover or tap any letter to highlight its cipher pair with an animated glow effect.

### D. Built-in Test Cases
- 7 pre-defined test cases covering uppercase, lowercase, mixed case, wraparound, numbers/punctuation, empty input, and the self-inverse property.
- One-click "Run All Tests" with PASS/FAIL badges and a summary count.

### E. Educational Content
- Sections explaining cryptography, substitution ciphers, the ROT13 algorithm, its mathematical formula, the self-inverse property, and security limitations.

### F. Responsive Design
- Fully responsive layout optimized for desktop, tablet, and mobile screens.
- Professional dark theme with navy blue, electric blue, and cyan accents.

---

## 📐 Algorithm & Formula

ROT13 is a special case of the Caesar cipher with a fixed shift of **13**.

### Encryption Formula

```
E(x) = (x + 13) mod 26
```

Where `x` is the zero-indexed position of the letter in the alphabet (A = 0, B = 1, … , Z = 25).

### Why the Same Function Decrypts

Since the English alphabet has 26 letters:

```
D(E(x)) = ((x + 13) + 13) mod 26
         = (x + 26) mod 26
         = x
```

Applying ROT13 twice returns the original letter, making the same function serve as both the encryptor and the decryptor.

### Non-Alphabetic Characters

Spaces, digits, punctuation, and any non-English characters are **not transformed** — they pass through unchanged.

---

## 📁 Project File Structure

```
ROT13-Cipher/
├── index.html    → Main HTML page (structure & content)
├── style.css     → All styles, layout, responsive breakpoints
├── script.js     → ROT13 algorithm, interactivity, test runner
└── README.md     → Documentation (this file)
```

---

## 🚀 How to Run

1. **Download or clone** the `ROT13-Cipher` folder.
2. Open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari).
3. No installation, build step, server, or internet connection is required.

---

## 📋 Sample Inputs & Outputs

| Input | Output |
|---|---|
| `HELLO WORLD` | `URYYB JBEYQ` |
| `hello world` | `uryyb jbeyq` |
| `Hello World` | `Uryyb Jbeyq` |
| `ABCXYZ` | `NOPKLM` |
| `Room 101!` | `Ebbz 101!` |
| *(empty)* | *(empty)* |
| `Cryptography 123!` → ROT13 → ROT13 | `Cryptography 123!` |

---

## ✅ Test Cases

| # | Description | Input | Expected | Status |
|---|---|---|---|---|
| 1 | Uppercase | `HELLO WORLD` | `URYYB JBEYQ` | ✓ |
| 2 | Lowercase | `hello world` | `uryyb jbeyq` | ✓ |
| 3 | Mixed case | `Hello World` | `Uryyb Jbeyq` | ✓ |
| 4 | Wraparound | `ABCXYZ` | `NOPKLM` | ✓ |
| 5 | Numbers & punctuation | `Room 101!` | `Ebbz 101!` | ✓ |
| 6 | Empty input | *(empty)* | *(empty)* | ✓ |
| 7 | Double ROT13 = original | `Cryptography 123!` | `Cryptography 123!` | ✓ |

---

## ⚠️ Limitations

- ROT13 only operates on English letters (A–Z, a–z). Characters from other scripts are unchanged.
- It provides **zero cryptographic security** — the key is fixed and publicly known.
- No file encryption or binary data support.

## 🔮 Future Enhancements

- Support for user-configurable shift values (generalised Caesar cipher).
- Frequency analysis tool to demonstrate cipher-breaking.
- File upload for batch encryption/decryption.
- Dark/light theme toggle.
- Exportable PDF report of the demonstration table.
- Integration with other classical ciphers (Vigenère, Atbash, Playfair).

---

## 👩‍🎓 Subject Information

- **Subject:** Data Security and Cryptography
- **Project Type:** Mini Project — Classical Cipher Demonstration

---

> *This project is intended for educational purposes only. ROT13 must not be used to protect confidential or sensitive information.*
