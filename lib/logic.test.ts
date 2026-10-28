import test from 'node:test';
import assert from 'node:assert/strict';
import { executeTerminalCommand } from './terminal-commands';
import { filterProjects, filterSkills, filterBlogPosts } from './portfolio-utils';
import { validateContactForm } from './validators';
import { PROJECTS_DATA, SKILLS_DATA, BLOG_POSTS_DATA } from './portfolio-data';

test('executeTerminalCommand handles standard commands', () => {
  const helpRes = executeTerminalCommand('help');
  assert.ok(helpRes.output.length > 5);
  assert.ok(helpRes.output[0].includes('AVAILABLE TERMINAL COMMANDS'));

  const whoamiRes = executeTerminalCommand('whoami');
  assert.equal(whoamiRes.type, 'success');
  assert.ok(whoamiRes.output.some((line) => line.includes('USER:')));

  const clearRes = executeTerminalCommand('clear');
  assert.equal(clearRes.action, 'clear');

  const matrixRes = executeTerminalCommand('matrix');
  assert.equal(matrixRes.action, 'toggle-matrix');

  const catFlagRes = executeTerminalCommand('cat flag.txt');
  assert.ok(catFlagRes.output.some((l) => l.includes('CTF{')));
  assert.equal(catFlagRes.type, 'glitch');

  const sudoRes = executeTerminalCommand('sudo rm -rf /');
  assert.equal(sudoRes.type, 'warning');
  assert.ok(sudoRes.output[0].includes('not in the sudoers file'));
});

test('filterProjects correctly filters by category and search term', () => {
  const all = filterProjects(PROJECTS_DATA, 'All', '');
  assert.equal(all.length, PROJECTS_DATA.length);

  const cyber = filterProjects(PROJECTS_DATA, 'Cybersecurity', '');
  assert.ok(cyber.length > 0);
  assert.ok(cyber.every((p) => p.category === 'Cybersecurity'));

  const rustSearch = filterProjects(PROJECTS_DATA, 'All', 'Rust');
  assert.ok(rustSearch.length > 0);
  assert.ok(rustSearch.some((p) => p.technologies.includes('Rust')));
});

test('filterSkills correctly filters by category and search keyword', () => {
  const langs = filterSkills(SKILLS_DATA, 'Programming Languages', '');
  assert.ok(langs.length > 0);
  assert.ok(langs.every((s) => s.category === 'Programming Languages'));

  const pySearch = filterSkills(SKILLS_DATA, 'All', 'Python');
  assert.equal(pySearch.length, 1);
  assert.equal(pySearch[0].name, 'Python');
});

test('filterBlogPosts filters by category, tag, and query', () => {
  const all = filterBlogPosts(BLOG_POSTS_DATA, 'All', '');
  assert.equal(all.length, BLOG_POSTS_DATA.length);

  const ctf = filterBlogPosts(BLOG_POSTS_DATA, 'CTF Write-up', '');
  assert.equal(ctf.length, 1);

  const tagFiltered = filterBlogPosts(BLOG_POSTS_DATA, 'All', '', 'Exploitation');
  assert.equal(tagFiltered.length, 1);
  assert.equal(tagFiltered[0].slug, 'demystifying-memory-corruption');
});

test('validateContactForm checks valid and invalid submissions', () => {
  const invalid = validateContactForm({
    name: '',
    email: 'bad-email',
    subject: 'hi',
    message: 'short',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.subject);
  assert.ok(invalid.errors.message);

  const valid = validateContactForm({
    name: 'Neo Operator',
    email: 'operator@matrix.net',
    subject: 'Encrypted Security Collaboration',
    message: 'This is a secure transmission regarding the architecture audit.',
  });
  assert.equal(valid.isValid, true);
  assert.deepEqual(valid.errors, {});
});
