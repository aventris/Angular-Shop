import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss'],
})
export class PaypalComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement!: ElementRef;
  @Output() closeWindow = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {
    this.initPaypal();
  }

  initPaypal() {
    window.paypal
      .Buttons(
        paypal.Buttons({
          // Set up the transaction
          createOrder: function (data: any, actions: any) {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: '88.44',
                  },
                },
              ],
            });
          },

          // Finalize the transaction
          onApprove: function (data: any, actions: any) {
            return actions.order.capture().then(function (orderData: any) {
              // Successful capture! For demo purposes:
              console.log(
                'Capture result',
                orderData,
                JSON.stringify(orderData, null, 2)
              );
              var transaction =
                orderData.purchase_units[0].payments.captures[0];
            });
          },
        })
      )
      .render('#paypal-button-container');
  }

  onCloseWindow() {
    this.closeWindow.emit(false);
  }
}
