import {Injectable} from '@angular/core';
import {ToastController} from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';

// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';

/*
 Generated class for the Alert provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */

@Injectable()
export class ToastProvider {

    constructor(private toast: ToastController, private translate: TranslateService) {

    }

    showTransactionConfirmed() {
        this.translate.get('ALERT_TRANSACTION_CONFIRMED', {}).subscribe((res: string) => {

            let toast = this.toast.create({
                message: res,
                duration: 3000,
                position: 'bottom'
            });
            toast.present();
        });
    }
}