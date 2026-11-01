import test from 'node:test';
import assert from 'node:assert/strict';
import { QUESTIONS, shuffle, scoreAnswers } from '../src/quiz.js';

test('question bank has at least fifteen four-option questions with valid answer indices', () => {
  assert.ok(QUESTIONS.length >= 15);
  for (const question of QUESTIONS) {
    assert.equal(question.options.length, 4);
    assert.ok(question.answer >= 0 && question.answer < 4);
  }
});

test('score calculation validates answers against the corresponding question after shuffle', () => {
  const ordered = shuffle(QUESTIONS, () => 0.42);
  const answers = ordered.map(question => question.answer);
  assert.equal(scoreAnswers(ordered, answers), ordered.length);
  answers[0] = (ordered[0].answer + 1) % 4;
  assert.equal(scoreAnswers(ordered, answers), ordered.length - 1);
});

test('shuffle returns every original question once without mutating the source', () => {
  const original = [...QUESTIONS];
  const shuffled = shuffle(QUESTIONS, () => 0.73);
  assert.equal(shuffled.length, QUESTIONS.length);
  assert.deepEqual([...shuffled].sort((a, b) => QUESTIONS.indexOf(a) - QUESTIONS.indexOf(b)), original);
  assert.deepEqual(QUESTIONS, original);
  assert.notDeepEqual(shuffled, QUESTIONS);
});

test('unanswered questions do not count as correct', () => {
  assert.equal(scoreAnswers(QUESTIONS.slice(0, 2), [null, undefined]), 0);
});
