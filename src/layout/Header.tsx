import { useWeb3Modal } from '@web3modal/wagmi/react';
import styled from 'styled-components';
import { useAccount } from 'wagmi'
import { useEffect } from 'react';
import { setAddress } from '@/store/module/user';
import { useAppDispatch, useAppSelector, RootState } from '@/store';

const Header = () => {
    const dispatch = useAppDispatch()
    const storeAddress = useAppSelector((s: RootState) => s.user.address)
    const { address, status, chain } = useAccount()

    useEffect(() => {
        if (address) {
            dispatch(setAddress(address))
        } else {
            dispatch(setAddress(''))
        }
    }, [status, chain, address])

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <div className="mr-4 hidden md:flex">
                    <a href="/" className="mr-6 flex items-center space-x-2 font-bold">LOGO</a>
                    <a href="/home" className="mr-6 flex items-center space-x-2">Home</a>
                </div>
                <Account>
                    {
                        storeAddress 
                        ? storeAddress.replace(/^(\w{4}).*(\w{4})$/, '$1***$2')
                        : <w3m-button />
                    }
                </Account>
            </div>
        </header>
    )
}

export default Header

const Account = styled.div`
    margin-left: auto;
    font-size: 14px;
`