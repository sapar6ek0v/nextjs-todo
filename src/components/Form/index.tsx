import { useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import { trpc } from '../../utils/trps'
import { FlexContainer } from '../Container/styles'
import { Button, StyledInput } from './styles'

const Form = () => {
  const { mutate, error } = trpc.useMutation('todos.create', {
    onError: () => {
      addToast(error?.message, { appearance: 'error' })
    },
  })

  const { addToast } = useToasts()

  const [todo, setTodo] = useState<string>()

  const onSubmit = () => {
    mutate({ content: todo as string })
    addToast('You add new todo, congrats!', { appearance: 'success' })
    setTodo('')
  }

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const newValue = event.currentTarget.value
    setTodo(newValue)
  }

  const handleOnKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (!!todo && event.key === 'Enter') {
      onSubmit()
    }
  }

  return (
    <FlexContainer>
      <StyledInput
        value={todo}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
        placeholder="Add a task."
      />
      <Button disabled={!todo} onClick={onSubmit}>
        Start
      </Button>
    </FlexContainer>
  )
}

export default Form
