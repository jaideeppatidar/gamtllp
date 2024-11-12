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
export const AssetsValidation = Yup.object().shape({
  employeeId: Yup.string().required("Employee ID is required"),
  employeeName: Yup.string().required("Employee Name is required"),
  assetType: Yup.string().required("Asset Type is required"),
  dateGiven: Yup.date().required("Date Given is required").nullable(), // Ensure it's validated as a date
  estimatedValue: Yup.string().required("Estimated Value is required"),
  serialNumber: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Serial Number must be alphanumeric")
    .required("Serial Number is required"),
  insuranceDetails: Yup.string(),
});
export const MeetingShedulValidation = Yup.object().shape({
  meetingType: Yup.string().required("Meeting Type is required"),
  employeeId: Yup.string().required("Employee ID is required"),
  reviewDate: Yup.date().required("Review Date is required"),
  commentsAndNotes: Yup.string().required("Comments are required"),
  nextMeetingDate: Yup.date().required("Next Meeting Date is required"),
  meetingURL: Yup.string()
    .required("Meeting URL is required")
});
export const AddDocumentValidation = Yup.object().shape({
  employeeName: Yup.string().required("Document name is required"),
  employeeId: Yup.string().required("Document name is required"),
  documentType: Yup.string().required("Document name is required"),
  uploadedDate: Yup.date().required("Upload date is required").nullable(),
  uploadStatus: Yup.string().required("Uploaded status is required"),
  documentUrl: Yup.mixed()
    .required("A file is required")
    .test("fileType", "Only PDF, JPEG, and PNG files are allowed", (value) => {
      const validTypes = ["application/pdf", "image/jpeg", "image/png"];
      return value && validTypes.includes(value.type);
    }),
    verifyStatus: Yup.string().required("Status is required"),
});