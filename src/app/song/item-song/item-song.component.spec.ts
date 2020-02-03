import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSongComponent } from './item-song.component';

describe('ItemSongComponent', () => {
  let component: ItemSongComponent;
  let fixture: ComponentFixture<ItemSongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
