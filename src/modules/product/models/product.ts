export type TradeType = 1 | 2 // 1 mua 2 bán
export type Resource = 'food' | 'wood' | 'gold' | 'stone'
export type Speed = ''
export type Trooper = 't1' | 't2' | 't3' | 't4'
export type ProductType = 'account' | 'rss' | 'car'
export type Country = ''
export type Status = 'trading' | 'completed'

export interface IAttribute {
  country?: Country
}

export interface Attribute {
  key: string
  name: string
  val: unknown
}

export interface ICarAttribute {
  company: string
}

export interface IProduct {
  id: string
  title: string
  tradeType: TradeType
  price: number
  thumb?: string
  albumId?: string
  attributes?: ICarAttribute
  userId?: string
  type?: ProductType
  tag?: string[]
  content?: string
  created_at?: Date
  author?: string
  shop?: unknown
}
