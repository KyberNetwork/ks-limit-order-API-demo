import axios from "axios";
import { LimitOrderDomain, ChainId, token0, token1 } from "../../libs/constants";
import { getSigner } from "../../libs/signer";
import { getOrders } from "../taker/getOrders";
import { EIP712TypedData } from "../../entities/EIP712";

export interface CancelOrderUnsignedBody {
    chainId: string,
    maker: string, 
    orderIds: number[]
};

export async function postCancelOrderUnsigned(): Promise<{requestBody: CancelOrderUnsignedBody, returnedData: EIP712TypedData}> {
    const targetPath = `/write/api/v1/orders/cancel-sign`;

    // Get the Maker address
    const signerAddress = await getSigner().getAddress();

    // Get the order ID to be cancelled
    const orders = await getOrders();
    const targetOrder = orders.filter(order => 
        order.maker.toLowerCase() == signerAddress.toLowerCase() &&
        order.makerAsset.toLowerCase() == token1.address.toLowerCase() &&
        order.takerAsset.toLowerCase() == token0.address.toLowerCase()
    );
    const targetOrderId = Number(targetOrder[0].id);

    // Structure the request body to accompany the POST request
    const requestBody: CancelOrderUnsignedBody = {
        chainId: ChainId.MATIC.toString(),
        maker: signerAddress,
        orderIds: [targetOrderId]
    };

    try {
        console.log(`\nGetting the unsigned cancellation order...`);
        const {data} = await axios.post(
            LimitOrderDomain+targetPath,
            requestBody
        );

        console.log(`Unsigned cancellation order:`);
        console.debug(data.data)

        // Return the request body used and the EIP712 unsigned data
        return {
            requestBody: requestBody,
            returnedData: data.data
        };

    } catch (error) {
        throw(error);
    };
};