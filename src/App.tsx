import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { device as themeDevice } from '@/theme';
import { useAppDispatch, useAppSelector, RootState } from "@/store";
import { setDevice } from "@/store/module/global";
import Layout from '@/layout/Layout';
import Homepage from "@/views/Homepage";

function App() {
    const dispatch = useAppDispatch();
    const storeDevice = useAppSelector((s: RootState) => s.global.device)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < themeDevice.mdw) {
                storeDevice === 'desktop' && dispatch(setDevice('mobile'))
            } else {
                storeDevice === 'mobile' && dispatch(setDevice('desktop'))
            }
        }
        window.addEventListener('resize', handleResize);
        handleResize()
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [storeDevice])

    const router = createBrowserRouter([
        {
            path: "/",
            Component: Layout,
            children: [
                {
                    path: "",
                    Component: Homepage,
                },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
