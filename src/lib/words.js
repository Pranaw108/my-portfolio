const NUMBER_WORDS = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];

/** Spell a count, so heading copy can never disagree with the data behind it. */
export const countWord = (n) => NUMBER_WORDS[n] ?? String(n);
