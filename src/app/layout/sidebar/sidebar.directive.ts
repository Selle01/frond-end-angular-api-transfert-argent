import { ElementRef } from '@angular/core';
import { Directive, Input } from '@angular/core';

@Directive({
  selector:"[rolesAuthorizeAction]"
})
export class SidebarDirective  {
  allowedRoles:string[];
  userRoles =JSON.parse(localStorage.getItem('ROLES'));

  constructor(private el: ElementRef) {}
  @Input()
    set rolesAuthorizeAction(allowedRoles: string[]) {
        this.allowedRoles = allowedRoles;
        if (!this.allowedRoles || this.allowedRoles.length === 0 || !this.userRoles) {
            this.el.nativeElement.remove();
            return;
        }
        const allowed:boolean = this.userRoles.filter(
            role=>this.allowedRoles.includes(role)).length > 0;

        if (!allowed) {
          this.el.nativeElement.remove();
        }
    }

}
