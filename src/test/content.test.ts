import { describe, expect, it } from 'vitest';

import {
  getAllArticles,
  getArticleBySlug,
  getArticleCountByCategory,
  getArticlesByCategory,
  getCategories,
  getCategory,
  getRelatedArticles,
  searchArticles,
} from '@/lib/content';

describe('catálogo de manuais', () => {
  it('carrega categorias e artigos a partir dos arquivos versionados', () => {
    const categories = getCategories();
    const articles = getAllArticles();

    expect(categories.length).toBeGreaterThan(0);
    expect(articles.length).toBeGreaterThan(0);
    expect(getCategory('primeiros-passos')?.title).toBe('Primeiros Passos');
    expect(getCategory('categoria-inexistente')).toBeUndefined();
  });

  it('organiza os manuais pela ordem definida e filtra por categoria', () => {
    const list = getArticlesByCategory('primeiros-passos');
    expect(list.length).toBeGreaterThanOrEqual(2);
    expect(list.every((article) => article.category === 'primeiros-passos')).toBe(true);
    expect(list.map((article) => article.slug)).toContain('bem-vindo');
    expect(list.map((article) => article.slug)).toContain('criando-manual');

    for (let i = 1; i < list.length; i++) {
      expect(list[i - 1].order).toBeLessThanOrEqual(list[i].order);
    }

    expect(getArticleCountByCategory('primeiros-passos')).toBe(list.length);
    expect(getArticlesByCategory('categoria-inexistente')).toEqual([]);
  });

  it('encontra artigos pelo slug e preserva conteúdo markdown', () => {
    const article = getArticleBySlug('bem-vindo');
    expect(article?.title).toBe('Bem-vindo à Base de Conhecimento');
    expect(article?.body).toContain('Como navegar');
    expect(article?.category).toBe('primeiros-passos');
    expect(getArticleBySlug('manual-que-nao-existe')).toBeUndefined();
  });

  it('retorna artigos relacionados sem repetir o artigo atual', () => {
    const source = getArticleBySlug('bem-vindo');
    expect(source).toBeDefined();
    if (!source) return;

    const related = getRelatedArticles(source, 1);
    expect(related).toHaveLength(1);
    expect(related[0].slug).not.toBe(source.slug);
    expect(related[0].category).toBe(source.category);
  });
});

describe('busca de manuais', () => {
  it('não retorna resultados para termos vazios ou apenas espaços', () => {
    expect(searchArticles('')).toEqual([]);
    expect(searchArticles('   ')).toEqual([]);
  });

  it('localiza um manual por título e respeita o limite', () => {
    const results = searchArticles('Bem-vindo', 1);
    expect(results).toHaveLength(1);
    expect(results[0].slug).toBe('bem-vindo');
  });

  it('encontra artigos por conteúdo e descrição', () => {
    const results = searchArticles('perguntas frequentes');
    expect(results.some((article) => article.slug === 'perguntas-frequentes')).toBe(true);
  });
});
