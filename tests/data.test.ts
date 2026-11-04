import test from 'node:test';
import assert from 'node:assert/strict';
import { challengePrompt, emptyData, KEY, loadData, MAX_FILE, MAX_TEXT, newEntry, parseData, saveData } from '../src/data.ts';

test('sauvegarde et reprise exactes des textes et de la progression', () => {
  const values = new Map<string,string>();
  const storage = { getItem: (k:string) => values.get(k) ?? null, setItem: (k:string,v:string) => { values.set(k,v); } };
  assert.deepEqual(loadData(storage), emptyData());
  const data = { version: 1 as const, entry: { ...newEntry(), step: 3 as const, initialDecision: 'Ma décision', decision: 'Ma décision', revision: 'Je précise\nmon choix.' } };
  saveData(storage, data);
  assert.ok(values.has(KEY));
  assert.deepEqual(loadData(storage), data);
});
test('les défaillances de stockage remontent sans modifier les données en mémoire', () => {
  const data = { version: 1 as const, entry: newEntry() };
  const before = JSON.stringify(data);
  assert.throws(() => saveData({ setItem() { throw new Error('QuotaExceeded'); } }, data), /QuotaExceeded/);
  assert.equal(JSON.stringify(data), before);
  assert.throws(() => loadData({ getItem() { throw new Error('SecurityError'); } }), /SecurityError/);
  assert.throws(() => loadData({ getItem() { return '{broken'; } }));
});
test('import valide uniquement les identifiants connus, types, versions et tailles attendus', () => {
  const data = { version: 1, entry: newEntry() };
  assert.deepEqual(parseData(JSON.stringify(data)), data);
  for (const input of [null, [], { version:2, entry:null }, {version:1,entry:null,extra:true}, ...[
    {exerciseId:'unknown'}, {step:9}, {step:'2'}, {decision:1}, {decision:'x'.repeat(MAX_TEXT+1)}, {updatedAt:'demain'}, {initialDecision:null}, {extra:true}, {status:'other'}
  ].map(patch => ({version:1,entry:{...newEntry(), ...patch}}))]) {
    assert.throws(() => parseData(JSON.stringify(input)));
  }
  assert.throws(() => parseData(' '.repeat(MAX_FILE+1)), /volumineux/);
});
test('import refuse une objection déverrouillée sans engagement et un exercice terminé sans bilan', () => {
  assert.throws(() => parseData(JSON.stringify({version:1,entry:{...newEntry(),step:3}})));
  assert.throws(() => parseData(JSON.stringify({version:1,entry:{...newEntry(),step:4,initialDecision:'Choix',status:'completed'}})));
  const done = {version:1,entry:{...newEntry(),step:4,initialDecision:'Choix',reflection:'Compromis',status:'completed'}};
  assert.deepEqual(parseData(JSON.stringify(done)), done);
});
test('prompt français explicite, sans instruction de solution instantanée', () => {
  const prompt = challengePrompt('Contexte de test', 'Décision privée');
  assert.match(prompt, /Contexte de test/);
  assert.match(prompt, /Décision privée/);
  assert.match(prompt, /une objection à la fois/);
  assert.match(prompt, /Ne propose pas de solution instantanée/);
});
