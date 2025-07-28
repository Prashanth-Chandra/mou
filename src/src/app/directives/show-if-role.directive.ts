import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appShowIfRole]',
    standalone: false
})
export class ShowIfRoleDirective {
  private currentRole: string = '';

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  @Input() set appShowIfRole(requiredRole: string) {
    this.currentRole = requiredRole;
    this.updateView();
  }

  @Input() set appShowIfRoleCurrentRole(currentRole: string) {
    if (this.shouldShow(currentRole)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  private updateView(): void {
    // This will be called when both inputs are set
  }

  private shouldShow(currentRole: string): boolean {
    return this.currentRole === currentRole || this.currentRole === 'any';
  }
}
