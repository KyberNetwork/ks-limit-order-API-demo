import axios from "axios";
import { LimitOrderDomain, token0, token1 } from "../../libs/constants";
import { getSigner } from "../../libs/signer";
import { getMakerOrders } from "./getMakerOrders";
import { getContracts } from "../getContracts";

interface CancelBatchOrdersBody {
    orderIds: number[]
};

export async function postCancelBatchOrders() {
    const targetPath = `/read-ks/api/v1/encode/cancel-batch-orders`;

    // Get the Maker instance to senf the transaction on-chain
    const signer = getSigner();
    const signerAddress = await signer.getAddress();

    // Get the order ID to be cancelled
    const orders = await getMakerOrders();
    const targetOrders = orders.filter(order => 
        order.makerAsset.toLowerCase() == token1.address.toLowerCase() &&
        order.takerAsset.toLowerCase() == token0.address.toLowerCase()
    );
    const targetOrderId = Number(targetOrders[targetOrders.length-1].id);

    // Get the Limit Order Contract to interact with 
    const limitOrderContract = (await getContracts()).latest;
    
    try {
        console.log(`\nPosting the cancel batch order...`);

        const requestBody: CancelBatchOrdersBody = {
            orderIds: [targetOrderId]
        };

        const {data} = await axios.post(
            LimitOrderDomain+targetPath,
            requestBody
        );

        console.log(`KyberSwap server response:`)
        console.log(data);

        console.log(`Sending the cancel order encoded data to the network...`)
        const cancelOrderTx = await signer.sendTransaction({
            data: data.data.encodedData,
            to: limitOrderContract,
            from: signerAddress,
            maxFeePerGas: 100000000000,
            maxPriorityFeePerGas: 100000000000
        });
    
        const cancelOrderTxReceipt = await cancelOrderTx.wait();
        console.log(`Orders cancelled with hash: ${cancelOrderTxReceipt?.hash}`);

    } catch (error) {
        throw(error);
    };
};