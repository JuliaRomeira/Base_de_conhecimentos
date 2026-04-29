import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getArticleBySlug, getCategory, getRelatedArticles } from '@/lib/content';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { TableOfContents } from '@/components/TableOfContents';
import { RelatedArticles } from '@/components/RelatedArticles';

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  useEffect(() => {
    if (article) {
      document.title = `${article.title} · Base de Conhecimento`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta && article.description) meta.setAttribute('content', article.description);
    }
    return () => {
      document.title = 'Base de Conhecimento';
    };
  }, [article]);

  if (!article) return <Navigate to="/404" replace />;

  const category = getCategory(article.category);
  const related = getRelatedArticles(article);

  return (
    <div className="flex gap-10 px-4 sm:px-6 lg:px-12 py-10 max-w-7xl mx-auto">
      <article className="flex-1 min-w-0 max-w-3xl mx-auto" data-article-content>
        <Breadcrumbs
          items={[
            ...(category ? [{ label: category.title, to: `/categoria/${category.slug}` }] : []),
            { label: article.title },
          ]}
        />

        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3">{article.title}</h1>
          {article.description && (
            <p className="text-lg text-muted-foreground">{article.description}</p>
          )}
        </header>

        <MarkdownRenderer content={article.body} />

        <RelatedArticles articles={related} />
      </article>

      <TableOfContents contentKey={article.slug} />
    </div>
  );
};

export default Article;
