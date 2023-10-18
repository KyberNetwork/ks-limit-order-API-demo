import { getSupportedPairs } from "./operations/getSupportedPairs";
import { getContracts } from "./operations/getContracts";
import { postCreateOrderUnsigned } from "./operations/maker/postCreateOrdersUnsigned";
import { postCreateOrder } from "./operations/maker/postCreateOrder";
import { getMakerActiveAmount } from "./operations/maker/getMakerActiveAmount";
import { getMakerOrders } from "./operations/maker/getMakerOrders";
import { postCancelOrderUnsigned } from "./operations/maker/postCancelOrderUnsigned";
import { postCancelOrder } from "./operations/maker/postCancelOrder";
import { getOrders } from "./operations/taker/getOrders";
import { getOperatorSignature } from "./operations/taker/getOperatorSignature";
import { postCancelAllOrders } from "./operations/maker/postCancelAllOrders";
import { postCancelBatchOrders } from "./operations/maker/postCancelBatchOrders";
import { postFillOrder } from "./operations/taker/postFillOrder";
import { postFillBatchOrders } from "./operations/taker/postFillBatchOrders";

/**
 * GENERAL
 */

    // Check supported LO token pairs on each chain
        // getSupportedPairs();

    // Get the LO contract addresses
        // getContracts();

/**
 * MAKER
 */

    // Create new order
        // postCreateOrderUnsigned();
        // postCreateOrder();

    // Query maker orders
        // getMakerOrders();
        // getMakerActiveAmount();

    // Gasless cancel order
        // postCancelOrderUnsigned();
        // postCancelOrder();

    // Hard cancel order(s)
        // postCancelBatchOrders();
        // postCancelAllOrders();

/**
 * TAKER
 */

    // Get the list of orders for a token pair
        // getOrders();

    // Request for operator signature
        // getOperatorSignature();

    // Fill the order(s)
        // postFillOrder();
        // postFillBatchOrders();