import axios from "axios";
import { ChainId, LimitOrderDomain, token1 } from "../../libs/constants";
import { getSigner } from "../../libs/signer";
import { OpenOrder } from "../../entities/openOrder";

export async function getMakerActiveAmount(): Promise<OpenOrder[]> {
    const targetPath = `/read-ks/api/v1/orders/active-making-amount`;

    const signer = getSigner();
    const signerAddress = await signer.getAddress();

    const targetPathConfig = {
        params: {
            chainId: ChainId.MATIC,
            makerAsset: token1.address,
            maker: signerAddress
        }
    };

    try {
        console.log(`\nGetting maker active making amount for ${token1.symbol}...`)
        const {data} = await axios.get(
            LimitOrderDomain+targetPath,
            targetPathConfig
        );
        
        console.log(`Maker (${signerAddress}) active making amount:`)
        console.debug(data.data.activeMakingAmount);

        return data.data.activeMakingAmount;

    } catch (error) {
        throw(error);
    };
};