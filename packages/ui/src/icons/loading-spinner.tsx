import { cn } from '@feedvote/utils'

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn('h-5 w-5', className)}>
      <div className={cn('loading-spinner', 'relative top-1/2 left-1/2 h-5 w-5', className)}>
        {[...Array(12)].map((_, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={i}
            style={{
              animationDelay: `${-1.2 + 0.1 * i}s`,
              position: 'absolute',
              borderRadius: '1rem',
              width: '30%',
              height: '8%',
              left: '-10%',
              top: '-4%',
              transform: `rotate(${30 * i}deg) translate(120%)`,
            }}
            className="animate-spinner bg-foreground"
          />
        ))}
      </div>
    </div>
  )
}
