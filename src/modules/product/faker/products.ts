import { IProduct } from '../models/product'

export const Products: IProduct[] = [
  {
    id: '1',
    title: 'Nissan Sunny 2020',
    tradeType: 1,
    price: 5000,
    thumb: 'https://static.carmudi.vn/wp-content/uploads/2019-11/FUWAnaL1dl.jpg',
    author: 'Thành Lê',
    created_at: new Date('Tue Jun 29 2021 10:32:32 GMT+0700'),
    shortAttrs: [
      {
        key: 'mfg',
        name: 'mfg',
        val: 2016,
      },
      {
        key: 'km',
        name: 'km',
        val: '500Km',
      },
      {
        key: 'type',
        name: 'type',
        val: 'Tự động',
      },
    ],
    attributes: [
      {
        key: 'company',
        name: 'company',
        val: 1,
      },
      {
        key: 'carOptions',
        name: 'carOptions',
        val: [
          {
            key: 'mfg',
            name: 'mfg',
            val: 2016,
          },
          {
            key: 'km',
            name: 'km',
            val: '500 Km',
          },
          {
            key: 'type',
            name: 'type',
            val: 'Tự động',
          },
        ],
      },
    ],
    shop: 'Bán xe',
    companyId: 1,
  },
  {
    id: '2',
    title: 'Toyota Yaris Cross',
    tradeType: 2,
    price: 5000,
    thumb: 'https://static.carmudi.vn/wp-content/uploads/2019-11/O9jszEGa7N.jpg',
    author: 'Thành Lê',
    shortAttrs: [
      {
        key: 'mfg',
        name: 'mfg',
        val: 2016,
      },
      {
        key: 'km',
        name: 'km',
        val: '500Km',
      },
      {
        key: 'type',
        name: 'type',
        val: 'Tự động',
      },
    ],
    companyId: 20,
    created_at: new Date(),
  },
  {
    id: '3',
    title: 'Rss',
    tradeType: 1,
    price: 5000,
    author: 'Thành Lê',
    created_at: new Date(),
    companyId: 20,
    shortAttrs: [
      {
        key: 'mfg',
        name: 'mfg',
        val: 2020,
      },
      {
        key: 'km',
        name: 'km',
        val: '500Km',
      },
      {
        key: 'type',
        name: 'type',
        val: 'Tự động',
      },
    ],
  },
  {
    id: '4',
    title: 'Rss',
    tradeType: 1,
    price: 5000,
    author: 'Thành Lê',
    created_at: new Date(),
    companyId: 20,
    shortAttrs: [
      {
        key: 'mfg',
        name: 'mfg',
        val: 2016,
      },
      {
        key: 'km',
        name: 'km',
        val: '500Km',
      },
      {
        key: 'type',
        name: 'type',
        val: 'Tự động',
      },
    ],
  },
  {
    id: '5',
    title: 'Rss',
    tradeType: 1,
    price: 5000,
    author: 'Thành Lê',
    created_at: new Date(),
    companyId: 20,
    shortAttrs: [
      {
        key: 'mfg',
        name: 'mfg',
        val: 2016,
      },
      {
        key: 'km',
        name: 'km',
        val: '500Km',
      },
      {
        key: 'type',
        name: 'type',
        val: 'Tự động',
      },
    ],
  },
  {
    id: '6',
    title: 'Rss',
    tradeType: 1,
    price: 5000,
    author: 'Thành Lê',
    created_at: new Date(),
    companyId: 20,
    shortAttrs: [
      {
        key: 'mfg',
        name: 'mfg',
        val: 2016,
      },
      {
        key: 'km',
        name: 'km',
        val: '500Km',
      },
      {
        key: 'type',
        name: 'type',
        val: 'Tự động',
      },
    ],
  },
]
