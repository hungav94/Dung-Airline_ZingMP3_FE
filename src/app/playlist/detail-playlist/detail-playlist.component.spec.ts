import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPlaylistComponent } from './detail-playlist.component';

describe('DetailPlaylistComponent', () => {
  let component: DetailPlaylistComponent;
  let fixture: ComponentFixture<DetailPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
