import { escape } from 'he';


/**
 * @param {TemplateStringsArray} strings
 * @param {...*} values
 */
const html = (strings, ...values) => strings.reduce((before, after, index) => {
  const value = values[index - 1];

  return before + escape(String(value)) + after;
});

export { html };
