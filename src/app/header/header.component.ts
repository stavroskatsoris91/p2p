import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShareDataService } from '../share';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.pug',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  newstudents: any;
  active = false;
  students = [{
    id: 1,
    name: 'Krunal',
    enrollmentnumber: 110470116021,
    college: 'VVP Engineering College',
    university: 'GTU'
  },
  {
    id: 2,
    name: 'Rushabh',
    enrollmentnumber: 110470116023,
    college: 'VVP Engineering College',
    university: 'GTU'
  },
  {
    id: 3,
    name: 'Ankit',
    enrollmentnumber: 110470116022,
    college: 'VVP Engineering College',
    university: 'GTU'
  }];
  data: any;
  i = 0;
  j = 0;
  textPromise: any;
  emojiPromise: any;
  ev1: any;
  ev2: any;
  loginObserver = null;
  // loginObservable = null;
  loginPromise = new Promise((resolve, reject) => {
    // this.loginObservable = new Observable((observer) => {
    //   this.loginObserver = observer;
    this.resolver = resolve;
    // }).subscribe(resolve);
  }).then((res) => {
    console.log('hello:' + res);
    return 'hello:' + res;
  });
  loginObservable = new Observable((observer) => {
    this.loginObserver = observer;
  });
  resolver: (value?: unknown) => void;
  private groupedBasket:any = [];
  private groupedBasketRequest = {
		response: this.defer(),
		ready: false,
		request: false,
		get: ()=>{
			if(!this.groupedBasketRequest.ready&&!this.groupedBasketRequest.request){
				this.groupedBasketRequest.response.resolve(0);
				this.groupedBasketRequest.response = this.defer();
			}
			this.groupedBasketRequest.request = true;
			return this.groupedBasketRequest.response.promise;
		},
		set:  (data)=> {
			this.groupedBasket = data;
			this.groupedBasketRequest.ready = true;
			this.groupedBasketRequest.request = false;
			this.groupedBasketRequest.response.resolve(data.length);
		},
		reject:()=>{
			this.groupedBasket = [];
			this.groupedBasketRequest.ready = true;
			this.groupedBasketRequest.request = false;
			this.groupedBasketRequest.response.reject('error');
		}
	}
  constructor(private service: ShareDataService, private Location: Location) {
    this.ev1 = this.service.listen('two', (data) => {
      this.data = data;
      console.log('ONE:' + data);
    });
    this.ev2 = this.service.listen('two', (data) => {

      console.log('TWO:' + data);
    });

    Promise.all([this.loginPromise]).then((values) => {
      console.log(values);
      console.log('promise')
    });

  this.loginObservable.subscribe((data)=>{
    console.log('this is te result:'+data)
  });
  }
  private defer(){
		let promise = {
			resolve:null,
			reject:null,
			promise:null
		};
		promise.promise=new Promise((resolve, reject) => {
			promise.resolve=resolve;
			promise.reject=reject;
		  })
		return promise;
	}
  setData() {
    // this.i++;
    // this.service.trigger('two', 'some value ' + this.i);
    // this.loginObservable.subscribe((data)=>{
    //   console.log('this is te result 2:'+data)
    // });
    // this.resolver('hello');
    this.groupedBasketRequest.get().then((res)=>{
      console.log('get completed');
    }).catch((err)=>{
      console.log('rejected')
    })

  }
  setData2() {
    // this.j++;
    // this.service.trigger('two');
    // this.loginObserver.next('hello mate');
    this.groupedBasketRequest.set(['adsfasdf','ddfff']);
  }
  setData3() {
    // this.j++;
    // this.service.trigger('two');
    // this.loginObserver.next('hello mate');
    this.groupedBasketRequest.reject();
  }
  ngOnInit() {
    this.promise.then(res => {
      console.log(res);
    })
    console.log(this.Location);
  }
  unsubscribe() {
    this.ev1.unsubscribe();
  }
  asyncTask(i) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(i + 1);
      }, 1000);
    }
    )

  }
  async runAsyncTasks() {
    const res1 = await this.asyncTask(0);
    const res2 = await this.asyncTask(res1);
    const res3 = await this.asyncTask(res2);
    return "Everything done"
  }
  myObservable = new Observable(observer => {
    observer.next(this.students);
  });
  promise = new Promise(resolve => {
    this.myObservable.subscribe((data) => {
      resolve(data);
    });
  });
  go() {
    this.runAsyncTasks().then(result => console.log(result));
    console.log(this.newstudents)
  }
  CheckRegUser() {
    return this.myObservable.subscribe((data) => {
      return data;
    });

  }
  public getStudents(): any {
    const studentsObservable = new Observable(observer => {
      setTimeout(() => {
        observer.next(this.students);
      }, 1000);
    });

    return studentsObservable;
  }
}
