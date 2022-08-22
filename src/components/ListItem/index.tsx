import { useState } from 'react'
import { trpc } from '../../utils/trps'
import ListCard from '../ListCard'
import { ListGroup } from './styles'

const ListItem = () => {
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
