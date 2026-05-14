// app/projects/[id]/page.tsx
import AddTaskForm from './AddTaskForm';
import { toggleTask, deleteTask } from '../../actions/tasks';
interface Project { id: string; name: string; color: string; }
interface Task { id: string; name: string; completed: boolean; projectId: string; }
interface Props {
  params: Promise<{ id: string }>;
}
export default async function ProjectPage({ params }: Props) {
  const { id } = await params;

  const res = await fetch(`http://localhost:4000/projects/${id}`, {
    cache: 'no-store'
  });
  if (!res.ok) {
    return <div style={{ padding: '2rem' }}>Projet non trouvé</div>;
  }
  const project: Project = await res.json();

  const tasksRes = await fetch(`http://localhost:4000/tasks?projectId=${id}`, {
    cache: 'no-store'
  });
  const tasks: Task[] = await tasksRes.json();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>
        <span style={{
          display: 'inline-block', width: 16, height: 16,
          borderRadius: '50%', background: project.color, marginRight: 8
        }} />
        {project.name}
      </h1>
      <p>ID : {project.id}</p>

      <h2>Tâches</h2>
      <AddTaskForm projectId={id} />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <form action={toggleTask} style={{ display: 'inline' }}>
              <input type="hidden" name="id" value={task.id} />
              <input type="hidden" name="completed" value={task.completed.toString()} />
              <button type="submit" style={{
                background: 'none', border: 'none', cursor: 'pointer',
                textDecoration: task.completed ? 'line-through' : 'none', color: 'inherit'
              }}>
                {task.name}
              </button>
            </form>
            <form action={deleteTask} style={{ display: 'inline' }}>
              <input type="hidden" name="id" value={task.id} />
              <button type="submit" style={{
                background: '#e74c3c', color: 'white', border: 'none',
                borderRadius: 4, padding: '4px 8px', cursor: 'pointer', fontSize: '12px'
              }}>
                Supprimer
              </button>
            </form>
          </li>
        ))}
      </ul>

      <a href="/dashboard">← Retour au Dashboard</a>
    </div>
  );
}