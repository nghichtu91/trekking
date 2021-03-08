export type TradeType = 1 | 2 // 1 mua 2 bán
export type Resource = 'food' | 'wood' | 'gold' | 'stone'
export type Speed = ''
export type Trooper = 't1' | 't2' | 't3' | 't4'
export type ProductType = 'account' | 'rss'
export type Country = ''

export interface IAttribute {
  country?: Country
}

export interface IProduct {
  id: string
  title: string
  tradeType: TradeType
  price: number
  thumb?: string
  albumId?: string
  attributes?: IAttribute
  userId?: string
  type?: ProductType
}
