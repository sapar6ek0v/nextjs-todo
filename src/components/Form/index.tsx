import { FC, useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import { trpc } from '../../utils/trpc'
import InputForm from '../InputForm'

const Form: FC = () => {
  const utils = trpc.useContext()
  const { mutate, error } = trpc.useMutation('todos.create', {
    onError: () => {
      addToast(error?.message, { appearance: 'error' })
    },
    onSuccess(data, variables, ctx) {
      utils.invalidateQueries(['todos.getAll'])
    },
  })

  const { addToast } = useToasts()

  const [todo, setTodo] = useState('')

  const onSubmit = () => {
    mutate({ content: todo })
    addToast('You add new todo, congrats!', { appearance: 'success' })
    setTodo('')
  }

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
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
    <InputForm
      handleOnChange={handleOnChange}
      handleOnKeyDown={handleOnKeyDown}
      onSubmit={onSubmit}
      value={todo}
      placeholder="Add new task ."
      btnText="Start"
    />
  )
}

export default Form
