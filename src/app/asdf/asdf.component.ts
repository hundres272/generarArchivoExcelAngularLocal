import { Component, Input, OnInit } from '@angular/core';
import { utils, write, WorkBook } from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-asdf',
  templateUrl: './asdf.component.html',
  styleUrls: ['./asdf.component.css']
})
export class AsdfComponent implements OnInit {
  @Input() data;
  // table = [
  //   {
  //     First: 'one',
  //     Second: 'two',
  //     Third: 'three',
  //     Forth: 'four',
  //     Fifth: 'five'
  //   },
  //   {
  //     First: 'un',
  //     Second: 'deux',
  //     Third: 'trois',
  //     Forth: 'quatre',
  //     Fifth: 'cinq'
  //   },
  // ];
  constructor() { }

  ngOnInit(): void {
    console.log(this.data);
    
  }

  prueba() {
    const ws_name = 'SomeSheet';
    const wb: WorkBook = { SheetNames: [], Sheets: {} };
    const ws: any = utils.json_to_sheet(this.data);
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;
    const wbout = write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

    function s2ab(s) {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
      };
      return buf;
    }

    saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'exported.xlsx');
  }

}
