import { NextPage } from 'next'
import { useState } from 'react'
import { BsFillTrashFill } from 'react-icons/bs'
import { AiFillEdit, AiFillSave } from 'react-icons/ai'
import { Props } from './types'
import { StyledListCard, ListItem, UpdateInput, Button } from './styles'
import { colors } from '../../constants'
import { trpc } from '../../utils/trps'
import { useToasts } from 'react-toast-notifications'

const ListCard: NextPage<Props> = ({ todo }) => {
  const { mutate, error } = trpc.useMutation(['todos.update'], {
    onError: () => {
      addToast(error?.message, { appearance: 'error' })
    },
  })
  // const { mutateD } = trpc.useMutation(['todos.delete'])

  const { addToast } = useToasts()

  const [update, setUpdate] = useState<boolean>(false)
  const [updateTodo, setUpdateTodo] = useState<string>(todo.content as string)

  const onDelete = (id: string): void => {
    // mutateD()
  }

  const onEdit = (): void => {
    setUpdate(true)
  }

  const onUpdate = (id: string): void => {
    mutate({ id, content: updateTodo })
    addToast('You successfully update todo!', { appearance: 'success' })
    setUpdate(false)
  }

  const onChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const newValue = event.currentTarget.value
    setUpdateTodo(newValue)
  }

  return (
    <StyledListCard key={todo.id}>
      <ListItem>
        {update ? (
          <UpdateInput value={updateTodo} onChange={onChange} />
        ) : (
          <span>{todo.content}</span>
        )}
      </ListItem>
      <div>
        {update ? (
          <Button onClick={() => onUpdate(todo.id)} color={colors.yellow}>
            <AiFillSave />
          </Button>
        ) : (
          <Button onClick={onEdit} color={colors.green}>
            <AiFillEdit />
          </Button>
        )}
        <Button onClick={() => onDelete(todo.id)} color={colors.red}>
          <BsFillTrashFill />
        </Button>
      </div>
    </StyledListCard>
  )
}

export default ListCard
