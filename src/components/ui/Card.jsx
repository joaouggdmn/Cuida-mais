/** Cartão branco padrão da área logada. */
export function Card({ as: Tag = 'section', className = '', children, ...props }) {
  return (
    <Tag
      className={`rounded-[1.6rem] border bg-white p-6 shadow-[0_9px_30px_rgba(24,57,90,0.06)] ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
