import axios from "axios";
import { ChainId, LimitOrderDomain } from "../libs/constants";

interface Pairs {
    makerAsset: string,
    takerAsset: string
};

export async function getSupportedPairs(): Promise<Pairs[]> {
    const targetPath = `/read-partner/api/v1/orders/pairs`;

    const targetPathConfig = {
        params: {
            chainId: ChainId.MATIC,
        }
    };

    try {
        console.log(`\nGetting supported pairs on for ChainId ${ChainId.MATIC}...`);
        const {data} = await axios.get(
            LimitOrderDomain+targetPath,
            targetPathConfig
        );
        
        console.log(`Supported pairs:`);
        console.debug(data.data.pairs);

        return data.data.pairs;

    } catch (error) {
        throw(error);
    };
};