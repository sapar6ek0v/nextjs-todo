import { FC } from 'react'
import { FlexContainer } from '../Container/styles'
import { StyledInput, Button } from '../Form/styles'

export interface IProps {
  onSubmit: () => void
  handleOnChange: (event: React.FormEvent<HTMLInputElement>) => void
  handleOnKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
  value?: string
  placeholder?: string
  btnText: string
  defaultValue?: string
}

const InputForm: FC<IProps> = ({
  onSubmit,
  handleOnChange,
  handleOnKeyDown,
  value,
  placeholder,
  btnText,
  defaultValue,
}) => {
  return (
    <FlexContainer>
      <StyledInput
        value={value}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
      <Button disabled={!value} onClick={onSubmit}>
        {btnText}
      </Button>
    </FlexContainer>
  )
}

export default InputForm
