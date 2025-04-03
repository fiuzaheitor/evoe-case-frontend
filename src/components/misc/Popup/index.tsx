import React, { useEffect } from 'react'
import styles from './Popup.module.scss'

interface PopupProps {
  children: React.ReactNode
  isOpen: boolean
}

export const Popup: React.FC<PopupProps> = ({ children, isOpen }) => {
  useEffect(() => {
    if (isOpen === true) {
      window.document.body.style.overflow = 'hidden'
    } else {
      window.document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <div className={`${styles.popup__section} ${!isOpen && styles.closed}`}>
      <div className={styles.popup__section__box}>{children}</div>
    </div>
  )
}
