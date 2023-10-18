export interface EIP712TypedData {
    types: {
        [key: string]: EIP712TypedDataField[]
    },
    primaryType?: string,
    domain: EIP712TypedDataDomain,
    message: {
        [key: string]: string
    }
}

interface EIP712TypedDataField {
    name: string,
    type: string
}

interface EIP712TypedDataDomain {
    chainId: string,
    name: string,
    salt?: string,
    verifyingContract?: string, 
    version: string
}