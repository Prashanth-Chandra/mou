import { Component } from '@angular/core';
import { ApiIntegrationService } from '../../services/api-integration.service';

@Component({
  selector: 'app-api-settings',
  templateUrl: './api-settings.component.html',
  styleUrls: ['./api-settings.component.css']
})
export class ApiSettingsComponent {
  
  constructor(private apiService: ApiIntegrationService) { }

  enableApiMode(): void {
    this.apiService.enableApiMode();
  }

  disableApiMode(): void {
    this.apiService.disableApiMode();
  }

  isApiModeEnabled(): boolean {
    return this.apiService.isApiModeEnabled();
  }

  getApiConfig() {
    return this.apiService.getApiConfig();
  }
}
