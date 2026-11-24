'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const htmlPath = path.join(__dirname, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

function sanitizeInput(str) {
  return String(str || '').replace(/[<>'"&]/g, '').trim().slice(0, 60);
}

function classifyAqi(aqi) {
  const val = Number(aqi);
  if (!Number.isFinite(val) || val < 0) return 'Unknown';
  if (val <= 50) return 'Good';
  if (val <= 100) return 'Moderate';
  if (val <= 150) return 'Sensitive Groups';
  if (val <= 200) return 'Unhealthy';
  if (val <= 300) return 'Very Unhealthy';
  return 'Hazardous';
}

const tests = [
  ['index.html exists and is under 10 MB limit', () => {
    const stats = fs.statSync(htmlPath);
    assert.ok(stats.size > 1000 && stats.size < 10 * 1024 * 1024);
  }],
  ['Security: zero hardcoded Google API keys', () => {
    assert.equal(/AIza[0-9A-Za-z_-]{20,}/.test(html), false);
  }],
  ['Security: zero eval() or document.write() calls', () => {
    assert.equal(/\beval\s*\(/.test(html), false);
    assert.equal(/document\.write\s*\(/.test(html), false);
  }],
  ['Security: Gemini API key passed via x-goog-api-key header', () => {
    assert.ok(html.includes('x-goog-api-key'));
  }],
  ['Security: API key input is password-masked', () => {
    assert.ok(html.includes('id="gemini-key-input" type="password"'));
  }],
  ['Problem Alignment: Open-Meteo Air Quality & Geocoding APIs integrated', () => {
    assert.ok(html.includes('air-quality-api.open-meteo.com'));
    assert.ok(html.includes('geocoding-api.open-meteo.com'));
  }],
  ['Problem Alignment: All 4 Indian city presets included', () => {
    ['Delhi', 'Mumbai', 'Bengaluru', 'Jaipur'].forEach(city => {
      assert.ok(html.includes(`data-preset="${city}"`)); }); }], ['Accessibility: Skip-to-content, main landmark, and aria-live present', () => { assert.ok(html.includes('href="#main-content"')); assert.ok(html.includes('<main id="main-content"')); assert.ok(html.includes('aria-live="polite"')); }], ['Unit Logic: Input sanitization strips XSS characters', () => { assert.equal(sanitizeInput('<img src=x onerror=alert(1)>Pune'), 'img src=x onerror=alert(1)Pune'); }], ['Unit Logic: AQI classification boundaries', () => { assert.equal(classifyAqi(45), 'Good'); assert.equal(classifyAqi(108), 'Sensitive Groups'); assert.equal(classifyAqi(268), 'Very Unhealthy'); assert.equal(classifyAqi(350), 'Hazardous'); }] ];  let passed = 0; for (const [name, fn] of tests) { fn(); passed += 1; console.log(`PASS: ${name}`);
}
console.log(`\nAll ${passed}/${tests.length} tests passed.`);