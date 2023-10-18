import axios from "axios";
import { LimitOrderDomain, ChainId, token0, token1 } from "../../libs/constants";
import { Order } from "../../entities/order";

export async function getOrders(): Promise<Order[]> {
    const targetPath = `/read-partner/api/v1/orders`;

    // Specify the chain and token pair being queried
    const targetPathConfig = {
        params: {
            chainId: ChainId.MATIC,
            makerAsset: token1.address, // USDC
            takerAsset: token0.address  // KNC  
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