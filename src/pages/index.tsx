import type { NextPage } from 'next'
import Form from '../components/Form'
import ListItem from '../components/ListItem'
import { Wrapper } from '../components/Wrapper/styles'

const Home: NextPage = () => {
  return (
    <Wrapper>
      <div>
        <Form />
        <ListItem />
      </div>
    </Wrapper>
  )
}

export default Home
