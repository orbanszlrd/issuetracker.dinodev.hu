import { SanitizeHtmlPipe } from "./sanitize-html.pipe";
import { BrowserModule, DomSanitizer } from "@angular/platform-browser";
import { inject, TestBed } from "@angular/core/testing";

describe("SanitizeHtmlPipe", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule],
    });
  });

  it("create an instance", inject(
    [DomSanitizer],
    (domSanitizer: DomSanitizer) => {
      const pipe = new SanitizeHtmlPipe(domSanitizer);
      expect(pipe).toBeTruthy();
    }
  ));
});
