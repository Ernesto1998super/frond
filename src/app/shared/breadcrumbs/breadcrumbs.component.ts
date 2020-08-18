import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;

  constructor( private router: Router, private title: Title, private meta: Meta ) {

    this.getData().subscribe( (data) => {
      console.log(data);
      this.titulo = data;
      title.setTitle( this.titulo );

      const meta: MetaDefinition = {
        name: 'Description',
        content: this.titulo
      };

      this.meta.updateTag( meta );
    });
  }

  ngOnInit() {
  }

  getData() {
    return this.router.events.pipe(
      filter( event => event instanceof ActivationEnd),
      filter( ( event: ActivationEnd ) => event.snapshot.firstChild === null ),
      map( ( event: ActivationEnd) => event.snapshot.data.titulo )
    );
  }

}
