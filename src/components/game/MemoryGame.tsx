import { useState } from 'react';
import { User, RotateCcw, Trophy } from 'lucide-react';
import type { Student, Group } from '@/types/app';

interface MemoryGameProps {
  groups: Group[];
  students: Student[];
}

type GameState = 'config' | 'playing' | 'done';

const MemoryGame = ({ groups, students }: MemoryGameProps) => {
  const [state, setState] = useState<GameState>('config');
  const [groupId, setGroupId] = useState(groups[0]?.id ?? '');
  const [gameStudents, setGameStudents] = useState<Student[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState<null | boolean>(null);

  const startGame = () => {
    const group = groups.find((g) => g.id === groupId);
    if (!group) return;
    const members = students.filter((s) => group.memberIds.includes(s.id));
    const shuffled = [...members].sort(() => Math.random() - 0.5);
    setGameStudents(shuffled);
    setCurrentIdx(0);
    setScore(0);
    setAnswer('');
    setShowResult(null);
    setState('playing');
  };

  const checkAnswer = () => {
    const correct = gameStudents[currentIdx].name.toLowerCase().trim();
    const isCorrect = answer.toLowerCase().trim() === correct;
    if (isCorrect) setScore((s) => s + 1);
    setShowResult(isCorrect);
  };

  const next = () => {
    setShowResult(null);
    setAnswer('');
    if (currentIdx + 1 >= gameStudents.length) {
      setState('done');
    } else {
      setCurrentIdx((i) => i + 1);
    }
  };

  if (state === 'config') {
    return (
      <div style={containerStyle}>
        <h1 style={h1}>Memory Game</h1>
        <p style={descStyle}>Test how well you know your students' names!</p>
        <div style={{ maxWidth: 360, width: '100%' }}>
          <label style={labelStyle}>Select a group</label>
          <select style={inputStyle} value={groupId} onChange={(e) => setGroupId(e.target.value)}>
            {groups.map((g) => <option key={g.id} value={g.id}>{g.name} ({g.memberIds.length} students)</option>)}
          </select>
          <button onClick={startGame} style={{ ...btnStyle, marginTop: 'var(--space-lg)', width: '100%' }} disabled={!groupId}>
            Start Game
          </button>
        </div>
      </div>
    );
  }

  if (state === 'done') {
    return (
      <div style={containerStyle}>
        <Trophy size={48} color="hsl(var(--color-primary))" />
        <h1 style={h1}>Game Over!</h1>
        <p style={{ fontSize: 'var(--text-title-2)', lineHeight: 'var(--leading-title-2)', color: 'hsl(var(--color-text))' }}>
          {score} / {gameStudents.length} correct
        </p>
        <button onClick={() => setState('config')} style={btnStyle}><RotateCcw size={18} /> Play Again</button>
      </div>
    );
  }

  const current = gameStudents[currentIdx];

  return (
    <div style={containerStyle}>
      <div style={{ fontSize: 'var(--text-subhead)', color: 'hsl(var(--color-text-secondary))', marginBottom: 'var(--space-sm)' }}>
        {currentIdx + 1} / {gameStudents.length}
      </div>
      <div style={avatarStyle}>
        {current.photo ? (
          <img src={current.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <User size={48} color="hsl(var(--color-secondary))" />
        )}
      </div>
      {current.notes && (
        <div style={{ fontSize: 'var(--text-footnote)', color: 'hsl(var(--color-text-secondary))', marginBottom: 'var(--space-sm)', fontStyle: 'italic' }}>
          Hint: {current.notes}
        </div>
      )}
      {showResult === null ? (
        <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center', width: '100%', maxWidth: 360 }}>
          <input
            style={{ ...inputStyle, flex: 1 }}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
            placeholder="Type the student's full name"
            autoFocus
          />
          <button onClick={checkAnswer} style={btnStyle}>Check</button>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: 'var(--text-headline)', fontWeight: 'var(--weight-headline)', marginBottom: 'var(--space-sm)',
            color: showResult ? 'hsl(var(--color-success))' : 'hsl(var(--color-alert))',
          }}>
            {showResult ? '✓ Correct!' : `✗ It was: ${current.name}`}
          </div>
          <button onClick={next} style={btnStyle}>Next →</button>
        </div>
      )}
      <div style={{ marginTop: 'var(--space-md)', fontSize: 'var(--text-footnote)', color: 'hsl(var(--color-text-secondary))' }}>
        Score: {score}
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 'var(--space-xl)', gap: 'var(--space-md)' };
const h1: React.CSSProperties = { fontSize: 'var(--text-title-1)', lineHeight: 'var(--leading-title-1)', fontWeight: 'var(--weight-headline)', color: 'hsl(var(--color-text))', margin: 0 };
const descStyle: React.CSSProperties = { fontSize: 'var(--text-body)', color: 'hsl(var(--color-text-secondary))', marginBottom: 'var(--space-md)' };
const labelStyle: React.CSSProperties = { display: 'block', fontSize: 'var(--text-subhead)', fontWeight: 'var(--weight-headline)', color: 'hsl(var(--color-text))', marginBottom: 'var(--space-xs)' };
const inputStyle: React.CSSProperties = { width: '100%', padding: 'var(--space-sm) var(--space-md)', borderRadius: 'var(--radius-sm)', border: '1px solid hsl(var(--color-border))', fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)', fontFamily: 'inherit', background: 'hsl(var(--color-surface))', color: 'hsl(var(--color-text))', boxSizing: 'border-box' };
const btnStyle: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 'var(--space-xs)', padding: 'var(--space-sm) var(--space-lg)', borderRadius: 'var(--radius-pill)', border: 'none', background: 'hsl(var(--color-secondary))', color: 'hsl(var(--color-secondary-text))', fontSize: 'var(--text-headline)', fontWeight: 'var(--weight-headline)', fontFamily: 'inherit', cursor: 'pointer' };
const avatarStyle: React.CSSProperties = { width: 120, height: 120, borderRadius: 'var(--radius-pill)', background: 'hsl(var(--color-secondary-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' };

export default MemoryGame;
