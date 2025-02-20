import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import ErrorPage from "./pages/error";
import Signup from "./pages/signup";
import Home from "./pages/home";
import CreatePost from "./pages/post";
import Profile from "./pages/profile";
import MyPhotos from "./pages/my-photos";
import ProtectedRoutes from "./components/protected";
import EditProfile from "./pages/profile/editProfile";

export const router = createBrowserRouter([
    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: "/",
                element: <Home />,
                errorElement: <ErrorPage />
            },
            {
                path: "/post",
                element: <CreatePost />,
                errorElement: <ErrorPage />
            },
            {
                path: "/profile",
                element: <Profile />,
                errorElement: <ErrorPage />
            },
            {
                path: "/edit-profile",
                element: <EditProfile />,
                errorElement: <ErrorPage />
            },
            {
                path: "/my-photos",
                element: <MyPhotos />,
                errorElement: <ErrorPage />
            }
        ]
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />
    },
    {
        path: "/signup",
        element: <Signup />,
        errorElement: <ErrorPage />
    }
])

export default router