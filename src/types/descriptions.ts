import type { ExternalParam, DeepKeyof } from './index'

interface DescriptionsColumn<T = ExternalParam> {
  prop: keyof T extends string ? DeepKeyof<T> : string
  label?: string
  span?: number
  width?: string | number
  minWidth?: string | number
  align?: 'left' | 'center' | 'right'
  labelAlign?: 'left' | 'center' | 'right'
  className?: string
  labelClassName?: string
}

export type IDescriptionsColumns<T = ExternalParam> = DescriptionsColumn<T>[]

/**
 * Type helper to make it easier to define columns
 * @param columns the columns of Descriptions
 */
export function defineDescriptionsColumns<T = ExternalParam>(
  columns: IDescriptionsColumns<T>
): IDescriptionsColumns<T> {
  return columns
}
