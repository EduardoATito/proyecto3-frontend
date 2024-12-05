import { AfterViewInit, Component, computed, effect, inject, OnInit, signal, ViewChild } from '@angular/core';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { LayoutService } from '../../../../core/layout/layout.service';
import { Chart, registerables, ChartConfiguration } from 'chart.js';
import { animate, style, transition, trigger } from '@angular/animations';
import { EstadisticasService } from '../../services/estadisticas.service';
import { BaseChartDirective } from 'ng2-charts';

Chart.register(...registerables);
@Component({
  selector: 'app-inicio',
  imports: [SpinnerComponent, BaseChartDirective],
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
export class InicioComponent implements OnInit {
   
  private layoutService = inject(LayoutService);
  public isMobile = computed(() => this.layoutService.isMobile());
  private staditcsService = inject(EstadisticasService);


  public reucursosPorCategoria = signal<{categoria: string, cantidad: number}[]>([]);
  public pieChartConfig : ChartConfiguration = {
    type: 'pie',
    data: {
      labels: ['Categoria 1', 'Categoria 2', 'Categoria 3', 'Categoria 4'],
      datasets: [
        {
          label: 'Cantidad',
          data: [12, 19, 3, 5,],
          backgroundColor: ['#6D8BCA', '#1D2C4E','#3B5BA0', '#A2B4DD']
        },
      ]
    },
    options: {
      aspectRatio:2,
      plugins: {
        title: {
          display: true,
          text: 'Cantidad por Categoria',
          font: {
            size: 24,
          }
        },
        legend: {
          position:'left',
          labels: {
            font: {
              size: 24,
            }
          }
        }
      }
    },
  };

  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;
  
  public loadingDatos = signal<boolean>(true);
  public cantidadRecurso = signal<number>(0);
  public cantidadEstudiantes = signal<number>(0);
  public cantidadCategorias = signal<number>(0);
 
  ngOnInit() {
    this.setDatos()
  }

  setDatos(){
    this.staditcsService.getCantidadRecursos().subscribe((res) => {
      this.cantidadRecurso.set(res.count);
      this.staditcsService.getCantidadEstudiantes().subscribe((res) => {
        this.cantidadEstudiantes.set(res.count); 
        this.staditcsService.getCantidadCategorias().subscribe((res) => {
          console.log(res);
          this.cantidadCategorias.set(res.count);
          
          this.staditcsService.getCantidadRecursosPorCategoria().subscribe((res) => {
            this.reucursosPorCategoria.set(res);
            this.pieChartConfig.data.labels = res.map((r : any) => r.categoria);
            this.pieChartConfig.data.datasets[0].data = res.map((r:any) => r.cantidad);
            this.loadingDatos.set(false);
          });
        });
      });
    });
  }


}
