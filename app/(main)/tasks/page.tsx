export const metadata = { title: "Tasks • Bilvio" };

export default function TasksPage() {
  return (
    <section className="max-w-7xl bg-white border shadow-sm p-6 m-4 sm:mx-6 md:mx-8 lg:mx-auto">
      <header>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Tasks</h1>
      </header>
      <p className="text-sm text-muted-foreground mt-2">Manage your tasks here.</p>
    </section>
  );
}
