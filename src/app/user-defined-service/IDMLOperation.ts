import {FormGroup} from '@angular/forms';

export interface IDMLOperation {
    delete(form: FormGroup, url: string, headers ?: boolean): any;
    update(form: FormGroup, url: string, headers ?: boolean): any;
    save(form: FormGroup, url: string, headers ?: boolean): any;
    foundByPage(form: FormGroup, url: string, headers ?: boolean): any;
}
