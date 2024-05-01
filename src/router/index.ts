import { createBrowserRouter } from "react-router-dom";

import Layout from '@/layout/Layout';
import Homepage from "@/views/Homepage";

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

export default router;

