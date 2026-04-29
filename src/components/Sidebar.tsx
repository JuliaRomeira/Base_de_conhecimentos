import { NavLink, useLocation } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { getCategories, getArticlesByCategory } from '@/lib/content';
import { cn } from '@/lib/utils';

interface SidebarProps {
  onNavigate?: () => void;
}

export const Sidebar = ({ onNavigate }: SidebarProps) => {
  const categories = getCategories();
  const { pathname } = useLocation();

  return (
    <aside className="w-full lg:w-64 shrink-0 border-r border-sidebar-border bg-sidebar">
      <nav className="p-4 space-y-6">
        {categories.map((cat) => {
          const Icon = (Icons[cat.icon as keyof typeof Icons] as Icons.LucideIcon) || Icons.Folder;
          const articles = getArticlesByCategory(cat.slug);
          const isCategoryActive = pathname === `/categoria/${cat.slug}`;

          return (
            <div key={cat.slug}>
              <NavLink
                to={`/categoria/${cat.slug}`}
                onClick={onNavigate}
                className={cn(
                  'flex items-center gap-2 px-2 py-1.5 rounded-md text-sm font-semibold transition-colors',
                  isCategoryActive
                    ? 'text-primary'
                    : 'text-sidebar-foreground hover:text-primary'
                )}
              >
                <Icon className="h-4 w-4" />
                {cat.title}
              </NavLink>

              {articles.length > 0 && (
                <ul className="mt-1 ml-3 border-l border-sidebar-border space-y-px">
                  {articles.map((art) => (
                    <li key={art.slug}>
                      <NavLink
                        to={`/artigo/${art.slug}`}
                        onClick={onNavigate}
                        className={({ isActive }) =>
                          cn(
                            'block pl-4 pr-2 py-1.5 text-sm rounded-r-md -ml-px border-l-2 transition-all',
                            isActive
                              ? 'border-primary text-primary font-medium bg-primary/5'
                              : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                          )
                        }
                      >
                        {art.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};
