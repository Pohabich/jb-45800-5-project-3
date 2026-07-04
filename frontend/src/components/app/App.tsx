import './App.css'
import Layout from '../layout/layout/Layout'
import { BrowserRouter } from 'react-router-dom'
import Auth from '../auth/auth/Auth'
import { Provider as Redux } from 'react-redux'
import store from '../../redux/store'


function App() {

  return (
    <>
      <BrowserRouter>
        <Redux store={store}>
          <Auth>
            <Layout />
          </Auth>
        </Redux>
      </BrowserRouter>
    </>
  )
}

export default App
