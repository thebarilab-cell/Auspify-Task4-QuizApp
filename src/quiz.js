export const QUESTIONS = [
  { category: 'HTML', question: 'Which element is designed to contain the primary content unique to a page?', options: ['<section>', '<main>', '<article>', '<body>'], answer: 1, explanation: 'The <main> element identifies the dominant content of the document.' },
  { category: 'CSS', question: 'Which declaration makes a flex item take up the remaining space in its container?', options: ['flex: 0 1 auto', 'flex-grow: 1', 'align-self: stretch', 'justify-content: space-between'], answer: 1, explanation: 'A positive flex-grow value lets an item absorb available main-axis space.' },
  { category: 'JavaScript', question: 'What does Array.prototype.map() return?', options: ['The original array, modified in place', 'A new array of transformed values', 'The first matching value', 'A boolean for each item'], answer: 1, explanation: 'map creates and returns a new array from each callback result.' },
  { category: 'Web fundamentals', question: 'What does HTTPS add to HTTP?', options: ['Automatic image compression', 'Encrypted transport using TLS', 'A faster JavaScript engine', 'A built-in content management system'], answer: 1, explanation: 'HTTPS protects data in transit with TLS encryption and authentication.' },
  { category: 'HTML', question: 'Which attribute provides alternative text for an informative image?', options: ['title', 'caption', 'alt', 'description'], answer: 2, explanation: 'The alt attribute gives assistive technologies a text alternative for an image.' },
  { category: 'CSS', question: 'In the CSS box model, what does box-sizing: border-box change?', options: ['It removes padding from every element', 'Width and height include padding and border', 'Margins are included in the declared width', 'Borders become transparent'], answer: 1, explanation: 'With border-box, the declared dimensions include content, padding, and border.' },
  { category: 'JavaScript', question: 'Which keyword declares a block-scoped variable that can be reassigned?', options: ['const', 'var', 'let', 'static'], answer: 2, explanation: 'let is block-scoped and permits reassignment.' },
  { category: 'Web fundamentals', question: 'What is the purpose of a DNS lookup?', options: ['Convert a domain name into an IP address', 'Encrypt the browser cache', 'Validate a page’s HTML', 'Choose a CSS breakpoint'], answer: 0, explanation: 'DNS resolves human-readable domain names to network addresses.' },
  { category: 'HTML', question: 'Which input type gives users a browser-native email format hint and validation?', options: ['type="text"', 'type="mailbox"', 'type="email"', 'type="address"'], answer: 2, explanation: 'type="email" enables email-specific semantics and basic browser validation.' },
  { category: 'CSS', question: 'Which unit is relative to the root element’s font size?', options: ['em', 'rem', 'vw', 'px'], answer: 1, explanation: 'rem is based on the computed font size of the root element.' },
  { category: 'JavaScript', question: 'What is the result of typeof null in JavaScript?', options: ['"null"', '"undefined"', '"object"', '"boolean"'], answer: 2, explanation: 'typeof null returns "object" due to a longstanding language quirk.' },
  { category: 'Web fundamentals', question: 'Which HTTP method is typically used to retrieve a resource without changing it?', options: ['POST', 'PATCH', 'DELETE', 'GET'], answer: 3, explanation: 'GET is intended to retrieve a representation of a resource.' },
  { category: 'HTML', question: 'What is the primary purpose of the <label> element in a form?', options: ['Style all form fields', 'Associate descriptive text with a control', 'Submit a form automatically', 'Store a field’s default value'], answer: 1, explanation: 'A label programmatically associates its text with a form control.' },
  { category: 'CSS', question: 'Which property controls the stacking order of positioned elements?', options: ['order', 'stack-index', 'z-index', 'layer'], answer: 2, explanation: 'z-index controls stacking within the relevant stacking context.' },
  { category: 'JavaScript', question: 'What does event.preventDefault() do inside an event handler?', options: ['Stops the event from reaching every listener', 'Cancels the browser’s default action', 'Removes the event listener', 'Prevents the handler from running again'], answer: 1, explanation: 'It cancels the default browser behavior associated with the event.' },
  { category: 'Web fundamentals', question: 'Why should interactive controls have a visible focus style?', options: ['It improves image loading speed', 'It helps keyboard users see their current position', 'It prevents all form errors', 'It enables browser caching'], answer: 1, explanation: 'A visible focus indicator helps keyboard users understand where interaction will occur.' },
  { category: 'CSS', question: 'Which media query preference can be used to reduce non-essential motion?', options: ['prefers-contrast: more', 'orientation: portrait', 'prefers-reduced-motion: reduce', 'hover: none'], answer: 2, explanation: 'prefers-reduced-motion lets a site adapt motion to a user preference.' },
  { category: 'JavaScript', question: 'Which operator combines a value with a fallback only when it is null or undefined?', options: ['||', '&&', '??', '?.'], answer: 2, explanation: 'The nullish coalescing operator (??) falls back only for null or undefined.' },
];

export function shuffle(items, random = Math.random) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function scoreAnswers(questions, answers) {
  return questions.reduce((total, item, index) => total + (answers[index] === item.answer ? 1 : 0), 0);
}
