import * as Yup from 'yup';

export const signupValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First Name is too short')
    .max(50, 'First Name is too long')
    .required('First Name is required'),
  
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),

  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
    .required('Mobile number is required'),

  address: Yup.string()
    .min(5, 'Address is too short')
    .required('Address is required'),

  aadharCard: Yup.mixed()
    .required('Aadhaar Card is required')
    .test(
      'fileSize',
      'File size is too large, should be less than 5MB',
      value => value && value.size <= 5242880  // 5MB
    )
    .test(
      'fileType',
      'Only PDF and image files are accepted',
      value => value && ['application/pdf', 'image/jpeg', 'image/png'].includes(value.type)
    ),

  panCard: Yup.mixed()
    .required('PAN Card is required')
    .test(
      'fileSize',
      'File size is too large, should be less than 5MB',
      value => value && value.size <= 5242880  // 5MB
    )
    .test(
      'fileType',
      'Only PDF and image files are accepted',
      value => value && ['application/pdf', 'image/jpeg', 'image/png'].includes(value.type)
    ),
});
