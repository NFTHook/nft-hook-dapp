import styled from "styled-components";
import { useEffect, useState } from "react";
import { useAppSelector, RootState } from "@/store";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "react-router-dom";
import { nftList } from "@/api";
import { NFTv0 } from "./type";
import { ResultEnum } from "@/enums/httpEnum";
import { useToast } from "@/components/ui/use-toast";
import Skeleton from "react-loading-skeleton";
import NFT from "@/components/NFT";
import { useChains } from 'wagmi'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import EMPTY from '@/assets/images/empty.png';

export default function Homepage() {
    const storeDevice = useAppSelector((s: RootState) => s.global.device);
    const { toast } = useToast();
    const [list, setList] = useState<NFTv0[] | null>(null);
    const [org, setOrg] = useState<NFTv0[] | null>(null);
    const chains = useChains()

    useEffect(() => {
        if (list) return;
        nftList().then((res) => {
            if (res.code === ResultEnum.SUCCESS) {
                setList(res.data.list);
                setOrg(res.data.list);
            } else {
                toast({
                    variant: "destructive",
                    title: res.message,
                });
            }
        });
    }, []);

    const onChangeSelect = (e: string) => {
        let l = org?.filter(v => {
            return v.chain_id == e
        }) || []
        setList(l)
    }

    return (
        <>
            <Banner>
                <AspectRatio ratio={storeDevice === "mobile" ? 15 / 12 : 15 / 3} className="overflow-hidden">
                    <Image />
                    {/* <Cover>
                        <h1 className='barlow-light text-4xl md:text-6xl text-white'>NFT HOOK</h1>
                    </Cover> */}
                </AspectRatio>
            </Banner>
            <div className="w-full mx-auto px-2 lg:px-4 max-w-screen-xl py-4">
                <Select onValueChange={(e) => onChangeSelect(e)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All Chains" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            chains?.map(v => {
                                return <SelectItem key={v.id} value={v.id.toString()}>{ v.name }</SelectItem>
                            })
                        }
                    </SelectContent>
                </Select>
            </div>
            <Wrapper className="w-full mx-auto px-2 lg:px-4 max-w-screen-xl pb-8">
                {list
                    ? list?.map((v) => {
                        return (
                            <Link to={`/mint/${v.contract_addr}`} key={v.id}>
                                <NFT options={v} />
                            </Link>
                        );
                    })
                    : Array.from({ length: 10 }).map((_, index) => {
                          return (
                              <div key={index}>
                                  <Skeleton count={1} height={240} />
                                  <Skeleton count={1} />
                                  <Skeleton count={1} />
                              </div>
                          );
                      })}
            </Wrapper>
            {
                list
                    ? (
                        list?.length == 0
                        ? <div className="pb-10">
                            <img className="w-60 block mx-auto my-8" src={EMPTY} alt="empty" />
                        </div>
                        : <></>
                    )
                    : <></>
            }
        </>
    );
}

import BG from "../../assets/images/banner.png";
const Banner = styled.div``;
// const Cover = styled.div`
//     position: absolute;
//     z-index: 1;
//     inset: 0;
//     background: rgba(0, 0, 0, 0.6);
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
// `;
const Image = styled.div`
    background: url(${BG}) no-repeat center center / cover;
    position: absolute;
    z-index: 0;
    inset: 0;
`;
const Wrapper = styled.div`
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 8px;
    @media (max-width: 640px) {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    }
`;
