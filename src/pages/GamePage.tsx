import { useAppContext } from '@/context/AppContext';
import MemoryGame from '@/components/game/MemoryGame';

const GamePage = () => {
  const { groups, students } = useAppContext();
  return <MemoryGame groups={groups} students={students} />;
};

export default GamePage;
