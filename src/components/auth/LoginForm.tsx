import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '../common/Input';
import Button from '../common/Button';
import { useUser } from '../../store/useUser';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});



const LoginForm: React.FC = () => {
  const { setUser } = useUser();
const navigate = useNavigate()
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setUser({...values, name:"Miles"});
            navigate("/")
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, errors, touched, handleChange, handleBlur, values }) => (
            <Form className="space-y-4">
              <Input
                label="Email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email ? errors.email :""}
              />
              
              <Input
                label="Password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password ? errors.password :""}
              />
              
              <div className="flex justify-end gap-2">
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                >
                  Login
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm; 