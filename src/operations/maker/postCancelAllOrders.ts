import axios from "axios";
import { LimitOrderDomain } from "../../libs/constants";
import { getSigner } from "../../libs/signer";
import { getContracts } from "../getContracts";

export async function postCancelAllOrders() {
    const targetPath = `/read-ks/api/v1/encode/increase-nonce`;

    // Get the Maker instance to senf the transaction on-chain
    const signer = getSigner();
    const signerAddress = await signer.getAddress();

    // Get the Limit Order Contract to interact with 
    const limitOrderContract = (await getContracts()).latest;
    
    try {
        console.log(`\nPosting the increase nonce...`);
        const {data} = await axios.post(
            LimitOrderDomain+targetPath
        );

        console.log(`KyberSwap server response:`)
        console.log(data);

        console.log(`Sending the cancel all encoded data to the network...`)
        const increaseNonceTx = await signer.sendTransaction({
            data: data.data.encodedData,
            to: limitOrderContract,
            from: signerAddress,
            maxFeePerGas: 100000000000,
            maxPriorityFeePerGas: 100000000000
        });
    
        const increaseNonceTxReceipt = await increaseNonceTx.wait();
        console.log(`All orders cancelled with hash: ${increaseNonceTxReceipt?.hash}`);

    } catch (error) {
        throw(error);
    };
};