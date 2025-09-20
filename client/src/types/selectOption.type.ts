export type OptionProps = {
  Color ?: 'white' | 'black'
  value: string
  children: string
  Active?: boolean
  onClick?: () => void
}

export type SelectProps = {
  Color ?: 'white' | 'black'
  Title ?: string
  children: React.ReactElement<OptionProps>[]
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}