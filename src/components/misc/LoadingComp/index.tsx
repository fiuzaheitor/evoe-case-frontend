import { RotateRight } from '@mui/icons-material'
import styles from './LoadingComp.module.scss'

export const LoadingComp = () => {
  return (
    <div className={`${styles.loading__component}`}>
      <span>
        <RotateRight />
      </span>
    </div>
  )
}
