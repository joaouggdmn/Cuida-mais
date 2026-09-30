/** Cabeçalho das páginas da área logada: rótulo, título, texto de apoio e ações opcionais à direita. */
export function PageHeader({ kicker, title, description, children }) {
  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="section-kicker">{kicker}</p>
        <h1 className="font-display mt-3 text-4xl font-semibold tracking-[-0.045em] text-[#12395a] sm:text-5xl">
          {title}
        </h1>
        {description && <p className="mt-3 max-w-2xl text-lg leading-relaxed text-[#5b748b]">{description}</p>}
      </div>
      {children}
    </header>
  )
}
