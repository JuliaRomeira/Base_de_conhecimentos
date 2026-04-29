import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { List } from 'lucide-react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  /** Re-extract when content changes */
  contentKey: string;
}

export const TableOfContents = ({ contentKey }: TableOfContentsProps) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from rendered article
    const article = document.querySelector('[data-article-content]');
    if (!article) return;
    const nodes = article.querySelectorAll('h2, h3');
    const list: Heading[] = [];
    nodes.forEach((node) => {
      if (node.id) {
        list.push({
          id: node.id,
          text: node.textContent?.replace(/#$/, '').trim() || '',
          level: parseInt(node.tagName[1], 10),
        });
      }
    });
    setHeadings(list);
  }, [contentKey]);

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="hidden xl:block w-64 shrink-0">
      <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
        <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          <List className="h-3.5 w-3.5" />
          Nesta página
        </h4>
        <ul className="space-y-1 border-l border-border">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={cn(
                  'block py-1 text-sm transition-colors -ml-px border-l-2',
                  h.level === 3 && 'pl-6',
                  h.level === 2 && 'pl-4',
                  activeId === h.id
                    ? 'border-primary text-primary font-medium'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                )}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
