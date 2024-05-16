import styled from "styled-components";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect, useBalance } from "wagmi";
import { formatEther } from 'viem';
import { useEffect, useState } from "react";
import { setAddress } from "@/store/module/user";
import { useAppDispatch, useAppSelector, RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ListCollapse } from "lucide-react";
import LOGO from "@/components/Logo";

const Header = () => {
    const dispatch = useAppDispatch();
    const storeAddress = useAppSelector((s: RootState) => s.user.address);
    const { data: account } = useBalance({ address: `0x${storeAddress.substring(2)}` })
    const { address, status, chain } = useAccount();
    const { open } = useWeb3Modal();
    const { disconnect } = useDisconnect();
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollTop, setLastScrollTop] = useState(0);

    const logoutFn = () => {
        disconnect();
    };

    useEffect(() => {
        if (address) {
            dispatch(setAddress(address));
        } else {
            dispatch(setAddress(""));
        }
    }, [status, chain, address]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop) {
                // Scroll down
                showHeader && setShowHeader(false);
            } else {
                // Scroll up
                !showHeader && setShowHeader(true);
            }
            setLastScrollTop(scrollTop);
        };

        window.addEventListener("scroll", handleScroll);

        // Cleanup
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollTop]);

    return (
        <HeaderW className={`${showHeader ? 'show' : 'hide'} sticky z-50 w-full border-b border-border/40 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-background/60`}>
            <HeaderContainer className="container flex max-w-screen-xl items-center text-sm">
                <div className="mr-4 hidden md:flex pl-8">
                    <a href="/" className="mr-6 w-16">
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
                <div className="md:hidden w-24">
                    <LOGO />
                </div>
                {/* <ListCollapse strokeWidth={2} /> */}
                <Account className="md:mr-8">
                    {storeAddress ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="rounded-lg flex items-center justify-between divide-x divide-gray-300" variant="outline"><span className="pr-3">{ formatEther(account?.value ?? 0n).substring(0, 4) }{ account?.symbol }</span> <span className="pl-3">{storeAddress.replace(/^(\w{4}).*(\w{4})$/, "$1***$2")}</span></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => logoutFn()} className="cursor-pointer">
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button onClick={() => open()}>Connect Wallet</Button>
                    )}
                </Account>
            </HeaderContainer>
        </HeaderW>
    );
};

export default Header;

const Account = styled.div`
    margin-left: auto;
`;
const HeaderW = styled.header`
    transition: all .3s;
    &.show {
        top: 0;
    }
    &.hide {
        top: -${({ theme }) => theme.headerHeight};
    }
`
const HeaderContainer = styled.div`
    height: ${({ theme }) => theme.headerHeight};
`;
