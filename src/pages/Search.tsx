import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import { searchArticles, getCategory } from '@/lib/content';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const Search = () => {
  const [params] = useSearchParams();
  const q = params.get('q') || '';
  const results = searchArticles(q, 30);

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-10 max-w-4xl mx-auto animate-fade-in">
      <Breadcrumbs items={[{ label: 'Busca' }]} />

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <SearchIcon className="h-7 w-7 text-primary" />
          Resultados da busca
        </h1>
        {q && (
          <p className="mt-2 text-muted-foreground">
            {results.length} {results.length === 1 ? 'resultado' : 'resultados'} para "
            <span className="text-foreground font-medium">{q}</span>"
          </p>
        )}
      </header>

      {!q ? (
        <p className="text-muted-foreground">Digite algo na busca para começar.</p>
      ) : results.length === 0 ? (
        <div className="text-center py-12 rounded-lg border border-dashed border-border">
          <p className="text-muted-foreground">Nenhum artigo encontrado.</p>
          <p className="text-sm text-muted-foreground/70 mt-1">Tente termos diferentes ou mais genéricos.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {results.map((a) => {
            const cat = getCategory(a.category);
            return (
              <li key={a.slug}>
                <Link
                  to={`/artigo/${a.slug}`}
                  className="block p-5 rounded-lg border border-border bg-card hover:border-primary/50 transition-all group"
                >
                  <div className="text-xs text-muted-foreground mb-1">{cat?.title || a.category}</div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {a.title}
                  </h3>
                  {a.description && (
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{a.description}</p>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Search;
