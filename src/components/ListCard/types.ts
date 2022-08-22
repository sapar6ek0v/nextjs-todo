export interface Props {
  todo: ITodo
}

export interface ITodo {
  id: string
  content: string
  createdAt: Date
}

export interface StyledProps {
  color: string
}
