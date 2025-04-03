import { useState } from 'react'
import { Button } from '../../Button'
import styles from './PopupUser.module.scss'
import { TextInput } from '../../TextInput'
import { showToast } from '../../../../utils/showToast'
import { Popup } from '../'

interface PopupUserProps {
  dados?: any
  onClick: any
  type?: string
}

export const PopupUser = ({ dados, onClick, type }: PopupUserProps) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = async (inputValue: any) => {
    if (inputValue) {
      const result = await onClick(true, inputValue, type)

      if (result === 'success') {
        setTimeout(() => onClick(false), 3000)
        console.log('fechou')
        setInputValue('')
      } else {
        return
      }
    } else {
      showToast('Preencha todos os campos para continuar.', 'error')
    }
  }

  return (
    <Popup isOpen={true}>
      <div className={styles.popup__main__section__box}>
        <div className={styles.popup__main__section__header}>
          <h1>Alterar {type === 'email' ? 'E-mail' : 'Senha'}</h1>
          <p>{`Para alterar ${type === 'email' ? 'seu e-mail' : 'sua senha'}, preencha os campos abaixo.`}</p>
        </div>
        <div className={styles.popup__main__section__content}>
          {dados && type === 'email' && (
            <div className={styles.popup__main__section__content__article}>
              <TextInput type={'email'} value={dados} label={'E-mail atual'} onChange={setInputValue} placeholder={'E-mail atual'} disabled />
            </div>
          )}
          <div className={styles.popup__main__section__content__article}>
            <TextInput
              type={type === 'email' ? 'email' : 'password'}
              value={inputValue}
              label={type === 'email' ? 'Novo e-mail' : 'Nova senha'}
              onChange={setInputValue}
              placeholder={type === 'email' ? 'Novo e-mail' : 'Nova senha'}
            />
          </div>
        </div>
        <div className={styles.popup__main__section__footer}>
          <Button text="Cancelar" onClick={() => onClick(false)} active={true} />
          <Button text="Salvar" onClick={() => (inputValue ? handleSubmit(inputValue) : null)} active={!!inputValue} />
        </div>
      </div>
    </Popup>
  )
}
