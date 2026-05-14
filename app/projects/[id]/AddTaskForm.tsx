'use client';
import { useFormStatus } from 'react-dom';
import { addTask } from '../../actions/tasks';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} style={{
      padding: '8px 16px', background: '#1B8C3E', color: 'white',
      border: 'none', borderRadius: 4, cursor: 'pointer'
    }}>
      {pending ? 'Ajout...' : '+ Nouvelle tâche'}
    </button>
  );
}

interface AddTaskFormProps {
  projectId: string;
}

export default function AddTaskForm({ projectId }: AddTaskFormProps) {
  return (
    <form action={addTask} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
      <input name="name" placeholder="Nom de la tâche" required
        style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc', flex: 1 }} />
      <input name="projectId" type="hidden" value={projectId} />
      <SubmitButton />
    </form>
  );
}