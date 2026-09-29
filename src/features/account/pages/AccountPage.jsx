import { LuLogOut, LuSparkles } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useLogout } from '@/features/auth/hooks/useLogout'
import { CARE_SEEKER_ROLES, getRole } from '@/features/auth/roles'
import { maskCpf } from '@/utils/cpf'
import { formatMonthYear } from '@/utils/date'
import { getInitials } from '@/utils/name'

export function AccountPage() {
  const { user } = useAuth()
  const logout = useLogout()
  const role = getRole(user.role)
  const RoleIcon = role?.icon

  const details = [
    { label: 'Nome', value: user.name },
    { label: 'E-mail', value: user.email },
    { label: 'CPF', value: maskCpf(user.cpf ?? '') },
    { label: 'Perfil', value: role?.name },
    user.createdAt && { label: 'Membro desde', value: formatMonthYear(new Date(user.createdAt)) },
  ].filter(Boolean)

  return (
    <>
      <PageHeader kicker="MINHA CONTA" title="Seus dados" />

      <div className="mt-10 grid items-start gap-6 lg:grid-cols-[1fr_340px]">
        <Card aria-labelledby="dados-pessoais" className="sm:p-8">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#123f66] text-xl font-bold text-[#b9d9f3]">
              {getInitials(user.name)}
            </span>
            <div className="min-w-0">
              <h2 id="dados-pessoais" className="font-display truncate text-2xl font-semibold text-[#12395a]">
                {user.name}
              </h2>
              {role && (
                <p className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-[#e5f3ff] px-3 py-1 text-sm font-bold text-[#1f5e8d]">
                  <RoleIcon size={15} aria-hidden="true" />
                  {role.name}
                </p>
              )}
            </div>
          </div>

          <dl className="mt-8 divide-y border-y">
            {details.map(({ label, value }) => (
              <div key={label} className="grid gap-1 py-4 sm:grid-cols-[160px_1fr] sm:gap-4">
                <dt className="text-sm font-extrabold uppercase tracking-[0.08em] text-[#5b748b]">{label}</dt>
                <dd className="break-words text-lg font-medium text-[#173f62]">{value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-5 text-sm text-[#5b748b]">
            Precisa corrigir algum dado?{' '}
            <Link to="/suporte" className="font-extrabold text-[#2d7bbf] underline-offset-4 hover:underline">
              Fale com o suporte
            </Link>
            .
          </p>
        </Card>

        <div className="space-y-6">
          {CARE_SEEKER_ROLES.includes(user.role) && (
            <Card aria-labelledby="meu-plano">
              <p className="section-kicker">MEU PLANO</p>
              <h2 id="meu-plano" className="font-display mt-2 text-2xl font-semibold text-[#12395a]">
                Nenhum plano ativo
              </h2>
              <p className="mt-2 leading-relaxed text-[#5b748b]">Conheça as opções e escolha a que combina com você.</p>
              <Link
                to="/planos"
                className="mt-5 flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#2d7bbf] px-5 font-extrabold text-white transition hover:bg-[#236596]"
              >
                <LuSparkles size={18} aria-hidden="true" />
                Ver planos
              </Link>
            </Card>
          )}

          <button
            type="button"
            onClick={logout}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full border bg-white px-5 font-extrabold text-[#1f5e8d] transition hover:bg-[#e5f3ff]"
          >
            <LuLogOut size={18} aria-hidden="true" />
            Sair da conta
          </button>
        </div>
      </div>
    </>
  )
}
