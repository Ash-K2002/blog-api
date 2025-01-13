import './App.css'
import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/Homepage';
import BlogDetail from './pages/BlogDetail';
import Header from './components/Header';
import SignupPage from './pages/SignupPage';
import Account from './pages/Account';


const appRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children:[
      {path:'', element: <HomePage/>},
      {path:'login', element:<LoginPage/>},
      {path: 'blog/:id', element: <BlogDetail/>},
      {path: '/signup', element: <SignupPage/>},
      {path: '/account', element: <Account/>},
    ]
  }
]);

function Layout({children}){
  return(
    <>
    <Header/>
    <Outlet/>
    </>
  );
}

function App() {

  return (
    <>
      <RouterProvider router={appRoutes}/>
    </>
  );
}

export default App
