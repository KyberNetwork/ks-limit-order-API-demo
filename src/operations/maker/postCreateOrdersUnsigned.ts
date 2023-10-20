import axios from "axios";
import { LimitOrderDomain, ChainId, makerAsset, takerAsset } from "../../libs/constants";
import { getSigner } from "../../libs/signer";
import { EIP712TypedData } from "../../entities/EIP712";

export interface CreateOrderUnsignedBody {
    chainId: string,
    makerAsset: string,
    takerAsset: string,
    maker: string,
    receiver?: string,
    allowedSenders?: string[],
    makingAmount: string,
    takingAmount: string,
    feeRecipient?: string,
    makerTokenFeePercent?: string,
    expiredAt: number
}

export async function postCreateOrderUnsigned(): Promise<{requestBody: CreateOrderUnsignedBody, returnedData: EIP712TypedData}> {
    const targetPath = `/write/api/v1/orders/sign-message`;

    // Get the address of the Maker
    const signerAddress = await getSigner().getAddress();

    // Structure the request to be sent in POST body
    const requestBody: CreateOrderUnsignedBody = {
        chainId: ChainId.MATIC.toString(),
        makerAsset: makerAsset.address, // USDC
        takerAsset: takerAsset.address, // KNC
        maker: signerAddress,
        allowedSenders: [signerAddress], // Included so that only our account can fill this order
        makingAmount: "10000", // 0.01 USDC
        takingAmount: "20000000000000000", // 0.02 KNC
        expiredAt: Math.floor(Date.now() / 1000) + 60 * 60 // 60mins
    };

    console.debug(requestBody);

    try {
        console.log(`\nGetting the unsigned creation order...`);
        const {data} = await axios.post(
            LimitOrderDomain+targetPath,
            requestBody
        );

        console.log(`Unsigned creation order:`);
        console.debug(data.data);

        // Return the request used and the EIP712 unsigned data
        return {
            requestBody: requestBody,
            returnedData: data.data
        };

    } catch (error) {
        throw(error);
    };
};