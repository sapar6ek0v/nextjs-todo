import { FC } from 'react'
import { trpc } from '../../utils/trpc'
import ListCard from '../ListCard'
import { ListGroup } from './styles'

const ListItem: FC = () => {
  const { data } = trpc.useQuery(['todos.getAll'])

  return (
    <ListGroup>
      {data?.map((todo) => (
        <ListCard key={todo.id} todo={todo} />
      ))}
    </ListGroup>
  )
}

export default ListItem
