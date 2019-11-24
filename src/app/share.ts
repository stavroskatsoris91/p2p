import { Injectable, Inject } from '@angular/core';
import { Observable,Subject } from 'rxjs';
@Injectable()
// export class ShareDataService {
//     data: any;
//     dataChange: Observable<any>;
//     dataChangeObserver: any;
//     constructor() {
//       this.dataChange = new Observable((observer)=> {
//         this.dataChangeObserver = observer;
//       });
//     }

//     setData(data:any) {
//       this.data = data;
//       this.dataChangeObserver.next(this.data);
//     }
//   }
export class ShareDataService {
  destroy(arg0: string) {
    throw new Error("Method not implemented.");
  }
    list: any = {};
    dataChange: Observable<any>;
    dataChangeObserver: any;
    constructor() {
        // for (let key in this.list) {

        //     this.list[key].dataChange = new Observable((observer) => {
        //         this.list[key].dataChangeObserver = observer;
        //     });
        // }
        //   this.dataChange = new Observable((observer)=> {
        //     this.dataChangeObserver = observer;
        //   });
    }
    listen(name,method){
        if(!this.list.hasOwnProperty(name)){
            this.list[name] = {};
            // this.list[name].dataChange = new Observable((observer) => {
            //     this.list[name].dataChangeObserver = observer;
            // });
            this.list[name].subject = new Subject();
        }
        // return this.list[name].dataChange.subscribe(method);
        return this.list[name].subject.subscribe(method);
    }
    trigger(name: string, data?: any) {
        if(!this.list.hasOwnProperty(name)){
            this.list[name] = {};
            // this.list[name].dataChange = new Observable((observer) => {
            //     this.list[name].dataChangeObserver = observer;
            // });
            this.list[name].subject = new Subject();

        }
        this.list[name].data = data;
        // this.list[name].dataChangeObserver.next(this.list[name].data);
        this.list[name].subject.next(this.list[name].data);
        
    }
}