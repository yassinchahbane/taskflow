import AddProjectForm from './AddProjectForm';
export default async function DashboardPage() {
const res = await fetch('http://localhost:4000/projects', { cache: 'no-store' });
const projects = await res.json();
return (
<div style={{ padding: '2rem' }}>
<h1>Dashboard</h1>
<AddProjectForm />
<ul>
{projects.map((p: any) => (
<li key={p.id}>
<a href={`/projects/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
<span style={{
display: 'inline-block', width: 12, height: 12,
borderRadius: '50%', background: p.color, marginRight: 8
}} />
{p.name}
</a>
</li>
))}
</ul>
</div>
);
}