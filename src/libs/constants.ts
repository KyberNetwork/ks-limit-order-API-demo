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
    GÖRLI = 5,
    MATIC = 137,
    MUMBAI = 80001,
    BSCTESTNET = 97,
    BSCMAINNET = 56,
    AVAXTESTNET = 43113,
    AVAXMAINNET = 43114,
    FANTOM = 250,
    CRONOS = 25,
    ARBITRUM = 42161,
    BTTC = 199,
    AURORA = 1313161554,
    OPTIMISM = 10,
    ZKSYNC = 324,
    LINEA = 59144,
    ZKEVM = 1101,
    BASE = 8453,
    SOLANA = 101, //fake id
    SOLANA_DEVNET = 103, //fake id
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