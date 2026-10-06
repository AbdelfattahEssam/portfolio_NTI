import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  socialLinks = [
    { text: 'Twitter', href: 'https://x.com/A_fattah10' },
    { text: 'LinkedIn', href: 'https://www.linkedin.com/in/abdelfattah-essam-abdelfattah-353580313' },
    { text: 'Github', href: 'https://github.com/AbdelfattahEssam' },
  ];
}