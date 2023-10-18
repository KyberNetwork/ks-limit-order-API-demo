import axios from "axios";
import { LimitOrderDomain } from "../../libs/constants";
import { getSigner } from "../../libs/signer";
import { getOrders } from "./getOrders";
import { getOperatorSignature } from "./getOperatorSignature";
import { getContracts } from "../getContracts";

interface FillOrderBody {
    orderId: number,
    takingAmount: string,
    thresholdAmount: string,
    target: string,
    operatorSignature: string
};

export async function postFillOrder() {
    const targetPath = `/read-ks/api/v1/encode/fill-order-to`;

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
    
    try {
        console.log(`\nPosting the fill order...`);

        const requestBody: FillOrderBody = {
            orderId: Number(targetOrderId),
            takingAmount: takingAmount.toString(),
            thresholdAmount: '0',
            target: signerAddress,
            operatorSignature: operatorSignature[0].operatorSignature
        };

        const {data} = await axios.post(
            LimitOrderDomain+targetPath,
            requestBody
        );

        console.log(`KyberSwap server response:`)
        console.log(data);

        console.log(`Sending the fill order encoded data to the network...`)
        const fillOrderTx = await signer.sendTransaction({
            data: data.data.encodedData,
            to: limitOrderContract,
            from: signerAddress,
            maxFeePerGas: 100000000000,
            maxPriorityFeePerGas: 100000000000
        });
    
        const fillOrderTxReceipt = await fillOrderTx.wait();
        console.log(`Fill order tx executed with hash: ${fillOrderTxReceipt?.hash}`);

    } catch (error) {
        throw(error);
    };
};