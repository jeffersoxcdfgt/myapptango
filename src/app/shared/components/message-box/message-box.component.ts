import { Component, OnInit , Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {

  @Input() message: string;
  @Input() urlredirect = '';
  @Input() title = 'Error validation user';
  showAlert = 'none';

  constructor(private router: Router) { }

  ngOnInit(): void { }

  close = () => {
    this.showAlert  = 'none';
    if (this.urlredirect !== ''){
        this.router.navigateByUrl(this.urlredirect);
    }
  }
  open = () =>  {
    this.showAlert = 'block';
  }
}
