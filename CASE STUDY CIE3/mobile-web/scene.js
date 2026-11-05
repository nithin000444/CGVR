/* CGVR Case Study 3 — static, touch-friendly educational 3D showroom.
   Browser equivalent of the Unity concepts; not a conversion of the Unity engine. */
const canvas = document.getElementById('showroom');
const loading = document.getElementById('loading');
const errorPanel = document.getElementById('error-message');
const errorDetail = document.getElementById('error-detail');

function showError(message) {
  loading.hidden = true;
  errorDetail.textContent = message;
  errorPanel.hidden = false;
}

async function start() {
  const THREE = await import('three');
  if (!canvas.getContext('webgl2', { antialias: true, alpha: false })) {
    throw new Error('WebGL 2 is unavailable. Try Safari on iPhone, Chrome on Android, or turn on hardware acceleration.');
  }
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'default' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
  renderer.setClearColor(0x122132, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.32;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x18283a);
  const camera = new THREE.PerspectiveCamera(40, 1, .1, 90);
  const ambient = new THREE.AmbientLight(0xe4e6ee, .46);
  scene.add(ambient);
  const sun = new THREE.DirectionalLight(0xfff0db, 2.0);
  sun.position.set(-3.5, 7.0, 6.8);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -10; sun.shadow.camera.right = 10;
  sun.shadow.camera.top = 10; sun.shadow.camera.bottom = -10;
  sun.shadow.bias = -.00025;
  sun.shadow.normalBias = .018;
  scene.add(sun);

  const matte = (hex, opt = {}) => new THREE.MeshStandardMaterial({ color: hex, roughness: .91, ...opt });
  const meshBox = (parent, label, size, pos, material, casts = true) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
    m.name = label;
    m.position.set(...pos);
    m.castShadow = casts;
    m.receiveShadow = true;
    parent.add(m);
    return m;
  };
  const meshSphere = (parent, label, size, pos, material) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 9), material);
    m.name = label;
    m.position.set(...pos);
    m.scale.set(...size);
    m.castShadow = true;
    parent.add(m);
    return m;
  };
  const floorMat = matte(0x8a939a);
  const wallMat = matte(0xd1d8de);
  const trimMat = matte(0x6f7d87);
  const linenMat = matte(0x455a6d, { roughness: .95 });
  const standMat = matte(0xe9e5dc);
  const windowMat = new THREE.MeshPhongMaterial({ color: 0xa5c8df, emissive: 0x294459, emissiveIntensity: .22, shininess: 55 });
  const woodMat = matte(0x583d2f, { roughness: .71 });
  const leafMat = matte(0x32664f);

  // Showroom scene, structurally corresponding to the Unity demo.
  meshBox(scene, 'Floor', [15,.22,12.2], [0,-.13,0], floorMat, false);
  meshBox(scene, 'Rear wall', [15,6.7,.16], [0,3.2,-4.32], wallMat, false);
  meshBox(scene, 'Left wall', [.16,6.7,12.2], [-7.1,3.2,0], wallMat, false);
  meshBox(scene, 'Rear skirting', [14.8,.17,.13], [0,.15,-4.18], trimMat, false);
  meshBox(scene, 'Rug', [10.1,.036,5], [-.15,.028,-.32], linenMat, false);
  meshBox(scene, 'Chair plinth', [2.85,.13,2.65], [-2.22,.10,0], standMat);
  meshBox(scene, 'Sofa plinth', [4.22,.13,2.7], [1.55,.10,0], standMat);
  meshBox(scene, 'Window glass', [2.58,2.48,.07], [-4.72,3.38,-4.18], windowMat, false);
  meshBox(scene, 'Window vertical frame', [.075,2.62,.12], [-4.72,3.38,-4.1], trimMat, false);
  meshBox(scene, 'Window horizontal frame', [2.69,.075,.12], [-4.72,3.38,-4.1], trimMat, false);
  meshBox(scene, 'Planter', [.65,.72,.65], [5.8,.43,-2.85], matte(0x627078));
  for (let i = 0; i < 8; i++) {
    const a = 2.4 * i;
    meshSphere(scene, 'Plant leaf', [.22,.35,.21], [5.8 + Math.cos(a)*.28, .92 + i*.12, -2.85 + Math.sin(a)*.28], leafMat);
  }

  function makeLeatherTextures() {
    const size = 256;
    let seed = 4104;
    const rng = () => ((seed = (1664525 * seed + 1013904223) >>> 0) / 4294967296);
    const base = document.createElement('canvas'); base.width = base.height = size;
    const ctx = base.getContext('2d');
    const pixels = ctx.createImageData(size, size);
    const bump = document.createElement('canvas'); bump.width = bump.height = size;
    const bumpCtx = bump.getContext('2d');
    const heightPixels = bumpCtx.createImageData(size, size);
    for (let y=0; y<size; y++) for (let x=0; x<size; x++) {
      const u=x/size, v=y/size;
      const grain = Math.sin(u*89 + Math.sin(v*40))*Math.cos(v*92);
      const h = .5 + .09*grain + .09*(rng()-.5);
      const i=(y*size+x)*4;
      const shade=Math.min(1, Math.max(0, .78+(h-.5)*.34));
      pixels.data[i]=Math.round(181*shade); pixels.data[i+1]=Math.round(117*shade); pixels.data[i+2]=Math.round(70*shade); pixels.data[i+3]=255;
      const gray=Math.round(255*h);
      heightPixels.data[i]=gray; heightPixels.data[i+1]=gray; heightPixels.data[i+2]=gray; heightPixels.data[i+3]=255;
    }
    ctx.putImageData(pixels,0,0); bumpCtx.putImageData(heightPixels,0,0);
    const albedo = new THREE.CanvasTexture(base);
    albedo.colorSpace = THREE.SRGBColorSpace;
    const bumpMap = new THREE.CanvasTexture(bump);
    for(const t of [albedo,bumpMap]) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(2, 1.2); t.anisotropy = 2; }
    return { albedo, bumpMap };
  }
  const leatherMaps = makeLeatherTextures();
  const chairMat = new THREE.MeshPhongMaterial({ color: 0xb81227, shininess: 12, specular: 0x090506 });
  const leatherMat = new THREE.MeshPhongMaterial({ color: 0xe4b595, map: leatherMaps.albedo, bumpMap: leatherMaps.bumpMap, bumpScale: .06, shininess: 39, specular: 0x8d796a });

  const chair = new THREE.Group(); chair.name = 'Red velvet chair'; chair.position.set(-2.22,.16,0); scene.add(chair);
  meshBox(chair, 'Chair seat', [1.66,.32,1.37], [0,1.06,0], chairMat);
  meshBox(chair, 'Chair back', [1.66,1.49,.28], [0,1.81,-.53], chairMat);
  meshBox(chair, 'Chair left arm', [.22,.58,1.42], [-.76,1.36,0], chairMat);
  meshBox(chair, 'Chair right arm', [.22,.58,1.42], [.76,1.36,0], chairMat);
  meshSphere(chair, 'Chair cushion', [.7,.13,.54], [0,1.26,.05], chairMat);
  for (const x of [-.60,.60]) for(const z of [-.50,.50]) meshBox(chair,'Chair wood legs',[.17,.86,.17],[x,.43,z],woodMat);

  const sofa = new THREE.Group(); sofa.name = 'Brown leather sofa'; sofa.position.set(1.55,.16,0); scene.add(sofa);
  meshBox(sofa, 'Sofa main body', [3.42,.64,1.52], [0,.92,0], leatherMat);
  meshBox(sofa, 'Sofa back', [3.42,1.23,.38], [0,1.56,-.56], leatherMat);
  meshBox(sofa, 'Sofa arm left', [.33,.88,1.46], [-1.59,1.18,.04], leatherMat);
  meshBox(sofa, 'Sofa arm right', [.33,.88,1.46], [1.59,1.18,.04], leatherMat);
  for(const x of [-1.04,0,1.04]) {
    meshBox(sofa,'Seat cushion',[1.01,.17,1.20],[x,1.29,.13],leatherMat);
    meshBox(sofa,'Back cushion',[1.01,.76,.20],[x,1.68,-.35],leatherMat);
  }
  for (const x of [-1.39,1.39]) for(const z of [-.56,.56]) meshBox(sofa,'Sofa leg',[.16,.52,.16],[x,.27,z],woodMat);

  const targets = {
    room: { at: new THREE.Vector3(0,1.18,-.1), distance: 10.9 },
    chair: { at: new THREE.Vector3(-2.22,1.55,0), distance: 4.8 },
    sofa: { at: new THREE.Vector3(1.55,1.47,0), distance: 6.1 }
  };
  const orbit = { yaw: .04, pitch: .20, distance: 10.9, focus: 'room', target: targets.room.at.clone(), desiredTarget: targets.room.at.clone(), desiredDistance: 10.9 };
  let currentLight = 'specular';
  let daylight = 1.0;
  let specularStrength = .55;
  let inset = false;
  let textureEnabled = true;
  let bumpEnabled = true;
  const pointerPositions = new Map();
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  function focus(item) {
    if(!targets[item]) return;
    orbit.focus = item;
    orbit.desiredTarget.copy(targets[item].at);
    orbit.desiredDistance = targets[item].distance;
    orbit.yaw = .04;
    orbit.pitch = .20;
  }
  function applyLight() {
    ambient.intensity = .46;
    sun.intensity = currentLight === 'ambient' ? 0 : daylight * 2.0;
    chairMat.specular.setHex(currentLight === 'specular' ? 0x110608 : 0x000000);
    leatherMat.specular.setHex(currentLight === 'specular' ? 0xbba18d : 0x000000);
    // Intensity adjustment controls the specular colour without geometry changes.
    leatherMat.specular.multiplyScalar(specularStrength);
    chairMat.needsUpdate = true; leatherMat.needsUpdate = true;
  }
  function updateMaterials() {
    leatherMat.map = textureEnabled ? leatherMaps.albedo : null;
    leatherMat.bumpMap = bumpEnabled ? leatherMaps.bumpMap : null;
    leatherMat.needsUpdate = true;
  }
  function zoom(factor) {
    orbit.desiredDistance = clamp(orbit.desiredDistance * factor, orbit.focus === 'room' ? 7.0 : 3.1, 18);
  }
  document.addEventListener('studio:focus', e => focus(e.detail.item));
  document.addEventListener('studio:zoom', e => zoom(e.detail.factor));
  document.addEventListener('studio:light', e => { currentLight = e.detail.mode; applyLight(); });
  document.addEventListener('studio:daylight', e => { daylight = e.detail.value; applyLight(); });
  document.addEventListener('studio:specular', e => { specularStrength = e.detail.value; applyLight(); });
  document.addEventListener('studio:texture', e => { textureEnabled = e.detail.enabled; updateMaterials(); });
  document.addEventListener('studio:bump', e => { bumpEnabled = e.detail.enabled; updateMaterials(); });
  document.addEventListener('studio:bump-strength', e => { leatherMat.bumpScale = e.detail.value; });
  document.addEventListener('studio:inset', e => { inset = e.detail.enabled; });
  document.addEventListener('studio:tab', e => { if(e.detail.tab === 'material') focus('sofa'); else if(e.detail.tab === 'light') focus('room'); });
  applyLight();

  canvas.addEventListener('pointerdown', e => {
    canvas.setPointerCapture(e.pointerId);
    pointerPositions.set(e.pointerId, {x:e.clientX,y:e.clientY});
  });
  canvas.addEventListener('pointermove', e => {
    if(!pointerPositions.has(e.pointerId)) return;
    e.preventDefault();
    const last = pointerPositions.get(e.pointerId);
    const dx = e.clientX - last.x, dy = e.clientY - last.y;
    if(pointerPositions.size === 1) {
      orbit.yaw = clamp(orbit.yaw - dx*.006, -1.0, 1.0);
      orbit.pitch = clamp(orbit.pitch + dy*.004, -.12, .95);
    } else if(pointerPositions.size === 2) {
      const other = Array.from(pointerPositions.entries()).find(([id]) => id !== e.pointerId)?.[1];
      if(other) {
        const previous = Math.hypot(last.x-other.x,last.y-other.y);
        const next = Math.hypot(e.clientX-other.x,e.clientY-other.y);
        if(previous > 10 && next > 10) zoom(previous/next);
      }
    }
    pointerPositions.set(e.pointerId, {x:e.clientX,y:e.clientY});
  }, {passive:false});
  const releasePointer = e => pointerPositions.delete(e.pointerId);
  canvas.addEventListener('pointerup',releasePointer);
  canvas.addEventListener('pointercancel',releasePointer);
  canvas.addEventListener('lostpointercapture',releasePointer);
  canvas.addEventListener('wheel',e=> { e.preventDefault(); zoom(Math.exp(e.deltaY*.001)); },{passive:false});
  canvas.addEventListener('webglcontextlost', e => { e.preventDefault(); showError('The browser lost its WebGL graphics context. Refresh this page to restart the 3D scene.'); });

  let width = 0, height = 0;
  const stage = canvas.parentElement;
  function resize() {
    const rect = stage.getBoundingClientRect();
    width = Math.max(1, Math.floor(rect.width)); height = Math.max(1, Math.floor(rect.height));
    renderer.setSize(width,height,false);
  }
  new ResizeObserver(resize).observe(stage);
  resize();
  loading.hidden = true;
  document.getElementById('stage-hint').textContent = ('ontouchstart' in window) ? 'DRAG TO ROTATE · PINCH TO ZOOM' : 'DRAG TO ORBIT · SCROLL TO ZOOM';

  function animate() {
    requestAnimationFrame(animate);
    if (document.hidden || errorPanel.hidden === false) return;
    orbit.target.lerp(orbit.desiredTarget,.12);
    orbit.distance += (orbit.desiredDistance-orbit.distance)*.13;
    camera.position.set(orbit.target.x + Math.sin(orbit.yaw)*Math.cos(orbit.pitch)*orbit.distance,
      orbit.target.y + Math.sin(orbit.pitch)*orbit.distance,
      orbit.target.z + Math.cos(orbit.yaw)*Math.cos(orbit.pitch)*orbit.distance);
    camera.lookAt(orbit.target);

    const fullW = Math.max(1,width), fullH = Math.max(1,height);
    const left = inset ? .10 : 0, bottom = inset ? .10 : 0;
    const viewportW = inset ? .80 : 1, viewportH = inset ? .80 : 1;
    camera.aspect = (fullW*viewportW)/(fullH*viewportH);
    camera.updateProjectionMatrix();
    renderer.setScissorTest(false);
    renderer.setViewport(0,0,fullW,fullH);
    renderer.clear();
    renderer.setViewport(Math.floor(left*fullW), Math.floor(bottom*fullH), Math.floor(viewportW*fullW), Math.floor(viewportH*fullH));
    renderer.setScissor(Math.floor(left*fullW),Math.floor(bottom*fullH),Math.floor(viewportW*fullW),Math.floor(viewportH*fullH));
    renderer.setScissorTest(true);
    renderer.render(scene,camera);
    renderer.setScissorTest(false);
  }
  animate();
}

start().catch(err=>{ console.error('Furniture Studio initialization failed',err); showError(err?.message || 'The scene could not be loaded. Please reload and try again.'); });
