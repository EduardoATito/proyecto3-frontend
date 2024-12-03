import { AfterViewInit, Component, computed, inject, OnInit } from '@angular/core';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { LayoutService } from '../../../../core/layout/layout.service';
import { Chart, registerables, ChartConfiguration } from 'chart.js';
import { animate, style, transition, trigger } from '@angular/animations';
Chart.register(...registerables);
@Component({
    selector: 'app-inicio',
    imports: [SpinnerComponent],
    templateUrl: './inicio.component.html',
    styleUrl: './inicio.component.css',
    animations: [
        trigger('notLoading', [
            transition(':enter', [
                style({ opacity: 0, transform: 'scale(0.5)' }),
                animate('1000ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
            ]),
        ])
    ]
})
export class InicioComponent implements AfterViewInit, OnInit {
  
  ngOnInit() {

  }
 
  
  private layoutService = inject(LayoutService);
  public isMobile = computed(() => this.layoutService.isMobile());
  public chartBar : any;
  public chartPie : any;
  public config : ChartConfiguration = {
    type: 'bar',
    data: {
      labels: ['JAN', 'FEB', 'MAR', 'APRIL'],
      datasets: [
        {
          label: 'Sales',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: '#1D2C4E',
        },
        {
          label: 'Views',
          data: [2, 3, 20, 5, 1, 4],
          backgroundColor: '#447CD9',
        }
      ]
    },
    options: {
      aspectRatio:2.5,
      plugins: {
        title: {
          display: true,
          text: 'Sales and Views',
          font: {
            size: 20,
          }
        }
      }
    },
  };

  public pieChartConfig : ChartConfiguration = {
    type: 'pie',
    data: {
      labels: ['Monitores', 'Teclados', 'Meta Quest', 'Computadores'],
      datasets: [
        {
          label: 'Cantidad',
          data: [12, 19, 3, 5,],
          backgroundColor: ['#6D8BCA', '#1D2C4E','#3B5BA0', '#A2B4DD']
        },
      ]
    },
    options: {
      aspectRatio:1,
      plugins: {
        title: {
          display: true,
          text: 'Cantidad por Categoria',
          font: {
            size: 24,
          }
        },
        legend: {
          position: 'bottom',
        }
      }
    },
  };
 
  ngAfterViewInit(): void {
    this.loadChart();
  }

  loadChart(){
    this.chartPie = new Chart('MyPieChart', this.pieChartConfig);
    this.chartBar = new Chart('MyChart', this.config);
  }
}
