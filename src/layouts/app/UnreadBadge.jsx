export function UnreadBadge({ count, className = '' }) {
  if (count <= 0) return null
  return (
    <span
      className={`flex h-6 min-w-6 items-center justify-center rounded-full bg-[#2d7bbf] px-1.5 text-xs font-extrabold text-white ${className}`}
    >
      {count > 9 ? '9+' : count}
      <span className="sr-only"> {count === 1 ? 'mensagem não lida' : 'mensagens não lidas'}</span>
    </span>
  )
}
