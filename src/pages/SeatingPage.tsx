import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import SeatingList from '@/components/seating/SeatingList';
import SeatingModal from '@/components/seating/SeatingModal';

const SeatingPage = () => {
  const { students, groups, plans, addPlan, deletePlan } = useAppContext();
  const [modal, setModal] = useState(false);

  return (
    <>
      <SeatingList plans={plans} groups={groups} students={students} onAdd={() => setModal(true)} onDelete={deletePlan} />
      {modal && (
        <SeatingModal groups={groups} students={students} onSave={(data) => { addPlan(data); setModal(false); }} onClose={() => setModal(false)} />
      )}
    </>
  );
};

export default SeatingPage;
