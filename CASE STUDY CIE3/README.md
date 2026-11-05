[← Repository Home](../README.md) · [Technical
Manual](../docs/MANUAL.md) · [Live Browser Demo
↗](https://cgvr-mobile-web.vercel.app/) · [Evidence
Guide](outputs/README.md)

# Furniture Studio

### CIE3 · Case Study 3 --- Retail and Remote Commerce

**CS4104 · Computer Graphics & Virtual Reality · RV University,
Bengaluru**

**Student:** Nithin S · **Unity Version:** 6000.3.0f1

[![Open live
demo](https://img.shields.io/badge/OPEN%20LIVE%20DEMO-Mobile%20%2B%20Desktop-137d8e?style=for-the-badge)](https://cgvr-mobile-web.vercel.app/)
[![Unity
project](https://img.shields.io/badge/UNITY-DESKTOP%20PROJECT-455d82?style=for-the-badge)](Unity_Retail_AR_Demo/README.md)

> **Project overview:** This case study examines how a furniture
> retailer can allow customers to preview a **red velvet chair** and a
> **leather sofa** in a virtual home environment. The project
> demonstrates lighting models, realistic-looking surface materials and
> coordinate mapping across display sizes.

## Two ways to experience the project

  ----------------------------------------------------------------------------------
  Browser-based studio                        Unity desktop application
  ------------------------------------------- --------------------------------------
  **[Open the interactive showroom            **[View the Unity project
  ↗](https://cgvr-mobile-web.vercel.app/)**   →](Unity_Retail_AR_Demo/README.md)**

  A responsive Three.js experience for        A procedural furniture room featuring
  desktop browsers and touch-enabled phones.  a custom Phong-style shader, UV
  Users can rotate and zoom the camera,       texture and normal mapping, together
  adjust lighting, inspect materials and try  with window-to-viewport controls.
  coordinate mapping.                         

  **Status:** Published on Vercel. Physical   **Status:** An earlier build was
  iOS and Android interactions still need to  viewed in Unity Play mode. Later
  be tested.                                  changes should be verified in the
                                              local Unity Editor.
  ----------------------------------------------------------------------------------

**Scope note:** These are educational 3D demonstrations. They do not
provide live camera-based augmented reality, real-world furniture
placement, environment tracking or a tracked WebXR headset experience.

## Faculty report

The written report and supporting documents are available in the
repository:

-   [Faculty report folder](Faculty_Report/README.md)
-   [PDF
    report](Faculty_Report/CS4104_CIE3_Retail_and_Remote_Commerce_RVU_Format_Rishikesh.pdf)
-   [Editable Word
    report](Faculty_Report/CS4104_CIE3_Retail_and_Remote_Commerce_RVU_Format_Rishikesh.docx)

The report discusses the three graphics topics and contains screenshots
from an earlier Unity build. The faculty guide placeholder and
certificate are not signed or finalized.

## Three computer-graphics requirements

  -----------------------------------------------------------------------
  Topic                   Technique               Demonstration
  ----------------------- ----------------------- -----------------------
  **01 --- Illumination   Ambient, Lambertian     Compare modes 1, 2 and
  and colour models**     diffuse and             3 in Unity, or use the
                          view-dependent specular browser studio's
                          reflection              Lighting controls.

  **02 --- Texture and    UV-mapped leather       Toggle the sofa texture
  bump mapping**          albedo and              with **T** and bump
                          shading-normal          mapping with **B**.
                          perturbation            These alter the surface
                                                  appearance without
                                                  increasing the mesh
                                                  polygon count.

  **03 ---                Affine conversion from  Use logical point
  Window-to-viewport      logical window          **(0.25, −0.30)** and
  transformation**        coordinates to a screen inspect the example
                          rectangle               pixel result **(657.5,
                                                  708.0)**.
  -----------------------------------------------------------------------

### Phong illumination

![Conceptual illustration of ambient, diffuse and specular contributions
--- not an application
screenshot](../docs/assets/illumination-model.svg)

The lighting model combines ambient, diffuse and specular contributions:

``` text
I = Ia · ka + Ip · [kd · max(N·L, 0) + ks · max(R·V, 0)^n]
      ambient          diffuse             specular
```

The project separates these lighting components so users can compare
their effects on the chair. The browser and Unity versions demonstrate
related ideas, but their shading implementations are not identical.

### Leather texture and bump mapping

UV coordinates define how a two-dimensional leather colour image is
placed over the sofa. Bump or normal mapping changes the normals used in
lighting calculations, creating the appearance of fine surface detail
**without adding vertices to the sofa mesh**. These techniques affect
shading and do not physically change the object's silhouette.

### Window-to-viewport mapping

![Conceptual illustration of logical window coordinates mapped to a
phone pixel viewport](../docs/assets/window-viewport.svg)

``` text
Logical window: xw, yw in [-1, +1]
Pixel viewport: x = 70 to 1010; y = 120 to 1800

Input: xw = +0.25; yw = -0.30

xv = 70  + (0.25 + 1) / 2 × (1010 − 70)  = 657.5
yv = 120 + (−0.30 + 1) / 2 × (1800 − 120) = 708.0
```

This is a mathematical phone-viewport example. It does not mean that the
application accessed a physical phone camera.

## Suggested demonstration sequence

For the complete four-minute presentation script, comparison
instructions and viva preparation, refer to the [Demonstration
Guide](../docs/DEMONSTRATION_GUIDE.md). The [Architecture
Guide](../docs/ARCHITECTURE.md) describes the Unity shader structure and
browser interaction flow.

1.  **Show the room:** Open the showroom and display the chair and sofa
    together. Rotate and zoom the camera.
2.  **Compare lighting:** Demonstrate ambient-only, diffuse and specular
    modes.
3.  **Inspect the material:** Focus on the leather sofa and switch its
    colour texture on and off.
4.  **Show surface detail:** Toggle bump mapping while keeping the
    camera at a similar angle.
5.  **Explain coordinate mapping:** Change the logical coordinates,
    reset them to **(0.25, −0.30)** and explain the calculated pixel
    position.
6.  **Conclude:** Return to the room view and describe the different
    roles of the browser and Unity demonstrations.

## Main implementation resources

  ---------------------------------------------------------------------------------------------
  Resource                                                  Description
  --------------------------------------------------------- -----------------------------------
  [Unity desktop project](Unity_Retail_AR_Demo/README.md)   Scene setup, C# scripts, shader and
                                                            interaction controls

  [Live browser                                             Published Three.js furniture studio
  showroom](https://cgvr-mobile-web.vercel.app/)            

  [Browser source and setup](mobile-web/README.md)          HTML, CSS, JavaScript and local run
                                                            instructions

  [Unity case study report](UNITY_CASE_STUDY_REPORT.md)     Written analysis of the Unity
                                                            implementation

  [Earlier case study report](CASE_STUDY_REPORT.md)         Previous Python and conceptual
                                                            analysis

  [Evidence capture guide](outputs/README.md)               Instructions for capturing project
                                                            screenshots

  [Project source                                           ZIP archive of the Unity project
  archive](CGVR_CIE3_Unity_Project_Source_and_Report.zip)   source and report
  ---------------------------------------------------------------------------------------------

## Visual references and project evidence

### Unity Play mode --- earlier-build screenshots

The repository includes cropped screenshots from an earlier Unity
Game-view build, captured during project work on 18 October 2026. They
show the earlier furniture visualizer and should not be treated as proof
that later presentation-mode changes were tested.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                          Room overview                                                                                    Furniture close-up
  --------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------
                                      [![Earlier Unity room                                                                            [![Earlier Unity furniture
   view](outputs/unity_room_earlier_build.jpg)](outputs/unity_room_overview_earlier_build.jpg)   close-up](outputs/unity_closeup_earlier_build.jpg)](outputs/unity_furniture_closeup_earlier_build.jpg)

                               Chair and sofa visible in the room                                                            Closer view of the red chair and leather sofa
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[View the original capture notes](outputs/README.md).

### Design illustrations --- conceptual only

The optional room and material illustrations are AI-assisted design
references. They are not Unity Play-mode screenshots, measured results
or proof of the final interface.

```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}View the optional concept
illustrations`</strong>`{=html}
```{=html}
</summary>
```
  ---------------------------------------------------------------------------------------------------------
                     Room concept                                       Material concept
  -------------------------------------------------- ------------------------------------------------------
     ![Illustrative room concept --- not a Unity        ![Illustrative material concept --- not a Unity
   screenshot](Previews/generated-room-preview.png)   screenshot](Previews/generated-material-preview.png)

                Concept reference only                               Concept reference only
  ---------------------------------------------------------------------------------------------------------

```{=html}
</details>
```
### Evidence still to be collected

-   The existing Unity screenshots document an earlier desktop build.
    They do not verify newer controls or lighting-comparison modes.
-   The `outputs/` folder includes a [nine-image capture
    guide](outputs/README.md). Confirm that each image exists before
    linking to it.
-   The browser application is deployed, but a screenshot captured and
    verified on a physical phone has not yet been added to the
    repository.

See the [Evidence Status document](../docs/EVIDENCE_STATUS.md) for the
current inventory and remaining captures.

## Technical scope and limitations

-   **Included:** Procedural room and furniture models, lighting and
    material comparisons, camera and selection controls, and
    mathematical viewport mapping.
-   **Not included:** Live camera AR, SLAM or environmental tracking,
    real-world occlusion estimation, WebXR headset support, or measured
    production frame-rate results.
-   The browser application is an additional demonstration and does not
    modify the Unity project.
-   Earlier Python scripts and concept illustrations remain supporting
    material; they are not substitutes for the Unity implementation.
-   Use the updated faculty report in `Faculty_Report/` when sharing the
    written submission. Do not confuse it with the earlier Python
    report.

------------------------------------------------------------------------

**CS4104 --- Computer Graphics & Virtual Reality \| Nithin S · RV
University**

[Repository Home](../README.md) · [Unity
Project](Unity_Retail_AR_Demo/README.md) · [Browser
Studio](mobile-web/README.md)
