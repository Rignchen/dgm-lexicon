import { ComponentFixture, TestBed } from '@angular/core/testing';
import TagType from '#types/tag';

import { Tag } from './tag';

describe('Tag', () => {
  let component: Tag;
  let fixture: ComponentFixture<Tag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tag]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tag);
    component = fixture.componentInstance;
    component.tag = new TagType('test', '#FF0000');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
