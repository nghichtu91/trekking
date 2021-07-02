import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { API } from 'aws-amplify'

export interface IWithProductServiceProps {
  handleChangePage?: (page: number, pageSize?: number) => void
  paged?: number
}

export function withProductService<P extends IWithProductServiceProps>(
  WrappedComponent: React.ComponentType<P>
) {
  const HocComponent = (props: P) => {
    const router = useRouter()
    useEffect(() => {
      const getProduct = async () => {
        const { query } = router
        const pageQuery = query['paged'] as string
        const paged = query?.paged ? parseInt(pageQuery) : 1
        const products = await API.get('treekingProductService', '/products', {
          queryStringParameters: {
            paged,
          },
        })
        console.log(products)
      }
      getProduct()
    }, [])

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
