import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ZoomIn } from 'lucide-react';

interface ZoomableImageProps {
  src?: string;
  alt?: string;
  title?: string;
}

export const ZoomableImage = ({ src, alt, title }: ZoomableImageProps) => {
  const [open, setOpen] = useState(false);

  if (!src) return null;

  return (
    <>
      <span className="block my-5 group">
        <span className="relative block overflow-hidden rounded-lg border border-border shadow-md-soft">
          <img
            src={src}
            alt={alt || ''}
            loading="lazy"
            onClick={() => setOpen(true)}
            className="w-full h-auto cursor-zoom-in transition-transform group-hover:scale-[1.01]"
          />
          <span className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm text-foreground p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <ZoomIn className="h-4 w-4" />
          </span>
        </span>
        {title && (
          <span className="block text-center text-sm text-muted-foreground mt-2 italic">
            {title}
          </span>
        )}
      </span>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-2 bg-background/95 backdrop-blur border-border">
          <img
            src={src}
            alt={alt || ''}
            className="w-full h-auto max-h-[90vh] object-contain rounded"
          />
          {title && (
            <p className="text-center text-sm text-muted-foreground mt-2">{title}</p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
