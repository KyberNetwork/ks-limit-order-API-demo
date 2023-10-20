import axios from "axios";
import { LimitOrderDomain, ChainId, takerAsset, makerAsset } from "../../libs/constants";
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
        order.makerAsset.toLowerCase() == makerAsset.address.toLowerCase() &&
        order.takerAsset.toLowerCase() == takerAsset.address.toLowerCase()
    );
    const targetOrderId = Number(targetOrder[0].id);

    // Structure the request body to accompany the POST request
    const requestBody: CancelOrderUnsignedBody = {
        chainId: ChainId.MATIC.toString(),
        maker: signerAddress,
        orderIds: [targetOrderId]
    };

    console.debug(requestBody)

    try {
        console.log(`\nGetting the unsigned cancellation order...`);
        const {data} = await axios.post(
            LimitOrderDomain+targetPath,
            requestBody
        );

        console.log(`Unsigned cancellation order:`);
        console.debug(data.data.types)

        // Return the request body used and the EIP712 unsigned data
        return {
            requestBody: requestBody,
            returnedData: data.data
        };

    } catch (error) {
        throw(error);
    };
};