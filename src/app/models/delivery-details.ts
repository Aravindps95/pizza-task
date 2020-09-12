import { OrderDetails } from './order-model';

/**
 * DeliveryDetails model extends OrderDetails model
 */
export class DeliveryDetails extends OrderDetails {
    orderNumber: number;
    status: string;
    numberOfItems: number;
}
