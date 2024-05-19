import styled from 'styled-components';
import Ping from "@/components/ui/ping";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from "lucide-react";
import { nftDetail } from '@/api';
import { ResultEnum } from '@/enums/httpEnum';
import { useToast } from "@/components/ui/use-toast";
import { formatEther } from 'viem'
import { NftInfo, PriceV0 } from './type';
import { useAppDispatch, useAppSelector, RootState } from "@/store";
import { CircleCheckBig } from 'lucide-react';
import { Chains } from '@/utils/chain';
import Skeleton from 'react-loading-skeleton';
import Goback from '@/components/Goback';
import Image from '@/components/Image/index';
import CountUp from 'react-countup';

export default function Mint() {
    const dispatch = useAppDispatch()
    const storeAddress = useAppSelector((s: RootState) => s.user.address);
    const { open } = useWeb3Modal();
    const { ca } = useParams<string>()
    const { toast } = useToast()
    const [ contractAddr, setContractAddr ] = useState<`0x${string}`>()
    const [ abi, setAbi ] = useState<ReadonlyArray<unknown>>([])
    const [ info, setInfo ] = useState<NftInfo | null>(null)
    const [ priceList, setPriceList ] = useState<PriceV0[] | null>(null)
    const { data: hash, isPending, writeContract } = useWriteContract()
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

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

    const mintFun = (count: number) => {
        if (!storeAddress) {
            return open()
        }
        if (contractAddr) {
            writeContract({
                address: contractAddr,
                abi: abi,
                functionName: 'mint',
                args: [count]
            })
        }
    }

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
                            <h3 className='text-sm flex items-center gap-1'><Image className='w-4 h-4' src={ Chains[info?.chain_id ?? '1'].img } /><span>{info?.chain_name}</span></h3>
                            <div className='flex gap-2 mt-4'>
                                <Badge><Ping /><span className='ml-1'>Minting now</span></Badge>
                                <Badge>Holders: <CountUp end={info?.holder_num ?? 0} /></Badge>
                            </div>
                            <div className='flex items-center mt-4 gap-2'>
                                <Sparkles className="h-8 w-8" />
                                <h1 className='barlow-medium-italic text-3xl'>{ info?.name }</h1>
                            </div>
                            <div className='tracking-widest mt-8 flex flex-col gap-4'>
                                {
                                    priceList?.map((v, i) => {
                                        return <Button onClick={() => mintFun(v.mint_cnt)} key={i} disabled={isPending} variant="outline" className='border-black'>
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
        </>
    );
}

const Detail = styled.div`
    min-height: 80vh;
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
