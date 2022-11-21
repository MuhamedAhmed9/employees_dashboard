import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeesService } from './../employees.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-emppanel',
  templateUrl: './emppanel.component.html',
  styleUrls: ['./emppanel.component.css'],
})
export class EmppanelComponent implements OnInit, OnDestroy {
  totalEmployees: number = 0;
  image: any;
  departments: Array<any> = ['GIS', 'HR'];
  defaultDepartment: string = 'GIS';
  GISEmps: Array<any> = [];
  HREmps: Array<any> = [];
  subscription: any;
  empForm: any = new FormGroup({
    first_name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    last_name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    department: new FormControl('', [
      Validators.required,
      Validators.pattern('(GIS|HR)'),
    ]),
    image: new FormControl('', []),
  });
  constructor(private _employeesService: EmployeesService) {}

  ngOnInit(): void {
    this.subscription = this._employeesService.getEmployees().subscribe({
      next: (response) => {
        this.totalEmployees = response.GISCount + response.HRCount;
        this.GISEmps = response.GISemployees;
        this.HREmps = response.HRemployees;
      },
    });
  }

  fileChoosen(e: any) {
    const file = e.target.files[0];
    if (file) {
      this.image = file;
    }
  }

  submitForm(e: any) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('first_name', this.empForm.value.first_name);
    formData.append('last_name', this.empForm.value.last_name);
    formData.append('department', this.empForm.value.department);
    if (this.image !== undefined) {
      formData.append('image', this.image, this.image.name);
    }
    if (this.empForm.valid) {
      this._employeesService.addEmployee(formData).subscribe({
        next: (response) => {
          Swal.fire('Success', 'Employee Added', 'success');
          this.empForm.reset();
          this.subscription = this._employeesService.getEmployees().subscribe({
            next: (response) => {
              this.totalEmployees = response.GISCount + response.HRCount;
              this.GISEmps = response.GISemployees;
              this.HREmps = response.HRemployees;
            },
          });
        },
        error: (error) => {
          Swal.fire('Error', 'Employee Not Added', 'error');
        },
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill the form correctly!',
      });
    }
  }

  deleteEmp(id: any) {
    Swal.fire({
      title: 'Do you want to Delete This Employee?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._employeesService.deleteEmployee(id).subscribe({
          next: (response) => {
            this.GISEmps = this.GISEmps.filter((emp: any) => emp._id !== id);
            this.HREmps = this.HREmps.filter((emp: any) => emp._id !== id);
            this.totalEmployees = this.totalEmployees - 1;
          },
          error: (error) => {
            Swal.fire('Error', 'Employee Not Deleted', 'error');
          },
        });
        Swal.fire('Deleted!', '', 'success');
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
