import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/m-core/models/object-model';
import { UserService } from 'src/app/m-shared/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfileForm!: FormGroup;
  isEditMode: boolean = false;
  userData!: User;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadUserData();
  }

  initializeForm(): void {
    this.userProfileForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      age: ['', [Validators.required, Validators.min(18)]],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      aboutYou: ['', Validators.maxLength(500)],
      addLine1: [''],
      city: [''],
      state: [''],
      language: [[]]
    });
  }

  loadUserData(): void {
    const user_id = Number(sessionStorage.getItem('user_session_id'));
    if (!user_id) {
      console.error('No user ID found in session storage');
      return;
    }

    this.userService.getUserData(user_id).subscribe(
      (data: User) => {
        this.userData = data;
        this.populateForm(data);
      },
      (error: any) => {
        console.error('Error loading user data', error);
      }
    );
  }

  populateForm(user: User): void {
    this.userProfileForm.patchValue({
      name: user.name,
      mobNumber: user.mobNumber,
      age: user.age,
      dob: user.dob,
      email: user.email,
      gender: user.gender,
      aboutYou: user.aboutYou,
      addLine1: user.address?.addLine1,
      city: user.address?.city,
      state: user.address?.state,
      language: user.language || []
    });
  }

  toggleEdit(): void {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.populateForm(this.userData);
    }
  }

  updateProfile(): void {
    if (this.userProfileForm.invalid) {
      this.markFormGroupTouched(this.userProfileForm);
      return;
    }

    const updatedData: User = {
      ...this.userData,
      ...this.userProfileForm.value,
      address: {
        ...this.userData.address,
        addLine1: this.userProfileForm.value.addLine1,
        city: this.userProfileForm.value.city,
        state: this.userProfileForm.value.state
      }
    };

    const user_id = Number(sessionStorage.getItem('user_session_id'));
    this.userService.updateUserData(user_id, updatedData).subscribe(
      (response: any) => {
        alert('Profile updated successfully!');
        this.userData = response;
        this.isEditMode = false;
      },
      (error: any) => {
        console.error('Error updating profile', error);
        alert('Error updating profile. Please try again.');
      }
    );
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}