import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { ResetPasswordModule } from './resetpassword.module';

export function main() {
  describe('ResetPassword component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ TestComponent ],
        imports: [ ResetPasswordModule ]
      });
    });

    it(
      'should work',
      async(() => {
        TestBed.compileComponents().then(() => {
          const fixture = TestBed.createComponent(TestComponent);
          const signupDOMEl = fixture.debugElement.children[0].nativeElement;

          expect(signupDOMEl.querySelectorAll('h2')[0].textContent).toEqual(
            'Features'
          );
        });
      })
    );
  });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-resetpassword></sd-resetpassword>'
})
class TestComponent {}
