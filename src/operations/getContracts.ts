import axios from "axios";
import { ChainId, LimitOrderDomain } from "../libs/constants";


export async function getContracts() {
    const targetPath = `/read-ks/api/v1/configs/contract-address`;

    // Specify the chainId to query
    const targetPathConfig = {
        params: {
            chainId: ChainId.MATIC.toString(),
        }
    };

    try {
        console.log(`\nGetting the LO contracts...`);
        const {data} = await axios.get(
            LimitOrderDomain+targetPath,
            targetPathConfig
        );

        console.log(`LO contracts:`);
        console.debug(data.data);

        return data.data;

    } catch (error) {
        throw(error);
    };
}