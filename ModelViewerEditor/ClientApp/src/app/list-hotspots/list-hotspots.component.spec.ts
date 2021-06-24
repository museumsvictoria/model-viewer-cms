import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHotspotsComponent } from './list-hotspots.component';

describe('ListHotspotsComponent', () => {
  let component: ListHotspotsComponent;
  let fixture: ComponentFixture<ListHotspotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListHotspotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHotspotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
