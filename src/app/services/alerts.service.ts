import { Injectable, EventEmitter } from '@angular/core';
import { AlertConfiguration } from 'src/app/models/alert.model';

@Injectable({
    providedIn: 'root'
})
export class AlertsService {

    alerts: EventEmitter<any>;
    autoClose: boolean;

    constructor() {
        this.alerts = new EventEmitter();
        this.autoClose = true;
    }

    listenerAlerts(): EventEmitter<any> {
        return this.alerts;
    }

    showAlert(title: string, message: string, isSuccess = true, centered = false, autoClose = this.autoClose) {
        const alertConfiguration: AlertConfiguration = {
            'title': title,
            'message': message,
            'isSuccess': isSuccess,
            'centered': centered,
            'autoClose': autoClose
        };
        this.alerts.emit(alertConfiguration);
    }

    showAlertSuccess(title: string, message: string, centered = false, autoClose = this.autoClose) {
        const alertConfiguration: AlertConfiguration = {
            'title': title,
            'message': message,
            'isSuccess': true,
            'centered': centered,
            'autoClose': autoClose
        };
        this.alerts.emit(alertConfiguration);
    }

    showAlertError(title: string, message: string, centered = false, autoClose = this.autoClose) {
        const alertConfiguration: AlertConfiguration = {
            'title': title,
            'message': message,
            'isSuccess': false,
            'centered': centered,
            'autoClose': autoClose
        };
        this.alerts.emit(alertConfiguration);
    }

    showAlertSuccessDefault(centered = false, autoClose = this.autoClose) {
        const alertConfiguration: AlertConfiguration = {
            'title': 'Operación realizada con éxito',
            'message': 'Tu solicitud fue procesada satisfactoriamente.',
            'isSuccess': false,
            'centered': centered,
            'autoClose': autoClose
        };
        this.alerts.emit(alertConfiguration);
    }

    showAlertErrorDefault(centered = false, autoClose = this.autoClose) {
        const alertConfiguration: AlertConfiguration = {
            'title': 'Algo salio mal',
            'message': 'No pudimos realizar esta acción, por favor intenta más tarde.',
            'isSuccess': false,
            'centered': centered,
            'autoClose': autoClose
        };
        this.alerts.emit(alertConfiguration);
    }

    showAlertCentered(title: string, message: string, isSuccess = true, autoClose = this.autoClose) {
        const alertConfiguration: AlertConfiguration = {
            'title': title,
            'message': message,
            'isSuccess': isSuccess,
            'centered': true,
            'autoClose': autoClose
        };
        this.alerts.emit(alertConfiguration);
    }
}
