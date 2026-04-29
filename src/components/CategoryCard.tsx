import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import type { Category } from '@/lib/content';
import { getArticleCountByCategory } from '@/lib/content';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const Icon = (Icons[category.icon as keyof typeof Icons] as Icons.LucideIcon) || Icons.BookOpen;
  const count = getArticleCountByCategory(category.slug);

  return (
    <Link
      to={`/categoria/${category.slug}`}
      className="group block p-6 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-glow transition-all duration-200"
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {category.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{category.description}</p>
          <p className="mt-3 text-xs text-muted-foreground">
            {count} {count === 1 ? 'artigo' : 'artigos'}
          </p>
        </div>
      </div>
    </Link>
  );
};
