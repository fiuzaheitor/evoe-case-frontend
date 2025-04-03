import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import s from './Login.module.scss'
import { TextInput } from '../../../components/misc/TextInput'
import 'react-toastify/dist/ReactToastify.css'
import { Button } from '../../../components/misc/Button'
import { Pages } from '../../../components/structure/Pages'
import { useAuth } from '../../../hoc/AuthContext'
import { createUser } from '../../../utils/Queries'
import { showToast } from '../../../utils/showToast'

export const Login = () => {
  const navigate = useNavigate()
  const [isSignup, setIsSignup] = useState(false)
  const auth = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  async function login() {
    try {
      if (formData?.email === '' || formData?.password === '') {
        showToast('Preencha todos os campos!', 'error', 'error-fields')
        return
      }

      const res = await auth.authenticate(formData?.email as string, formData?.password as string)
      if (res.status === 'success') {
        navigate('/')
      } else {
        showToast('Email ou senha incorretos!', 'error', 'error-login')
      }
    } catch (err: any) {
      showToast('Erro ao fazer login. Tente novamente.', 'error')
    }
  }

  async function signup() {
    try {
      if (formData.password !== formData.confirmPassword) {
        showToast('As senhas não coincidem.', 'error', 'error-password')
        return
      }

      if (formData?.name === '' || formData?.email === '' || formData?.password === '') {
        showToast('Preencha todos os campos!', 'error', 'error-fields')
        return
      }

      const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-.\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
      if (!formData.email.match(regEx)) {
        showToast("O endereço de email não é válido", 'error', 'error-email');
        return
      }

      if (formData.password.length < 8 || !/[A-Z]/.test(formData.password) || !/[a-z]/.test(formData.password) || !/[0-9]/.test(formData.password)) {
        showToast('A senha deve ter no mínimo 8 caracteres, uma letra maiúscula, uma letra minúscula e um número.', 'error', 'error-password-invalid');
        return
      }

      const user = await createUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'User',
      })

      if (user) {
        login()
      }
    } catch (err: any) {
      showToast('Erro ao criar conta. Tente novamente.', 'error')
    }
  }

  return (
    <Pages>
      <div className={s.login}>
        <div className={s.login__main}>
          <div className={s.login__main__container}>
            <div className={s.login__main__container__header}>
              <h1>{isSignup ? 'Cadastro' : 'Login'}</h1>
              <p>Faça seu {isSignup ? 'cadastro' : 'login'} para acessar suas informações!</p>
            </div>
            <div className={s.login__main__container__content}>
              <div className={s.login__main__container__content__inputs}>
                {isSignup && (
                  <TextInput
                    label="Nome"
                    type="text"
                    placeholder="Digite aqui seu nome"
                    value={formData.name}
                    onChange={(e: any) => setFormData({ ...formData, name: e })}
                    max={100}
                  />
                )}
                <TextInput
                  label="Email"
                  type="email"
                  placeholder="Digite aqui seu email"
                  value={formData.email}
                  onChange={(e: any) => setFormData({ ...formData, email: e })}
                  max={100}
                />
                <TextInput
                  label="Senha"
                  type="password"
                  placeholder="Digite aqui sua senha"
                  value={formData.password}
                  onChange={(e: any) => setFormData({ ...formData, password: e })}
                  max={100}
                />
                {isSignup && (
                  <TextInput
                    label="Confirme sua senha"
                    type="password"
                    placeholder="Digite aqui sua senha"
                    value={formData.confirmPassword}
                    onChange={(e: any) => setFormData({ ...formData, confirmPassword: e })}
                    max={100}
                  />
                )}
              </div>
            </div>
            <div className={s.login__main__container__footer}>
              <Button
                onClick={() => {
                  if (isSignup) {
                    signup()
                  } else {
                    login()
                  }
                }}
                text={isSignup ? 'Criar conta' : 'Entrar'}
              />
              <div className={s.login__main__container__footer__signup}>
                <span>{isSignup ? 'Já' : 'Não'} tem uma conta? </span>
                <p onClick={() => setIsSignup(!isSignup)}> {isSignup ? 'Faça login' : 'Cadastre-se'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Pages>
  )
}
