import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { getCategories, getAllArticles } from '@/lib/content';
import { CategoryCard } from '@/components/CategoryCard';

const Home = () => {
  const categories = getCategories();
  const totalArticles = getAllArticles().length;
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/busca?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-12 lg:py-16">
      <section className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
          <Sparkles className="h-3.5 w-3.5" />
          Central de Ajuda
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
          Como podemos <span className="text-transparent bg-clip-text bg-gradient-primary">ajudar?</span>
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Encontre manuais, tutoriais e respostas para suas dúvidas em nossa base de {totalArticles} artigos.
        </p>

        <form onSubmit={submit} className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquise um manual ou tema..."
            className="w-full h-14 pl-12 pr-4 rounded-xl bg-card border border-border text-base text-foreground placeholder:text-muted-foreground shadow-md-soft focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
          />
        </form>
      </section>

      <section className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">Navegue por categoria</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
