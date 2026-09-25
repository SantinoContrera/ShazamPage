# AGENTS.md
# SHAZAM — INTERACTIVE 3D WEB INFOGRAPHIC
# MASTER PROJECT SPECIFICATION

---

# 1. PROJECT OVERVIEW

This project is an **interactive web-based 3D infographic** about Shazam, its evolution and how its technology/functionality works.

This is a **WEB APPLICATION**, not a standalone Three.js experiment.

The final experience will run inside a web browser and will combine:

- Three.js 3D graphics
- procedural lightning
- cinematic camera movement
- HTML
- CSS
- JavaScript
- interactive infographic content

The visual concept is inspired by:

- Skyrim's constellation / perk-tree presentation
- supernatural lightning
- cinematic videogame interfaces
- dark cosmic environments
- elegant high-end interactive infographics

The experience should NOT feel like a conventional website.

It should feel like an **interactive visual artifact / videogame interface presented as a website**.

The project must prioritize:

- visual quality
- spatial composition
- cinematic camera movement
- smooth interaction
- clarity
- strong visual hierarchy
- precise geometry
- performance
- clean implementation
- responsive web behavior

The final experience must work as a browser-based interactive page.

---

# 2. WEB APPLICATION ARCHITECTURE

The project must be structured as a web application.

Three.js is responsible for the 3D visual world.

HTML/CSS will eventually be responsible for:

- text
- information panels
- labels
- diagrams
- charts
- interface elements
- typography
- informational overlays

JavaScript controls:

- application logic
- Three.js scene
- camera
- interaction
- animation
- synchronization between 3D elements and HTML/CSS

The architecture must keep the 3D scene and the future HTML/CSS layer conceptually separate.

The 3D world must not depend on hardcoded HTML pixel coordinates.

Future HTML elements must be able to reference stable 3D world-space anchors.

---

# 3. CURRENT DEVELOPMENT PHASE

The current development phase is ONLY the 3D visual foundation.

The immediate objective is to build:

1. The Shazam S lightning structure
2. The canonical S geometry
3. The procedural lightning system
4. The four infographic node positions
5. The spatial environment
6. The polygonal metallic frame
7. The camera system
8. The camera transitions
9. Stable world-space coordinates
10. Anchors for future HTML/CSS content

DO NOT currently implement the final information content.

DO NOT currently implement:

- final infographic text
- charts
- pie charts
- technical diagrams
- final HTML content
- final CSS layout
- navigation menus
- external navigation
- registration
- authentication
- unrelated website functionality

The current goal is to create the **complete interactive 3D stage on which the future web infographic will be placed**.

---

# 4. TECHNOLOGY

The project must use:

- JavaScript
- Three.js
- Vite
- HTML
- CSS

Recommended supporting technologies:

- GSAP for cinematic camera and interface animation
- Three.js postprocessing
- UnrealBloomPass or an equivalent lightweight bloom solution

Do NOT use:

- Unity
- Blender
- Meshy
- external 3D models

The lightning must be generated procedurally using Three.js.

The project must remain browser-based.

Do not introduce unnecessary frameworks or libraries.

Prefer the simplest technology that solves the problem correctly.

---

# 5. AUTHORITATIVE VISUAL REFERENCE

The project contains the following exact reference file:

`shazam_s_reference.jpg`

This file is the PRIMARY and AUTHORITATIVE visual reference for the project.

The reference is not merely an inspiration.

It defines the intended:

- S silhouette
- proportions
- composition
- lightning arrangement
- visual density
- node placement
- spatial relationships
- atmosphere
- visual hierarchy
- frame relationship
- future graphic placement

Whenever there is uncertainty about the visual direction, consult:

`shazam_s_reference.jpg`

Do not replace its visual language with a generic interpretation.

Do not redesign the S from memory.

Do not create a generic letter S.

Do not assume a standard typography-based S is sufficient.

The project must visually derive its main structure from the reference.

---

# 6. CORE CONCEPT

The entire interactive experience is organized around a gigantic supernatural lightning formation shaped like the Shazam S.

The S is the primary spatial structure.

The S is NOT simply a decorative object.

It is the navigation structure of the infographic.

The four historical/informational points are represented by nodes positioned along the S.

The user initially sees the complete structure.

The initial camera must communicate the complete composition.

Then the camera can travel toward individual nodes.

Each node becomes the visual focus of the scene.

The surrounding lightning must remain sufficiently visible to preserve spatial context.

The experience should feel like navigating a three-dimensional constellation or knowledge tree.

---

# 7. CANONICAL S GEOMETRY — ABSOLUTE PRIORITY

The S geometry is the most important technical requirement.

The project must have a SINGLE canonical representation of the S.

The canonical S path is the SINGLE SOURCE OF TRUTH.

All of the following must derive from this structure:

- main lightning
- secondary lightning
- particles
- node positions
- camera targets
- camera positions
- future infographic anchors
- spatial composition

Correct architecture:

REFERENCE IMAGE
        ↓
CANONICAL S GEOMETRY
        ↓
MAIN LIGHTNING
        ↓
SECONDARY LIGHTNING
        ↓
PARTICLES
        ↓
NODE POSITIONS
        ↓
CAMERA TARGETS
        ↓
FUTURE HTML/CSS ANCHORS

Do NOT manually position unrelated systems independently.

Changing the canonical S geometry should update dependent systems.

The designer must be able to locate and edit the canonical S easily.

Recommended location:

`src/scene/shazamPath.js`

or another clearly named equivalent.

---

# 8. TOP-DOWN SILHOUETTE

The S must FIRST be solved as a 2D composition.

The most important verification view is a perfectly top-down camera.

When viewed directly from above:

THE COMPLETE LIGHTNING STRUCTURE MUST CLEARLY READ AS THE SHAZAM S FROM:

`shazam_s_reference.jpg`

The top-down silhouette has higher priority than:

- depth
- particles
- bloom
- lighting
- atmosphere
- secondary effects

3D effects must never destroy the S silhouette.

Depth, noise, particles and secondary branches must remain subordinate to the canonical S.

The development process must therefore begin with:

1. canonical 2D S path
2. top-down validation
3. main lightning
4. secondary lightning
5. 3D depth
6. visual effects

---

# 9. CANONICAL COORDINATE SYSTEM

Use a clear world-space coordinate system.

Recommended:

- X = horizontal
- Y = vertical
- Z = depth

The canonical S path should primarily exist on the XY plane.

Z should be used for controlled 3D depth.

The canonical S coordinates must be clearly identifiable in the code.

Do not hide the S geometry inside complicated procedural systems.

The coordinates must be easy for a designer to modify.

---

# 10. LIGHTNING SYSTEM

The lightning must look like supernatural electrical energy.

It must NOT look like:

- a simple glowing line
- a neon tube
- a generic spline
- a laser
- a smooth electric cable

The lightning should contain:

- a dominant main electrical path
- irregular angular segments
- smaller branching bolts
- controlled randomness
- varying thickness
- varying brightness
- concentrated energy around important areas
- subtle animated electrical instability

The main lightning must preserve the canonical S silhouette.

Randomness must be controllable and preferably deterministic.

Important visual parameters must be exposed clearly.

Example:

```js
const LIGHTNING_CONFIG = {
    thickness: ...,
    branchDensity: ...,
    branchLength: ...,
    jitter: ...,
    glowIntensity: ...,
    animationSpeed: ...,
    segmentCount: ...,
    particleDensity: ...
};

# AGENTS.md
# SHAZAM — INTERACTIVE 3D WEB INFOGRAPHIC
# MASTER PROJECT SPECIFICATION

---

# 1. PROJECT OVERVIEW

This project is an **interactive web-based 3D infographic** about Shazam, its evolution and how its technology/functionality works.

This is a **WEB APPLICATION**, not a standalone Three.js experiment.

The final experience will run inside a web browser and will combine:

- Three.js 3D graphics
- procedural lightning
- cinematic camera movement
- HTML
- CSS
- JavaScript
- interactive infographic content

The visual concept is inspired by:

- Skyrim's constellation / perk-tree presentation
- supernatural lightning
- cinematic videogame interfaces
- dark cosmic environments
- elegant high-end interactive infographics

The experience should NOT feel like a conventional website.

It should feel like an **interactive visual artifact / videogame interface presented as a website**.

The project must prioritize:

- visual quality
- spatial composition
- cinematic camera movement
- smooth interaction
- clarity
- strong visual hierarchy
- precise geometry
- performance
- clean implementation
- responsive web behavior

The final experience must work as a browser-based interactive page.

---

# 2. WEB APPLICATION ARCHITECTURE

The project must be structured as a web application.

Three.js is responsible for the 3D visual world.

HTML/CSS will eventually be responsible for:

- text
- information panels
- labels
- diagrams
- charts
- interface elements
- typography
- informational overlays

JavaScript controls:

- application logic
- Three.js scene
- camera
- interaction
- animation
- synchronization between 3D elements and HTML/CSS

The architecture must keep the 3D scene and the future HTML/CSS layer conceptually separate.

The 3D world must not depend on hardcoded HTML pixel coordinates.

Future HTML elements must be able to reference stable 3D world-space anchors.

---

# 3. CURRENT DEVELOPMENT PHASE

The current development phase is ONLY the 3D visual foundation.

The immediate objective is to build:

1. The Shazam S lightning structure
2. The canonical S geometry
3. The procedural lightning system
4. The four infographic node positions
5. The spatial environment
6. The polygonal metallic frame
7. The camera system
8. The camera transitions
9. Stable world-space coordinates
10. Anchors for future HTML/CSS content

DO NOT currently implement the final information content.

DO NOT currently implement:

- final infographic text
- charts
- pie charts
- technical diagrams
- final HTML content
- final CSS layout
- navigation menus
- external navigation
- registration
- authentication
- unrelated website functionality

The current goal is to create the **complete interactive 3D stage on which the future web infographic will be placed**.

---

# 4. TECHNOLOGY

The project must use:

- JavaScript
- Three.js
- Vite
- HTML
- CSS

Recommended supporting technologies:

- GSAP for cinematic camera and interface animation
- Three.js postprocessing
- UnrealBloomPass or an equivalent lightweight bloom solution

Do NOT use:

- Unity
- Blender
- Meshy
- external 3D models

The lightning must be generated procedurally using Three.js.

The project must remain browser-based.

Do not introduce unnecessary frameworks or libraries.

Prefer the simplest technology that solves the problem correctly.

---

# 5. AUTHORITATIVE VISUAL REFERENCE

The project contains the following exact reference file:

`shazam_s_reference.jpg`

This file is the PRIMARY and AUTHORITATIVE visual reference for the project.

The reference is not merely an inspiration.

It defines the intended:

- S silhouette
- proportions
- composition
- lightning arrangement
- visual density
- node placement
- spatial relationships
- atmosphere
- visual hierarchy
- frame relationship
- future graphic placement

Whenever there is uncertainty about the visual direction, consult:

`shazam_s_reference.jpg`

Do not replace its visual language with a generic interpretation.

Do not redesign the S from memory.

Do not create a generic letter S.

Do not assume a standard typography-based S is sufficient.

The project must visually derive its main structure from the reference.

---

# 6. CORE CONCEPT

The entire interactive experience is organized around a gigantic supernatural lightning formation shaped like the Shazam S.

The S is the primary spatial structure.

The S is NOT simply a decorative object.

It is the navigation structure of the infographic.

The four historical/informational points are represented by nodes positioned along the S.

The user initially sees the complete structure.

The initial camera must communicate the complete composition.

Then the camera can travel toward individual nodes.

Each node becomes the visual focus of the scene.

The surrounding lightning must remain sufficiently visible to preserve spatial context.

The experience should feel like navigating a three-dimensional constellation or knowledge tree.

---

# 7. CANONICAL S GEOMETRY — ABSOLUTE PRIORITY

The S geometry is the most important technical requirement.

The project must have a SINGLE canonical representation of the S.

The canonical S path is the SINGLE SOURCE OF TRUTH.

All of the following must derive from this structure:

- main lightning
- secondary lightning
- particles
- node positions
- camera targets
- camera positions
- future infographic anchors
- spatial composition

Correct architecture:

REFERENCE IMAGE
        ↓
CANONICAL S GEOMETRY
        ↓
MAIN LIGHTNING
        ↓
SECONDARY LIGHTNING
        ↓
PARTICLES
        ↓
NODE POSITIONS
        ↓
CAMERA TARGETS
        ↓
FUTURE HTML/CSS ANCHORS

Do NOT manually position unrelated systems independently.

Changing the canonical S geometry should update dependent systems.

The designer must be able to locate and edit the canonical S easily.

Recommended location:

`src/scene/shazamPath.js`

or another clearly named equivalent.

---

# 8. TOP-DOWN SILHOUETTE

The S must FIRST be solved as a 2D composition.

The most important verification view is a perfectly top-down camera.

When viewed directly from above:

THE COMPLETE LIGHTNING STRUCTURE MUST CLEARLY READ AS THE SHAZAM S FROM:

`shazam_s_reference.jpg`

The top-down silhouette has higher priority than:

- depth
- particles
- bloom
- lighting
- atmosphere
- secondary effects

3D effects must never destroy the S silhouette.

Depth, noise, particles and secondary branches must remain subordinate to the canonical S.

The development process must therefore begin with:

1. canonical 2D S path
2. top-down validation
3. main lightning
4. secondary lightning
5. 3D depth
6. visual effects

---

# 9. CANONICAL COORDINATE SYSTEM

Use a clear world-space coordinate system.

Recommended:

- X = horizontal
- Y = vertical
- Z = depth

The canonical S path should primarily exist on the XY plane.

Z should be used for controlled 3D depth.

The canonical S coordinates must be clearly identifiable in the code.

Do not hide the S geometry inside complicated procedural systems.

The coordinates must be easy for a designer to modify.

---

# 10. LIGHTNING SYSTEM

The lightning must look like supernatural electrical energy.

It must NOT look like:

- a simple glowing line
- a neon tube
- a generic spline
- a laser
- a smooth electric cable

The lightning should contain:

- a dominant main electrical path
- irregular angular segments
- smaller branching bolts
- controlled randomness
- varying thickness
- varying brightness
- concentrated energy around important areas
- subtle animated electrical instability

The main lightning must preserve the canonical S silhouette.

Randomness must be controllable and preferably deterministic.

Important visual parameters must be exposed clearly.

Example:

```js
const LIGHTNING_CONFIG = {
    thickness: ...,
    branchDensity: ...,
    branchLength: ...,
    jitter: ...,
    glowIntensity: ...,
    animationSpeed: ...,
    segmentCount: ...,
    particleDensity: ...
};

# 11. PHASE 2 — MOCKUP-DRIVEN IMPLEMENTATION

The project is now entering the INFORMATIONAL INTERFACE AND MOCKUP IMPLEMENTATION PHASE.

The existing 3D foundation established during Phase 1 is considered stable and must NOT be redesigned unless explicitly requested.

From this phase onward, the informational experience will be implemented from specific visual mockups created by the designers.

The mockup is the ABSOLUTE SOURCE OF TRUTH for the visual result.

The objective is to reproduce each screen as faithfully and precisely as technically possible.

The agent must NOT:

- redesign the mockup
- improve the mockup
- reinterpret the visual design
- question the designer's decisions
- replace elements with alternatives
- simplify visual elements without authorization
- invent visual elements
- alter proportions arbitrarily
- introduce its own design language

The agent's expert judgment must be used ONLY to determine the best technical implementation of the design that has already been defined.

The final implementation must preserve:

- composition
- hierarchy
- proportions
- spacing
- typography
- scale
- positioning
- colors
- opacity
- depth
- visual relationships
- interaction behavior
- animation behavior
- transitions
- timing
- visual states

When an interaction or animation reference exists, the corresponding GIF, video or reference asset is the SOURCE OF TRUTH for that behavior.

The agent must reproduce the observed behavior as faithfully as technically possible.


# 12. NUCLEUS AND SCREEN STRUCTURE

The infographic is divided into four main NUCLEI.

Each NUCLEUS corresponds to one primary 3D node established during Phase 1.

Each NUCLEUS contains multiple sequential SCREENS.

Example:

NUCLEUS 1
↓
SCREEN 1
↓
SCREEN 2
↓
SCREEN 3
↓
SCREEN 4

The user progresses between screens using the internal NEXT / SIGUIENTE interaction.

Therefore:

- A NUCLEUS is an informational section.
- A SCREEN is one complete visual state inside that nucleus.
- A COMPONENT is an individual visual element inside a screen.
- An INTERACTION or ANIMATION REFERENCE defines how a component or screen behaves.

The number of screens may vary between nuclei.

The internal screen progression must remain separate from the primary 3D node navigation.

The primary navigation is:

NODE / NUCLEUS 1
↓
NODE / NUCLEUS 2
↓
NODE / NUCLEUS 3
↓
NODE / NUCLEUS 4

The internal navigation is:

SCREEN 1
↓
SCREEN 2
↓
SCREEN 3
↓
...

These two navigation systems must not be confused or merged.


# 13. SCREEN IMPLEMENTATION PROTOCOL

Every screen must be approached using the following sequence:

MOCKUP GENERAL
↓
SCREEN STRUCTURE
↓
COMPONENTS
↓
REFERENCED ASSETS
↓
INTERACTION / ANIMATION REFERENCES
↓
IMPLEMENTATION
↓
VISUAL VERIFICATION

Before modifying code, the agent MUST inspect all relevant reference files for the requested screen.

The agent must understand the complete screen first and then implement its individual components.

The general mockup defines the complete composition.

Specific component references define the appearance of individual elements.

GIF/video references define interaction and animation behavior.

The agent must NOT begin implementation based on an isolated component without first understanding its relationship to the complete screen.


# 14. REFERENCE FILE STRUCTURE

All visual references for the informational phase must be organized inside the `REFERENCES/` directory.

The reference structure is:

REFERENCES/
│
├── shazam_logo.jpg
│
├── MENU_INICIO/
│   └── pantalla_inicio_mockup.png
│
├── OVERVIEW/
│   └── overview_mockup.png
│
├── NUCLEO_1/
│   ├── PANTALLAS/
│   └── ASSETS_MOCKUPS/
│
├── NUCLEO_2/
│   ├── PANTALLAS/
│   └── ASSETS_MOCKUPS/
│
├── NUCLEO_3/
│   ├── PANTALLAS/
│   └── ASSETS_MOCKUPS/
│
└── NUCLEO_4/
    ├── PANTALLAS/
    └── ASSETS_MOCKUPS/

PANTALLAS/ contains the complete visual mockups of each screen.

ASSETS_MOCKUPS/ contains supporting visual assets, component references, graphics, animations, GIFs, videos and other files required to reproduce the screens.

The NUCLEO directory determines which informational section the reference belongs to.

The PANTALLAS directory determines the complete screen composition.

The ASSETS_MOCKUPS directory contains supporting references used by one or more screens within that nucleus.

The agent MUST use this structure when locating references.

Do NOT create alternative reference hierarchies unless explicitly requested.

`MENU_INICIO/` is a special-purpose reference directory used exclusively for the start screen of the experience.

It contains only the mockup of the MENU_INICIO screen.

Unlike NUCLEO_1, NUCLEO_2, NUCLEO_3 and NUCLEO_4, MENU_INICIO does not contain multiple screens or an `ASSETS_MOCKUPS/` directory.

Do NOT create additional screens, assets or subdirectories inside `MENU_INICIO/` unless explicitly requested.

`OVERVIEW/` is a special-purpose reference directory used exclusively for the main 3D overview screen of the experience.

OVERVIEW is independent from MENU_INICIO and from all four NUCLEOS.

It is NOT part of NUCLEO_1.

It contains only the mockup and any specific references required for the OVERVIEW screen.

The OVERVIEW represents the main 3D navigation state where the four NUCLEOS / NODES are presented.

Do NOT create an `OVERVIEW/` directory inside any NUCLEO.

Do NOT treat OVERVIEW as an informational screen belonging to a NUCLEO.


# 15. ASSET REFERENCE SYSTEM

When a prompt references an asset, the agent MUST locate and inspect the corresponding file before implementation.

Do NOT substitute an existing referenced asset with an approximation.

Reference assets may include:

- images
- graphics
- logos
- illustrations
- charts
- GIFs
- videos
- animation references
- interaction references
- interface elements
- typography references

The agent must preserve the relationship between each asset and the surrounding screen composition.

If a referenced asset exists, use the referenced asset.

Do NOT recreate an existing reference asset unnecessarily.

Do NOT replace a reference asset with a technically easier alternative unless explicitly authorized.


# 16. DESIGN FIDELITY

The goal is NOT to create something visually similar.

The goal is to reproduce the designer's intended result.

Priority:

1. Fidelity to the specific interaction or animation reference
2. Fidelity to specific component references
3. Fidelity to the general screen mockup
4. Existing approved project architecture and visual system
5. Technical implementation quality
6. Performance

Technical implementation decisions may differ internally from the mockup.

The visible result and behavior must NOT differ from the intended design.

The agent must not use its own aesthetic judgment to alter the final visual result.


# 17. INTERACTION AND ANIMATION REFERENCES

When a GIF, video or other interaction reference exists, the agent MUST inspect it before implementation.

The agent must identify and reproduce:

- initial state
- trigger
- hover behavior
- click behavior
- movement
- scale changes
- opacity changes
- transitions
- timing
- sequence
- final state

Interaction references are not inspiration.

They are behavioral references and must be reproduced as faithfully as possible.

If the reference shows a specific interaction, animation or transition, reproduce that behavior rather than replacing it with a generic equivalent.

The same principle applies to:

- buttons
- panels
- charts
- navigation
- hover states
- scrolling
- screen transitions
- animated graphics
- visual feedback


# 18. SCREEN-TO-SCREEN NAVIGATION

Screens inside a nucleus are sequential states.

Example:

NUCLEUS 1

SCREEN 1
↓
SIGUIENTE
↓
SCREEN 2
↓
SIGUIENTE
↓
SCREEN 3

The transition between screens must follow the intended behavior defined by the mockups and interaction references.

Do NOT automatically apply the same transition to every screen.

If a reference defines a specific transition, reproduce it.

If no specific transition is defined, use a simple transition consistent with the existing project visual system.

The NEXT / SIGUIENTE interaction must advance only through the intended screen sequence.

Screen navigation must not accidentally alter the primary node/nucleus progression.


# 19. SCREEN ISOLATION

When implementing a specific screen, modify only the systems necessary for that screen.

Do NOT unnecessarily modify:

- previously completed screens
- the canonical S
- established camera behavior
- existing node navigation
- approved logo implementation
- approved components
- unrelated nuclei
- unrelated screens

unless explicitly requested.

Each completed screen should remain stable before moving to the next screen.

Changes made for one screen must not introduce unintended visual or functional changes elsewhere in the experience.


# 20. SHARED TEAM IMPLEMENTATION STANDARD

The same protocol must be followed regardless of which team member gives the instruction.

Different team members must be able to provide the same references and obtain the same intended implementation.

The result must depend on:

- the reference files
- AGENTS.md
- the explicit task

and NOT on the personal interpretation of the person operating the agent.

The implementation process must therefore remain consistent across the entire team.


# 21. IMPLEMENTATION PROMPT STRUCTURE

Every implementation request should identify:

NUCLEUS:
SCREEN:
TASK:

GENERAL MOCKUP:
[filename]

COMPONENT REFERENCES:
[filenames]

INTERACTION / ANIMATION REFERENCES:
[filenames]

IMPLEMENTATION SCOPE:
[what must be implemented]

Example:

NUCLEUS: 1
SCREEN: 2

TASK:
Implement Screen 2 of Nucleus 1.

GENERAL MOCKUP:
nucleo1_pantalla2_mockup_general.png

COMPONENT REFERENCES:
nucleo1_pantalla2_grafico.png
nucleo1_pantalla2_iconos.png

INTERACTION / ANIMATION REFERENCES:
nucleo1_pantalla2_grafico_interaccion.gif

IMPLEMENTATION SCOPE:
Implement the complete screen and its interactions according to the provided references.

The agent MUST inspect all referenced files before implementation.


# 22. APPROVED DESIGN

Any element explicitly approved by the designers/user must be treated as established.

Do NOT modify approved elements without an explicit request.

New screens must integrate with the existing approved system rather than redesigning it.

An approved element is not an invitation for optimization, redesign or reinterpretation.

If a new screen requires integration with an approved element, preserve the approved element and adapt the new implementation around it.


# 23. FINAL PHASE 2 PRINCIPLE

The designer defines WHAT the screen must look and behave like.

The agent determines HOW to implement it technically.

The agent must not confuse these responsibilities.

The mockup defines the visual result.

The interaction and animation references define the behavioral result.

The agent's responsibility is to reproduce both as faithfully as technically possible.

The final objective is:

DESIGN REFERENCE
↓
PRECISE ANALYSIS
↓
TECHNICAL IMPLEMENTATION
↓
VISUAL VERIFICATION
↓
FAITHFUL VISUAL AND INTERACTIVE RESULT

# 24. TYPOGRAPHY

All text throughout the experience must use the "Roboto Mono" typeface.

Roboto Mono is the project's standard typography and must be used for:

- titles
- subtitles
- labels
- buttons
- informational text
- numbers
- dates
- technical information
- navigation text
- interface text
- any other visible text

Do NOT substitute Roboto Mono with another typeface.

The typography must remain visually consistent across the entire experience, including MENU_INICIO and all NUCLEOS.

If the required font files are not present in the project, do NOT silently replace the typeface with another font. Identify the missing dependency before implementation.

# 25. MENU INICIO

MENU_INICIO is the entry screen of the experience and exists outside of the four NUCLEOS.

Its visual source of truth is:

REFERENCES/MENU_INICIO/pantalla_inicio_mockup.png

The agent must inspect this mockup before implementing or modifying the start screen.

MENU_INICIO must not be treated as NUCLEO 1.

The transition from MENU_INICIO into the main 3D experience must preserve the behavior and visual intention defined by the mockup and any provided interaction or animation references.

Do NOT modify MENU_INICIO when implementing screens inside the NUCLEOS unless explicitly requested.

# COLOR AND VISUAL REFERENCE

Colors must be reproduced from the provided mockups as faithfully as technically possible.

The agent must visually analyze the mockup and reproduce:

- colors
- gradients
- opacity
- brightness
- glow
- contrast
- shadows
- highlights
- visual states

Do NOT invent a new color palette.

Do NOT replace colors with generic alternatives.

If a color is clearly defined by an existing approved project element, preserve that color for consistency.

The mockup is the source of truth for screen-specific colors.


# 18. OVERVIEW GENERAL TITLE & NUCLEI HOVER BEHAVIORAL RULES

The OVERVIEW screen operates under 5 strict visual states governing the General Overview Title and individual Nuclei Titles:

## 1. ESTADO 1 — OVERVIEW NORMAL
- Live 3D scene (canonical S lightning, 4 nodes, metallic frame, particles) is active and animating continuously.
- General Overview Title (`¡Esto me suena! / Shazam, origen y actualidad`) is visible at bottom center.
- Individual nuclei titles (`ORÍGENES →`) remain HIDDEN (`opacity: 0`).

## 2. ESTADO 2 — HOVER SOBRE NÚCLEO DESBLOQUEADO
- Live 3D scene remains active.
- General Overview Title remains visible.
- Individual nucleus title fades in (`opacity: 1`) ONLY when the cursor hovers over an UNLOCKED node in OVERVIEW.
- Locked nodes do NOT display titles or respond to hover.

## 3. ESTADO 3 — HOVER EXIT
- When the cursor leaves the unlocked node, the individual nucleus title smoothly fades out (`opacity: 0`).
- General Overview Title remains visible.

## 4. ESTADO 4 — ENTRADA / ZOOM AL NÚCLEO (CLICK)
- Clicking an unlocked node immediately hides the individual nucleus title AND the General Overview Title (`#overviewUI` hidden).
- 3D camera zoom/transition into node focus begins without any Overview titles floating or overlapping.

## 5. ESTADO 5 — REGRESO A OVERVIEW
- Returning to OVERVIEW restores the General Overview Title (`#overviewUI` visible).
- Individual nuclei titles reset to HIDDEN initially until the cursor hovers over an unlocked node again.
