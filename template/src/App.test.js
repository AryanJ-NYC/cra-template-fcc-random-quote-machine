import React from 'react';
import {
  act,
  buildQueries,
  render,
  queries,
  queryHelpers,
  waitFor,
  within,
} from '@testing-library/react';
import App from './App';

// User Story #1: I can see a wrapper element with a corresponding id="quote-box".
test('renders a wrapper element with id of "quote-box"', () => {
  const { queryById } = customRender(<App />);
  expect(queryById('quote-box')).toBeTruthy();
});

// User Story #2: Within #quote-box, I can see an element with a corresponding id="text".
test('renders an element with id "text" inside element with id "quote-box"', () => {
  const { queryById } = customRender(<App />);
  const quoteBox = queryById('quote-box');
  expect(customWithin(quoteBox).queryById('text')).toBeTruthy();
});

// User Story #3: Within #quote-box, I can see an element with a corresponding id="author".
test('renders an element with id "author" inside element with id "quote-box"', () => {
  const { queryById } = customRender(<App />);
  const quoteBox = queryById('quote-box');
  expect(customWithin(quoteBox).queryById('author')).toBeTruthy();
});

// User Story #4: Within #quote-box, I can see a clickable element with a corresponding id="new-quote".
test('renders a clickable element with id "new-quote" inside element with id "quote-box"', () => {
  const { queryById } = customRender(<App />);
  const quoteBox = queryById('quote-box');
  const newQuote = customWithin(quoteBox).queryById('new-quote');
  expect(newQuote).toBeTruthy();
});

// User Story #5: Within #quote-box, I can see a clickable a element with a corresponding id="tweet-quote".
test('renders a clickable element with id "tweet-quote" inside element with id "quote-box', () => {
  const { queryById } = customRender(<App />);
  const quoteBox = queryById('quote-box');
  const tweetQuote = customWithin(quoteBox).queryById('tweet-quote');
  expect(tweetQuote).toBeTruthy();
});

// User Story #6: On first load, my quote machine displays a random quote in the element with id="text".
test('renders a quote inside element with id "text"', async () => {
  const { queryById } = customRender(<App />);
  const quoteBox = queryById('quote-box');
  await waitFor(() => {
    const textElement = customWithin(quoteBox).queryById('text');
    expect(textElement.textContent).toBeTruthy();
  });
});

// User Story #7: On first load, my quote machine displays the random quote's author in the element with id="author".
test('renders the random quote\'s author inside element with id "author"', async () => {
  const { queryById } = customRender(<App />);
  const quoteBox = queryById('quote-box');
  await waitFor(() => {
    const authorElement = customWithin(quoteBox).queryById('author');
    expect(authorElement.textContent).toBeTruthy();
  });
});

// User Story #8: When the #new-quote button is clicked, my quote machine should fetch a new quote and display it in the #text element.
test('a new quote is fetched when element with id "new-quote" is clicked', async () => {
  const { queryById } = customRender(<App />);
  const quoteBox = queryById('quote-box');
  await waitFor(() => {
    const textElement = customWithin(quoteBox).queryById('text');
    const originalQuote = textElement.textContent;
    expect(originalQuote).toBeTruthy();
  });

  const textElement = customWithin(quoteBox).queryById('text');
  const originalQuote = textElement.textContent;

  act(() => {
    const newQuote = customWithin(quoteBox).queryById('new-quote');
    newQuote.click();
  });
  await waitFor(() => {
    const newQuote = customWithin(quoteBox).queryById('text').textContent;
    return expect(newQuote).not.toEqual(originalQuote);
  });
});

//User Story #9: My quote machine should fetch the new quote's author when the #new-quote button is clicked and display it in the #author element.
test('a new author is fetched when element with id "new-quote" is clicked', async () => {
  const { queryById } = customRender(<App />);
  const quoteBox = queryById('quote-box');
  await waitFor(() => {
    const textElement = customWithin(quoteBox).queryById('author');
    const originalQuote = textElement.textContent;
    expect(originalQuote).toBeTruthy();
  });

  const authorElement = customWithin(quoteBox).queryById('author');
  const originalAuthor = authorElement.textContent;

  act(() => {
    const newQuote = customWithin(quoteBox).queryById('new-quote');
    newQuote.click();
  });
  await waitFor(() => {
    const newAuthor = customWithin(quoteBox).queryById('author').textContent;
    return expect(newAuthor).not.toEqual(originalAuthor);
  });
});

// User Story #10: I can tweet the current quote by clicking on the #tweet-quote element. This a element should include the "twitter.com/intent/tweet" path in its href attribute to tweet the current quote.
test('element with id "tweet-quote" works', () => {
  const { queryById } = customRender(<App />);
  const quoteBox = queryById('quote-box');
  const tweetQuote = customWithin(quoteBox).queryById('tweet-quote');
  expect(tweetQuote.href).toBeTruthy();
  expect(tweetQuote.href).toContain('twitter.com/intent/tweet');
});

/**
 * The helpers below are out of scope of freeCodeCamp
 * and are used internally as a helper (so don't feel bad if you don't understand it just yet!).
 * Please do not modify.
 */
const queryAllById = (...args) => queryHelpers.queryAllByAttribute('id', ...args);
const getMultipleError = (c, value) => `Found multiple elements with the id attribute of: ${value}`;
const getMissingError = (c, value) =>
  `Unable to find an element with the id attribute of: ${value}`;
const [queryById] = buildQueries(queryAllById, getMultipleError, getMissingError);

const customRender = (ui, options) =>
  render(ui, {
    queries: { ...queries, queryById },
    ...options,
  });

const customWithin = (element) => within(element, { ...queries, queryById });
