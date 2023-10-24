export const LimitOrderDomain = `https://limit-order.kyberswap.com`

interface Token {
    address: string,
    chainId: string,
    decimals: number,
    symbol?: string,
    name?: string
}

export enum ChainId {
    MAINNET = 1,
    BSC = 56,
    ARBITRUM = 42161,
    MATIC = 137,
    OPTIMISM = 10,
    AVAX = 43114,
    BASE = 8453,
    CRONOS = 25,
    ZKSYNC = 324,
    FANTOM = 250,
    LINEA = 59144,
    POLYGONZKEVM = 1101,
    AURORA = 1313161554,
    BTTC = 199,
    ZKEVM = 1101,
    SCROLL = 534352,
    // testnets
    GÖRLI = 5,
    MUMBAI = 80001,
    BSCTESTNET = 97,
    AVAXTESTNET = 43113,
  };

export const takerAsset: Token = {
    address: '0x1c954e8fe737f99f68fa1ccda3e51ebdb291948c',
    chainId: ChainId.MATIC.toString(),
    decimals: 18,
    symbol: 'KNC',
    name: 'KyberNetwork Crystal v2 (PoS)'
};

export const makerAsset: Token = {
    address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    chainId: ChainId.MATIC.toString(),
    decimals: 6,
    symbol: 'USDC.e',
    name: 'USD Coin (PoS)'
};