import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from '../../store/useStore';
import Input from '../common/Input';
import Button from '../common/Button';
import { Student } from '../../types';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  grade: Yup.string().required('Grade is required'),
  enrollmentDate: Yup.date().required('Enrollment date is required'),
});

interface StudentFormProps {
  onClose: () => void;
  initialValues?: Student;
}

const StudentForm: React.FC<StudentFormProps> = ({ onClose, initialValues }) => {
  const { addStudent, updateStudent } = useStore();

  const defaultValues: Omit<Student, 'id'> = {
    name: '',
    email: '',
    grade: '',
    enrollmentDate: new Date().toISOString().split('T')[0],
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {initialValues ? 'Edit Student' : 'Add New Student'}
        </h2>
        
        <Formik
          initialValues={initialValues || defaultValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const student = {
              id: initialValues?.id || uuidv4(),
              ...values,
            };
            if (initialValues) {
              updateStudent(student);
            } else {
              addStudent(student);
            }
            setSubmitting(false);
            onClose();
          }}
        >
          {({ isSubmitting, errors, touched, handleChange, handleBlur, values }) => (
            <Form className="space-y-4">
              <Input
                label="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && errors.name}
              />
              
              <Input
                label="Email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email}
              />
              
              <Input
                label="Grade"
                name="grade"
                value={values.grade}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.grade && errors.grade}
              />
              
              <Input
                label="Enrollment Date"
                type="date"
                name="enrollmentDate"
                value={values.enrollmentDate}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.enrollmentDate && errors.enrollmentDate}
              />
              
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                >
                  {initialValues ? 'Update' : 'Add'} Student
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default StudentForm;