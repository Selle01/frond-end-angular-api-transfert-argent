
import {Toast} from "ngx-toast-notifications";
import { Component,Input } from '@angular/core';

@Component({
  selector: 'pkmn-loader',
  template: `
    <div style="padding: 1rem;">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close" (click)="toast.close()">
       <span aria-hidden="true">&times;</span>
      </button>
      <div>{{toast.caption}}</div>
      <div>{{toast.text}}</div>
    </div>

  `
})

export class ToastComponent {
  @Input() toast: Toast;
}
