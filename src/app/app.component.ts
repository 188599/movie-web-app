import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <mat-drawer-container class="container" #container>
    <mat-drawer-content>
      <mat-toolbar color="primary">
        <span>{{ title }}</span>
      </mat-toolbar>

      <router-outlet></router-outlet>
    </mat-drawer-content>
  </mat-drawer-container>
`,
  styles: [
    `
    .container {
      width: 100%;
      height: 100%;
    }

    mat-toolbar {
      margin-bottom: 20px;
    }
    `
  ]
})
export class AppComponent {

  title = 'Movies';

}
