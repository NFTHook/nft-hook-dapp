import service from '@/utils/request.js';
import { PriceV0, NftInfo } from '@/views/MintPage/type';
import qs from "qs";

interface BasicResponseModel<T = any> {
  code: string | number;
  message: string;
  data: T;
}

interface DetailParams {
  addr: string
}

export function nftList(params = {}): Promise<BasicResponseModel> {
    return service({
        url: `/api/v1/nft/index_list`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "get",
        params,
    });
}

type NftResponse = BasicResponseModel<{
  abi: ReadonlyArray<unknown>,
  btns: PriceV0[]
  info: NftInfo
}>

export function nftDetail(params: DetailParams): Promise<NftResponse> {
    return service({
        url: `/api/v1/nft/nft_detail`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "get",
        params,
    });
}
