import { Component, OnInit } from '@angular/core';
import { Crisis } from '../crisis';
import { CrisisService } from '../../crisis.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-crisis-list',
  templateUrl: './crisis-list.component.html',
  styleUrls: ['./crisis-list.component.css']
})
export class CrisisListComponent implements OnInit {
  crises$: Observable<Crisis[]>;
  selectedId: number;

  crises: Crisis[];

  constructor(private crisisService: CrisisService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.crises$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = +params.get('id');
        return this.crisisService.getCrises();
      })
    );
  }

  onSelect(crisis: Crisis): void {
    this.selectedId = crisis.id;
  }

  getCrises(): void {
    this.crisisService.getCrises()
        .subscribe(crises => this.crises = crises);
  }
}

