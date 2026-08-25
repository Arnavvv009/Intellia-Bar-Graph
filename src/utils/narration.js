import { say, ask, cheer, emphasize, think, celebrate, instruct } from './audio.js';

export function wonderNarration() {
  return [
    ask("Class 3A asked their friends: what is your favourite fruit? They wrote tally marks on a page, but nobody could tell which fruit won at a glance. How can we turn these tally marks into a picture that tells the story instantly?")
  ];
}

export function storySlideNarration(slideIndex) {
  const texts = [
    "Class 3A asked their friends about their favourite fruit and made tally marks. Robo says every survey needs to be collected fairly and counted carefully before it becomes a graph!",
    "Every bar graph needs a Title, a horizontal x-axis for categories, and a vertical y-axis for the scale. Robo always draws these first, like building the frame of a house before decorating it.",
    "Robo picks a scale that goes up in equal jumps — 0, 2, 4, 6, 8, 10 — then draws each bar to match its data value. Every bar is the same width, with the same gap in between, only the height changes!",
    "Once every bar is labelled, the graph tells its own story! Banana got the tallest bar with 10 votes, and Papaya the shortest with just 2. Now anyone can read the results in seconds — no counting tallies needed!"
  ];
  return [say(texts[slideIndex] || "")];
}

export function simulateStationNarration(stationIndex) {
  const texts = [
    "Welcome to the Graph Anatomy Spinner! Drag the graph to spin it, and toggle highlights to explore the title, axes, scale, bars and labels.",
    "In the Bar Value Reader, let's read the data. Tap on a bar or use the number pad to fill in its value.",
    "Let's match the graph parts. Match each description on the left with its correct part name on the right.",
    "Welcome to the Construction Sandbox! Tell me which bars are tallest, even, or above average, then click watch it to see them grow!"
  ];
  return [instruct(texts[stationIndex] || "")];
}

export function praiseNarration() {
  const phrases = [
    "Excellent!",
    "Well done!",
    "Brilliant!",
    "You got it!",
    "Super smart!",
    "Great reading!"
  ];
  const random = phrases[Math.floor(Math.random() * phrases.length)];
  return [celebrate(random)];
}

export function reflectPromptNarration(promptText) {
  return [say("Time to reflect."), ask(promptText)];
}
