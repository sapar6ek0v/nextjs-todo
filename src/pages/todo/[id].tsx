import { GetServerSideProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import { useRouter } from 'next/router'
import { trpc } from '../../utils/trpc'
import InputForm from '../../components/InputForm'

export type Props = {
  todoId: string
}

export type Params = {
  id: string
}

const UpdateTodoPage: NextPage<Props> = ({ todoId }) => {
  const utils = trpc.useContext()
  const router = useRouter()

  const todoQuery = trpc.useQuery(['todos.getById', { id: todoId }], {})

  const [text, setText] = useState<string>(todoQuery.data?.content || '')

  const { addToast } = useToasts()

  const { mutate: updateTodo } = trpc.useMutation(['todos.update'], {
    onError: (error) => {
      addToast(error?.message, { appearance: 'error' })
    },
    onSuccess(data, variables, ctx) {
      utils.invalidateQueries(['todos.getAll'])
    },
  })

  const onSubmit = () => {
    updateTodo({ id: todoId, data: { content: text } })
    addToast('You update todo, congrats!', { appearance: 'success' })
    setText('')
    router.push('/')
  }

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value
    setText(newValue)
  }

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!!text && event.key === 'Enter') {
      onSubmit()
    }
  }

  useEffect(() => {
    setText(todoQuery.data?.content || '')
  }, [todoQuery.data?.content])

  return (
    <InputForm
      handleOnChange={handleOnChange}
      handleOnKeyDown={handleOnKeyDown}
      onSubmit={onSubmit}
      value={text}
      btnText="Update"
      defaultValue={todoQuery.data?.content}
    />
  )
}

export default UpdateTodoPage

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  ctx
) => {
  const id = ctx.params?.id

  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
  })

  if (!todo) {
    return {
      notFound: true,
    }
  }

  return { props: { todoId: todo.id } }
}
