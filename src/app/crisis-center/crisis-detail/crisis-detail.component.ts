import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Crisis } from '../crisis';
import { CrisisService } from '../../crisis.service';
import { Observable } from 'rxjs';
import {DialogService} from '../../dialog.service';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})

export class CrisisDetailComponent implements OnInit {
  @Input() crisis: Crisis;
  crisis$: Observable<Crisis>;
  editName: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CrisisService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.crisis$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getCrisis(params.get('id')))
    );
    this.crisis$.subscribe(crisis => {
      this.crisis = crisis;
      this.editName = crisis.name;
    });
  }

  next() {
    this.crisis$ = this.service.getCrisis('' + (this.crisis.id + 1));
    this.crisis$.subscribe(crisis => {
      if (crisis) {this.router.navigate(['../', crisis.id], {relativeTo: this.route});
      }});
  }

  previous() {
    this.crisis$ = this.service.getCrisis('' + (this.crisis.id - 1));
    this.crisis$.subscribe(crisis => {
      if (crisis) {this.router.navigate(['../', crisis.id], {relativeTo: this.route});
      }});
  }

  goToCrises() {
    this.router.navigate(['../', {id: this.crisis.id}], {relativeTo: this.route});
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (!this.crisis || this.crisis.name === this.editName) { return true; }
    return this.dialogService.confirm('Discard changes?');
  }

  save() {
    this.crisis.name = this.editName;
    this.goToCrises();
  }
}

