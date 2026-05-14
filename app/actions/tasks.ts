'use server';
import { revalidatePath } from 'next/cache';

export async function addTask(formData: FormData) {
  const name = formData.get('name') as string;
  const projectId = formData.get('projectId') as string;
  await fetch('http://localhost:4000/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, projectId, completed: false }),
  });
  revalidatePath(`/projects/${projectId}`);
}

export async function toggleTask(formData: FormData) {
  const id = formData.get('id') as string;
  const completed = formData.get('completed') === 'true';
  await fetch(`http://localhost:4000/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: !completed }),
  });
  // Need to get projectId to revalidate, but for simplicity, revalidate all
  revalidatePath('/projects/[id]');
}

export async function deleteTask(formData: FormData) {
  const id = formData.get('id') as string;
  await fetch(`http://localhost:4000/tasks/${id}`, {
    method: 'DELETE',
  });
  revalidatePath('/projects/[id]');
}