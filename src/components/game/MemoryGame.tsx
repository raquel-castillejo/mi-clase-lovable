import { useState, useMemo } from 'react';
import { User, RotateCcw, Trophy, ArrowLeft, Camera, Type } from 'lucide-react';
import type { Student, Group } from '@/types/app';

interface MemoryGameProps {
  groups: Group[];
  students: Student[];
}

type ExerciseType = 'photo-to-name' | 'name-to-photo';
type Difficulty = 'easy' | 'hard';
type GameState = 'config' | 'playing' | 'done';

interface Question {
  student: Student;
  options: Student[];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuestions(pool: Student[]): Question[] {
  const shuffled = shuffle(pool);
  return shuffled.map((student) => {
    const others = shuffle(pool.filter((s) => s.id !== student.id)).slice(0, 3);
    const options = shuffle([student, ...others]);
    return { student, options };
  });
}

const MemoryGame = ({ groups, students }: MemoryGameProps) => {
  const [state, setState] = useState<GameState>('config');
  const [selectedGroupIds, setSelectedGroupIds] = useState<Set<string>>(new Set());
  const [exerciseType, setExerciseType] = useState<ExerciseType>('photo-to-name');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [feedback, setFeedback] = useState<null | { correct: boolean; correctStudent: Student }>(null);

  const toggleGroup = (id: string) => {
    const next = new Set(selectedGroupIds);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelectedGroupIds(next);
  };

  const selectAll = () => {
    if (selectedGroupIds.size === groups.length) {
      setSelectedGroupIds(new Set());
    } else {
      setSelectedGroupIds(new Set(groups.map((g) => g.id)));
    }
  };

  const poolStudents = useMemo(() => {
    const ids = new Set<string>();
    groups.filter((g) => selectedGroupIds.has(g.id)).forEach((g) => g.memberIds.forEach((m) => ids.add(m)));
    return students.filter((s) => ids.has(s.id));
  }, [selectedGroupIds, groups, students]);

  const canStart = poolStudents.length >= 4;

  const startGame = () => {
    const qs = buildQuestions(poolStudents);
    setQuestions(qs);
    setCurrentIdx(0);
    setScore(0);
    setTypedAnswer('');
    setFeedback(null);
    setState('playing');
  };

  const submitChoice = (chosenId: string) => {
    const q = questions[currentIdx];
    const correct = chosenId === q.student.id;
    if (correct) setScore((s) => s + 1);
    setFeedback({ correct, correctStudent: q.student });
  };

  const submitTyped = () => {
    const q = questions[currentIdx];
    const correct = typedAnswer.trim().toLowerCase() === q.student.name.trim().toLowerCase();
    if (correct) setScore((s) => s + 1);
    setFeedback({ correct, correctStudent: q.student });
  };

  const next = () => {
    setFeedback(null);
    setTypedAnswer('');
    if (currentIdx + 1 >= questions.length) {
      setState('done');
    } else {
      setCurrentIdx((i) => i + 1);
    }
  };

  // ─── CONFIG ───
  if (state === 'config') {
    return (
      <div style={pageStyle} className="animate-fade-in">
        <h1 style={h1}>Memory Game</h1>
        <p style={descStyle}>Test how well you know your students' names.</p>

        <div style={sectionBox}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
            <label style={sectionLabel}>1. Select groups</label>
            <button onClick={selectAll} style={linkBtn}>
              {selectedGroupIds.size === groups.length ? 'Deselect all' : 'Select all'}
            </button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
            {groups.map((g) => {
              const active = selectedGroupIds.has(g.id);
              return (
                <button key={g.id} onClick={() => toggleGroup(g.id)} className="hover-brighten" style={{
                  ...chipStyle,
                  background: active ? 'hsl(var(--color-secondary))' : 'transparent',
                  color: active ? 'hsl(var(--color-secondary-text))' : 'hsl(var(--color-text))',
                  borderColor: active ? 'hsl(var(--color-secondary))' : 'hsl(var(--color-border))',
                }}>
                  {g.name} ({g.memberIds.length})
                </button>
              );
            })}
            {groups.length === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-sm)', padding: 'var(--space-md)', width: '100%' }}>
                <span style={{ fontSize: '2rem' }}>📋</span>
                <span style={{ fontSize: 'var(--text-footnote)', color: 'hsl(var(--color-text-secondary))' }}>No groups available. Create groups first!</span>
              </div>
            )}
          </div>
          {selectedGroupIds.size > 0 && (
            <div style={{ marginTop: 'var(--space-sm)', fontSize: 'var(--text-footnote)', color: 'hsl(var(--color-text-secondary))' }}>
              {poolStudents.length} student{poolStudents.length !== 1 ? 's' : ''} selected
              {poolStudents.length < 4 && <span style={{ color: 'hsl(var(--color-alert))' }}> — need at least 4</span>}
            </div>
          )}
        </div>

        <div style={sectionBox}>
          <label style={sectionLabel}>2. Exercise type</label>
          <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
            <button onClick={() => setExerciseType('photo-to-name')} className="hover-lift" style={optionCard(exerciseType === 'photo-to-name')}>
              <Camera size={24} />
              <span style={{ fontSize: 'var(--text-headline)', fontWeight: 'var(--weight-headline)' }}>Photo → Name</span>
              <span style={{ fontSize: 'var(--text-footnote)', color: 'hsl(var(--color-text-secondary))' }}>See a photo, guess the name</span>
            </button>
            <button onClick={() => setExerciseType('name-to-photo')} className="hover-lift" style={optionCard(exerciseType === 'name-to-photo')}>
              <Type size={24} />
              <span style={{ fontSize: 'var(--text-headline)', fontWeight: 'var(--weight-headline)' }}>Name → Photo</span>
              <span style={{ fontSize: 'var(--text-footnote)', color: 'hsl(var(--color-text-secondary))' }}>See a name, pick the face</span>
            </button>
          </div>
        </div>

        {exerciseType === 'photo-to-name' && (
          <div style={sectionBox} className="animate-fade-in">
            <label style={sectionLabel}>3. Difficulty</label>
            <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
              <button onClick={() => setDifficulty('easy')} className="hover-lift" style={optionCard(difficulty === 'easy')}>
                <span style={{ fontSize: 'var(--text-headline)', fontWeight: 'var(--weight-headline)' }}>Easy</span>
                <span style={{ fontSize: 'var(--text-footnote)', color: 'hsl(var(--color-text-secondary))' }}>Pick from 4 names</span>
              </button>
              <button onClick={() => setDifficulty('hard')} className="hover-lift" style={optionCard(difficulty === 'hard')}>
                <span style={{ fontSize: 'var(--text-headline)', fontWeight: 'var(--weight-headline)' }}>Hard</span>
                <span style={{ fontSize: 'var(--text-footnote)', color: 'hsl(var(--color-text-secondary))' }}>Type the full name</span>
              </button>
            </div>
          </div>
        )}

        <button onClick={startGame} disabled={!canStart} className="hover-brighten" style={{
          ...primaryBtn,
          opacity: canStart ? 1 : 0.5,
          cursor: canStart ? 'pointer' : 'not-allowed',
          marginTop: 'var(--space-md)',
        }}>
          Start Game
        </button>
      </div>
    );
  }

  // ─── RESULTS ───
  if (state === 'done') {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div style={pageStyle} className="animate-scale-pop">
        <Trophy size={56} color="hsl(var(--color-primary))" />
        <h1 style={h1}>Results</h1>
        <div style={{
          fontSize: 'var(--text-large-title)', lineHeight: 'var(--leading-large-title)', fontWeight: 900,
          color: 'hsl(var(--color-text))', marginBottom: 'var(--space-xs)',
        }}>
          {score} / {questions.length}
        </div>
        <div style={{
          fontSize: 'var(--text-title-2)', lineHeight: 'var(--leading-title-2)',
          color: pct >= 80 ? 'hsl(var(--color-success))' : pct >= 50 ? 'hsl(var(--color-primary-dark))' : 'hsl(var(--color-alert))',
          fontWeight: 'var(--weight-headline)',
        }}>
          {pct}%
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-lg)' }}>
          <button onClick={startGame} className="hover-brighten" style={primaryBtn}><RotateCcw size={18} /> Retry</button>
          <button onClick={() => setState('config')} className="hover-brighten" style={secondaryBtn}><ArrowLeft size={18} /> Setup</button>
        </div>
      </div>
    );
  }

  // ─── PLAYING ───
  const q = questions[currentIdx];
  const progress = ((currentIdx + (feedback ? 1 : 0)) / questions.length) * 100;
  const isPhotoToName = exerciseType === 'photo-to-name';

  // Feedback flash class
  const feedbackFlash = feedback
    ? feedback.correct ? 'animate-flash-correct' : 'animate-flash-wrong'
    : '';

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: 'var(--space-lg)' }} className="animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
        <span style={{ fontSize: 'var(--text-subhead)', color: 'hsl(var(--color-text-secondary))' }}>
          Question {currentIdx + 1} of {questions.length}
        </span>
        <span style={{ fontSize: 'var(--text-subhead)', fontWeight: 'var(--weight-headline)', color: 'hsl(var(--color-text))' }}>
          Score: {score}
        </span>
      </div>

      {/* Progress bar */}
      <div style={progressTrack}>
        <div style={{ ...progressFill, width: `${progress}%` }} />
      </div>

      {/* Question card — flashes green/red on answer */}
      <div key={currentIdx} style={questionCard} className={`animate-card-enter ${feedbackFlash}`}>
        {isPhotoToName ? (
          <>
            <div style={bigAvatar}>
              {q.student.photo ? (
                <img src={q.student.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <User size={56} color="hsl(var(--color-secondary))" />
              )}
            </div>
            <div style={{ fontSize: 'var(--text-headline)', fontWeight: 'var(--weight-headline)', color: 'hsl(var(--color-text))', marginBottom: 'var(--space-md)' }}>
              Who is this student?
            </div>

            {difficulty === 'easy' ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-sm)', width: '100%' }}>
                {q.options.map((opt) => {
                  let bg = 'transparent';
                  let border = 'hsl(var(--color-border))';
                  let color = 'hsl(var(--color-text))';
                  if (feedback) {
                    if (opt.id === q.student.id) {
                      bg = 'hsl(var(--color-success-light))';
                      border = 'hsl(var(--color-success))';
                      color = 'hsl(var(--color-success-dark))';
                    }
                  }
                  return (
                    <button key={opt.id} onClick={() => !feedback && submitChoice(opt.id)} disabled={!!feedback}
                      className={!feedback ? 'hover-lift' : ''}
                      style={{
                        padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', border: `2px solid ${border}`,
                        background: bg, cursor: feedback ? 'default' : 'pointer', fontFamily: 'inherit',
                        fontSize: 'var(--text-body)', color, textAlign: 'center', transition: 'all 0.2s ease',
                      }}>
                      {opt.name}
                    </button>
                  );
                })}
              </div>
            ) : (
              !feedback ? (
                <div style={{ display: 'flex', gap: 'var(--space-sm)', width: '100%' }}>
                  <input
                    value={typedAnswer}
                    onChange={(e) => setTypedAnswer(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && typedAnswer.trim() && submitTyped()}
                    placeholder="Type full name…"
                    autoFocus
                    style={inputStyle}
                  />
                  <button onClick={submitTyped} disabled={!typedAnswer.trim()} className="hover-brighten" style={primaryBtn}>Check</button>
                </div>
              ) : null
            )}
          </>
        ) : (
          <>
            <div style={{
              fontSize: 'var(--text-title-1)', lineHeight: 'var(--leading-title-1)', fontWeight: 'var(--weight-headline)',
              color: 'hsl(var(--color-text))', marginBottom: 'var(--space-md)',
            }}>
              {q.student.name}
            </div>
            <div style={{ fontSize: 'var(--text-body)', color: 'hsl(var(--color-text-secondary))', marginBottom: 'var(--space-md)' }}>
              Which photo matches this name?
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)', width: '100%' }}>
              {q.options.map((opt) => {
                let ring = 'hsl(var(--color-border))';
                if (feedback && opt.id === q.student.id) ring = 'hsl(var(--color-success))';
                return (
                  <button key={opt.id} onClick={() => !feedback && submitChoice(opt.id)} disabled={!!feedback}
                    className={!feedback ? 'hover-lift' : ''}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-sm)',
                      padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', border: `3px solid ${ring}`,
                      background: 'transparent', cursor: feedback ? 'default' : 'pointer', transition: 'all 0.2s ease',
                    }}>
                    <div style={smallAvatar}>
                      {opt.photo ? (
                        <img src={opt.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <User size={32} color="hsl(var(--color-secondary))" />
                      )}
                    </div>
                    {feedback && <span style={{ fontSize: 'var(--text-caption-1)', color: 'hsl(var(--color-text-secondary))' }}>{opt.name}</span>}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Feedback */}
        {feedback && (
          <div style={{ marginTop: 'var(--space-lg)', textAlign: 'center', width: '100%' }} className="animate-scale-pop">
            <div style={{
              fontSize: 'var(--text-headline)', fontWeight: 'var(--weight-headline)', marginBottom: 'var(--space-sm)',
              color: feedback.correct ? 'hsl(var(--color-success))' : 'hsl(var(--color-alert))',
            }}>
              {feedback.correct ? '✓ Correct!' : `✗ Wrong — it was ${feedback.correctStudent.name}`}
            </div>
            <button onClick={next} className="hover-brighten" style={primaryBtn}>
              {currentIdx + 1 >= questions.length ? 'See Results' : 'Next →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Styles ───
const pageStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 'var(--space-xl)', gap: 'var(--space-md)', maxWidth: 520, margin: '0 auto' };
const h1: React.CSSProperties = { fontSize: 'var(--text-title-1)', lineHeight: 'var(--leading-title-1)', fontWeight: 'var(--weight-headline)', color: 'hsl(var(--color-text))', margin: 0 };
const descStyle: React.CSSProperties = { fontSize: 'var(--text-body)', color: 'hsl(var(--color-text-secondary))', margin: 0 };
const sectionBox: React.CSSProperties = { width: '100%', padding: 'var(--space-md)', background: 'hsl(var(--color-card))', borderRadius: 'var(--radius-md)', border: '1px solid hsl(var(--color-border))' };
const sectionLabel: React.CSSProperties = { display: 'block', fontSize: 'var(--text-headline)', fontWeight: 'var(--weight-headline)', color: 'hsl(var(--color-text))', marginBottom: 'var(--space-sm)' };
const chipStyle: React.CSSProperties = { padding: 'var(--space-sm) var(--space-md)', borderRadius: 'var(--radius-pill)', border: '1.5px solid', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'var(--text-subhead)', transition: 'all 0.15s' };
const linkBtn: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', fontSize: 'var(--text-footnote)', color: 'hsl(var(--color-secondary))', fontFamily: 'inherit', textDecoration: 'underline' };

const optionCard = (active: boolean): React.CSSProperties => ({
  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-xs)', padding: 'var(--space-md)',
  borderRadius: 'var(--radius-md)', border: `2px solid ${active ? 'hsl(var(--color-secondary))' : 'hsl(var(--color-border))'}`,
  background: active ? 'hsl(var(--color-secondary-light))' : 'transparent', cursor: 'pointer', fontFamily: 'inherit',
  color: 'hsl(var(--color-text))', transition: 'all 0.2s ease',
});

const primaryBtn: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 'var(--space-xs)', padding: 'var(--space-sm) var(--space-lg)', borderRadius: 'var(--radius-pill)', border: 'none', background: 'hsl(var(--color-secondary))', color: 'hsl(var(--color-secondary-text))', fontSize: 'var(--text-headline)', fontWeight: 'var(--weight-headline)', fontFamily: 'inherit', cursor: 'pointer' };
const secondaryBtn: React.CSSProperties = { ...primaryBtn, background: 'transparent', color: 'hsl(var(--color-text))', border: '1.5px solid hsl(var(--color-border))' };

const progressTrack: React.CSSProperties = { width: '100%', height: 6, borderRadius: 'var(--radius-pill)', background: 'hsl(var(--color-border))', marginBottom: 'var(--space-lg)', overflow: 'hidden' };
const progressFill: React.CSSProperties = { height: '100%', borderRadius: 'var(--radius-pill)', background: 'hsl(var(--color-secondary))', transition: 'width 0.3s ease' };

const questionCard: React.CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 'var(--space-xl)', background: 'hsl(var(--color-card))', borderRadius: 'var(--radius-lg)', border: '1px solid hsl(var(--color-border))' };
const bigAvatar: React.CSSProperties = { width: 120, height: 120, borderRadius: 'var(--radius-pill)', overflow: 'hidden', background: 'hsl(var(--color-primary-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-md)' };
const smallAvatar: React.CSSProperties = { width: 72, height: 72, borderRadius: 'var(--radius-pill)', overflow: 'hidden', background: 'hsl(var(--color-primary-light))', display: 'flex', alignItems: 'center', justifyContent: 'center' };

const inputStyle: React.CSSProperties = { flex: 1, padding: 'var(--space-sm) var(--space-md)', borderRadius: 'var(--radius-sm)', border: '1px solid hsl(var(--color-border))', fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)', fontFamily: 'inherit', background: 'hsl(var(--color-surface))', color: 'hsl(var(--color-text))', boxSizing: 'border-box' };

export default MemoryGame;
