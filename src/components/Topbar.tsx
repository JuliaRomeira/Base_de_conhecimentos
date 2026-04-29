import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, BookOpen, Settings, ExternalLink } from 'lucide-react';
import { searchArticles, getCategory } from '@/lib/content';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface TopbarProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

export const Topbar = ({ onMenuClick, showMenuButton }: TopbarProps) => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const results = query.trim() ? searchArticles(query, 6) : [];

  useEffect(() => {
    setQuery('');
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('global-search-input')?.focus();
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/busca?q=${encodeURIComponent(query.trim())}`);
      setOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="h-full px-4 lg:px-6 flex items-center gap-4">
        {showMenuButton && (
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden" aria-label="Abrir menu">
            <BookOpen className="h-5 w-5" />
          </Button>
        )}

        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-md bg-gradient-primary flex items-center justify-center shadow-glow">
            <BookOpen className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground hidden sm:inline">Base de Conhecimento</span>
        </Link>

        <form onSubmit={submit} className="flex-1 max-w-xl mx-auto relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              id="global-search-input"
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              onBlur={() => setTimeout(() => setOpen(false), 150)}
              placeholder="Buscar manuais..."
              className="w-full h-10 pl-10 pr-16 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
            />
            <kbd className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 items-center gap-0.5 px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono text-muted-foreground border border-border">
              ⌘K
            </kbd>
          </div>

          {open && query.trim() && (
            <div className="absolute top-full left-0 right-0 mt-2 rounded-lg border border-border bg-popover shadow-md-soft overflow-hidden animate-fade-in">
              {results.length === 0 ? (
                <div className="p-4 text-sm text-muted-foreground text-center">
                  Nenhum resultado para "<span className="text-foreground">{query}</span>"
                </div>
              ) : (
                <ul className="max-h-96 overflow-y-auto">
                  {results.map((a) => {
                    const cat = getCategory(a.category);
                    return (
                      <li key={a.slug}>
                        <Link
                          to={`/artigo/${a.slug}`}
                          className="flex items-start gap-3 px-4 py-3 hover:bg-accent transition-colors border-b border-border/60 last:border-b-0"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-foreground text-sm truncate">{a.title}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {cat?.title || a.category}
                            </div>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                  <li className="border-t border-border bg-muted/30">
                    <button
                      type="submit"
                      onMouseDown={(e) => e.preventDefault()}
                      className="w-full px-4 py-2 text-xs text-muted-foreground hover:text-primary text-left transition-colors"
                    >
                      Ver todos os resultados →
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}
        </form>

        <a
          href="/admin/"
          className={cn(
            'shrink-0 inline-flex items-center gap-1.5 px-3 h-9 rounded-md text-sm font-medium',
            'text-muted-foreground hover:text-foreground hover:bg-accent transition-colors'
          )}
        >
          <Settings className="h-4 w-4" />
          <span className="hidden sm:inline">Admin</span>
          <ExternalLink className="h-3 w-3 hidden sm:inline" />
        </a>
      </div>
    </header>
  );
};
