import axios from "axios";
import { ChainId, LimitOrderDomain } from "../../libs/constants";
import { getSigner } from "../../libs/signer";
import { OpenOrder } from "../../entities/openOrder";

export async function getMakerOrders(): Promise<OpenOrder[]> {
    const targetPath = `/read-ks/api/v1/orders`;

    // Get the address of the Maker
    const signerAddress = await getSigner().getAddress();

    // Structure the params for the GET request
    const targetPathConfig = {
        params: {
            chainId: ChainId.MATIC,
            maker: signerAddress,
            status: "active"
        }
    };

    try {
        console.log(`\nGetting list of orders by maker address...`)
        const {data} = await axios.get(
            LimitOrderDomain+targetPath,
            targetPathConfig
        );
        
        console.log(`Orders by Maker (${signerAddress}):`)
        console.debug(data.data.orders);

        return data.data.orders;

    } catch (error) {
        throw(error);
    };
};