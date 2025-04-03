import React, { useState } from 'react'
import t from './TextInput.module.scss'
import { Visibility, VisibilityOff } from '@mui/icons-material'

export const TextInput = ({
  label,
  type,
  placeholder,
  onChange,
  value,
  min,
  max,
  disabled,
}: {
  label?: string
  type: string
  placeholder: string
  value: any
  onChange?: (newValue: string) => void
  min?: number
  max?: number
  disabled?: boolean
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = (e: any) => {
    e.preventDefault()
    setShowPassword(!showPassword)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return
    if (onChange) {
      onChange(e.target.value)
    }
  }

  return (
    <div className={`${t.input__container} ${disabled && t.disabled}`}>
      {label && <label className={t.input__container__label}>{label}</label>}
      <div className={t.input__container__box}>
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
          onWheel={(e) => e.currentTarget.blur()}
          disabled={disabled}
          min={min}
          max={max}
        />
        {type === 'password' && value !== '' && (
          <div className={t.input__container__box__showPassword}>
            {showPassword ? <Visibility onClick={handleShowPassword} /> : <VisibilityOff onClick={handleShowPassword} />}
          </div>
        )}
      </div>
    </div>
  )
}
