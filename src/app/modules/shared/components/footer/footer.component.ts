import { Component } from '@angular/core';

import {
  faFacebook,
  faInstagramSquare,
  faTwitter,
  faYoutube,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  faFacebook = faFacebook;
  faInstagramSquare = faInstagramSquare;
  faTwitter = faTwitter;
  faYoutube = faYoutube;
  faGithub = faGithub;

  constructor() {}
}
