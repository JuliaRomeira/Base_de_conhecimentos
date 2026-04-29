import { useParams, Navigate } from 'react-router-dom';
import { getCategory, getArticlesByCategory } from '@/lib/content';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ArticleCard } from '@/components/ArticleCard';
import * as Icons from 'lucide-react';

const Category = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? getCategory(slug) : undefined;

  if (!category) return <Navigate to="/404" replace />;

  const articles = getArticlesByCategory(category.slug);
  const Icon = (Icons[category.icon as keyof typeof Icons] as Icons.LucideIcon) || Icons.Folder;

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-10 max-w-4xl mx-auto animate-fade-in">
      <Breadcrumbs items={[{ label: category.title }]} />

      <header className="flex items-start gap-4 mb-8">
        <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
          <Icon className="h-7 w-7" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{category.title}</h1>
          <p className="mt-1 text-muted-foreground">{category.description}</p>
        </div>
      </header>

      {articles.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          Ainda não há artigos nesta categoria.
        </div>
      ) : (
        <div className="grid gap-3">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
