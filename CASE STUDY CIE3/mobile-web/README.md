[← Case-study hub](../README.md) · [Repository homepage](../../README.md)

# Furniture Studio · Mobile & Desktop Web

<p><a href="https://cgvr-furniture-studio.vercel.app/"><img alt="Launch live browser experience" src="https://img.shields.io/badge/LAUNCH%20LIVE%20DEMO-Open%20Furniture%20Studio-137d8e?style=for-the-badge"></a></p>

An independent, responsive **Three.js furniture studio** that runs in a normal desktop or phone browser. It supplements the existing Unity desktop project—without modifying it.

**Live URL:** **https://cgvr-furniture-studio.vercel.app/**

## Explore

| Capability | Interactions |
|---|---|
| **3D showroom** | Red chair, brown sofa, walls, rug, plant and window within a procedural scene |
| **Camera** | Drag a finger or mouse to orbit; pinch on mobile / scroll on desktop to zoom; reset or focus Room/Chair/Sofa |
| **Phong lighting** | Ambient-only, ambient + diffuse and full ambient + diffuse + specular; daylight and specular controls |
| **Leather surface** | Switch between plain and textured albedo; toggle bump mapping while preserving geometry |
| **Viewport transformation** | Move a logical point within `[-1,1]`, inspect calculated phone pixel coordinates and switch on inset viewport |

The default viewport example is `(0.25,-0.30) → (657.5,708.0)` for the defined phone display rectangle.

## Deployment and status

- **Production host:** Vercel · [open deployment](https://cgvr-furniture-studio.vercel.app/).
- The deployment was verified READY; the page and its `styles.css`, `scene.js` and `ui.js` files returned HTTP 200.
- **Not yet verified:** appearance and touch behavior on a physical iPhone/Android device. Capture and test on real devices before treating it as mobile acceptance-tested.
- **Not camera AR:** no phone-camera access, device tracking, plane detection, WebXR session or real-world furniture placement.

## Run it locally

No database, credentials, build command or dependency installation is required. Serve this folder over HTTP from the repository root:

```bash
python -m http.server 8000 --directory "CASE STUDY CIE3/mobile-web"
```

Open **http://localhost:8000/** on your computer. Opening `index.html` as a local `file://` URL may prevent JavaScript modules from loading.

**Runtime:** a modern WebGL-capable browser and internet access to load Three.js **0.186.1** from the pinned jsDelivr CDN.

## Architecture

```text
index.html  ── layout / accessible controls
styles.css  ── responsive visual system and mobile layout
ui.js       ── events, interaction state, logical-to-pixel mapping
scene.js    ── Three.js scene, cameras, lights, geometry, materials
```

The browser renderer is distinct from [Unity's custom furniture shader](../Unity_Retail_AR_Demo/README.md); they share the educational goals, not engine internals.

## Authentic visual evidence

The site is deployed; however, **no verified phone screenshot is currently included in GitHub**. See [evidence status](../../docs/EVIDENCE_STATUS.md) for the required capture. Do not use an AI poster as a device screenshot.

---

[Case study](../README.md) · [Unity source](../Unity_Retail_AR_Demo/README.md) · [Screenshot inventory](../../docs/SCREENSHOT_GALLERY.md)
