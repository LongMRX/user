import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {environment} from 'src/environments/environment';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoanService} from "../../../service/loan.service";

@Component({
  selector: 'app-modal-payment',
  templateUrl: './modal-payment.component.html',
  styleUrls: ['./modal-payment.component.css']
})
export class ModalPaymentComponent implements OnInit {
  addForm!: FormGroup;
  url: any;
  loan: any;

  constructor(private modalService: NgbModal,
              private router: Router,
              private fb: FormBuilder,
              private loanService: LoanService
  ) {
  }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      note: ['', [Validators.maxLength(255)]],
      proof: ['', [Validators.required]],
    });
    this.loan = JSON.parse(localStorage['loan_amount'])
  }

  closeModal() {
    this.modalService.dismissAll();
  }
  uploadProof(event: any) {
    const file = event.target.files ? event.target.files[0] : '';

    this.addForm.patchValue({
      proof: file
    });
  }
  save() {
    let data = {
      'note': this.addForm.value.note,
      'proof': this.addForm.value.proof,
      'loan_id': this.loan.id
    }

    this.loanService.paymentStore(data).subscribe(res => {
      alert("Thanh toán thành công");
      this.modalService.dismissAll();
        this.loanService.getPayment();
    })
  }
}
