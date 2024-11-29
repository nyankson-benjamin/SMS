import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from '../../store/useStore';
import Input from '../common/Input';
import Button from '../common/Button';
import { Teacher } from '../../types';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  subject: Yup.string().required('Subject is required'),
  department: Yup.string().required('Department is required'),
});

interface TeacherFormProps {
  onClose: () => void;
  initialValues?: Teacher;
}

const TeacherForm: React.FC<TeacherFormProps> = ({ onClose, initialValues }) => {
  const { addTeacher, updateTeacher } = useStore();

  const defaultValues: Omit<Teacher, 'id'> = {
    name: '',
    email: '',
    subject: '',
    department: '',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {initialValues ? 'Edit Teacher' : 'Add New Teacher'}
        </h2>
        
        <Formik
          initialValues={initialValues || defaultValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const teacher = {
              id: initialValues?.id || uuidv4(),
              ...values,
            };
            if (initialValues) {
              updateTeacher(teacher);
            } else {
              addTeacher(teacher);
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
                error={touched.name ? errors.name : ""}
              />
              
              <Input
                label="Email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email ? errors.email : ""}
              />
              
              <Input
                label="Subject"
                name="subject"
                value={values.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.subject ? errors.subject : ""}
              />
              
              <Input
                label="Department"
                name="department"
                value={values.department}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.department ? errors.department :''}
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
                  {initialValues ? 'Update' : 'Add'} Teacher
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TeacherForm;