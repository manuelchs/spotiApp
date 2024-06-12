import { Component } from '@angular/core';
import { AlertsService } from 'src/app/services/alerts.service';
import { AlertConfiguration } from 'src/app/models/alert.model';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})

export class AlertComponent {

    alertsStack: AlertConfiguration[] = [];

    constructor(private alerts: AlertsService) {
        this.alerts.listenerAlerts().subscribe((alert: AlertConfiguration) => {
            this.alertsStack.push(alert);
            if (alert.autoClose) {
                this.autoclose(this.alertsStack.length - 1);
            }
        });
    }

    autoclose(index: number): void {
        setTimeout(() => {
            this.closeAlert(index);
        }, 7000);
    }

    closeAlert(index: number): void {
        this.alertsStack.splice(index, 1);
    }
}
