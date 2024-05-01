import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from '@/layout/Layout';
import Homepage from "@/views/Homepage";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            Component: Layout,
            children: [
                {
                    path: "home",
                    Component: Homepage,
                },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
