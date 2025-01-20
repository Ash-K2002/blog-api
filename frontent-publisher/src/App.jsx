import './App.css'
import {AuthProvider} from './components/AuthProvider'
import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import CreateBlog from './pages/CreateBlog';

const appRoutes = createBrowserRouter([
  {
    path:'/',
    element: <Layout/>,
    children:[
      {path:"", element: <HomePage/>},
      {path: 'login', element: <LoginPage/>},
      {path:'signup', element:<SignupPage/>},
      {path: 'create', element: <CreateBlog/>},
    ]
  }
]);

function Layout({children}){
  return(<>
  <header>This is the app header</header>
  <main><Outlet/></main>
  </>)
}

function App() {

  return (
    <AuthProvider>
      <RouterProvider router={appRoutes}/>
    </AuthProvider>
  )
}

export default App
