import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Crisis } from '../crisis';
import { CrisisService } from '../../crisis.service';
import { Observable } from 'rxjs';
import {relative} from 'path';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})

export class CrisisDetailComponent implements OnInit {
  @Input() crisis: Crisis;
  crisis$: Observable<Crisis>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CrisisService
  ) { }

  ngOnInit() {
    this.crisis$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getCrisis(params.get('id')))
    );
    this.crisis$.subscribe(crisis => this.crisis = crisis);
  }

  next() {
    this.crisis$ = this.service.getCrisis('' + (this.crisis.id + 1));
    this.crisis$.subscribe(crisis => this.crisis = crisis ? crisis : this.crisis);
  }

  previous() {
    this.crisis$ = this.service.getCrisis('' + (this.crisis.id - 1));
    this.crisis$.subscribe(crisis => this.crisis = crisis ? crisis : this.crisis);
  }

  goToCrises() {
    this.router.navigate(['../', {id: this.crisis.id}], {relativeTo: this.route});
  }
}

