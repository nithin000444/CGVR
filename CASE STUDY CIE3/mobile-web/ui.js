/* UI is designed to remain usable even while the 3D module is loading. */
(() => {
  const $ = id => document.getElementById(id);
  const dispatch = (name, detail) => document.dispatchEvent(new CustomEvent('studio:' + name, { detail }));
  const panels = ['light', 'material', 'mapping'];
  function setTab(tab) {
    if (!panels.includes(tab)) return;
    panels.forEach(name => {
      const active = name === tab;
      $('tab-' + name).classList.toggle('active', active);
      $('tab-' + name).setAttribute('aria-selected', String(active));
      $('panel-' + name).hidden = !active;
    });
    dispatch('tab', { tab });
  }
  document.querySelectorAll('[data-tab]').forEach(b => b.addEventListener('click', () => setTab(b.dataset.tab)));
  document.querySelectorAll('[data-light]').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('[data-light]').forEach(item => {
      const selected = item === b;
      item.classList.toggle('selected', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    const captions = { ambient: 'AMBIENT ONLY', diffuse: 'AMBIENT + DIFFUSE', specular: 'FULL PHONG LIGHTING' };
    $('mode-caption').textContent = captions[b.dataset.light];
    dispatch('light', { mode: b.dataset.light });
  }));
  function focus(item) {
    document.querySelectorAll('[data-focus]').forEach(b => {
      const active = b.dataset.focus === item;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    dispatch('focus', { item });
  }
  document.querySelectorAll('[data-focus]').forEach(b => b.addEventListener('click', () => focus(b.dataset.focus)));
  $('focus-sofa').addEventListener('click', () => focus('sofa'));
  $('reset-view').addEventListener('click', () => focus('room'));
  $('zoom-in').addEventListener('click', () => dispatch('zoom', { factor: .82 }));
  $('zoom-out').addEventListener('click', () => dispatch('zoom', { factor: 1.22 }));
  const range = (id, eventName, key, formatter = v => v.toFixed(2)) => {
    const el = $(id);
    const update = () => {
      const value = Number(el.value);
      const out = $(id + '-value');
      if (out) out.textContent = formatter(value);
      dispatch(eventName, { [key]: value });
    };
    el.addEventListener('input', update);
  };
  range('daylight', 'daylight', 'value');
  range('specular', 'specular', 'value');
  range('bump-strength', 'bump-strength', 'value');
  for (const [id, action] of [['texture-enabled','texture'], ['bump-enabled','bump'], ['inset-enabled','inset']]) {
    $(id).addEventListener('change', e => dispatch(action, { enabled: e.currentTarget.checked }));
  }
  const fmtSigned = v => v < 0 ? '−' + Math.abs(v).toFixed(2) : v.toFixed(2);
  function updateMapping() {
    const x = Number($('logical-x').value), y = Number($('logical-y').value);
    $('logical-x-value').textContent = fmtSigned(x);
    $('logical-y-value').textContent = fmtSigned(y);
    const px = 70 + (x + 1) * 940 / 2;
    const py = 120 + (y + 1) * 1680 / 2;
    $('mapped-result').textContent = '(' + px.toFixed(1) + ', ' + py.toFixed(1) + ')';
    const position = node => { node.style.left = ((x + 1) * 50) + '%'; node.style.top = ((1 - y) * 50) + '%'; };
    position($('logical-dot')); position($('phone-dot'));
    dispatch('mapping', { x, y, px, py });
  }
  $('logical-x').addEventListener('input', updateMapping);
  $('logical-y').addEventListener('input', updateMapping);
  $('mapping-reset').addEventListener('click', () => { $('logical-x').value = '0.25'; $('logical-y').value = '-0.3'; updateMapping(); });
  $('help-button').addEventListener('click', () => $('help-dialog').showModal());
  document.addEventListener('keydown', event => {
    if (event.target?.matches('input,button,textarea')) return;
    if (event.key === '1') setTab('light');
    if (event.key === '2') setTab('material');
    if (event.key === '3') setTab('mapping');
    if (event.key.toLowerCase() === 'r') focus('room');
  });
  updateMapping();
})();
