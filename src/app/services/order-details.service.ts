import { Injectable } from '@angular/core';
import { DeliveryDetails } from '../models/delivery-details';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderDetailsService {
  public orderDetailsList: BehaviorSubject<
    DeliveryDetails[]
  > = new BehaviorSubject<DeliveryDetails[]>([]);
  ordersList: DeliveryDetails[] = [
    {
      orderNumber: 1,
      customerName: 'John',
      itemsName: 'Margherita',
      numberOfItems: 3,
      price: 120,
      totalPrice: 360,
      status: 'Order Received',
      deliveryAddress:
        '54 Site No 42, Kalka Complex, Dda Lsc 1st Floor, Bangalore',
    },
    {
      orderNumber: 2,
      customerName: 'Matthew',
      itemsName: 'Farm House',
      numberOfItems: 3,
      price: 180,
      totalPrice: 540,
      status: 'Order Received',
      deliveryAddress:
        '54 Site No 42, Kalka Complex, Dda Lsc 2nd Floor, Bangalore',
    },
    {
      orderNumber: 3,
      customerName: 'Perry',
      itemsName: 'Farm Veg Extravaganza',
      numberOfItems: 4,
      price: 200,
      totalPrice: 800,
      status: 'Order Received',
      deliveryAddress: 'House No 36,Electronic city phase 2, Bangalore',
    },
    {
      orderNumber: 4,
      customerName: 'Green',
      itemsName: 'Deluxe Veggie',
      numberOfItems: 1,
      price: 180,
      totalPrice: 180,
      status: 'Preparing',
      deliveryAddress:
        'Flat No F602, confidential apartments, sarjapura, Bangalore',
    },
    {
      orderNumber: 5,
      customerName: 'Leblanc',
      itemsName: 'CHEESE N CORN',
      numberOfItems: 2,
      price: 220,
      totalPrice: 440,
      status: 'Order Received',
      deliveryAddress: 'Flat D101, Sriram sygnia, neeladri road, Bangalore',
    },
  ];
  constructor() {}
  /**
   * To mock an http call
   * Changes the value of the subject - orderDetailsList
   * returns the subject orderDetailsList which can be subscribed
   */
  returnOrderDetails() {
    this.orderDetailsList.next(this.ordersList);
    return this.orderDetailsList;
  }
}
