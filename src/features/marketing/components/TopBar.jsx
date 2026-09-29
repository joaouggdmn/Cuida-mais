import { LuPlus } from 'react-icons/lu'

export function TopBar({ largeText, onToggleLargeText }) {
  return (
    <div className="border-b bg-[#eef6ff]">
      <div className="container flex min-h-10 items-center justify-between gap-3 text-xs font-semibold tracking-[0.08em] text-[#476783] sm:text-sm">
        <p className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2d7bbf]" />
          CUIDADO E CARINHO NA PALMA DA SUA MÃO
        </p>
        <button
          type="button"
          onClick={onToggleLargeText}
          aria-pressed={largeText}
          className="flex items-center gap-1 rounded-full px-2 py-1 text-[#12395a] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12395a]"
        >
          <span className="font-bold">A</span>
          <LuPlus size={13} strokeWidth={3} aria-hidden="true" />
          <span className="hidden sm:inline">Aumentar texto</span>
        </button>
      </div>
    </div>
  )
}
