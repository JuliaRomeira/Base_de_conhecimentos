import { Link } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';
import type { Article } from '@/lib/content';

export const ArticleCard = ({ article }: { article: Article }) => (
  <Link
    to={`/artigo/${article.slug}`}
    className="group flex items-start gap-4 p-5 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-card/80 transition-all"
  >
    <div className="shrink-0 w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
      <FileText className="h-5 w-5" />
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
        {article.title}
      </h3>
      {article.description && (
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{article.description}</p>
      )}
    </div>
    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-3" />
  </Link>
);
