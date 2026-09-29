import { LuClock3, LuPhone } from 'react-icons/lu'
import { toast } from 'sonner'
import { CITIES } from '../content'

// Inputs e textarea herdam a fonte do rótulo; só o select define a sua (text-base font-medium).
const fieldClassName =
  'mt-2 w-full rounded-xl border bg-white px-4 text-[#183f61] outline-none transition placeholder:text-[#7890a4] focus:ring-2 focus:ring-[#b9d9f3]'

export function ContactForm() {
  const submitContact = (event) => {
    event.preventDefault()
    toast.success('Pedido de conversa enviado', {
      description: 'Esta demonstração está pronta para ser conectada ao canal de atendimento da CUIDA+.',
    })
    event.currentTarget.reset()
  }

  return (
    <section id="contato" className="relative overflow-hidden bg-[#2d7bbf] py-20 text-white sm:py-28">
      <div className="absolute -right-16 -top-20 h-80 w-80 rounded-full border-[40px]" />
      <div className="absolute -bottom-32 left-[18%] h-64 w-64 rounded-full bg-[#9ecbf0]/25 blur-2xl" />

      <div className="container relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="section-kicker">VAMOS CONVERSAR</p>
          <h2 className="font-display mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl">
            Todo cuidado começa com um olá.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/90">
            Conte um pouco do que você e sua família precisam. Nós ajudamos a encontrar o próximo passo com
            calma.
          </p>
          <div className="mt-8 flex items-center gap-3 text-sm font-bold text-white/90">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
              <LuClock3 size={19} aria-hidden="true" />
            </span>
            <span>Uma conversa simples, no seu tempo.</span>
          </div>
        </div>

        <form
          onSubmit={submitContact}
          className="rounded-[1.8rem] bg-[#ffffff] p-6 text-[#183f61] shadow-[0_20px_60px_rgba(107,45,29,0.25)] sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-extrabold">
              Seu nome
              <input required name="name" placeholder="Como podemos chamar você?" className={`h-12 ${fieldClassName}`} />
            </label>
            <label className="block text-sm font-extrabold">
              Telefone ou WhatsApp
              <input
                required
                name="phone"
                inputMode="tel"
                placeholder="(00) 00000-0000"
                className={`h-12 ${fieldClassName}`}
              />
            </label>
          </div>

          <label className="mt-5 block text-sm font-extrabold">
            Cidade de atendimento
            <select required name="city" defaultValue="" className={`h-12 text-base font-medium ${fieldClassName}`}>
              <option value="" disabled>
                Selecione sua cidade
              </option>
              {CITIES.map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </label>

          <label className="mt-5 block text-sm font-extrabold">
            Como a CUIDA+ pode ajudar?
            <textarea
              required
              name="message"
              rows={4}
              placeholder="Escreva aqui, do seu jeito."
              className={`resize-y py-3 ${fieldClassName}`}
            />
          </label>

          <button
            type="submit"
            className="mt-6 flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-[#123f66] px-6 py-3.5 text-white transition hover:bg-[#0d2f4f] active:scale-[0.98]"
          >
            Enviar pedido de conversa
            <LuPhone size={18} aria-hidden="true" />
          </button>
          <p className="mt-4 text-center text-xs leading-relaxed text-[#71879b]">
            Formulário demonstrativo pronto para integração com o canal de atendimento da CUIDA+.
          </p>
        </form>
      </div>
    </section>
  )
}
