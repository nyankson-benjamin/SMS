import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from '../../store/useStore';
import Input from '../common/Input';
import Button from '../common/Button';
import { Department } from '../../types';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  headTeacherId: Yup.string().required('Head Teacher is required'),
});

interface DepartmentFormProps {
  onClose: () => void;
  initialValues?: Department;
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({ onClose, initialValues }) => {
  const { addDepartment, updateDepartment, teachers } = useStore();

  const defaultValues: Omit<Department, 'id'> = {
    name: '',
    description: '',
    headTeacherId: '',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {initialValues ? 'Edit Department' : 'Add New Department'}
        </h2>
        
        <Formik
          initialValues={initialValues || defaultValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const department = {
              id: initialValues?.id || uuidv4(),
              ...values,
            };
            if (initialValues) {
              updateDepartment(department);
            } else {
              addDepartment(department);
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
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Head Teacher
                </label>
                <select
                  name="headTeacherId"
                  value={values.headTeacherId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    touched.headTeacherId && errors.headTeacherId
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a head teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name} - {teacher.subject}
                    </option>
                  ))}
                </select>
                {touched.headTeacherId && errors.headTeacherId && (
                  <p className="mt-1 text-sm text-red-500">{errors.headTeacherId}</p>
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
                  {initialValues ? 'Update' : 'Add'} Department
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DepartmentForm;