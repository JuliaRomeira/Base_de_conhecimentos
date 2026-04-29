import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface Crumb {
  label: string;
  to?: string;
}

export const Breadcrumbs = ({ items }: { items: Crumb[] }) => (
  <nav aria-label="Breadcrumb" className="mb-6">
    <ol className="flex items-center flex-wrap gap-1.5 text-sm text-muted-foreground">
      <li>
        <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors">
          <Home className="h-3.5 w-3.5" />
          <span className="sr-only">Início</span>
        </Link>
      </li>
      {items.map((c, i) => (
        <li key={i} className="flex items-center gap-1.5">
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
          {c.to && i < items.length - 1 ? (
            <Link to={c.to} className="hover:text-primary transition-colors">
              {c.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{c.label}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);
