import styled from "styled-components";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";
import { useEffect } from "react";
import { setAddress } from "@/store/module/user";
import { useAppDispatch, useAppSelector, RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ListCollapse } from 'lucide-react';
import LOGO from "@/components/Logo";

const Header = () => {
    const dispatch = useAppDispatch();
    const storeAddress = useAppSelector((s: RootState) => s.user.address);
    const { address, status, chain } = useAccount();
    const { open } = useWeb3Modal();
    const { disconnect } = useDisconnect()

    const logoutFn = () => {
        // dispatch(setAddress(""));
        disconnect()
    }

    useEffect(() => {
        if (address) {
            dispatch(setAddress(address));
        } else {
            dispatch(setAddress(""));
        }
    }, [status, chain, address]);

    return (
        <header className="top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-28 max-w-screen-xl items-center text-sm">
                <div className="mr-4 hidden md:flex pl-8">
                    <a href="/" className="mr-6 w-8">
                        <LOGO />
                    </a>
                    <a href="/" className="mr-6 flex items-center space-x-2">
                        Home
                    </a>
                    <a href="/about" className="mr-6 flex items-center space-x-2">
                        About
                    </a>
                    <a href="/faqs" className="mr-6 flex items-center space-x-2">
                        Faq's
                    </a>
                </div>
                <div className="md:hidden w-8">
                    <LOGO />
                </div>
                {/* <ListCollapse strokeWidth={2} /> */}
                <Account className="md:pr-8">{
                    storeAddress 
                    ?   <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button variant="link">{storeAddress.replace(/^(\w{4}).*(\w{4})$/, "$1***$2")}</Button></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => logoutFn()} className="cursor-pointer">Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    :   <Button onClick={() => open()}>Connect Wallet</Button>
                }</Account>
            </div>
        </header>
    );
};

export default Header;

const Account = styled.div`
    margin-left: auto;
`;
