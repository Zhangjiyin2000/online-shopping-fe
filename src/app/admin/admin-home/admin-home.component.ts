import { Component, ViewChild } from '@angular/core';
import { AdminStatsComponent } from '../stats/admin-stats/admin-stats.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent {
  @ViewChild(AdminStatsComponent) adminStats?: AdminStatsComponent;

  refreshStats(): void {
    this.adminStats?.refreshStats();
  }
}
