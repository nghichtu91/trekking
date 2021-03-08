import { List } from 'antd'
import { Products } from '@modules/product/faker/products'
import { ProductItem } from '@modules/product/components/productItem'
import { LoadMoreButton } from '@shared/components/button'
const App = () => {
  // const router = useRouter();
  // const { locale, locales, defaultLocale } = router;
  // console.log(locale, locales, defaultLocale )
  return (
    <List
      loadMore={<LoadMoreButton />}
      itemLayout="vertical"
      dataSource={Products}
      renderItem={item => <ProductItem item={item} />}
    />
  )
}

export default App
