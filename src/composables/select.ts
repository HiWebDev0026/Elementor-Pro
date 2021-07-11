import {
  computed,
  ComputedRef,
  onMounted,
  Ref,
  ref,
  shallowRef,
  toRefs,
  watch,
} from 'vue'
import { isArray } from '../utils/index'
import type {
  SelectConfig,
  SelectDataItem,
  UnknownObject,
  MaybeArray,
  ITreeSelectProps,
} from '../types/index'
import type TreeStore from 'element-plus/lib/el-tree/src/model/tree-store'

interface ITreeStore extends TreeStore {
  setCurrentKey: (value: string | number | null) => void
}

type SelectData = Record<string, boolean | string | number | UnknownObject>[]

export function useSelectData(
  props: Readonly<{
    data: SelectData
    config?: SelectConfig
  }>
): ComputedRef<SelectDataItem[] | undefined> {
  const config: Required<SelectConfig> = Object.assign(
    {
      value: 'value',
      label: 'label',
      disabled: 'disabled',
      name: 'name',
      children: 'children',
    },
    props.config
  )

  function transformData(data: SelectData): SelectDataItem[] | undefined {
    return data && data.length
      ? data.map((item) => {
          return {
            value: item[config.value] || item[config.label],
            label: item[config.label],
            disabled: item[config.disabled] || false,
            name: item[config.name],
            children: transformData(
              (item[config.children] as unknown) as SelectData
            ),
          } as SelectDataItem
        })
      : undefined
  }

  return computed(() => {
    if (props.config) {
      return transformData(props.data)
    } else {
      return (props.data as unknown) as SelectDataItem[]
    }
  })
}

export function useTreeSelect(
  props: Readonly<ITreeSelectProps>,
  emit: (
    event:
      | 'update:modelValue'
      | 'clear'
      | 'remove-tag'
      | 'visible-change'
      | 'node-click'
      | 'check-change',
    ...args: unknown[]
  ) => void
): {
  tree: Ref<ITreeStore>
  modelValue?: Ref<MaybeArray<string | number> | undefined>
  clearable?: Ref<boolean | undefined>
  multiple?: Ref<boolean | undefined>
  checkStrictly?: Ref<boolean | undefined>
  filterable?: Ref<boolean | undefined>
  value: ComputedRef<MaybeArray<string | number> | undefined>
  label: Ref<MaybeArray<string | number>>
  list: Ref<SelectDataItem[]>
  filter: (value: string, item: SelectDataItem) => boolean
  togglePopper: (state: boolean) => void
  remove: (value: string) => void
  upData: (e: SelectDataItem, node: unknown, self: unknown) => void
  clear: () => void
} {
  const { modelValue, clearable, multiple, checkStrictly, filterable } = toRefs(
    props
  )
  const tree = shallowRef<ITreeStore>({} as ITreeStore)
  const label = ref<MaybeArray<string | number>>('')
  const list = shallowRef<SelectDataItem[]>([])
  const value = computed(() => (multiple?.value ? '' : modelValue?.value || ''))

  onMounted(() => {
    (multiple?.value
      ? (modelValue?.value as Array<string | number>)?.length
      : modelValue?.value) && setDefaultValue()
  })

  watch(() => modelValue?.value, setDefaultValue)

  function setDefaultValue() {
    if (multiple?.value && isArray(modelValue?.value)) {
      tree.value.setCheckedKeys(modelValue?.value as Array<string | number>)
      list.value = tree.value.getCheckedNodes() as SelectDataItem[]
    } else if (!multiple?.value) {
      tree.value.setCurrentKey((value.value || null) as string | number | null)
      const item = tree.value.getCurrentNode()
      label.value = item?.label
    }
  }

  function filter(value: string, item: SelectDataItem) {
    if (!value) return true
    return item.label.indexOf(value) !== -1
  }

  function togglePopper(state: boolean) {
    !state && filterable?.value && tree.value.filter('')
    emit('visible-change', state)
  }

  function remove(value: string) {
    tree.value.setChecked(value, false, !checkStrictly?.value)
    list.value = tree.value.getCheckedNodes() as SelectDataItem[]
    emit('update:modelValue', tree.value.getCheckedKeys())
    emit('remove-tag', value)
  }

  function upData(item: SelectDataItem, node: unknown, self: unknown) {
    if (multiple?.value) {
      list.value = tree.value.getCheckedNodes() as SelectDataItem[]
      emit('update:modelValue', tree.value.getCheckedKeys())
      emit('check-change', item, node, self)
    } else if (!item.disabled) {
      label.value = item.label
      emit('update:modelValue', item.value)
      emit('node-click', item, node, self)
    }
  }

  function clear() {
    multiple?.value
      ? emit('update:modelValue', [])
      : emit('update:modelValue', '')
    emit('clear')
  }

  return {
    modelValue,
    clearable,
    multiple,
    checkStrictly,
    filterable,
    tree,
    value,
    label,
    list,
    filter,
    togglePopper,
    remove,
    upData,
    clear,
  }
}
