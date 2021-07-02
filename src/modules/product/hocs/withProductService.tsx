import React from 'react'
import { useRouter } from 'next/router'

export interface IWithProductServiceProps {
  handleChangePage?: (page: number, pageSize?: number) => void
  paged?: number
}

export function withProductService<P extends IWithProductServiceProps>(
  WrappedComponent: React.ComponentType<P>
) {
  const HocComponent = (props: P) => {
    const router = useRouter()
    const handlePagination = (page: number) => {
      const { pathname, query } = router
      router.push({
        pathname,
        query: {
          ...query,
          paged: page,
        },
      })
    }

    return <WrappedComponent handleChangePage={handlePagination} {...props} />
  }
  return HocComponent
}
