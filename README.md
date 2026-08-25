# Intellia Bar Graphs — Grade 3 Data Handling (Statistics)

**Topic:** Data Handling (Statistics) — **Title:** Constructing Bar Graphs

This module is a content adaptation of the original *Intellia 3D Shapes* app.
The **architecture, UI/UX, layout, colour system, gamification, and audio
pipeline are unchanged** — only the subject content, visuals, and datasets
have been replaced to teach bar graph construction and reading instead of
3D solids.

## What changed vs. the original module

| Area | Original | New |
|---|---|---|
| Topic | 3D Shapes (Cube/Cuboid/Cone/Sphere) | Bar Graphs (Title & Axes / Scale / Bars / Labels) |
| 3D viewer | `Shape3D.jsx` + `ShapeRotator.jsx` | `BarGraph3D.jsx` + `GraphRotator.jsx` (same drag-to-spin 3D engine, now renders extruded 3D bars) |
| Data file | `shapeData.js` | `graphData.js` (4 graph "parts" + 4 sample survey datasets) |
| Story slides | 4 slides about Cubo tidying shapes | 4 slides about Robo building a class survey into a bar graph, with 4 new custom cartoon SVG illustrations (20:8 ratio) |
| Simulate stations | Solid Spinner / Face & Corner Counter / Unfold & Match / Behaviour Sandbox | Graph Anatomy Spinner / Bar Value Reader / Match the Graph Parts / Construction Sandbox |
| Play worlds | 10 worlds about solids | 10 worlds about real-life survey data (Fruits, Pets, Weather, Sports, Books, Ice-cream, Traffic, Canteen, Travel Survey, Mystery Club) — 60 new questions |
| Badges | shape_explorer, shape_spotter, property_pro, geometry_master... | graph_explorer, bar_spotter, parts_pro, data_master... (same unlock logic) |
| Mascot | Cubo the robot | Robo the robot (same component, same moods/animations) |

Everything else — the CSS design system, XP/streak/lives/hints/badge logic,
phase navigation bar, drag-to-rotate 3D engine, ElevenLabs voice pipeline,
and localStorage session persistence — is structurally identical to the
original.

## Story illustrations

The 4 story-slide illustrations (`public/assets/images/slide*.svg`) are
**custom-built cartoon-style SVG art** at a 20:8 (2.5:1) aspect ratio,
matching the `story-img-bleed` container. This environment doesn't have
access to a raster image-generation model, so vector illustrations were
hand-built in the same colour palette as the rest of the app instead of
PNG/JPG files — visually they fill the same slot the same way.

## Audio / Voice setup (ElevenLabs)

The audio architecture is untouched: `src/utils/audio.js` still checks
`audioMap.js` for a pre-generated static file first, and falls back to a
live ElevenLabs request if nothing is cached.

Your ElevenLabs API key has been added to `.env.local` (already
`.gitignore`d, same as the original project — it's only read by the Node
offline-generation script, never bundled into client code).

**This sandbox has no outbound network access to elevenlabs.io**, so the
`.mp3` files could not be pre-generated here. `audioMap.js` currently ships
empty — the app will still talk, just via live dynamic ElevenLabs requests
on every line until you pre-generate the cache. To populate the zero-latency
static cache yourself, after unzipping:

```bash
npm install
node scripts/generate_audio.js   # generates every static line into public/assets/audio + audioMap.js
node scripts/clean_audio.js      # optional: removes any orphaned mp3s
```

`scripts/generate_audio.js` now automatically pulls in **every question,
hint, UI narration line, and dataset title** from `questionBank.js` and
`graphData.js` — so re-running it after any future content edit keeps the
cache in sync automatically (no need to hand-maintain a phrases list).

## Running the app

```bash
npm install
npm run dev
```
