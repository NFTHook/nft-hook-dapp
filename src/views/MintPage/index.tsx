import styled from 'styled-components';
import Ping from "@/components/ui/ping";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useWriteContract, useWaitForTransactionReceipt, useWatchContractEvent, useChainId, useSwitchChain, useBalance, useWatchPendingTransactions } from 'wagmi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Loader2, Laugh, CircleCheckBig, CornerRightUp } from "lucide-react";
import { nftDetail } from '@/api';
import { ResultEnum } from '@/enums/httpEnum';
import { useToast } from "@/components/ui/use-toast";
import { formatEther } from 'viem'
import { NftInfo, PriceV0 } from './type';
import { useAppDispatch, useAppSelector, RootState } from "@/store";
import { getChainById } from '@/utils/chain';
import { config } from '@/lib/wagmi';
import { motion, AnimatePresence } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import Goback from '@/components/Goback';
import Image from '@/components/Image/index';
import CountUp from 'react-countup';

type ItemType = {
    msgSender: string;
    mintQuantity: bigint;
    address: `0x${string}`;
    transactionHash: string | null;
};

export default function Mint() {
    const dispatch = useAppDispatch()
    const storeAddress = useAppSelector((s: RootState) => s.user.address);
    const chainId = useChainId()
    const { data: account } = useBalance({ address: `0x${storeAddress.substring(2)}` })
    const { open } = useWeb3Modal();
    const { ca } = useParams<string>()
    const { toast } = useToast()
    const [ contractAddr, setContractAddr ] = useState<`0x${string}`>()
    const [ abi, setAbi ] = useState<ReadonlyArray<unknown>>([])
    const [ info, setInfo ] = useState<NftInfo | null>(null)
    const [ recentList, setRecentList ] = useState<ItemType[]>([])
    const [ priceList, setPriceList ] = useState<PriceV0[] | null>(null)
    const { data: hash, isPending, writeContract } = useWriteContract({ config })
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })
    const { switchChain } = useSwitchChain({ config })

    useWatchContractEvent({
        address: `0x${ca?.substring(2)}`,
        abi: abi,
        eventName: 'NewMint',
        chainId: chainId,
        config,
        onLogs(logs) {
            setRecentList(preItems => {
                let newItems: ItemType[] = logs.map(v => {
                    return {
                        // @ts-ignore
                        msgSender: v.args.msgSender as string,
                        // @ts-ignore
                        mintQuantity: v.args.mintQuantity as bigint,
                        address: v.address,
                        transactionHash: v.transactionHash
                    }
                })
                return [...newItems, ...preItems]
            })
        }
    })

    useEffect(() => {
        window.scrollTo(0, 0)
        nftDetail({
            addr: ca ?? ''
        }).then(res => {
            if (res.code === ResultEnum.SUCCESS) {
                setPriceList(res.data.btns)
                setAbi(res.data.abi)
                setInfo(res.data.info)
            } else {
                toast({
                    variant: "destructive",
                    title: res.message || 'Something Error.',
                })
            }
        })
    }, [])

    useEffect(() => {
        isConfirming && toast({
            title: 'Transaction',
            description: 'The transaction has been submitted toblockchain.',
            action: <CircleCheckBig className='text-green-600' />,
        })
    }, [isConfirming])

    useEffect(() => {
        if (ca) {
            setContractAddr(`0x${ca.substring(2)}`)
        }
    }, [ca])

    const mintFun = (count: number, amount: string) => {
        if (!storeAddress) {
            return open()
        }

        if (chainId != info?.chain_id) {
            switchChain({ chainId: info?.chain_id as number })
        }
        if (account && (account?.value < BigInt(amount))) {
            return toast({
                variant: "destructive",
                title: 'Insufficient amount.',
            })
        }
        if (contractAddr) {
            
            writeContract({
                address: contractAddr,
                abi: abi,
                chainId: chainId,
                functionName: 'mint',
                args: [count],
                // @ts-ignore
                value: amount,
            })
        }
    }

    const handleGoto = (addr: string) => {
        let chaininfo = getChainById(info?.chain_id as string)
        window.open(`${chaininfo.explore}/address/${addr}`)
    };

    return (
        <>
            <Goback />
            <Detail className='px-2 md:px-0 md:max-w-screen-lg flex-col md:flex-row mx-auto mt-10'>
                <div className='flex-shrink w-full md:max-w-[500px]'>
                    {
                        info
                        ? <ImageC className='w-full md:max-w-[500px]' src={info?.img ?? ''}></ImageC>
                        : <Skeleton count={1} height={500} />
                    }
                </div>
                <Info className='w-full'>
                    {
                        info
                        ? <>
                            <div className='flex items-center gap-2'>
                                <h1 className='barlow-medium-italic text-3xl'>{ info?.name }</h1>
                                <h2 className='text-xl barlow-medium-italic ml-auto'>Holders: <CountUp end={info?.holder_num ?? 0} /></h2>
                            </div>
                            <div className='flex items-center gap-2 mt-3'>
                                <Badge className='rounded-md'><Ping /><span className='ml-1'>Minting now</span></Badge>
                                <Badge className='rounded-md'>Public Mint</Badge>
                                <h3 className='text-sm flex items-center gap-1 ml-auto'><Image className='w-4 h-4' src={ getChainById(info?.chain_id as string).img } /><span>{info?.chain_name}</span></h3>
                            </div>
                            
                            <div className='tracking-widest mt-8 flex flex-col gap-4'>
                                {
                                    priceList?.map((v, i) => {
                                        return <Button onClick={() => mintFun(v.mint_cnt, v.value)} key={i} disabled={isPending} variant="outline" className='border-black hover:bg-black hover:text-white'>
                                            {
                                                (isPending || isConfirming) ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <></>
                                            }

                                            Mint { v.mint_cnt } for {
                                                v.value === '0'
                                                ? <span className='barlow-medium-italic'>&nbsp;FREE</span>
                                                : <><span className='barlow-medium-italic px-1'> { formatEther(BigInt(v.value)) } </span> <span>ETH</span></>
                                            }
                                        </Button>
                                    })
                                }
                            </div>
                        </>
                        : <Skeleton count={10} height={30} />
                    }
                </Info>
            </Detail>

            {
                recentList?.length > 0
                ?   <Recent className='px-2 md:px-0 md:max-w-screen-lg mx-auto'>
                        <h1 className='text-2xl barlow-medium-italic'>recent mints</h1>
                        <div className='flex flex-col items-center gap-2 py-4'>
                            <AnimatePresence>
                                {
                                    recentList.map((v) => {
                                        return (
                                            <RecentItem 
                                                key={v.transactionHash}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                transition={{ duration: 0.5 }}
                                                onClick={() => handleGoto(v.msgSender as string)}
                                            >
                                                <Laugh className='w-5 h-5' />
                                                <div>{ v.msgSender.replace(/^(\w{4}).*(\w{4})$/, "$1****$2") }</div>
                                                <span>minted</span>
                                                <span className='px-2 barlow-extrabold-italic'>{ v.mintQuantity.toString() }</span> 
                                                <CornerRightUp className='w-5 h-5 ml-auto' />
                                            </RecentItem>
                                        )
                                    })
                                }
                            </AnimatePresence>
                        </div>
                    </Recent>
                : <></>
            }
        </>
    );
}

const Recent = styled.div`

`
const RecentItem = styled(motion.div)`
    border: 1px solid black;
    background: black;
    color: white;
    display: flex;
    align-items: center;
    padding: 12px;
    width: 100%;
    gap: 8px;
    cursor: pointer;
    &:hover {
        background: #1e1e1e;
    }
`

const Detail = styled.div`
    margin-bottom: 80px;
    display: flex;
    align-items: flex-start;
    gap: 32px;
`

const ImageC = styled(Image)`
    // flex: 0 0 500px;
    // max-width: 500px;
`

const Info = styled.div`
    flex: 1;
`
