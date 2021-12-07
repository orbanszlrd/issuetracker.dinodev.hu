import { SanitizeHtmlPipe } from './sanitize-html.pipe';
import {
  BrowserModule,
  DomSanitizer,
  SafeHtml,
} from '@angular/platform-browser';
import { inject, TestBed } from '@angular/core/testing';

describe('SanitizeHtmlPipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule],
    });
  });

  it('create an instance', inject(
    [DomSanitizer],
    (domSanitizer: DomSanitizer) => {
      const pipe = new SanitizeHtmlPipe(domSanitizer);
      expect(pipe).toBeTruthy();
    }
  ));

  it('sould return a SafeHtml', inject(
    [DomSanitizer],
    (domSanitizer: DomSanitizer) => {
      const pipe = new SanitizeHtmlPipe(domSanitizer);
      const html = '<h1>Test</h1><script>alert(1)</script>';

      const safeHtml: SafeHtml = pipe.transform(html);

      expect(safeHtml).toBeTruthy();
    }
  ));
});
