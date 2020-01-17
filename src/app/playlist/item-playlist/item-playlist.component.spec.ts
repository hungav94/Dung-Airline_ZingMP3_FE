import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPlaylistComponent } from './item-playlist.component';

describe('ItemPlaylistComponent', () => {
  let component: ItemPlaylistComponent;
  let fixture: ComponentFixture<ItemPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
