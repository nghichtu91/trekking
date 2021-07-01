import React from 'react'

export interface withProductServiceProps {
  handleChangePage?: () => void
}

export function withProductService<P extends withProductServiceProps>(
  WrappedComponent: React.ComponentType<P>
) {
  const component = (props: P) => {
    return <WrappedComponent {...props} />
  }
  return component
}
