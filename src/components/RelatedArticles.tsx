import { Link } from 'react-router-dom';
import type { Article } from '@/lib/content';
import { ArrowRight } from 'lucide-react';

export const RelatedArticles = ({ articles }: { articles: Article[] }) => {
  if (articles.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <h2 className="text-lg font-semibold text-foreground mb-4">Artigos relacionados</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {articles.map((a) => (
          <Link
            key={a.slug}
            to={`/artigo/${a.slug}`}
            className="group p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-all"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors text-sm">
                {a.title}
              </h3>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
            </div>
            {a.description && (
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{a.description}</p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
};
