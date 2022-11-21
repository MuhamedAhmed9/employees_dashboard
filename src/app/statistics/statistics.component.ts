import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { EmployeesService } from './../employees.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit, OnDestroy {
  // TotalNumberOfEmployees = 0;
  // totalHRS = 10;
  // totalGIS = 50;
  subscription: any;
  data: any = {
    labels: ['GIS', 'HR'],
    datasets: [
      {
        label: 'Employees',
        data: [0, 0],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
        hoverOffset: 4,
      },
    ],
  };
  config: any = {
    type: 'pie',
    data: this.data,
  };

  constructor(private _employeesService: EmployeesService) {}

  ngOnInit(): void {
    this.subscription = this._employeesService.getEmployees().subscribe({
      next: (response) => {
        // this.TotalNumberOfEmployees = response.GISCount + response.HRCount;
        // this.totalGIS = response.GISCount;
        // this.totalHRS = response.HRCount;
        this.data.datasets[0].data = [response.GISCount, response.HRCount];
        new Chart('myChart', this.config);
      },
      error: (error) => {
        new Chart('myChart', this.config);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
