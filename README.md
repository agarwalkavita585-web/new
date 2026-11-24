# VayuMitra AI — Urban Air Quality Assistant

**VayuMitra AI** is a single-file, accessible, real-time Urban Air Quality Assistant built for Indian households and communities to navigate winter smog and urban air pollution (**Hack2skill PromptWars Challenge 6**).

---

## Key Capabilities & Evaluation Alignment

1. **Problem Statement Alignment**
   - **Live Indian City Telemetry:** Fetches real-time US AQI, PM2.5, PM10, NO2, O3, and 24-hour forecasts for any Indian city using the [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) and [Open-Meteo Air Quality API](https://open-meteo.com/en/docs/air-quality-api) — never hallucinating AQI numbers via GenAI.
   - **4 One-Click Sample Presets:** Instant evaluator presets (*Delhi Winter Smog*, *Mumbai Coastal Breeze*, *Bengaluru Tech Corridor*, *Jaipur Dry Dust*).
   - **Actionable Guidance:** Generates **Low-Emission Daily Routines**, **Indoor Air Quality Hacks**, and **Sustainable Alternatives** (each with direct impact and *"Why"* reasoning) via **Google Gemini API** or an instant deterministic preview engine.

2. **Security**
   - Zero hardcoded API keys or credentials.
   - User-provided Gemini API key is password-masked, kept strictly in memory (never persisted or logged), and sent via the `x-goog-api-key` header.
   - Strict XSS protection using `textContent` and `document.createElement` (no unsafe `innerHTML` with dynamic/API strings) plus input sanitization.

3. **Efficiency**
   - Single-file frontend under 100 KB (well within the 10 MB limit).
   - 5-minute TTL in-memory cache (`Map`) for geocoding and AQI responses, plus `AbortController` request timeouts.

4. **Testing**
   - **In-Browser Self-Tests:** Click `Self-Tests` in the header to run 10 automated unit and security checks live.
   - **CLI Test Suite:** Run `npm test` (`node app.test.js`) with zero external dependencies.

5. **Accessibility (WCAG 2.1 AA)**
   - Skip-to-content link, semantic landmarks (`header`, `nav`, `main`, `footer`), `aria-live="polite"` announcements, full keyboard tab navigation, and high-contrast color tokens.

---

## Quick Start (Local & Deployment)

### Run Locally in VS Code
1. Open the project folder in VS Code.
2. Run `npm test` in the terminal to verify all automated tests pass.
3. Right-click `index.html` and select **Open with Live Server** (or open `index.html` directly in your browser).

### Deploy on GitHub Pages / Vercel
1. Push `index.html`, `package.json`, `app.test.js`, `system_prompts.md`, and `README.md` to a public GitHub repository.
2. Enable **Settings -> Pages** (branch `main`, folder `/(root)`) or import the repository in Vercel.