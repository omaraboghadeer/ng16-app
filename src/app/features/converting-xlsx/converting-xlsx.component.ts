import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import * as XLSX from 'xlsx';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-converting-xlsx',
  standalone: true,
  imports: [CommonModule, NgFor, HttpClientModule],
  template: `
    <h1 class="text-6xl capitalize mb-4">
      converting xlsx!
    </h1>

    <div class="flex justify-evenly">
      <div>
        <label class="text-lg">Upload XLSX file</label>
        <input type="file" name="xlsx_file" (change)="onFileChange($event)"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          class="block w-full text-sm text-slate-500 file:mr4 file:py-2 file:bottom-0 file:font-semibold
          hover:file:bg-violet-100"
        >
      </div>

      <p class="text-lg">
        or
      </p>

      <button type="button" (click)="fetchXLSXfile()" class="text-white bg-[#22538b] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
        <svg class="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd"/>
        </svg>
        Fetch from API
      </button>
    </div>

    <br>
    
    <table class="sjs-table table-auto border-collapse border border-slate-400 w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <tbody>
        <tr *ngFor="let row of data" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" >
          <td *ngFor="let val of row" class="border border-slate-300">
            {{val}}
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['./converting-xlsx.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConvertingXlsxComponent implements OnInit {

  data: any;
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}
  
  fetchXLSXfile() {
    this.http.get('https://sheetjs.com/pres.xlsx', {responseType: 'arraybuffer'})
    .pipe(
      map(f => {
        const wb = XLSX.read(f, {type: 'buffer'});
        return XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {header: 1})
      })
    )
    .subscribe({
      next: (res: any) => {
        this.data = res;
        this.cdr.detectChanges();
      }
    });
  }

  onFileChange(ev: any) {
    const target = <DataTransfer>(ev.target);
    const reader: FileReader = new FileReader();


    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'buffer' });

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      this.data = XLSX.utils.sheet_to_json(ws, {header: 1});
      this.cdr.detectChanges();
    }

    // reader.readAsBinaryString(target.files[0]);

    reader.readAsArrayBuffer(target.files[0]);

    
  }
}

type AOA = any[][];
