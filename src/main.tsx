import { StrictMode, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import exercise from './content/exercises/demo-01.json';
import { challengePrompt, emptyData, loadData, MAX_FILE, MAX_TEXT, newEntry, parseData, saveData, type Data, type Entry } from './data';
import './style.css';

type View = 'home' | 'exercise' | 'history';
const steps = ['Lire', 'Décider', 'Se confronter', 'Faire le bilan'];
function App() {
  const [boot] = useState(() => {
    try { return { data: loadData(window.localStorage), error: '' }; }
    catch { return { data: emptyData(), error: 'Les données locales sont inaccessibles ou invalides. Elles ne seront pas écrasées automatiquement. Exportez votre travail avant de quitter.' }; }
  });
  const [data, setData] = useState<Data>(boot.data);
  const [view, setView] = useState<View>('home');
  const [storageError, setStorageError] = useState(boot.error);
  const [notice, setNotice] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const [pending, setPending] = useState<Data | null>(null);
  const [importError, setImportError] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  const importButton = useRef<HTMLInputElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const entry = data.entry;
  const step = entry?.step ?? 1;
  const status = !entry ? 'À commencer' : entry.status === 'completed' ? 'Terminé' : 'En cours';
  function persist(next: Data, force = false) {
    if (boot.error && !force && storageError) return;
    try { saveData(window.localStorage, next); setStorageError(''); setNotice('Enregistré sur cet appareil'); }
    catch { setStorageError('Sauvegarde impossible. Votre texte reste dans cette page. Exportez-le avant de fermer ou de recharger, puis réessayez.'); setNotice(''); }
  }
  function update(patch: Partial<Entry>) {
    const next: Data = { version: 1, entry: { ...(entry ?? newEntry()), ...patch, ...(patch.step && patch.step < 4 ? { status: 'in-progress' as const } : {}), updatedAt: new Date().toISOString() } };
    setData(next); persist(next);
  }
  function navigate(next: View) { persist(data); setView(next); }
  function begin() { if (!entry) update({}); setView('exercise'); }
  useEffect(() => { heading.current?.focus(); }, [view, step]);
  useEffect(() => { if (pending) dialog.current?.showModal(); }, [pending]);
  function download() {
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
    const a = document.createElement('a'); a.href = url; a.download = 'product-gym-donnees.json'; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  async function readImport(file?: File) {
    setImportError('');
    if (!file) return;
    try {
      if (file.size > MAX_FILE) throw new Error('Fichier trop volumineux (200 Ko maximum).');
      setPending(parseData(await file.text()));
    } catch (error) { setImportError(error instanceof Error ? error.message : 'Fichier illisible.'); }
  }
  function closeImport() { dialog.current?.close(); setPending(null); importButton.current?.focus(); }
  const prompt = challengePrompt([
    exercise.scenario.product, exercise.scenario.role, exercise.scenario.objective, exercise.scenario.context,
    ...exercise.scenario.signals.map(s => `${s.text} (${s.sourceNote})`), ...exercise.scenario.constraints, exercise.task.prompt,
  ].join('\n\n'), (entry?.initialDecision ?? '') + (entry?.revision ? `\n\nPrécision : ${entry.revision}` : ''));
  const field = (name: 'decision' | 'revision' | 'reflection', label: string) => <div className="field-group"><label htmlFor={name}>{label}</label><textarea id={name} className="pg-field" maxLength={MAX_TEXT} value={entry?.[name] ?? ''} onChange={e => update({ [name]: e.target.value })} aria-describedby={`${name}-help`}/><p className="muted small" id={`${name}-help`}>20 000 caractères maximum · sauvegarde locale automatique.</p></div>;
  const brief = <><p>{exercise.scenario.product}</p><p>{exercise.scenario.role}</p><p>{exercise.scenario.context}</p><h2>Objectif</h2><p>{exercise.scenario.objective}</p><h2>Les signaux disponibles</h2><ul className="signals">{exercise.scenario.signals.map(s => <li key={s.text}><p>{s.text}</p><p className="muted small">{s.sourceNote}</p></li>)}</ul><h2>Les contraintes</h2><ul>{exercise.scenario.constraints.map(c => <li key={c}>{c}</li>)}</ul><h2>Votre décision</h2><p>{exercise.task.prompt}</p></>;
  return <>
    <a className="skip" href="#main">Aller au contenu</a>
    <header><div className="shell header-row"><a className="brand" href="#" onClick={e => { e.preventDefault(); navigate('home'); }}>Product Gym<span aria-hidden="true">.</span></a><nav aria-label="Navigation principale">{([['home', "S’entraîner"], ['history', 'Historique']] as const).map(([id,label]) => <button key={id} className="nav-link" aria-current={view === id ? 'page' : undefined} onClick={() => navigate(id)}>{label}</button>)}</nav></div></header>
    <main id="main" className="shell">
      {storageError && <div className="error" role="alert"><p>{storageError}</p><div className="actions"><button className="pg-button pg-button-secondary" onClick={download}>Exporter mon travail</button><button className="pg-button pg-button-quiet" onClick={() => { if (!boot.error || window.confirm('Remplacer les anciennes données locales par le travail de cette page ? Exportez-les avant si nécessaire.')) persist(data, true); }}>Réessayer la sauvegarde</button></div></div>}
      {view === 'home' && <><p className="eyebrow">Un espace pour pratiquer</p><h1 ref={heading} tabIndex={-1} className="hero">Le jugement produit<br/>se pratique.</h1><p className="intro muted">Une situation, une décision, une contradiction.<br/>Prenez le temps de défendre vos choix, puis de les questionner.</p><section className="featured"><p className="muted small">Arbitrage · {exercise.durationMinutes} minutes · Difficulté {exercise.difficulty} sur 3</p><h2>{exercise.title}</h2><p>Un planning automatique est-il la bonne réponse aux perturbations ?</p><div className="actions spread"><span className={entry?.status === 'completed' ? 'complete' : 'muted'}>{status}</span><button className="pg-button pg-button-primary" onClick={begin}>{entry ? 'Reprendre l’exercice' : 'Commencer l’exercice'}</button></div></section><section className="section"><h2>La bibliothèque</h2><p className="muted">Un premier exercice pour explorer la méthode.</p><button className="exercise-row" onClick={begin}><span className="muted small">01 · Arbitrage</span><strong>{exercise.title}</strong><span>{status} →</span></button></section></>}
      {view === 'exercise' && entry && <div className="reading"><button className="pg-button pg-button-quiet back" onClick={() => navigate('home')}>← Retour à l’accueil</button><p className="muted small">Arbitrage · {exercise.durationMinutes} minutes</p><h1 ref={heading} tabIndex={-1}>{exercise.title}</h1><p className="stage">Étape {step} sur 4 · {steps[step-1]}</p><div className="pg-progress" aria-hidden="true"><span style={{width:`${step*25}%`}}/></div><section className="step-content">
        {step === 1 && brief}
        {step > 1 && <details><summary>Relire le contexte</summary><div className="context">{brief}</div></details>}
        {step === 2 && <><h2>Formuler votre décision</h2><p>{exercise.task.prompt}</p>{entry.initialDecision ? <><p className="muted">Votre décision initiale est conservée pour garder une trace de votre raisonnement.</p><blockquote>{entry.initialDecision}</blockquote><button className="pg-button pg-button-primary" onClick={() => update({step:3})}>Revoir l’objection</button></> : <>{field('decision', 'Votre recommandation')}<div className="actions end"><button className="pg-button pg-button-primary" disabled={!entry.decision.trim()} onClick={() => update({ initialDecision: entry.decision.trim(), step:3 })}>Voir l’objection</button></div></>}</>}
        {step === 3 && entry.initialDecision && <><h2>Mettre votre décision à l’épreuve</h2><div className="feedback"><p className="small muted">L’objection du {exercise.challenge.speaker}</p><blockquote>{exercise.challenge.objection}</blockquote></div><details><summary>Relire ma décision initiale</summary><p className="user-text">{entry.initialDecision}</p></details><p>{exercise.challenge.followUp}</p>{field('revision', 'Préciser ma décision (facultatif)')}<div className="external"><button className="pg-button pg-button-secondary" onClick={() => setShowPrompt(!showPrompt)}>Me challenger avec ChatGPT</button>{showPrompt && <><p>Copiez ce texte, ouvrez ChatGPT, puis collez-le vous-même. Revenez ici pour rédiger votre bilan : la discussion n’est pas récupérée.</p><p className="small muted">Évitez toute information professionnelle confidentielle. Aucune réponse n’est envoyée automatiquement.</p><label htmlFor="prompt">Prompt à copier</label><textarea id="prompt" className="pg-field" readOnly value={prompt}/><div className="actions"><button className="pg-button pg-button-secondary" onClick={async () => { try { await navigator.clipboard.writeText(prompt); setCopyStatus('Prompt copié.'); } catch { setCopyStatus('Copie refusée. Sélectionnez le texte ci-dessus et copiez-le manuellement.'); } }}>Copier le prompt</button><a className="pg-button pg-button-secondary" href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer">Ouvrir ChatGPT (nouvel onglet)</a></div><p role="status">{copyStatus}</p></>}</div><div className="actions end"><button className="pg-button pg-button-primary" onClick={() => update({step:4})}>Écrire mon bilan</button></div></>}
        {step === 4 && entry.initialDecision && <><h2>Ce que je retiens</h2><ul>{exercise.debrief.questions.map(q => <li key={q}>{q}</li>)}</ul>{field('reflection', 'Votre bilan')}<div className="actions end"><button className="pg-button pg-button-primary" disabled={!entry.reflection.trim()} onClick={() => { update({status:'completed'}); setView('history'); }}>Terminer l’exercice</button></div></>}
        {step === 1 && <div className="actions end"><button className="pg-button pg-button-primary" onClick={() => update({step:2})}>Formuler ma décision</button></div>}
        {step > 1 && <button className="pg-button pg-button-quiet" onClick={() => update({step:(step-1) as Entry['step']})}>← Étape précédente</button>}
      </section></div>}
      {view === 'history' && <div className="reading"><p className="eyebrow">Votre carnet</p><h1 ref={heading} tabIndex={-1}>Historique</h1><p className="muted">Vos décisions et ce que vous en retenez, sur cet appareil.</p>{entry ? <section className="section"><p className="muted small">{status} · Dernière modification le {new Date(entry.updatedAt).toLocaleString('fr-FR')}</p><h2>{exercise.title}</h2><h3>Décision initiale</h3><p className="user-text">{entry.initialDecision || entry.decision || 'Aucune décision rédigée.'}</p>{entry.revision && <><h3>Après confrontation</h3><p className="user-text">{entry.revision}</p></>}{entry.reflection && <><h3>Bilan</h3><p className="user-text">{entry.reflection}</p></>}<button className="pg-button pg-button-primary" onClick={begin}>Reprendre l’exercice</button></section> : <p className="section">Aucun entraînement commencé.</p>}<section className="section"><h2>Garder une copie</h2><p>Pas de synchronisation entre appareils. Exportez vos données pour les conserver ou les importer ailleurs.</p><div className="actions"><button className="pg-button pg-button-secondary" onClick={download}>Exporter mes données</button><label className="import-label" htmlFor="import">Importer mes données (JSON)</label><input ref={importButton} id="import" type="file" accept=".json,application/json" onChange={e => { void readImport(e.target.files?.[0]); e.target.value=''; }}/></div>{importError && <p role="alert" className="error">Import refusé : {importError} Vos données actuelles sont conservées.</p>}</section></div>}
      <p role="status" className="save-status muted small">{notice}</p>
    </main>
    <footer className="shell muted small">Sur cet appareil uniquement · Sans compte, sans suivi, sans score de compétence.</footer>
    <dialog ref={dialog} onCancel={e => { e.preventDefault(); closeImport(); }} aria-labelledby="import-title"><h2 id="import-title">Remplacer les données actuelles ?</h2><p>Le fichier est valide. L’import remplacera tout le carnet de cet appareil. Exportez les données actuelles pour les conserver.</p><div className="actions"><button autoFocus className="pg-button pg-button-secondary" onClick={closeImport}>Annuler</button><button className="pg-button pg-button-secondary" onClick={download}>Exporter avant remplacement</button><button className="pg-button pg-button-primary" onClick={() => { if (pending) { setData(pending); persist(pending, true); } closeImport(); }}>Remplacer mes données</button></div></dialog>
  </>;
}

createRoot(document.getElementById('root')!).render(<StrictMode><App/></StrictMode>);
