import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from '../../store/useStore';
import Input from '../common/Input';
import Button from '../common/Button';
import { Course } from '../../types';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  credits: Yup.number()
    .required('Credits are required')
    .min(1, 'Credits must be at least 1')
    .max(6, 'Credits cannot exceed 6'),
  teacherId: Yup.string().required('Teacher is required'),
});

interface CourseFormProps {
  onClose: () => void;
  initialValues?: Course;
}

const CourseForm: React.FC<CourseFormProps> = ({ onClose, initialValues }) => {
  const { addCourse, updateCourse, teachers } = useStore();

  const defaultValues: Omit<Course, 'id'> = {
    name: '',
    description: '',
    credits: 3,
    teacherId: '',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {initialValues ? 'Edit Course' : 'Add New Course'}
        </h2>
        
        <Formik
          initialValues={initialValues || defaultValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const course = {
              id: initialValues?.id || uuidv4(),
              ...values,
              credits: Number(values.credits),
            };
            if (initialValues) {
              updateCourse(course);
            } else {
              addCourse(course);
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
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    touched.description && errors.description
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                  rows={3}
                />
                {touched.description && errors.description && (
                  <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                )}
              </div>
              
              <Input
                label="Credits"
                type="number"
                name="credits"
                min={1}
                max={6}
                value={values.credits}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.credits && errors.credits}
              />
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teacher
                </label>
                <select
                  name="teacherId"
                  value={values.teacherId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    touched.teacherId && errors.teacherId
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name} - {teacher.subject}
                    </option>
                  ))}
                </select>
                {touched.teacherId && errors.teacherId && (
                  <p className="mt-1 text-sm text-red-500">{errors.teacherId}</p>
                )}
              </div>
              
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
                  {initialValues ? 'Update' : 'Add'} Course
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CourseForm;