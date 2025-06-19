import { ThemeToggle } from "./_theme/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-all duration-200">
      <header className="flex justify-between items-center p-6 border-b border-border bg-card">
        <h1 className="text-2xl font-bold">PokeStore</h1>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">
            PokeStore
          </h2>
        </div>
      </main>
    </div>
  );
}
