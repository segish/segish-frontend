import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import "./style.scss"
import "./body.scss"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import NavBar from "./components/navbar/NavBar"
import LeftBar from "./components/leftbar/LeftBar"
import RightBar from "./components/rightbar/RightBar"
import Home from "./pages/home/Home"
import Profile from "./pages/profile/Profile"
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext} from "./context/authContext";

function App(){

  const { currentUser } = useContext(AuthContext);

  const { darkMode } = useContext(DarkModeContext);

  const queryClient = new QueryClient()

  const ProtectedLayout=({children})=>{
    if(currentUser===null){
      return <Navigate to="/login"/>;
    }
    return children;
  }
  const Layout=()=>{
    return(
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <NavBar/>
          <div className="body" style={{display: "flex"}}>
            <LeftBar/>
            <div style={{flex: 6}}>
              <Outlet/>
            </div>
            <RightBar/>
          </div>
        </div>
      </QueryClientProvider>
    );
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: (<ProtectedLayout>
                  <Layout/>
              </ProtectedLayout>),
      children:[
        {
        path:"/",
        element:<Home/>
      },
      {
      path:"/profile/:id",
      element:<Profile/>
    }
      ]
    },
    {
      path: "/Login",
      element: <Login/>,
    },
    {
      path: "/Register",
      element: <Register/>,
    },
  ]);

  return(
    <div>
      <RouterProvider router={router} />
    </div>
  )
}
export default App