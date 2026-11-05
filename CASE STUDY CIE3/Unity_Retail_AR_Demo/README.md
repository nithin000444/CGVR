[← Case-study hub](../README.md) · [Live mobile browser companion ↗](https://cgvr-furniture-studio.vercel.app/) · [Unity screenshot guide](../outputs/README.md)

# Unity Furniture Studio
### CGVR CIE3 — Case Study 3: Retail and Remote Commerce

**Munnaluri Rishikesh · 1RVU23CSE291 · CS4104 · Unity Editor 6000.3.0f1**

This is the working desktop **Unity** implementation of the furniture visualizer. It demonstrates a **custom Phong-style shader**, UV leather colour and normal mapping, and window-to-viewport mathematics.

> **Rendering scope:** Desktop interactive 3D graphics demonstration. This is not a device-tracked AR app and does not need a headset or an AR-enabled smartphone.

## Quick start

1. Download/extract the repository; open **Unity Hub → Add project from disk**.
2. Select this **`Unity_Retail_AR_Demo`** folder (contains `Assets/`, `Packages/` and `ProjectSettings/`) — not the repository root.
3. Use **Unity Editor 6000.3.0f1**, Built-in Render Pipeline; let scripts import.
4. Select **CGVR CIE3 → Open Furniture Visualizer**, or open `Assets/Scenes/CIE3_Retail_Furniture_Visualizer.unity`.
5. Press **Play** and choose the **Game** tab. Furniture, lighting, camera and UI are generated in Play mode; a sparse Scene before Play is expected.
6. Maximize the Game view with **Shift + Space** or the project's Game-view menu, if available.

**Do not rebuild the existing Unity scene** unless the saved scene is missing or corrupt. No external models/assets are required.

## Demonstration controls

| Key / gesture | Action |
|---|---|
| **R** | Return to the complete furniture room |
| **F** | Focus selected furniture |
| **Drag** / **scroll** | Orbit / zoom |
| **Left / Right** | Rotate selected furniture |
| **1 / 2 / 3** | Ambient only / ambient + diffuse / full Phong lighting |
| **T** | Toggle sofa colour texture |
| **B** | Toggle sofa bump/normal map |
| **V** | Show or hide window-to-viewport mapping |
| **P** / **Escape** | Presentation mode / restore controls in the newer source version |

Click in the Game view before using keyboard shortcuts. The earlier version's interface shows all controls simultaneously; the newer source adds presentation features and must be verified locally.

## Three learning outcomes

**01 · Illumination.** Compare ambient, diffuse and specular contributions on the red chair; use daylight/specular controls to see how lighting changes with normal and view direction.

**02 · Material detail.** The sofa's UV colour texture and tangent-space normal mapping alter the apparent material without subdividing the sofa mesh or increasing polygon count.

**03 · Viewport coordinates.** With window `[-1,1]×[-1,1]` and viewport x=`[70,1010]`, y=`[120,1800]`, a logical point `(0.25,-0.30)` maps to `(657.5,708.0)` px. The actual Unity camera viewport inset is a separate interactive comparison.

### Key implementation files

| File | Role |
|---|---|
| [Saved scene](Assets/Scenes/CIE3_Retail_Furniture_Visualizer.unity) | Entry point |
| [`RetailARCaseStudyDemo.cs`](Assets/Scripts/RetailARCaseStudyDemo.cs) | Room generation, camera, procedural materials, interaction & mapper |
| [`PhongFurniture.shader`](Assets/Shaders/PhongFurniture.shader) | Per-pixel ambient, diffuse and specular contributions |
| [`CIE3SceneBuilder.cs`](Assets/Editor/CIE3SceneBuilder.cs) | Editor menu and scene access |
| [`CIE3Validation.cs`](Assets/Editor/CIE3Validation.cs) | Optional scene/mapping checks |

## Actual Unity Play-mode screenshots — earlier build

| Room view | Close-up view |
|:---:|:---:|
| [![Earlier Unity room view](../outputs/unity_room_earlier_build.jpg)](../outputs/unity_room_overview_earlier_build.jpg) | [![Earlier Unity furniture closeup](../outputs/unity_closeup_earlier_build.jpg)](../outputs/unity_furniture_closeup_earlier_build.jpg) |

Both are crops from real **18 October 2026** owner-provided Unity Editor Play-mode screenshots. They predate the latest presentation changes and do not establish test coverage of the current code.

## Captures and verification

- **Previously observed:** project owner showed the earlier Unity build running in Play mode with the chair, sofa and mapping panel.
- **Now included:** two real, cropped screenshots of the earlier Unity build. **Still missing:** verified captures of the latest presentation improvements and lighting/material comparisons.
- **Not runtime-measured:** GPU frame rate, latency or phone-camera AR.

Capture the required modes using the [9-image evidence checklist](../outputs/README.md), preserving meaningful labels and input states. The files under `../Previews/` are **AI concepts**, never real Unity output.

For the wider assignment narrative, see [the CIE3 hub](../README.md) and [Unity-specific report](../UNITY_CASE_STUDY_REPORT.md). The separately hosted [mobile browser companion](https://cgvr-furniture-studio.vercel.app/) demonstrates related concepts without replacing this project.
