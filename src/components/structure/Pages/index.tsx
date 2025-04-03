import { Topbar } from '../Topbar'
import p from './Page.module.scss'
import { LoadingComp } from '../../misc/LoadingComp'
import { useEffect } from 'react'

export const Pages = ({ children, isLoading }: { children: any; isLoading?: any }) => {
  useEffect(() => {
    if (isLoading) {
      window.document.body.style.overflow = 'hidden'
    } else {
      window.document.body.style.overflow = 'auto'
    }
  }, [isLoading])

  if (isLoading) {
    return (
      <div className={p.loading__section}>
        <LoadingComp />
      </div>
    )
  }

  return (
    <section className={p.page__main__section}>
      <section className={p.page__main__section__content}>
        <Topbar />
        <div className={p.page__main__section__content__body}>{children}</div>
      </section>
    </section>
  )
}
