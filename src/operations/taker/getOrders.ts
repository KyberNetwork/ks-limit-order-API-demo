import axios from "axios";
import { LimitOrderDomain, ChainId, makerAsset, takerAsset } from "../../libs/constants";
import { Order } from "../../entities/order";

export async function getOrders(): Promise<Order[]> {
    const targetPath = `/read-partner/api/v1/orders`;

    // Specify the chain and token pair being queried
    const targetPathConfig = {
        params: {
            chainId: ChainId.MATIC,
            makerAsset: makerAsset.address, // USDC
            takerAsset: takerAsset.address  // KNC  
        }
    };

    try {
        console.log(`\nGetting list of orders...`);
        const {data} = await axios.get(
            LimitOrderDomain+targetPath,
            targetPathConfig
        );

        console.log(`List of orders:`);
        console.debug(data.data.orders);

        // Return the orders for the token pair
        return data.data.orders;

    } catch (error) {
        throw(error);
    };
};