import Fuse from 'fuse.js';
import categoriesData from '../../content/categories.json';

export interface Category {
  slug: string;
  title: string;
  description: string;
  icon: string;
}

export interface Article {
  slug: string;
  title: string;
  category: string;
  description?: string;
  order: number;
  body: string;
  filePath: string;
}

/**
 * Lightweight YAML frontmatter parser — handles the subset our CMS produces.
 * Supports: string (quoted/unquoted), numbers, booleans.
 */
function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const [, yaml, content] = match;
  const data: Record<string, unknown> = {};

  for (const rawLine of yaml.split('\n')) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value: string | number | boolean = line.slice(colonIdx + 1).trim();

    // Strip wrapping quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    // Type coercion
    if (value === 'true') data[key] = true;
    else if (value === 'false') data[key] = false;
    else if (/^-?\d+(\.\d+)?$/.test(value as string)) data[key] = Number(value);
    else data[key] = value;
  }

  return { data, content };
}

function slugify(filePath: string): string {
  const file = filePath.split('/').pop() || '';
  return file.replace(/\.md$/, '');
}

// Eagerly load all markdown files
const modules = import.meta.glob('/content/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const allArticles: Article[] = Object.entries(modules).map(([filePath, raw]) => {
  const { data, content } = parseFrontmatter(raw);
  return {
    slug: slugify(filePath),
    title: (data.title as string) || 'Sem título',
    category: (data.category as string) || 'sem-categoria',
    description: data.description as string | undefined,
    order: typeof data.order === 'number' ? data.order : 0,
    body: content.trim(),
    filePath,
  };
});

const categoriesList: Category[] = categoriesData.items;

export function getCategories(): Category[] {
  return categoriesList;
}

export function getCategory(slug: string): Category | undefined {
  return categoriesList.find((c) => c.slug === slug);
}

export function getAllArticles(): Article[] {
  return [...allArticles].sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return getAllArticles().filter((a) => a.category === categorySlug);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return allArticles.find((a) => a.slug === slug);
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  return getArticlesByCategory(article.category)
    .filter((a) => a.slug !== article.slug)
    .slice(0, limit);
}

export function getArticleCountByCategory(categorySlug: string): number {
  return allArticles.filter((a) => a.category === categorySlug).length;
}

// Fuzzy search
const fuse = new Fuse(allArticles, {
  keys: [
    { name: 'title', weight: 0.5 },
    { name: 'description', weight: 0.25 },
    { name: 'body', weight: 0.15 },
    { name: 'category', weight: 0.1 },
  ],
  threshold: 0.4,
  ignoreLocation: true,
  includeMatches: true,
});

export function searchArticles(query: string, limit = 10): Article[] {
  const q = query.trim();
  if (!q) return [];
  return fuse.search(q, { limit }).map((r) => r.item);
}
