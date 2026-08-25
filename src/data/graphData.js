// Core "anatomy" of a bar graph — parallel structure to the old shapeData.js
// Each of the 4 elements is explored across Wonder / Story / Simulate / Play

export const GRAPH_PARTS = {
  title: {
    id: 'title',
    name: 'Title & Axes',
    emoji: '🏷️',
    color: '#4A90D9',
    shortDesc: 'The name of the graph, and the two lines it stands on',
    countLabel: 'Axes',
    countValue: 2,
    subParts: ['Graph Title', 'X-axis (horizontal)', 'Y-axis (vertical)'],
    realWorldExamples: ['newspaper chart headline', 'weather report chart', 'class survey poster'],
    funFact: 'A good title tells you WHAT the graph is about without you even looking at the bars!',
    propertyDescription: '1 title, 1 horizontal x-axis, 1 vertical y-axis',
  },
  scale: {
    id: 'scale',
    name: 'Scale & Gridlines',
    emoji: '📏',
    color: '#FF8A50',
    shortDesc: 'The equal number-steps that let us measure each bar',
    countLabel: 'Equal Intervals',
    countValue: 1,
    subParts: ['Starting point (0)', 'Interval size (jump)', 'Gridlines'],
    realWorldExamples: ['ruler markings', 'thermometer scale', 'stairs — each step is the same size'],
    funFact: 'Every jump on the scale MUST be the same size, or the graph tells lies!',
    propertyDescription: 'Equal jumps from 0, e.g. 0, 2, 4, 6, 8, 10',
  },
  bars: {
    id: 'bars',
    name: 'Bars',
    emoji: '📊',
    color: '#A78BFA',
    shortDesc: 'Rectangles whose height (or length) shows the data value',
    countLabel: 'Bars in this graph',
    countValue: 5,
    subParts: ['Equal width', 'Equal gaps', 'Height = value'],
    realWorldExamples: ['stacked boxes at a shop', 'skyscraper skyline', 'a xylophone\'s bars'],
    funFact: 'All bars must be the SAME width and have the SAME gap between them — only the height changes!',
    propertyDescription: 'Same width, same spacing, height matches the scale',
  },
  labels: {
    id: 'labels',
    name: 'Labels & Key',
    emoji: '🔖',
    color: '#34D399',
    shortDesc: 'The names under each bar, and axis titles that explain the numbers',
    countLabel: 'Category labels',
    countValue: 5,
    subParts: ['Category names', 'Axis titles', 'Key / Legend (if needed)'],
    realWorldExamples: ['price tags', 'name tags at a party', 'map legend'],
    funFact: 'Without labels, even a perfect bar graph becomes a mystery — nobody knows what the bars mean!',
    propertyDescription: 'One label per bar + a title for each axis',
  },
};

export const PART_COMPARISON = [
  { part: 'Title & Axes', role: 'Names the graph & gives it a frame', mustBe: 'Clear & centered' },
  { part: 'Scale', role: 'Turns bar height into a number', mustBe: 'Equal intervals' },
  { part: 'Bars', role: 'Shows each category\'s value', mustBe: 'Equal width & spacing' },
  { part: 'Labels & Key', role: 'Explains what each bar/axis means', mustBe: 'Under every bar' },
];

// Sample datasets used throughout the module (story, simulate stations, quiz visuals)
export const SAMPLE_DATASET = {
  id: 'fruits',
  title: 'Favourite Fruits in Class 3A',
  xLabel: 'Fruit',
  yLabel: 'Number of Students',
  unit: 'students',
  scaleStep: 2,
  maxScale: 10,
  bars: [
    { label: 'Mango', value: 8, color: '#ffbe1a' },
    { label: 'Apple', value: 6, color: '#ff8a50' },
    { label: 'Grapes', value: 4, color: '#a78bfa' },
    { label: 'Banana', value: 10, color: '#34d399' },
    { label: 'Papaya', value: 2, color: '#4a90d9' },
  ],
};

// 4 mini datasets used in Simulate stations A & B, parallel to the old 4-shapes selector
export const DATASETS = {
  fruits: SAMPLE_DATASET,
  pets: {
    id: 'pets',
    title: 'Pets Owned by Class 3A',
    xLabel: 'Pet',
    yLabel: 'Number of Pets',
    unit: 'pets',
    scaleStep: 2,
    maxScale: 12,
    bars: [
      { label: 'Fish', value: 12, color: '#4a90d9' },
      { label: 'Cat', value: 6, color: '#ff8a50' },
      { label: 'Dog', value: 8, color: '#a78bfa' },
      { label: 'Hamster', value: 4, color: '#34d399' },
    ],
  },
  weather: {
    id: 'weather',
    title: 'Weather in April (Days)',
    xLabel: 'Weather',
    yLabel: 'Number of Days',
    unit: 'days',
    scaleStep: 3,
    maxScale: 15,
    bars: [
      { label: 'Sunny', value: 15, color: '#ffbe1a' },
      { label: 'Cloudy', value: 9, color: '#bca8f2' },
      { label: 'Rainy', value: 6, color: '#4a90d9' },
    ],
  },
  sports: {
    id: 'sports',
    title: 'Sports Day Medals Won',
    xLabel: 'Team',
    yLabel: 'Medals',
    unit: 'medals',
    scaleStep: 2,
    maxScale: 10,
    bars: [
      { label: 'Red', value: 10, color: '#ef4444' },
      { label: 'Blue', value: 4, color: '#4a90d9' },
      { label: 'Green', value: 6, color: '#34d399' },
      { label: 'Yellow', value: 8, color: '#ffbe1a' },
    ],
  },
};
