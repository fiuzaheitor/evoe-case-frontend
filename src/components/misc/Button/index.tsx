import React, { ReactNode } from 'react'
import b from './Button.module.scss'

interface ButtonProps {
  text?: any
  type?: 'button' | 'submit' | 'reset'
  onClick?: any
  active?: boolean
  icon?: ReactNode
}

export const Button: React.FC<ButtonProps> = ({ text, type = 'button', onClick, active = true, icon }) => {
  return (
    <button
      type={type}
      className={`${active ? b.active : b.inactive}
                  ${b.button}`}
      onClick={active ? onClick : undefined}
      disabled={!active}
    >
      {text && <span>{text}</span>}
      {icon && <span>{icon}</span>}
    </button>
  )
}
