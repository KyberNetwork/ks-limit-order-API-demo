import axios from "axios";
import { LimitOrderDomain, makerAsset } from "../../libs/constants";
import { getSigner } from "../../libs/signer";
import { CreateOrderUnsignedBody, postCreateOrderUnsigned } from "./postCreateOrdersUnsigned";
import { getContracts } from "../getContracts";
import { getTokenApproval } from "../../libs/approval";
import { getMakerActiveAmount } from "./getMakerActiveAmount";

interface CreateOrderSignedBody extends CreateOrderUnsignedBody {
    salt: string,
    signature: string
};

export async function postCreateOrder() {
    const targetPath = `/write/api/v1/orders`;

    // Get the ethers signer for signing the creation order
    const signer = getSigner();

    // Get the request body and the EIP712 order creation data
    const unsignedOrderReqBody = (await postCreateOrderUnsigned()).requestBody;
    const unsignedOrderReturnData = (await postCreateOrderUnsigned()).returnedData;

    // Get the Maker current making amount to ensure contract has sufficient allowance across all orders
    const currentMakingAmount = await getMakerActiveAmount();
    const newMakingAmount = Number(currentMakingAmount) + Number(unsignedOrderReqBody.makingAmount);

    // Get the LO contract address to interact with on-chain
    const limitOrderContract = (await getContracts()).latest;

    // Check if LO contract has sufficient allowance to spend makerAsset
    await getTokenApproval(
        makerAsset.address,
        limitOrderContract,
        newMakingAmount
    );

    // Sign the EIP712 order creation
    const signature = await signer.signTypedData(
        unsignedOrderReturnData.domain,
        { Order: unsignedOrderReturnData.types.Order },
        unsignedOrderReturnData.message
    );

    // Structure the request to be sent in POST body
    const requestBody: CreateOrderSignedBody = {
        ...unsignedOrderReqBody,
        salt: unsignedOrderReturnData.message.salt,
        signature: signature
    };
    
    try {
        console.log(`\nPosting the create order...`)
        const {data} = await axios.post(
            LimitOrderDomain+targetPath,
            requestBody
        );

        console.log(`KyberSwap server response:`)
        console.log(data);
    } catch (error) {
        throw(error);
    };
};