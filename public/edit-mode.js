/* Text edit mode. Open any page with #edit at the end of the address, for example /about#edit.
   Click any text and type. Changes are kept in this browser until you copy them.
   Nothing on the live site changes. Claude applies the copied changes to the website files. */
(function () {
  if (location.hash !== '#edit') return;
  var KEY = 'tll-edit-changes-v1';
  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, SVG: 1, TEXTAREA: 1, INPUT: 1, BUTTON: 1, SELECT: 1, OPTION: 1, TITLE: 1, HEAD: 1 };
  var norm = function (t) { return t.replace(/\s+/g, ' ').trim(); };
  var load = function () { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return {}; } };
  var save = function (d) { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {} };
  var path = location.pathname.replace(/\/$/, '') || '/';

  function inSkipped(el) {
    for (var n = el; n && n !== document.body; n = n.parentElement) { if (SKIP[n.tagName.toUpperCase()] || n.id === 'tll-edit-bar') return true; }
    return false;
  }
  function isUnit(el) {
    if (inSkipped(el)) return false;
    for (var i = 0; i < el.childNodes.length; i++) {
      var c = el.childNodes[i];
      if (c.nodeType === 3 && norm(c.nodeValue)) return true;
    }
    return false;
  }

  var units = [];
  Array.prototype.forEach.call(document.body.querySelectorAll('*'), function (el) {
    if (isUnit(el)) { el.setAttribute('data-orig', norm(el.textContent)); units.push(el); }
  });
  // If a unit contains another unit, only the inner one is editable (avoids double counting).
  units = units.filter(function (el) { return !units.some(function (o) { return o !== el && el.contains(o); }); });

  var saved = load(); var mine = saved[path] || {};
  units.forEach(function (el) {
    var o = el.getAttribute('data-orig');
    if (mine[o] != null && norm(el.textContent) === o) el.textContent = mine[o];
    el.setAttribute('contenteditable', 'plaintext-only');
    if (el.contentEditable !== 'plaintext-only') el.setAttribute('contenteditable', 'true');
    el.setAttribute('spellcheck', 'true');
    el.style.outline = '1px dashed rgba(30,50,120,0.35)'; el.style.outlineOffset = '2px';
    el.style.cursor = 'text';
  });

  var style = document.createElement('style');
  style.textContent = '[data-orig]:focus{outline:2px solid #f5b829 !important;background:rgba(245,184,41,0.12);} [data-orig].tll-changed{background:rgba(42,181,160,0.18);} [data-reveal]{animation:none !important;opacity:1 !important;transform:none !important;}';
  document.head.appendChild(style);

  // Links should not navigate while editing; buttons (menus, read more) still work.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (a && !a.closest('#tll-edit-bar')) e.preventDefault();
  }, true);
  document.addEventListener('keydown', function (e) { if (e.key === 'Enter' && e.target.hasAttribute && e.target.hasAttribute('data-orig')) e.preventDefault(); }, true);

  function record() {
    var d = load(); var m = {};
    units.forEach(function (el) {
      var o = el.getAttribute('data-orig'), n = norm(el.textContent);
      if (n !== o) { m[o] = n; el.classList.add('tll-changed'); } else el.classList.remove('tll-changed');
    });
    if (Object.keys(m).length) d[path] = m; else delete d[path];
    save(d); updateBar();
  }
  document.addEventListener('input', function (e) { if (e.target.hasAttribute && e.target.hasAttribute('data-orig')) record(); });
  document.addEventListener('paste', function (e) {
    if (!(e.target.hasAttribute && e.target.hasAttribute('data-orig'))) return;
    e.preventDefault(); var t = (e.clipboardData || window.clipboardData).getData('text').replace(/\s+/g, ' ');
    document.execCommand('insertText', false, t);
  });

  function count() { var d = load(), n = 0, p = 0; for (var k in d) { var c = Object.keys(d[k]).length; if (c) { n += c; p++; } } return [n, p]; }

  var bar = document.createElement('div'); bar.id = 'tll-edit-bar';
  bar.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:99999;background:#141f4d;color:#fff;font:600 14px/1.4 Inter,Arial,sans-serif;padding:10px 16px;display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center;box-shadow:0 -6px 24px rgba(0,0,0,0.3);';
  bar.innerHTML = '<span style="color:#f5b829;font-weight:800;">EDIT MODE</span><span>Click any text and type. Links will not open.</span><span id="tll-edit-count" style="opacity:.85"></span><span style="flex:1"></span>';
  function btn(label, bg, fg) { var b = document.createElement('button'); b.type = 'button'; b.textContent = label; b.style.cssText = 'font:700 14px Inter,Arial,sans-serif;border:none;border-radius:4px;padding:9px 14px;cursor:pointer;background:' + bg + ';color:' + fg + ';'; return b; }
  var copyBtn = btn('Copy all my changes', '#f5b829', '#141f4d');
  var clearBtn = btn('Clear my changes', 'transparent', '#c9d2ea'); clearBtn.style.border = '1px solid rgba(255,255,255,.35)';
  var exitBtn = btn('Exit', 'transparent', '#c9d2ea'); exitBtn.style.border = '1px solid rgba(255,255,255,.35)';
  bar.appendChild(copyBtn); bar.appendChild(clearBtn); bar.appendChild(exitBtn);
  var box = document.createElement('textarea'); box.readOnly = true; box.style.cssText = 'display:none;width:100%;height:140px;font:12px Menlo,monospace;';
  bar.appendChild(box);
  document.body.appendChild(bar); document.body.style.paddingBottom = '70px';

  function updateBar() { var c = count(); document.getElementById('tll-edit-count').textContent = c[0] ? c[0] + ' change' + (c[0] > 1 ? 's' : '') + ' on ' + c[1] + ' page' + (c[1] > 1 ? 's' : '') + ' saved in this browser' : 'No changes yet'; }
  updateBar();

  copyBtn.onclick = function () {
    var d = load(), out = [];
    Object.keys(d).forEach(function (p) { Object.keys(d[p]).forEach(function (b) { out.push({ page: p, before: b, after: d[p][b] }); }); });
    var text = 'THE LIFE LINK WEBSITE TEXT CHANGES\n' + JSON.stringify(out, null, 2);
    box.value = text; box.style.display = 'block'; box.select();
    var ok = function () { copyBtn.textContent = 'Copied. Paste it into the chat.'; };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(ok, function () { copyBtn.textContent = 'Select the text below and copy it'; });
    else { try { document.execCommand('copy'); ok(); } catch (e) { copyBtn.textContent = 'Select the text below and copy it'; } }
  };
  clearBtn.onclick = function () { if (confirm('Clear all saved changes in this browser? This cannot be undone.')) { try { localStorage.removeItem(KEY); } catch (e) {} location.reload(); } };
  exitBtn.onclick = function () { history.replaceState(null, '', location.pathname); location.reload(); };
})();
