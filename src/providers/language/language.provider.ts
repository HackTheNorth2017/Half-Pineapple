import {Injectable} from '@angular/core';
import {TranslateService } from '@ngx-translate/core';

// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';

/*
 Generated class for the Alert provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */

@Injectable()
export class LanguageProvider {
    defaultLanguage: string;
    constructor(private translateService: TranslateService) {
        this.defaultLanguage = 'en';
    }

   setLanguage(){
       this.translateService.use(this.defaultLanguage);
   }
}