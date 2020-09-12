import { Component, OnInit, ViewChild } from '@angular/core';
import { DeliveryDetails } from '../models/delivery-details';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsDialogComponent } from '../dialog/order-details-dialog/order-details-dialog.component';
import { OrderDetails } from '../models/order-model';
import { MatTable } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../messages/snack-bar/snack-bar.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrderDetailsService } from '../services/order-details.service';

@Component({
  selector: 'app-pizza-orders',
  templateUrl: './pizza-orders.component.html',
  styleUrls: ['./pizza-orders.component.scss'],
})
export class PizzaOrdersComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  orderDetails: string[] = [
    'orderNumber',
    'customerName',
    'numberOfItems',
    'totalPrice',
    'status',
    'actions',
  ];
  ordersList: DeliveryDetails[] = [];
  tableDataSourse: any;
  displaySpinner: boolean = false;
  initialLoadIndicatior: boolean = false;
  selectedOrderDetails: OrderDetails;
  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private orderDetailsService: OrderDetailsService
  ) {}

  /**
   * Oninit retrieves order details from order-details service and assigns the same to ordersList property
   */
  ngOnInit(): void {
    this.displaySpinner = true;
    setTimeout(() => {
      this.orderDetailsService
        .returnOrderDetails()
        .subscribe((data: DeliveryDetails[]) => {
          this.ordersList = data;
          this.tableDataSourse = new MatTableDataSource<DeliveryDetails>(
            this.ordersList
          );
          this.displaySpinner = false;
          this.initialLoadIndicatior = true;
          setTimeout(() => {
            this.tableDataSourse.paginator = this.paginator;
          }, 0);
        });
    }, 1000);
  }

  ngAfterViewInit() {}

  /**
   * Retrieves the currently selected row from the table and opens the dialog to display the current order/delivery details
   * @param selectedOrder currently selected row(order) from the table
   */
  displayDeliveryDetails(selectedOrder) {
    this.displaySpinner = true;
    setTimeout(() => {
      this.displaySpinner = false;
      this.selectedOrderDetails = {
        customerName: selectedOrder.customerName,
        itemsName: selectedOrder.itemsName,
        price: selectedOrder.price,
        totalPrice: selectedOrder.totalPrice,
        deliveryAddress: selectedOrder.deliveryAddress,
      };
      this.dialog.open(OrderDetailsDialogComponent, {
        width: '60%',
        data: this.selectedOrderDetails,
      });
    }, 1000);
  }

  /**
   * Changes the status of the selected order
   * Displays snackbar message
   * Calls table.renderRows() to trigger row update in table
   * @param selectedOrder currently selected row(order) from the table
   */
  changeOrderStatus(selectedOrder) {
    const orderListIndex = this.ordersList.findIndex((item) => {
      return item.orderNumber === selectedOrder.orderNumber;
    });
    if (this.ordersList[orderListIndex].status == 'Preparing') {
      this.ordersList[orderListIndex].status = 'Ready To Serve';
    } else {
      this.ordersList[orderListIndex].status = 'Preparing';
    }
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
    });
    this.table.renderRows();
  }
}
