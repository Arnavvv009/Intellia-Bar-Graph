import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import dotenv from 'dotenv';
import slugify from 'slugify';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { questionBank, WORLD_DATASETS } from '../src/data/questionBank.js';
import { DATASETS } from '../src/data/graphData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: '.env.local' });

const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2';
const MODEL_ID = 'eleven_multilingual_v2';

const voiceSettings = {
  celebration: { stability: 0.12, similarity_boost: 0.45, style: 0.75, use_speaker_boost: true },
  encouragement: { stability: 0.16, similarity_boost: 0.50, style: 0.65, use_speaker_boost: true },
  question: { stability: 0.20, similarity_boost: 0.55, style: 0.55, use_speaker_boost: true },
  emphasis: { stability: 0.16, similarity_boost: 0.50, style: 0.60, use_speaker_boost: true },
  thinking: { stability: 0.24, similarity_boost: 0.60, style: 0.35, use_speaker_boost: true },
  statement: { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
  instruction: { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true }
};

// ---- Static UI narration (Wonder / Story / Simulate / Play / Reflect chrome) ----
const uiPhrases = [
  // Wonder Phase
  { text: "Class 3A asked their friends: what is your favourite fruit? They wrote tally marks on a page, but nobody could tell which fruit won at a glance. How can we turn these tally marks into a picture that tells the story instantly?", style: 'question' },
  { text: "A Bar Graph! Tall bars for popular fruits, short bars for less popular ones. Let's explore how to build one in the story.", style: 'celebration' },

  // Story Phase Slides (paragraph text only, matches on-screen body copy)
  { text: "Class 3A asked their friends about their favourite fruit and made tally marks. Robo says every survey needs to be collected fairly and counted carefully before it becomes a graph!", style: 'statement' },
  { text: "Every bar graph needs a Title, a horizontal x-axis for categories, and a vertical y-axis for the scale. Robo always draws these first, like building the frame of a house before decorating it.", style: 'statement' },
  { text: "Robo picks a scale that goes up in equal jumps — 0, 2, 4, 6, 8, 10 — then draws each bar to match its data value. Every bar is the same width, with the same gap in between, only the height changes!", style: 'statement' },
  { text: "Once every bar is labelled, the graph tells its own story! Banana got the tallest bar with 10 votes, and Papaya the shortest with just 2. Now anyone can read the results in seconds — no counting tallies needed!", style: 'statement' },

  // Simulate Phase Stations
  { text: "Welcome to the Graph Anatomy Spinner! Drag the graph to spin it, and toggle highlights to explore the title, axes, scale, bars and labels.", style: 'instruction' },
  { text: "In the Bar Value Reader, let's read the data. Tap on a bar or use the number pad to fill in its value.", style: 'instruction' },
  { text: "Let's match the graph parts. Match each description on the left with its correct part name on the right.", style: 'instruction' },
  { text: "Welcome to the Construction Sandbox! Tell me which bars are tallest, even, or above average, then click watch it to see them grow!", style: 'instruction' },

  // Play Phase praises / feedback
  { text: "Excellent!", style: 'celebration' },
  { text: "Well done!", style: 'celebration' },
  { text: "Brilliant!", style: 'celebration' },
  { text: "You got it!", style: 'celebration' },
  { text: "Super smart!", style: 'celebration' },
  { text: "Great reading!", style: 'celebration' },
  { text: "Oh no! You have run out of hearts. Let's retry this world.", style: 'statement' },

  // Reflect Phase
  { text: "Amazing work! Let's reflect on everything you've learned about bar graphs.", style: 'celebration' },
];

// ---- Dataset titles spoken when switching survey topics in Simulate Phase ----
const datasetTitlePhrases = Object.values(DATASETS).map(d => ({ text: d.title, style: 'statement' }));

// ---- Question Bank narration: question text + both hints (paragraph/question content only) ----
const questionPhrases = questionBank.flatMap(q => ([
  { text: q.questionText, style: 'question' },
  { text: q.hint1, style: 'thinking' },
  { text: q.hint2, style: 'thinking' },
]));

const phrases = [...uiPhrases, ...datasetTitlePhrases, ...questionPhrases];

const API_KEY = process.env.VITE_ELEVENLABS_API_KEY;
const AUDIO_DIR = join(__dirname, '..', 'public', 'assets', 'audio');
const AUDIO_MAP_PATH = join(__dirname, '..', 'src', 'utils', 'audioMap.js');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateAudio() {
  if (!API_KEY) {
    console.error('Error: VITE_ELEVENLABS_API_KEY not found in .env.local');
    process.exit(1);
  }

  if (!existsSync(AUDIO_DIR)) {
    await mkdir(AUDIO_DIR, { recursive: true });
  }

  const audioMap = {};

  for (let i = 0; i < phrases.length; i++) {
    const { text, style } = phrases[i];
    const settings = voiceSettings[style] || voiceSettings.statement;
    const slug = slugify(text.toLowerCase(), { replacement: '_', lower: true, strict: true });
    const filename = `${slug}_${i}.mp3`;
    const filePath = join(AUDIO_DIR, filename);

    try {
      console.log(`Generating ${i + 1}/${phrases.length}: "${text}" (${style})...`);

      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': API_KEY
          },
          body: JSON.stringify({
              text,
              model_id: MODEL_ID,
              voice_settings: settings
            })
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const buffer = await response.arrayBuffer();
      await writeFile(filePath, Buffer.from(buffer));
      audioMap[text] = `/assets/audio/${filename}`;
      console.log(`Saved to ${filePath}`);

      await sleep(500);
    } catch (err) {
      console.error(`Error generating "${text}":`, err);
    }
  }

  const audioMapContent = `export const audioMap = ${JSON.stringify(audioMap, null, 2)};`;
  await writeFile(AUDIO_MAP_PATH, audioMapContent);
  console.log('audioMap.js generated successfully!');
  console.log('Done!');
}

generateAudio().catch(console.error);
