import {Component, OnInit, Input, ViewChild} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoanService } from 'src/app/service/loan.service';

@Component({
  selector: 'app-model-zoom-image',
  templateUrl: './model-zoom-image.component.html',
  styleUrls: ['./model-zoom-image.component.css']
})
export class ModelZoomImageComponent implements OnInit {
  @Input() zoomedImage: any;

  constructor(private modalService: NgbModal,
    private loanService: LoanService) { }

    ngOnInit(): void {
    }
    closeModal() {
      this.modalService.dismissAll();
    }

}
