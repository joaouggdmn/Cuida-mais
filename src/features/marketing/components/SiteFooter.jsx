export function SiteFooter() {
  return (
    <footer className="bg-[#12395a] py-9 text-[#d6e7f5]">
      <div className="container flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <a href="#inicio" className="flex items-center gap-2 font-display text-xl font-semibold text-white">
          CUIDA<span className="text-[#b9d9f3]">+</span>
        </a>
        <p className="text-sm font-medium">
          Cuidado e carinho na palma da sua mão. · +55 (48) 3436-3436 · @cuidamais_oficial
        </p>
        <a href="#contato" className="text-sm font-extrabold text-[#b9d9f3] transition hover:text-white">
          Falar com a equipe
        </a>
      </div>
    </footer>
  )
}
