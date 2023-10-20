import axios from "axios";
import { ChainId, LimitOrderDomain, makerAsset, takerAsset } from "../../libs/constants";
import { getSigner } from "../../libs/signer";
import { getOrders } from "./getOrders";

interface OperatorSignatureResponse {
    id: number,
    chainId: string,
    operatorSignature: string,
    operatorSignatureExpiredAt: number
};

export async function getOperatorSignature(): Promise<OperatorSignatureResponse[]> {
    const targetPath = `/read-partner/api/v1/orders/operator-signature`;

    // Get the taker address
    const signerAddress = await getSigner().getAddress();

    // Get the target order to be signed by the operator
    const orders = await getOrders();
    const targetOrders = orders.filter(order => 
        order.maker.toLowerCase() == signerAddress.toLowerCase() &&
        order.makerAsset.toLowerCase() == makerAsset.address.toLowerCase() &&
        order.takerAsset.toLowerCase() == takerAsset.address.toLowerCase()
    );
    const targetOrderId = Number(targetOrders[0].id);

    // Specify the params for the GET request
    const targetPathConfig = {
        params: {
            chainId: ChainId.MATIC.toString(),
            orderIds: targetOrderId
        }
    };

    try {
        console.log(`\nGetting the operator signature...`);
        const {data} = await axios.get(
            LimitOrderDomain+targetPath,
            targetPathConfig
        );

        console.log(`Operator signature:`);
        console.debug(data.data.orders)

        // Return the OpsSig data for further processing
        return data.data.orders;

    } catch (error) {
        throw(error);
    };
}