import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom';
import {useState } from 'react';
import {LayoutContext} from './contexts/Contexts';
import './App.css';
import {AuthProvider} from './components/AuthProvider';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import CreateBlog from './pages/CreateBlog';
import UserBlogs from './pages/UserBlogs';
import BlogDetail from './pages/BlogDetail';
import Account from './pages/Account';
import ErrorPage from './pages/ErrorPage';
import Header from './components/Header';
import SideBar from './components/SideBar';


const appRoutes = createBrowserRouter([
  {
    path:'/',
    element: <Layout/>,
    children:[
      {path:"", element: <HomePage/>},
      {path: 'login', element: <LoginPage/>},
      {path:'signup', element:<SignupPage/>},
      {path: 'create', element: <CreateBlog/>},
      {path: 'blogs', element: <UserBlogs/>},
      {path: 'blog/:id', element: <BlogDetail/>},
      {path: '/account', element: <Account/>}
    ],
    errorElement: <ErrorPage/>
  }
]);


function Layout({children}){

  const [showSideBar, setShowSideBar] = useState(false);

  const toggleSideBar =()=>{
    setShowSideBar(!showSideBar);
  }

  return(<LayoutContext.Provider value={{showSideBar, toggleSideBar}}>
  <Header/>
  {showSideBar && <SideBar/>}
  <main>
    <Outlet/>
  </main>
  </LayoutContext.Provider>);
}

function App() {

  return (
    <AuthProvider>
      <RouterProvider router={appRoutes}/>
    </AuthProvider>
  )
}

export default App
