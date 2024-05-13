import { Outlet } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <Toaster />
        </>
    )
}