import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { PasswordField } from '@/components/ui/PasswordField'
import { TextField } from '@/components/ui/TextField'
import { formatCpf } from '@/utils/cpf'
import { getFirstName } from '@/utils/name'
import { AuthCard, SubmitButton } from '../components/AuthCard'
import { RoleSelector } from '../components/RoleSelector'
import { useAuth } from '../hooks/useAuth'
import { useAuthForm } from '../hooks/useAuthForm'
import { MIN_PASSWORD_LENGTH, validateRegister } from '../validation'

const INITIAL_VALUES = { role: '', name: '', email: '', cpf: '', password: '', confirmPassword: '' }

export function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const { values, errors, formError, submitting, setField, fieldRef, handleSubmit } = useAuthForm(
    INITIAL_VALUES,
    validateRegister,
  )

  const onValid = async ({ role, name, email, cpf, password }) => {
    const user = await register({ role, name, email, cpf, password })
    toast.success(`Que bom ter você aqui, ${getFirstName(user.name)}!`, {
      description: 'Sua conta CUIDA+ foi criada.',
    })
    navigate('/minha-area', { replace: true })
  }

  return (
    <AuthCard
      className="max-w-2xl"
      kicker="CRIAR CONTA"
      title="Vamos começar com calma."
      description="Leva poucos minutos. Seus dados ficam guardados com cuidado."
      formError={formError}
      footer={
        <>
          Já tem conta?{' '}
          <Link to="/login" className="font-extrabold text-[#2d7bbf] underline-offset-4 hover:underline">
            Entrar
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onValid)} noValidate className="mt-8">
        <RoleSelector
          value={values.role}
          onChange={(role) => setField('role', role)}
          error={errors.role}
          firstOptionRef={fieldRef('role')}
        />

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <TextField
            ref={fieldRef('name')}
            className="sm:col-span-2"
            label="Nome completo"
            name="name"
            autoComplete="name"
            placeholder="Como está no seu documento"
            value={values.name}
            onChange={(event) => setField('name', event.target.value)}
            error={errors.name}
          />
          <TextField
            ref={fieldRef('email')}
            label="E-mail"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="nome@exemplo.com"
            value={values.email}
            onChange={(event) => setField('email', event.target.value)}
            error={errors.email}
          />
          <TextField
            ref={fieldRef('cpf')}
            label="CPF"
            name="cpf"
            inputMode="numeric"
            autoComplete="off"
            placeholder="000.000.000-00"
            value={values.cpf}
            onChange={(event) => setField('cpf', formatCpf(event.target.value))}
            error={errors.cpf}
          />
          <PasswordField
            ref={fieldRef('password')}
            label="Senha"
            name="password"
            autoComplete="new-password"
            hint={`Pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`}
            value={values.password}
            onChange={(event) => setField('password', event.target.value)}
            error={errors.password}
          />
          <PasswordField
            ref={fieldRef('confirmPassword')}
            label="Confirme a senha"
            name="confirmPassword"
            autoComplete="new-password"
            value={values.confirmPassword}
            onChange={(event) => setField('confirmPassword', event.target.value)}
            error={errors.confirmPassword}
          />
        </div>

        <SubmitButton submitting={submitting} submittingLabel="Criando sua conta...">
          Criar conta
        </SubmitButton>
      </form>
    </AuthCard>
  )
}
