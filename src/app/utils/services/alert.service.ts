import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  constructor(private toast: ToastrService) {
  }

  private _toastrOptions: any = {
    closeButton: false,
    debug: false,
    newestOnTop: true,
    progressBar: false,
    timeOut: "3500",
    showMethod: "fadeIn",
    hideMethod: "fadeOut"
  };

  public showSuccess(text: string, title?: string): void {
    this.toast.success(text, title, this._toastrOptions);
  }

  public showWarning(text: string, title?: string): void {
    this.toast.warning(text, title, this._toastrOptions);
  }

  public showInformation(text: string, title?: string): void {
    const infoOptions = {...this._toastrOptions};
    infoOptions.timeOut = '5000';
    this.toast.info(text, title, infoOptions);
  }

  public showError(text: string, title?: string): void {
    const errorOptions = {...this._toastrOptions};
    errorOptions.timeOut = 0;
    errorOptions.extendedTimeOut = 0;
    errorOptions.closeButton = true;
    this.toast.error(text, title, errorOptions);
  }
}
