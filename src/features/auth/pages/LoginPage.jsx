import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { PasswordField } from '@/components/ui/PasswordField'
import { TextField } from '@/components/ui/TextField'
import { getFirstName } from '@/utils/name'
import { AuthCard, SubmitButton } from '../components/AuthCard'
import { useAuth } from '../hooks/useAuth'
import { useAuthForm } from '../hooks/useAuthForm'
import { validateLogin } from '../validation'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const { values, errors, formError, submitting, setField, fieldRef, handleSubmit } = useAuthForm(
    { email: '', password: '' },
    validateLogin,
  )

  const onValid = async (credentials) => {
    const user = await login(credentials)
    toast.success(`Olá de novo, ${getFirstName(user.name)}!`)
    navigate('/minha-area', { replace: true })
  }

  return (
    <AuthCard
      className="max-w-md"
      kicker="ENTRAR"
      title="Que bom te ver de novo."
      description="Acesse sua conta para acompanhar os cuidados e a sua agenda."
      formError={formError}
      footer={
        <>
          Ainda não tem conta?{' '}
          <Link to="/cadastro" className="font-extrabold text-[#2d7bbf] underline-offset-4 hover:underline">
            Criar conta
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onValid)} noValidate className="mt-8 grid gap-5">
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
        <PasswordField
          ref={fieldRef('password')}
          label="Senha"
          name="password"
          autoComplete="current-password"
          placeholder="Sua senha"
          value={values.password}
          onChange={(event) => setField('password', event.target.value)}
          error={errors.password}
        />
        <SubmitButton submitting={submitting} submittingLabel="Entrando...">
          Entrar
        </SubmitButton>
      </form>
    </AuthCard>
  )
}
