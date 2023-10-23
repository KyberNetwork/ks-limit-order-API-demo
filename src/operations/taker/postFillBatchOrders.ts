import axios from "axios";
import { LimitOrderDomain, takerAsset } from "../../libs/constants";
import { getSigner } from "../../libs/signer";
import { getOrders } from "./getOrders";
import { getOperatorSignature } from "./getOperatorSignature";
import { getContracts } from "../getContracts";
import { getTokenApproval } from "../../libs/approval";

interface FillBatchOrdersBody {
    orderIds: number[],
    takingAmount: string,
    thresholdAmount: string,
    target: string,
    operatorSignatures: string[]
};

export async function postFillBatchOrders() {
    const targetPath = `/read-ks/api/v1/encode/fill-batch-orders-to`;

    // Get the Taker object for signing
    const signer = getSigner();
    const signerAddress = await signer.getAddress();

    // Request for Operator Signature before executing tx on-chain
    const operatorSignature = await getOperatorSignature();
    const targetOrderId = operatorSignature[0].id;

    // Get information about the target order
    const orders = await getOrders();
    const targetOrder = orders.filter(order => order.id == targetOrderId.toString());
    const takingAmount = Number(targetOrder[0].takingAmount)/2;

    // Get the LO contract address to interact with on-chain
    const limitOrderContract = (await getContracts()).latest;

    // Check if LO contract has sufficient allowance to spend takerAsset
    await getTokenApproval(
        takerAsset.address,
        limitOrderContract,
        takingAmount
    );
    
    try {
        console.log(`\nPosting the fill batch order...`);

        const requestBody: FillBatchOrdersBody = {
            orderIds: [Number(targetOrderId)],
            takingAmount: takingAmount.toString(),
            thresholdAmount: '0',
            target: signerAddress,
            operatorSignatures: [operatorSignature[0].operatorSignature]
        };

        const {data} = await axios.post(
            LimitOrderDomain+targetPath,
            requestBody
        );

        console.log(`KyberSwap server response:`)
        console.log(data);

        console.log(`Sending the fill batch order encoded data to the network...`)
        const fillBatchOrderTx = await signer.sendTransaction({
            data: data.data.encodedData,
            to: limitOrderContract,
            from: signerAddress,
            maxFeePerGas: 100000000000,
            maxPriorityFeePerGas: 100000000000
        });
    
        const fillBatchOrderTxReceipt = await fillBatchOrderTx.wait();
        console.log(`Fill batch order tx executed with hash: ${fillBatchOrderTxReceipt?.hash}`);

    } catch (error) {
        throw(error);
    };
};