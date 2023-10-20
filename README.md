# KyberSwap Limit Order API Demo

This repository serves as a guide for developers looking to interact with KyberSwap Limit Order via a typescript environment. For simplicity, the examples are implemented purely in Node.js so that users can focus on the backend logic required to achieve the following Limit Order operations:

* General APIs
    * Get Chain Supported Pairs (`getSupportedPairs()`)
    * Get Limit Order Contract Addresses (`getContracts()`)
* Maker APIs
    * Get Unsigned Create Order Message (`postCreateOrderUnsigned()`)
    * Create New Order (`postCreateOrder()`)
    * Get List Of Orders By maker (`getMakerOrders()`)
    * Get Maker Active Making Amount (`getMakerActiveAmount()`)
    * Get Unsigned Cancel Order(s) Message (`postCancelOrderUnsigned()`)
    * Submit Gasless Cancel Order(s) (`postCancelOrder()`)
    * Generate Encoded Data For Batch Cancellation (`postCancelBatchOrders()`)
    * Generate Encoded Data For Cancel All (`postCancelAllOrders()`)
* Taker APIs
    * Get Orders By Token Pair (`getOrders()`)
    * Request Operator Signature For Maker Orders (`getOperatorSignature()`)
    * Generate Encoded Data To Fill Order (`postFillOrder()`)
    * Generate Encoded Data To Fill Batch Order (`postFillBatchOrders()`)

To aid with readability, each operation has its own `.ts` file which has been categorized under the `/src/operations/` folder. Users can run specific operations by commenting or uncommenting the relevant function in `index.ts`.

## Getting Started

To run the examples:
* Clone this repository
* Install dependencies: `npm install`
* Set up the [ethers.js signer](https://docs.ethers.org/v6/api/providers/#Signer) under `/src/libs/signer.ts`.
* Run dev environment with Nodemon (auto-refresh on save): `npm run start:dev`
* Run dev environment: `npm run start`

## API Specifications

Full API specifications available on our [Docs](https://docs.kyberswap.com/kyberswap-solutions/limit-order/limit-order-api-specification):
* [General](https://docs.kyberswap.com/kyberswap-solutions/limit-order/limit-order-api-specification/general-apis)
* [Maker](https://docs.kyberswap.com/kyberswap-solutions/limit-order/limit-order-api-specification/maker-apis)
* [Taker](https://docs.kyberswap.com/kyberswap-solutions/limit-order/limit-order-api-specification/taker-apis)

## Additional Notes

Note that the code samples in this repository are not production-ready and are meant as references to get you started on integrating KyberSwap Limit Order functionality into your dApp.