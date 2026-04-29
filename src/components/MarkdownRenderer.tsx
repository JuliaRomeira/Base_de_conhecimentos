import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Callout } from './Callout';
import { ZoomableImage } from './ZoomableImage';

interface MarkdownRendererProps {
  content: string;
}

type CalloutType = 'note' | 'tip' | 'important' | 'warning' | 'caution';

const calloutRegex = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?:\s+(.+))?$/;

/**
 * Convert YouTube/Vimeo URLs on their own line to iframe embeds (HTML),
 * and wrap them as raw HTML... actually we'll use a different approach:
 * Pre-process the markdown to convert standalone video URLs into a marker
 * we can detect in the renderer.
 *
 * Simpler approach: replace video URLs on their own line with an inline
 * marker that we detect as an `<a>` element with a known class, OR
 * just transform them directly into iframes via an HTML block.
 * But react-markdown doesn't render raw HTML by default. We'll handle
 * via a custom paragraph renderer that detects a single video link.
 */

function preprocessMarkdown(md: string): string {
  // No transformation needed; we detect in `p`/`a` renderers
  return md;
}

function getYouTubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : null;
}

function getVimeoId(url: string): string | null {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : null;
}

function VideoEmbed({ url }: { url: string }) {
  const yt = getYouTubeId(url);
  const vimeo = getVimeoId(url);
  const src = yt
    ? `https://www.youtube.com/embed/${yt}`
    : vimeo
      ? `https://player.vimeo.com/video/${vimeo}`
      : null;
  if (!src) return null;
  return (
    <span className="block my-5 relative w-full rounded-lg overflow-hidden border border-border shadow-md-soft" style={{ paddingBottom: '56.25%' }}>
      <iframe
        src={src}
        title="Vídeo embarcado"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </span>
  );
}

export const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  const processed = useMemo(() => preprocessMarkdown(content), [content]);

  return (
    <div className="prose-doc max-w-none animate-fade-in">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'append',
              properties: { className: ['heading-anchor'], 'aria-label': 'Link para esta seção' },
              content: { type: 'text', value: '#' },
            },
          ],
        ]}
        components={{
          // Callouts: detect blockquote starting with [!TYPE]
          blockquote({ children, ...props }) {
            // Find the first text node to test for callout marker
            const flat = (children as React.ReactNode[])?.flat?.() ?? [];
            for (const child of flat as any[]) {
              if (child?.type === 'p' || (typeof child === 'object' && child?.props)) {
                const inner = child?.props?.children;
                const firstText = Array.isArray(inner)
                  ? typeof inner[0] === 'string' ? inner[0] : null
                  : typeof inner === 'string' ? inner : null;
                if (firstText) {
                  const m = firstText.match(calloutRegex);
                  if (m) {
                    const type = m[1].toLowerCase() as CalloutType;
                    const title = m[2] || undefined;
                    // Strip the marker line from the first paragraph
                    const restOfFirstPara = Array.isArray(inner)
                      ? inner.slice(1).map((node: any, i: number) => {
                          if (i === 0 && typeof node === 'string') {
                            return node.replace(/^\n/, '');
                          }
                          return node;
                        })
                      : '';
                    // Collect remaining children (other paragraphs)
                    const otherChildren = (children as React.ReactNode[]).filter((c: any) => c !== child);
                    return (
                      <Callout type={type} title={title}>
                        {restOfFirstPara && (Array.isArray(restOfFirstPara) ? restOfFirstPara.length > 0 : true) && (
                          <p>{restOfFirstPara}</p>
                        )}
                        {otherChildren}
                      </Callout>
                    );
                  }
                }
              }
            }
            return <blockquote {...props}>{children}</blockquote>;
          },

          // Custom paragraph: detect standalone video URL
          p({ children, ...props }) {
            const arr = Array.isArray(children) ? children : [children];
            if (arr.length === 1) {
              const only: any = arr[0];
              // Case A: bare URL string
              if (typeof only === 'string') {
                const url = only.trim();
                if (getYouTubeId(url) || getVimeoId(url)) {
                  return <VideoEmbed url={url} />;
                }
              }
              // Case B: autolink (an <a> with href === text)
              if (only?.props?.href && only.props.children === only.props.href) {
                const url = only.props.href;
                if (getYouTubeId(url) || getVimeoId(url)) {
                  return <VideoEmbed url={url} />;
                }
              }
            }
            return <p {...props}>{children}</p>;
          },

          // Images with zoom + caption
          img({ src, alt, title }) {
            return <ZoomableImage src={src as string} alt={alt as string} title={title as string} />;
          },

          // Code blocks with syntax highlighting
          code({ inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            if (!inline && match) {
              return (
                <SyntaxHighlighter
                  language={match[1]}
                  style={oneDark}
                  customStyle={{
                    margin: 0,
                    background: 'hsl(var(--muted))',
                    fontSize: '0.875rem',
                    padding: '1rem',
                  }}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },

          // External links: open in new tab
          a({ href, children, ...props }) {
            const isExternal = href?.startsWith('http');
            return (
              <a
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                {...props}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {processed}
      </ReactMarkdown>
    </div>
  );
};
