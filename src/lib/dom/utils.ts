import { createParser } from 'css-selector-parser';

const parser = createParser();

function isValidCssSelector(value: string): boolean {
  try {
    for (const query of value.split('\n')) {
      parser(query);
    }

    return true;
  } catch (e) {
    return false;
  }
}

export { isValidCssSelector };
