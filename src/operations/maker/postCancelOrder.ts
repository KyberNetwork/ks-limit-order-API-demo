import axios from "axios";
import { LimitOrderDomain } from "../../libs/constants";
import { getSigner } from "../../libs/signer";
import { CancelOrderUnsignedBody, postCancelOrderUnsigned } from "./postCancelOrderUnsigned";

interface CancelOrderSignedBody extends CancelOrderUnsignedBody {
    signature: string
};

export async function postCancelOrder() {
    const targetPath = `/write/api/v1/orders/cancel`;

    // Get the Maker signer instance to sign cancellation off-chain
    const signer = getSigner();

    // Get the request body and EIP712 unsigned message
    const unsignedOrderReqBody = (await postCancelOrderUnsigned()).requestBody;
    const unsignedOrderReturnData = (await postCancelOrderUnsigned()).returnedData;

    // Sign the EIP712 cancellation order
    const signature = await signer.signTypedData(
        unsignedOrderReturnData.domain,
        { CancelOrder: unsignedOrderReturnData.types.CancelOrder },
        unsignedOrderReturnData.message
    );

    // Structure the request body to accompany the POST request
    const requestBody: CancelOrderSignedBody = {
        ...unsignedOrderReqBody,
        signature: signature
    };
    
    try {
        console.log(`\nPosting the cancellation order...`);
        const {data} = await axios.post(
            LimitOrderDomain+targetPath,
            requestBody,
            {headers: {Origin: 'https://kyberswap.com'}}
        );

        console.log(`KyberSwap server response:`);
        console.log(data);

    } catch (error) {
        throw(error);
    };
};