import { Info, Lightbulb, AlertTriangle, AlertOctagon, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

type CalloutType = 'note' | 'tip' | 'important' | 'warning' | 'caution';

interface CalloutProps {
  type: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const config: Record<CalloutType, { icon: typeof Info; label: string; colorClass: string; bgClass: string; borderClass: string }> = {
  note:      { icon: Info,         label: 'Nota',       colorClass: 'text-callout-note',      bgClass: 'bg-callout-note/5',      borderClass: 'border-callout-note/40' },
  tip:       { icon: Lightbulb,    label: 'Dica',       colorClass: 'text-callout-tip',       bgClass: 'bg-callout-tip/5',       borderClass: 'border-callout-tip/40' },
  important: { icon: Star,         label: 'Importante', colorClass: 'text-callout-important', bgClass: 'bg-callout-important/5', borderClass: 'border-callout-important/40' },
  warning:   { icon: AlertTriangle,label: 'Atenção',    colorClass: 'text-callout-warning',   bgClass: 'bg-callout-warning/5',   borderClass: 'border-callout-warning/40' },
  caution:   { icon: AlertOctagon, label: 'Cuidado',    colorClass: 'text-callout-caution',   bgClass: 'bg-callout-caution/5',   borderClass: 'border-callout-caution/40' },
};

export const Callout = ({ type, title, children }: CalloutProps) => {
  const { icon: Icon, label, colorClass, bgClass, borderClass } = config[type];

  return (
    <div className={cn('my-5 rounded-lg border-l-4 p-4 not-italic', borderClass, bgClass)}>
      <div className={cn('flex items-center gap-2 font-semibold mb-1', colorClass)}>
        <Icon className="h-4 w-4 shrink-0" />
        <span>{title || label}</span>
      </div>
      <div className="text-foreground/90 text-sm leading-relaxed [&>p]:my-1 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
};
