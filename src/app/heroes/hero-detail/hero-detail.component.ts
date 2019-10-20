import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../../hero.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  hero$: Observable<Hero>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HeroService
  ) { }

  ngOnInit() {
    this.hero$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getHero(params.get('id')))
    );
    this.hero$.subscribe(hero => this.hero = hero);
  }

  next() {
    this.hero$ = this.service.getHero('' + (this.hero.id + 1));
    this.hero$.subscribe(hero => this.hero = hero ? hero : this.hero);
  }

  previous() {
    this.hero$ = this.service.getHero('' + (this.hero.id - 1));
    this.hero$.subscribe(hero => this.hero = hero ? hero : this.hero);
  }

  goToHeroes() {
    this.router.navigate(['/heroes', {id: this.hero.id}]);
  }
}

