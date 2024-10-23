import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-element',
  standalone: true,
  imports: [MatIconModule,CommonModule],
  templateUrl: './product-element.component.html',
  styleUrl: './product-element.component.css'
})
export class ProductElementComponent implements OnInit{
  @Input() data:any;
  
  ngOnInit(): void {
      console.log(this.data);
  }
}
