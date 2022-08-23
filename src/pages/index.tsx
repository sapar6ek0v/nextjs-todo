import type { NextPage } from 'next'
import Form from '../components/Form'
import ListItem from '../components/ListItem'
import { Wrapper } from '../components/Wrapper/styles'

const Home: NextPage = () => {
  return (
    <Wrapper>
      <div>
        {/* <h1 className=" text-red-600 text-2xl">Hello world</h1> */}
        <Form />
        <ListItem />
      </div>
    </Wrapper>
  )
}

export default Home
