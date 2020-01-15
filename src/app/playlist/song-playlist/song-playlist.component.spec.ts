import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongPlaylistComponent } from './song-playlist.component';

describe('SongPlaylistComponent', () => {
  let component: SongPlaylistComponent;
  let fixture: ComponentFixture<SongPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
