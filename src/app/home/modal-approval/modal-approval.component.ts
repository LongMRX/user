import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LoanService} from "../../service/loan.service";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-approval',
  templateUrl: './modal-approval.component.html',
  styleUrls: ['./modal-approval.component.css']
})
export class ModalApprovalComponent implements OnInit {
  @Input() loanPackage: any;
  url: any;
  constructor(private modalService: NgbModal,
  private loanService: LoanService,
  private router: Router,
  ) { }

  ngOnInit(): void {
  }
  closeModal(id: any) {
    this.loanService.viewed().subscribe();
    this.modalService.dismissAll();
    window.location.href = environment.urlImg + 'read-contract/'+id;
  }
}
