import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/Homepage';
import BlogDetail from './pages/BlogDetail';

const appRoutes = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>
  },
  {
    path:'/login',
    element:<LoginPage/>
  },
  {
    path: '/blog/:id',
    element: <BlogDetail/>
  }
])

function App() {

  return (
    <>
      <RouterProvider router={appRoutes}/>
    </>
  )
}

export default App
