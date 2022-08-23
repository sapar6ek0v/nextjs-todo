import { FC } from 'react'
import { BsFillTrashFill } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import { useToasts } from 'react-toast-notifications'
import { Todo } from '@prisma/client'
import { useRouter } from 'next/router'
import { StyledListCard, ListItem, Button } from './styles'
import { colors } from '../../constants'
import { trpc } from '../../utils/trpc'

export type Props = {
  todo: Todo
}

const ListCard: FC<Props> = ({ todo }) => {
  const utils = trpc.useContext()
  const router = useRouter()

  const { mutate: deleteTodo, error } = trpc.useMutation(['todos.delete'], {
    onError: (error) => {
      addToast(error?.message, { appearance: 'error' })
    },
    onSuccess(data, variables, ctx) {
      utils.invalidateQueries(['todos.getAll'])
    },
  })

  const { addToast } = useToasts()

  const onDelete = (id: string) => {
    deleteTodo({ id })
    addToast('You successfully delete todo!', { appearance: 'success' })
  }

  const onEdit = () => {
    router.push(`/todo/${todo.id}`)
  }

  return (
    <StyledListCard key={todo.id}>
      <ListItem>
        <span>{todo.content}</span>
      </ListItem>
      <div>
        <Button onClick={onEdit} color={colors.green}>
          <AiFillEdit />
        </Button>
        <Button onClick={() => onDelete(todo.id)} color={colors.red}>
          <BsFillTrashFill />
        </Button>
      </div>
    </StyledListCard>
  )
}

export default ListCard
