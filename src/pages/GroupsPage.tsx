import { useState } from 'react';
import type { Group } from '@/types/app';
import { useAppContext } from '@/context/AppContext';
import GroupList from '@/components/groups/GroupList';
import GroupModal from '@/components/groups/GroupModal';

const GroupsPage = () => {
  const { students, groups, addGroup, editGroup, deleteGroup } = useAppContext();
  const [modal, setModal] = useState<{ open: boolean; editing: Group | null }>({ open: false, editing: null });

  const handleSave = (data: Omit<Group, 'id'>) => {
    if (modal.editing) {
      editGroup(modal.editing.id, data);
    } else {
      addGroup(data);
    }
    setModal({ open: false, editing: null });
  };

  return (
    <>
      <GroupList
        groups={groups}
        students={students}
        onAdd={() => setModal({ open: true, editing: null })}
        onEdit={(id) => setModal({ open: true, editing: groups.find((g) => g.id === id)! })}
        onDelete={deleteGroup}
      />
      {modal.open && (
        <GroupModal
          group={modal.editing}
          students={students}
          onSave={handleSave}
          onClose={() => setModal({ open: false, editing: null })}
        />
      )}
    </>
  );
};

export default GroupsPage;
