import service from '@/utils/request.js';
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

export function nftDetail(params: DetailParams): Promise<BasicResponseModel> {
    return service({
        url: `/api/v1/nft/nft_detail`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "get",
        params,
    });
}
