// import { API } from 'aws-amplify'

interface IProductService {
  getProducts: (query?: unknown) => Promise<unknown>
}

class ProductService implements IProductService {
  getProducts: () => Promise<unknown>
}

export default ProductService
