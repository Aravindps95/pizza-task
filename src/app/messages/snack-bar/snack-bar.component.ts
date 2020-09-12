import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styles: [
    `
      .success-message {
        color: hotpink;
      }
    `,
  ],
})
export class SnackBarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
