import { Component, inject, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LOAD_WASM, NgxScannerQrcodeComponent, NgxScannerQrcodeModule, ScannerQRCodeConfig, ScannerQRCodeResult} from 'ngx-scanner-qrcode';
import { RecursosService } from '../../../../inventario/recursos/services/recursos.service';
import { BehaviorSubject } from 'rxjs';

LOAD_WASM().subscribe();

@Component({
  selector: 'app-metodo-qr',
  standalone: true,
  imports: [NgxScannerQrcodeModule],
  templateUrl: './metodo-qr.component.html',
  styleUrl: './metodo-qr.component.css'
})
export class MetodoQrComponent {
  
  private router = inject(Router);
  private activateRoute = inject(ActivatedRoute);
  public recursoService = inject(RecursosService)

  @ViewChild('action') scanner!: NgxScannerQrcodeComponent;

  public scannerData = new BehaviorSubject<ScannerQRCodeResult[]>([]);
  public hasCameraPermission = false; 
  public isPermissionChecked = false; 

  public config: ScannerQRCodeConfig = {
    isBeep: false,
    constraints: {
      video: {
        height: 576,
        width: 1024,
      },
      audio: false,
    }
  };

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if(this.scanner.isStart){
      this.scanner.stop();
    }
  }

  ngAfterViewInit(): void {
    this.checkCameraAccess();
  }

  onScanData(event: ScannerQRCodeResult[]) {
    this.scannerData.next(event);
    this.scannerData.subscribe(data => {
      if (data.length > 0) {
        this.scanner.stop();
        const scannedValue = data[0].value;
        const id_categoria = this.activateRoute.snapshot.params['id_categoria'];
        const id_uta = this.activateRoute.snapshot.params['id_uta'];
        const rut_estudiante = scannedValue; 
        this.router.navigate([`/prestamos/regular/${id_categoria}/${id_uta}/${rut_estudiante}`]);
      }
    });
  }

  checkCameraAccess() {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      this.hasCameraPermission = true;
      if (this.scanner.isStart === false) {
      this.scanner.start();
      }
      // Stop the stream after checking permission
      stream.getTracks().forEach(track => track.stop());
    }).catch((error) => {
      console.error('Error al verificar permisos de cámara:', error);
      this.hasCameraPermission = false;
    }).finally(() => {
      this.isPermissionChecked = true;
    });
  }

}
