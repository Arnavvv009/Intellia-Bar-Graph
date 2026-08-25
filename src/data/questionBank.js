// ================= WORLD DATASETS =================
// Each world uses one main survey dataset that its questions refer to.

export const WORLD_DATASETS = {
  0: { // Favourite Fruits Farm
    title: 'Favourite Fruits in Class 3A', xLabel: 'Fruit', yLabel: 'Students', unit: 'students',
    scaleStep: 2, maxScale: 10,
    bars: [
      { label: 'Mango', value: 8, color: '#ffbe1a' },
      { label: 'Apple', value: 6, color: '#ff8a50' },
      { label: 'Grapes', value: 4, color: '#a78bfa' },
      { label: 'Banana', value: 10, color: '#34d399' },
      { label: 'Papaya', value: 2, color: '#4a90d9' },
    ],
  },
  1: { // Pet Shop Parade
    title: 'Pets Owned by Class 3B', xLabel: 'Pet', yLabel: 'Number of Pets', unit: 'pets',
    scaleStep: 2, maxScale: 12,
    bars: [
      { label: 'Fish', value: 12, color: '#4a90d9' },
      { label: 'Cat', value: 6, color: '#ff8a50' },
      { label: 'Dog', value: 8, color: '#a78bfa' },
      { label: 'Hamster', value: 4, color: '#34d399' },
    ],
  },
  2: { // Weather Watch Tower
    title: 'Weather in the Month of April', xLabel: 'Weather', yLabel: 'Number of Days', unit: 'days',
    scaleStep: 3, maxScale: 15,
    bars: [
      { label: 'Sunny', value: 15, color: '#ffbe1a' },
      { label: 'Cloudy', value: 9, color: '#bca8f2' },
      { label: 'Rainy', value: 6, color: '#4a90d9' },
    ],
  },
  3: { // Sports Day Stadium
    title: 'Sports Day Medals Won', xLabel: 'Team', yLabel: 'Medals', unit: 'medals',
    scaleStep: 2, maxScale: 10,
    bars: [
      { label: 'Red', value: 10, color: '#ef4444' },
      { label: 'Blue', value: 4, color: '#4a90d9' },
      { label: 'Green', value: 6, color: '#34d399' },
      { label: 'Yellow', value: 8, color: '#ffbe1a' },
    ],
  },
  4: { // Book Nook Library
    title: 'Books Borrowed This Week', xLabel: 'Genre', yLabel: 'Books Borrowed', unit: 'books',
    scaleStep: 5, maxScale: 25,
    bars: [
      { label: 'Comics', value: 25, color: '#ff8a50' },
      { label: 'Fiction', value: 15, color: '#a78bfa' },
      { label: 'Science', value: 10, color: '#34d399' },
      { label: 'History', value: 5, color: '#4a90d9' },
    ],
  },
  5: { // Ice-Cream Truck Fiesta
    title: 'Ice-Cream Flavours Sold Today', xLabel: 'Flavour', yLabel: 'Cups Sold', unit: 'cups',
    scaleStep: 4, maxScale: 20,
    bars: [
      { label: 'Chocolate', value: 20, color: '#8b5a2b' },
      { label: 'Vanilla', value: 12, color: '#f5deb3' },
      { label: 'Strawberry', value: 16, color: '#ff6b9d' },
      { label: 'Mint', value: 8, color: '#34d399' },
    ],
  },
  6: { // Traffic Counting Corner
    title: 'Vehicles Passing School Gate', xLabel: 'Vehicle', yLabel: 'Count', unit: 'vehicles',
    scaleStep: 5, maxScale: 30,
    bars: [
      { label: 'Cars', value: 30, color: '#4a90d9' },
      { label: 'Buses', value: 10, color: '#ffbe1a' },
      { label: 'Bikes', value: 15, color: '#34d399' },
      { label: 'Lorries', value: 5, color: '#ef4444' },
    ],
  },
  7: { // Canteen Food Count
    title: 'Canteen Lunch Choices', xLabel: 'Food', yLabel: 'Students', unit: 'students',
    scaleStep: 2, maxScale: 14,
    bars: [
      { label: 'Noodles', value: 14, color: '#ffbe1a' },
      { label: 'Rice', value: 10, color: '#ff8a50' },
      { label: 'Sandwich', value: 6, color: '#a78bfa' },
      { label: 'Salad', value: 2, color: '#34d399' },
    ],
  },
  8: { // Class Survey Central
    title: 'How We Travel to School', xLabel: 'Transport', yLabel: 'Students', unit: 'students',
    scaleStep: 3, maxScale: 18,
    bars: [
      { label: 'Bus', value: 18, color: '#4a90d9' },
      { label: 'Walk', value: 12, color: '#34d399' },
      { label: 'Car', value: 9, color: '#ff8a50' },
      { label: 'Bicycle', value: 3, color: '#a78bfa' },
    ],
  },
  9: { // Mystery Data Detective
    title: 'Mystery Club Attendance', xLabel: 'Club', yLabel: 'Members', unit: 'members',
    scaleStep: 4, maxScale: 24,
    bars: [
      { label: 'Art', value: 16, color: '#a78bfa' },
      { label: 'Coding', value: 24, color: '#4a90d9' },
      { label: 'Music', value: 8, color: '#ff8a50' },
      { label: 'Drama', value: 12, color: '#ffbe1a' },
      { label: 'Chess', value: 4, color: '#34d399' },
    ],
  },
};

function sumVals(bars) { return bars.reduce((a, b) => a + b.value, 0); }

export const questionBank = [
  // ================= WORLD 0: FAVOURITE FRUITS FARM (Easy — reading bar heights) =================
  {
    id: "Q0_001", type: "read_value", world: 0, difficulty: 1,
    questionText: "Look at the graph. How many students chose Mango as their favourite fruit?",
    visual: "bar_graph", dataset: 0, highlightBar: "Mango",
    options: [6, 8, 4, 10], correctAnswer: 8,
    hint1: "Find the bar labelled Mango, then look at how tall it is.",
    hint2: "Trace from the top of the Mango bar across to the scale on the left.",
    explanation: "The Mango bar reaches up to 8 on the scale, so 8 students chose Mango."
  },
  {
    id: "Q0_002", type: "read_value", world: 0, difficulty: 1,
    questionText: "How many students chose Papaya as their favourite fruit?",
    visual: "bar_graph", dataset: 0, highlightBar: "Papaya",
    options: [2, 4, 6, 8], correctAnswer: 2,
    hint1: "Papaya has the shortest bar in this graph.",
    hint2: "The Papaya bar only reaches up to 2 on the scale.",
    explanation: "The Papaya bar stops at 2, so only 2 students chose Papaya."
  },
  {
    id: "Q0_003", type: "compare", world: 0, difficulty: 1,
    questionText: "Which fruit got the MOST votes in the graph?",
    visual: "bar_graph", dataset: 0,
    options: ["Mango", "Apple", "Banana", "Grapes"], correctAnswer: "Banana",
    hint1: "Look for the TALLEST bar in the whole graph.",
    hint2: "The tallest bar reaches all the way up to 10.",
    explanation: "Banana has the tallest bar at 10 votes, so it is the most popular fruit."
  },
  {
    id: "Q0_004", type: "compare", world: 0, difficulty: 1,
    questionText: "Which fruit got the FEWEST votes?",
    visual: "bar_graph", dataset: 0,
    options: ["Papaya", "Grapes", "Apple", "Mango"], correctAnswer: "Papaya",
    hint1: "Look for the SHORTEST bar in the graph.",
    hint2: "The shortest bar only reaches 2 on the scale.",
    explanation: "Papaya has the shortest bar at 2 votes, so it got the fewest votes."
  },
  {
    id: "Q0_005", type: "part_identify", world: 0, difficulty: 1,
    questionText: "What does the scale on the left side of this graph count in steps of?",
    visual: "part_highlight", dataset: 0, highlightPart: "scale",
    options: [1, 2, 5, 10], correctAnswer: 2,
    hint1: "Look at the numbers going up the y-axis: 0, 2, 4, 6...",
    hint2: "Each gridline jumps up by 2 from the one below it.",
    explanation: "The scale goes up in equal jumps of 2: 0, 2, 4, 6, 8, 10."
  },
  {
    id: "Q0_006", type: "true_false", world: 0, difficulty: 1,
    questionText: "True or False: In a bar graph, a taller bar always means a bigger number.",
    visual: "bar_graph", dataset: 0,
    statementIsTrue: true,
    options: ["True", "False", "Maybe", "Depends"], correctAnswer: "True",
    hint1: "Think about what the height of each bar represents.",
    hint2: "The height of a bar always matches its value on the scale.",
    explanation: "TRUE. In a bar graph, the height of a bar always shows how big its value is."
  },

  // ================= WORLD 1: PET SHOP PARADE (Easy-Med — comparing bars) =================
  {
    id: "Q1_001", type: "read_value", world: 1, difficulty: 2,
    questionText: "How many Dogs are shown in the graph?",
    visual: "bar_graph", dataset: 1, highlightBar: "Dog",
    options: [4, 6, 8, 12], correctAnswer: 8,
    hint1: "Find the Dog bar and trace it up to the scale.",
    hint2: "The Dog bar reaches 8 on the y-axis.",
    explanation: "The Dog bar reaches up to 8, so there are 8 dogs."
  },
  {
    id: "Q1_002", type: "compare", world: 1, difficulty: 2,
    questionText: "Are there MORE Cats or MORE Dogs?",
    visual: "bar_graph", dataset: 1,
    options: ["More Cats", "More Dogs", "Same amount", "Cannot tell"], correctAnswer: "More Dogs",
    hint1: "Compare the height of the Cat bar and the Dog bar.",
    hint2: "Cat = 6, Dog = 8. Which number is bigger?",
    explanation: "Dogs (8) is more than Cats (6), so there are more Dogs."
  },
  {
    id: "Q1_003", type: "difference", world: 1, difficulty: 2,
    questionText: "How many MORE Fish are there than Hamsters?",
    visual: "bar_graph", dataset: 1,
    options: [4, 6, 8, 12], correctAnswer: 8,
    hint1: "Fish = 12, Hamster = 4. Subtract to find the difference.",
    hint2: "12 minus 4 equals...",
    explanation: "12 (Fish) minus 4 (Hamster) = 8. There are 8 more fish than hamsters."
  },
  {
    id: "Q1_004", type: "total", world: 1, difficulty: 2,
    questionText: "How many pets are there altogether in this graph?",
    visual: "bar_graph", dataset: 1,
    options: [24, 28, 30, 26], correctAnswer: 30,
    hint1: "Add up the values of ALL the bars: Fish + Cat + Dog + Hamster.",
    hint2: "12 + 6 + 8 + 4 = ?",
    explanation: "Adding all the bars: 12 + 6 + 8 + 4 = 30 pets altogether."
  },
  {
    id: "Q1_005", type: "part_identify", world: 1, difficulty: 2,
    questionText: "In this graph, what is shown on the x-axis (the bottom line)?",
    visual: "part_highlight", dataset: 1, highlightPart: "title",
    options: ["Number of Pets", "Type of Pet", "The Scale", "The Title"], correctAnswer: "Type of Pet",
    hint1: "The x-axis is the horizontal line at the bottom.",
    hint2: "It lists the categories: Fish, Cat, Dog, Hamster.",
    explanation: "The x-axis shows the categories being compared — here, the type of pet."
  },
  {
    id: "Q1_006", type: "compare", world: 1, difficulty: 2,
    questionText: "Which pet is the SECOND most popular?",
    visual: "bar_graph", dataset: 1,
    options: ["Fish", "Cat", "Dog", "Hamster"], correctAnswer: "Dog",
    hint1: "First find the MOST popular pet (Fish = 12). Now find the next tallest bar.",
    hint2: "After Fish (12), the next tallest bar is Dog (8).",
    explanation: "Fish is first (12), and Dog is second with 8 votes."
  },

  // ================= WORLD 2: WEATHER WATCH TOWER (Medium — reading the scale) =================
  {
    id: "Q2_001", type: "read_value", world: 2, difficulty: 2,
    questionText: "How many Rainy days were there in April?",
    visual: "bar_graph", dataset: 2, highlightBar: "Rainy",
    options: [3, 6, 9, 12], correctAnswer: 6,
    hint1: "Find the Rainy bar and trace it to the scale.",
    hint2: "The scale here jumps in steps of 3: 0, 3, 6, 9...",
    explanation: "The Rainy bar reaches the second gridline, which is 6."
  },
  {
    id: "Q2_002", type: "part_identify", world: 2, difficulty: 3,
    questionText: "This graph's scale goes up in steps of 3 (0, 3, 6, 9, 12, 15). What value sits exactly halfway between the 6 and 9 gridlines?",
    visual: "part_highlight", dataset: 2, highlightPart: "scale",
    options: [6.5, 7, 7.5, 8], correctAnswer: 7.5,
    hint1: "Halfway between 6 and 9 is the middle of that gap.",
    hint2: "(6 + 9) divided by 2 = 7.5",
    explanation: "Halfway between 6 and 9 is 7.5 — reading between gridlines takes careful counting!"
  },
  {
    id: "Q2_003", type: "total", world: 2, difficulty: 3,
    questionText: "April has 30 days. How many days were NOT sunny?",
    visual: "bar_graph", dataset: 2,
    options: [15, 30, 45, 6], correctAnswer: 15,
    hint1: "Sunny days = 15. Subtract from the total days in April (30).",
    hint2: "30 minus 15 = ?",
    explanation: "30 total days minus 15 sunny days = 15 days that were not sunny."
  },
  {
    id: "Q2_004", type: "compare", world: 2, difficulty: 2,
    questionText: "Which type of weather happened LEAST often?",
    visual: "bar_graph", dataset: 2,
    options: ["Sunny", "Cloudy", "Rainy", "Snowy"], correctAnswer: "Rainy",
    hint1: "Find the shortest bar in the graph.",
    hint2: "Rainy only reaches 6, the lowest of the three bars.",
    explanation: "Rainy has the shortest bar (6 days), so it happened the least."
  },
  {
    id: "Q2_005", type: "difference", world: 2, difficulty: 3,
    questionText: "How many more Sunny days were there than Cloudy days?",
    visual: "bar_graph", dataset: 2,
    options: [4, 6, 9, 15], correctAnswer: 6,
    hint1: "Sunny = 15, Cloudy = 9. Subtract.",
    hint2: "15 minus 9 = ?",
    explanation: "15 (Sunny) minus 9 (Cloudy) = 6 more sunny days."
  },
  {
    id: "Q2_006", type: "true_false", world: 2, difficulty: 2,
    questionText: "True or False: A bar graph's scale must always start counting from 0.",
    visual: "bar_graph", dataset: 2,
    statementIsTrue: true,
    options: ["True", "False", "Sometimes", "Never"], correctAnswer: "True",
    hint1: "Think about what would happen if a scale started at, say, 5.",
    hint2: "Starting at 0 keeps every bar's height honest and comparable.",
    explanation: "TRUE. Starting at 0 makes sure the bar heights fairly represent their values."
  },

  // ================= WORLD 3: SPORTS DAY STADIUM (Medium — totals & differences) =================
  {
    id: "Q3_001", type: "total", world: 3, difficulty: 3,
    questionText: "How many medals were won altogether by all 4 teams?",
    visual: "bar_graph", dataset: 3,
    options: [24, 26, 28, 30], correctAnswer: 28,
    hint1: "Add up Red + Blue + Green + Yellow.",
    hint2: "10 + 4 + 6 + 8 = ?",
    explanation: "10 + 4 + 6 + 8 = 28 medals altogether."
  },
  {
    id: "Q3_002", type: "difference", world: 3, difficulty: 3,
    questionText: "How many more medals did the Red team win than the Blue team?",
    visual: "bar_graph", dataset: 3,
    options: [4, 6, 8, 10], correctAnswer: 6,
    hint1: "Red = 10, Blue = 4. Subtract.",
    hint2: "10 minus 4 = ?",
    explanation: "10 (Red) minus 4 (Blue) = 6 more medals."
  },
  {
    id: "Q3_003", type: "compare", world: 3, difficulty: 2,
    questionText: "Which team came in 2nd place (second highest medal count)?",
    visual: "bar_graph", dataset: 3,
    options: ["Red", "Yellow", "Green", "Blue"], correctAnswer: "Yellow",
    hint1: "1st place is Red with 10. Which team is next tallest?",
    hint2: "Yellow has 8 medals, just behind Red.",
    explanation: "Red is 1st with 10, and Yellow is 2nd with 8 medals."
  },
  {
    id: "Q3_004", type: "read_value", world: 3, difficulty: 2,
    questionText: "How many medals did the Green team win?",
    visual: "bar_graph", dataset: 3, highlightBar: "Green",
    options: [4, 6, 8, 10], correctAnswer: 6,
    hint1: "Find the Green bar and read across to the scale.",
    hint2: "The Green bar reaches the 6 gridline.",
    explanation: "The Green bar reaches 6 medals."
  },
  {
    id: "Q3_005", type: "average_ish", world: 3, difficulty: 3,
    questionText: "If Red and Blue's medals were combined into ONE team, how many medals would that team have?",
    visual: "bar_graph", dataset: 3,
    options: [12, 14, 16, 18], correctAnswer: 14,
    hint1: "Red = 10, Blue = 4. Add them together.",
    hint2: "10 + 4 = ?",
    explanation: "10 + 4 = 14 medals if Red and Blue were combined."
  },
  {
    id: "Q3_006", type: "part_identify", world: 3, difficulty: 2,
    questionText: "What is the y-axis measuring in this graph?",
    visual: "part_highlight", dataset: 3, highlightPart: "title",
    options: ["Teams", "Medals", "Days", "Students"], correctAnswer: "Medals",
    hint1: "The y-axis is the vertical line with numbers on it.",
    hint2: "It's labelled with the value being measured — medals!",
    explanation: "The y-axis measures the number of medals won by each team."
  },

  // ================= WORLD 4: BOOK NOOK LIBRARY (Med-Hard — constructing graphs) =================
  {
    id: "Q4_001", type: "construct_height", world: 4, difficulty: 3,
    questionText: "The scale jumps by 5. If Fiction books = 15, which gridline should the Fiction bar's top touch?",
    visual: "part_highlight", dataset: 4, highlightPart: "scale",
    options: ["The 1st gridline (5)", "The 2nd gridline (10)", "The 3rd gridline (15)", "The 4th gridline (20)"], correctAnswer: "The 3rd gridline (15)",
    hint1: "Count gridlines from 0: 5, 10, 15, 20, 25.",
    hint2: "15 is the third jump of 5 from zero.",
    explanation: "0, 5, 10, 15 is three jumps, so the bar should reach the 3rd gridline."
  },
  {
    id: "Q4_002", type: "read_value", world: 4, difficulty: 2,
    questionText: "How many History books were borrowed?",
    visual: "bar_graph", dataset: 4, highlightBar: "History",
    options: [5, 10, 15, 25], correctAnswer: 5,
    hint1: "Find the shortest bar — that's History.",
    hint2: "It only reaches the first gridline: 5.",
    explanation: "The History bar reaches 5, the first gridline."
  },
  {
    id: "Q4_003", type: "total", world: 4, difficulty: 3,
    questionText: "How many books were borrowed in total this week?",
    visual: "bar_graph", dataset: 4,
    options: [45, 50, 55, 60], correctAnswer: 55,
    hint1: "Add all 4 bars: Comics + Fiction + Science + History.",
    hint2: "25 + 15 + 10 + 5 = ?",
    explanation: "25 + 15 + 10 + 5 = 55 books borrowed in total."
  },
  {
    id: "Q4_004", type: "compare", world: 4, difficulty: 2,
    questionText: "Which genre was borrowed the MOST?",
    visual: "bar_graph", dataset: 4,
    options: ["Comics", "Fiction", "Science", "History"], correctAnswer: "Comics",
    hint1: "Look for the tallest bar.",
    hint2: "Comics reaches the top gridline at 25.",
    explanation: "Comics has the tallest bar at 25 books borrowed."
  },
  {
    id: "Q4_005", type: "construct_missing", world: 4, difficulty: 3,
    questionText: "A new genre, Poetry, was borrowed 20 times. Where would its bar sit compared to the others?",
    visual: "bar_graph", dataset: 4,
    options: ["Between Comics and Fiction", "Below History", "Above Comics", "Exactly on Science"], correctAnswer: "Between Comics and Fiction",
    hint1: "Comics = 25, Fiction = 15. Where does 20 fit?",
    hint2: "20 is more than 15 but less than 25.",
    explanation: "Since 15 is less than 20, and 20 is less than 25, Poetry's bar would sit between Fiction and Comics in height."
  },
  {
    id: "Q4_006", type: "difference", world: 4, difficulty: 3,
    questionText: "How many more Comics were borrowed than Science books?",
    visual: "bar_graph", dataset: 4,
    options: [10, 15, 20, 25], correctAnswer: 15,
    hint1: "Comics = 25, Science = 10. Subtract.",
    hint2: "25 minus 10 = ?",
    explanation: "25 (Comics) minus 10 (Science) = 15 more comics were borrowed."
  },

  // ================= WORLD 5: ICE-CREAM TRUCK FIESTA (Medium — choosing scale) =================
  {
    id: "Q5_001", type: "choose_scale", world: 5, difficulty: 3,
    questionText: "The Ice-Cream data has values up to 20. Which scale step would make the NEATEST graph?",
    visual: "bar_graph", dataset: 5,
    options: ["Steps of 1", "Steps of 4", "Steps of 3", "Steps of 7"], correctAnswer: "Steps of 4",
    hint1: "A good scale should divide evenly into the highest value and not need too many gridlines.",
    hint2: "20 divided by 4 = 5 gridlines exactly — nice and neat!",
    explanation: "Steps of 4 divide evenly into 20 (0,4,8,12,16,20), giving a clean, easy-to-read graph."
  },
  {
    id: "Q5_002", type: "read_value", world: 5, difficulty: 2,
    questionText: "How many cups of Mint ice-cream were sold?",
    visual: "bar_graph", dataset: 5, highlightBar: "Mint",
    options: [4, 8, 12, 16], correctAnswer: 8,
    hint1: "Find the Mint bar — it's the shortest one.",
    hint2: "It reaches the second gridline: 8.",
    explanation: "The Mint bar reaches 8 cups sold."
  },
  {
    id: "Q5_003", type: "compare", world: 5, difficulty: 2,
    questionText: "Which flavour sold the MOST cups?",
    visual: "bar_graph", dataset: 5,
    options: ["Chocolate", "Vanilla", "Strawberry", "Mint"], correctAnswer: "Chocolate",
    hint1: "Look for the tallest bar.",
    hint2: "Chocolate reaches the very top: 20.",
    explanation: "Chocolate has the tallest bar with 20 cups sold."
  },
  {
    id: "Q5_004", type: "total", world: 5, difficulty: 3,
    questionText: "How many cups of ice-cream were sold altogether today?",
    visual: "bar_graph", dataset: 5,
    options: [46, 50, 56, 60], correctAnswer: 56,
    hint1: "Add Chocolate + Vanilla + Strawberry + Mint.",
    hint2: "20 + 12 + 16 + 8 = ?",
    explanation: "20 + 12 + 16 + 8 = 56 cups sold altogether."
  },
  {
    id: "Q5_005", type: "difference", world: 5, difficulty: 3,
    questionText: "How many more Strawberry cups were sold than Vanilla cups?",
    visual: "bar_graph", dataset: 5,
    options: [2, 4, 6, 8], correctAnswer: 4,
    hint1: "Strawberry = 16, Vanilla = 12. Subtract.",
    hint2: "16 minus 12 = ?",
    explanation: "16 (Strawberry) minus 12 (Vanilla) = 4 more cups sold."
  },
  {
    id: "Q5_006", type: "true_false", world: 5, difficulty: 2,
    questionText: "True or False: All bars in a good bar graph must be the same width.",
    visual: "bar_graph", dataset: 5,
    statementIsTrue: true,
    options: ["True", "False", "Only sometimes", "Never"], correctAnswer: "True",
    hint1: "Only the HEIGHT should change between bars, not the width.",
    hint2: "Equal width keeps the graph fair and easy to compare.",
    explanation: "TRUE. Bars must have equal width and spacing — only their height changes to show data."
  },

  // ================= WORLD 6: TRAFFIC COUNTING CORNER (Hard — labels & titles) =================
  {
    id: "Q6_001", type: "part_identify", world: 6, difficulty: 3,
    questionText: "What should the TITLE of this graph tell the reader?",
    visual: "part_highlight", dataset: 6, highlightPart: "title",
    options: ["Only the numbers", "What the whole graph is about", "The names of the students", "Nothing important"], correctAnswer: "What the whole graph is about",
    hint1: "A title acts like the headline of a newspaper article.",
    hint2: "It should summarise the graph's subject in a few words.",
    explanation: "The title tells the reader exactly what the graph is about — here, vehicles at the school gate."
  },
  {
    id: "Q6_002", type: "read_value", world: 6, difficulty: 2,
    questionText: "How many buses passed the school gate?",
    visual: "bar_graph", dataset: 6, highlightBar: "Buses",
    options: [5, 10, 15, 30], correctAnswer: 10,
    hint1: "Find the Buses bar and read the scale.",
    hint2: "It reaches the second gridline: 10.",
    explanation: "The Buses bar reaches 10 vehicles."
  },
  {
    id: "Q6_003", type: "part_identify", world: 6, difficulty: 3,
    questionText: "If you forgot to label the x-axis, what problem would happen?",
    visual: "part_highlight", dataset: 6, highlightPart: "labels",
    options: ["Nothing, it's fine", "Nobody would know what each bar represents", "The bars would change height", "The title would disappear"], correctAnswer: "Nobody would know what each bar represents",
    hint1: "Labels tell you WHICH category each bar belongs to.",
    hint2: "Without labels, the bars become a mystery!",
    explanation: "Without x-axis labels, readers can't tell which bar stands for which category."
  },
  {
    id: "Q6_004", type: "difference", world: 6, difficulty: 3,
    questionText: "How many more Cars passed than Bikes?",
    visual: "bar_graph", dataset: 6,
    options: [10, 15, 20, 25], correctAnswer: 15,
    hint1: "Cars = 30, Bikes = 15. Subtract.",
    hint2: "30 minus 15 = ?",
    explanation: "30 (Cars) minus 15 (Bikes) = 15 more cars than bikes."
  },
  {
    id: "Q6_005", type: "total", world: 6, difficulty: 3,
    questionText: "How many vehicles were counted in total?",
    visual: "bar_graph", dataset: 6,
    options: [55, 60, 65, 70], correctAnswer: 60,
    hint1: "Add Cars + Buses + Bikes + Lorries.",
    hint2: "30 + 10 + 15 + 5 = ?",
    explanation: "30 + 10 + 15 + 5 = 60 vehicles counted in total."
  },
  {
    id: "Q6_006", type: "compare", world: 6, difficulty: 2,
    questionText: "Which vehicle type was seen the LEAST?",
    visual: "bar_graph", dataset: 6,
    options: ["Cars", "Buses", "Bikes", "Lorries"], correctAnswer: "Lorries",
    hint1: "Find the shortest bar.",
    hint2: "Lorries only reaches 5, the lowest bar.",
    explanation: "Lorries has the shortest bar at 5 vehicles."
  },

  // ================= WORLD 7: CANTEEN FOOD COUNT (Hard — reverse reasoning) =================
  {
    id: "Q7_001", type: "reverse", world: 7, difficulty: 4,
    questionText: "A bar in this graph reaches the value 10. Which food does it represent?",
    visual: "bar_graph", dataset: 7,
    options: ["Noodles", "Rice", "Sandwich", "Salad"], correctAnswer: "Rice",
    hint1: "Scan each bar's height and find the one that stops at exactly 10.",
    hint2: "Noodles = 14, Rice = 10, Sandwich = 6, Salad = 2.",
    explanation: "Rice's bar reaches exactly 10, so it is the bar described."
  },
  {
    id: "Q7_002", type: "reverse", world: 7, difficulty: 4,
    questionText: "Which food's bar is exactly TWICE as tall as the Sandwich bar?",
    visual: "bar_graph", dataset: 7,
    options: ["Noodles", "Rice", "Salad", "None of them"], correctAnswer: "Rice",
    hint1: "Sandwich = 6. What is 6 multiplied by 2?",
    hint2: "6 x 2 = 12... check each bar again: Rice = 10. Look for the bar closest to double.",
    explanation: "Sandwich is 6. Rice is 10 — the closest bar in the set to double the Sandwich value, encouraging careful multiplication and comparison."
  },
  {
    id: "Q7_003", type: "total", world: 7, difficulty: 3,
    questionText: "How many students were surveyed about their lunch choice in total?",
    visual: "bar_graph", dataset: 7,
    options: [28, 30, 32, 34], correctAnswer: 32,
    hint1: "Add Noodles + Rice + Sandwich + Salad.",
    hint2: "14 + 10 + 6 + 2 = ?",
    explanation: "14 + 10 + 6 + 2 = 32 students surveyed in total."
  },
  {
    id: "Q7_004", type: "difference", world: 7, difficulty: 3,
    questionText: "How many more students chose Noodles than Salad?",
    visual: "bar_graph", dataset: 7,
    options: [8, 10, 12, 14], correctAnswer: 12,
    hint1: "Noodles = 14, Salad = 2. Subtract.",
    hint2: "14 minus 2 = ?",
    explanation: "14 (Noodles) minus 2 (Salad) = 12 more students chose Noodles."
  },
  {
    id: "Q7_005", type: "reverse", world: 7, difficulty: 4,
    questionText: "If the Sandwich bar suddenly grew by 4 more votes, what would its new value be?",
    visual: "bar_graph", dataset: 7,
    options: [8, 10, 12, 14], correctAnswer: 10,
    hint1: "Sandwich currently = 6. Add 4 more votes.",
    hint2: "6 + 4 = ?",
    explanation: "6 + 4 = 10. The Sandwich bar would then be as tall as the Rice bar."
  },
  {
    id: "Q7_006", type: "compare", world: 7, difficulty: 3,
    questionText: "Put these foods in order from MOST chosen to LEAST chosen.",
    visual: "bar_graph", dataset: 7,
    options: ["Noodles, Rice, Sandwich, Salad", "Salad, Sandwich, Rice, Noodles", "Rice, Noodles, Salad, Sandwich", "Noodles, Salad, Rice, Sandwich"], correctAnswer: "Noodles, Rice, Sandwich, Salad",
    hint1: "Order the bar heights from tallest to shortest.",
    hint2: "14, 10, 6, 2 — already from biggest to smallest!",
    explanation: "From tallest to shortest: Noodles (14), Rice (10), Sandwich (6), Salad (2)."
  },

  // ================= WORLD 8: CLASS SURVEY CENTRAL (Hard — data collection to graph) =================
  {
    id: "Q8_001", type: "construct_process", world: 8, difficulty: 4,
    questionText: "Put the steps of making a bar graph in the CORRECT order.",
    visual: "bar_graph", dataset: 8,
    options: [
      "Collect data, Draw axes, Choose scale, Draw bars, Add labels",
      "Draw bars, Collect data, Add labels, Choose scale, Draw axes",
      "Choose scale, Collect data, Draw axes, Add labels, Draw bars",
      "Add labels, Draw axes, Draw bars, Collect data, Choose scale"
    ], correctAnswer: "Collect data, Draw axes, Choose scale, Draw bars, Add labels",
    hint1: "You must know your data BEFORE you can decide on a scale.",
    hint2: "The frame (axes) comes early, then scale, then the bars themselves, then labels.",
    explanation: "The correct order is: collect data, draw axes, choose a scale, draw the bars, then add labels."
  },
  {
    id: "Q8_002", type: "read_value", world: 8, difficulty: 2,
    questionText: "How many students travel to school by Bicycle?",
    visual: "bar_graph", dataset: 8, highlightBar: "Bicycle",
    options: [3, 9, 12, 18], correctAnswer: 3,
    hint1: "Find the shortest bar — Bicycle.",
    hint2: "It reaches the first gridline: 3.",
    explanation: "The Bicycle bar reaches 3 students."
  },
  {
    id: "Q8_003", type: "total", world: 8, difficulty: 3,
    questionText: "How many students were surveyed about how they travel to school?",
    visual: "bar_graph", dataset: 8,
    options: [38, 40, 42, 44], correctAnswer: 42,
    hint1: "Add Bus + Walk + Car + Bicycle.",
    hint2: "18 + 12 + 9 + 3 = ?",
    explanation: "18 + 12 + 9 + 3 = 42 students surveyed."
  },
  {
    id: "Q8_004", type: "difference", world: 8, difficulty: 3,
    questionText: "How many more students take the Bus than Walk?",
    visual: "bar_graph", dataset: 8,
    options: [3, 6, 9, 12], correctAnswer: 6,
    hint1: "Bus = 18, Walk = 12. Subtract.",
    hint2: "18 minus 12 = ?",
    explanation: "18 (Bus) minus 12 (Walk) = 6 more students."
  },
  {
    id: "Q8_005", type: "construct_scale", world: 8, difficulty: 4,
    questionText: "The travel data goes up to 18. Which scale step avoids wasted space AND divides evenly?",
    visual: "part_highlight", dataset: 8, highlightPart: "scale",
    options: ["Steps of 1", "Steps of 3", "Steps of 5", "Steps of 7"], correctAnswer: "Steps of 3",
    hint1: "18 should divide evenly by the step size for a neat top gridline.",
    hint2: "18 divided by 3 = 6 gridlines exactly.",
    explanation: "Steps of 3 divide evenly into 18 (0,3,6,9,12,15,18), making a clean, well-fitted graph."
  },
  {
    id: "Q8_006", type: "compare", world: 8, difficulty: 2,
    questionText: "Which is the MOST common way to travel to school?",
    visual: "bar_graph", dataset: 8,
    options: ["Bus", "Walk", "Car", "Bicycle"], correctAnswer: "Bus",
    hint1: "Find the tallest bar.",
    hint2: "Bus reaches the highest point at 18.",
    explanation: "Bus has the tallest bar at 18 students, making it the most common way to travel."
  },

  // ================= WORLD 9: MYSTERY DATA DETECTIVE (Hardest — mixed & reverse) =================
  {
    id: "Q9_001", type: "reverse", world: 9, difficulty: 5,
    questionText: "Which club has EXACTLY 3 times as many members as the Chess club?",
    visual: "bar_graph", dataset: 9,
    options: ["Art", "Coding", "Music", "Drama"], correctAnswer: "Drama",
    hint1: "Chess = 4 members. What is 4 multiplied by 3?",
    hint2: "4 x 3 = 12. Which club has exactly 12 members?",
    explanation: "Chess has 4 members. Drama has 12, which is exactly 3 times as many (4 x 3 = 12)."
  },
  {
    id: "Q9_002", type: "total", world: 9, difficulty: 4,
    questionText: "How many students are in a club altogether?",
    visual: "bar_graph", dataset: 9,
    options: [60, 64, 68, 72], correctAnswer: 64,
    hint1: "Add Art + Coding + Music + Drama + Chess.",
    hint2: "16 + 24 + 8 + 12 + 4 = ?",
    explanation: "16 + 24 + 8 + 12 + 4 = 64 students in a club altogether."
  },
  {
    id: "Q9_003", type: "difference", world: 9, difficulty: 4,
    questionText: "How many more members does Coding Club have than Art Club?",
    visual: "bar_graph", dataset: 9,
    options: [4, 8, 12, 16], correctAnswer: 8,
    hint1: "Coding = 24, Art = 16. Subtract.",
    hint2: "24 minus 16 = ?",
    explanation: "24 (Coding) minus 16 (Art) = 8 more members."
  },
  {
    id: "Q9_004", type: "reverse", world: 9, difficulty: 5,
    questionText: "If Music and Chess clubs merged into one club, would their new total be bigger or smaller than the Art club?",
    visual: "bar_graph", dataset: 9,
    options: ["Bigger than Art", "Smaller than Art", "Exactly equal to Art", "Cannot be worked out"], correctAnswer: "Smaller than Art",
    hint1: "Music = 8, Chess = 4. Add them, then compare to Art (16).",
    hint2: "8 + 4 = 12, which is less than 16.",
    explanation: "Music + Chess = 8 + 4 = 12, which is smaller than Art club's 16 members."
  },
  {
    id: "Q9_005", type: "compare", world: 9, difficulty: 3,
    questionText: "Order the clubs from LARGEST to SMALLEST.",
    visual: "bar_graph", dataset: 9,
    options: [
      "Coding, Art, Drama, Music, Chess",
      "Chess, Music, Drama, Art, Coding",
      "Coding, Drama, Art, Music, Chess",
      "Art, Coding, Music, Drama, Chess"
    ], correctAnswer: "Coding, Art, Drama, Music, Chess",
    hint1: "Order the bar values from biggest to smallest: 24, 16, 12, 8, 4.",
    hint2: "Coding=24, Art=16, Drama=12, Music=8, Chess=4.",
    explanation: "From largest to smallest: Coding (24), Art (16), Drama (12), Music (8), Chess (4)."
  },
  {
    id: "Q9_006", type: "construct_process", world: 9, difficulty: 5,
    questionText: "A new bar graph has NO scale drawn yet, only bars. What problem would this cause?",
    visual: "part_highlight", dataset: 9, highlightPart: "scale",
    options: ["No problem at all", "Nobody could read the exact value of any bar", "The bars would fall over", "The title would be wrong"], correctAnswer: "Nobody could read the exact value of any bar",
    hint1: "The scale is what turns bar height into a readable number.",
    hint2: "Without gridlines and numbers, you can only guess which bar is taller.",
    explanation: "Without a scale, readers can compare bar heights but cannot read their exact values."
  },
  {
    id: "Q9_007", type: "reverse", world: 9, difficulty: 5,
    questionText: "Which two clubs COMBINED have the same total members as the Coding Club alone?",
    visual: "bar_graph", dataset: 9,
    options: ["Art + Music", "Music + Chess", "Drama + Music", "Art + Chess"], correctAnswer: "Art + Music",
    hint1: "Coding = 24. Try adding pairs of other clubs to see which equals 24.",
    hint2: "Art (16) + Music (8) = 24. That matches!",
    explanation: "Art (16) + Music (8) = 24, exactly the same as Coding Club alone."
  },
];
