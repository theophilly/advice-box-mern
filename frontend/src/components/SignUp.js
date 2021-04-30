import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  FormControl,
  FormErrorMessage,
  ModalFooter,
  useToast,
} from '@chakra-ui/react';
import { signUp } from '../store/actions/authActions';

export default function SignUp() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const toast = useToast();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.authReducer);

  return (
    <>
      <NavLink className="newnavlink" to="#" ref={btnRef} onClick={onOpen}>
        <i className="fas fa-user-plus"></i>
        Sign Up
      </NavLink>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>

            <DrawerBody>
              <Formik
                initialValues={{
                  userName: '',
                  password: '',
                  confirmPassword: '',
                }}
                validationSchema={Yup.object({
                  userName: Yup.string()
                    .max(15, 'Must be 15 characters or less')
                    .required('Username is Required'),
                  password: Yup.string()
                    .min(6, 'password must be atleast 6 characters')
                    .required('Password is Required'),
                  confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'password must match')
                    .required('Please confirm password 😱'),
                })}
                onSubmit={async (values, actions) => {
                  const { userName, password } = values;

                  await dispatch(signUp({ userName, password }));

                  if (
                    window.store.getState().authReducer.authenticated === true
                  ) {
                    toast({
                      title: 'Account created.',
                      description: "We've created your account for you.",
                      status: 'success',
                      duration: 9000,
                      isClosable: true,
                      position: 'top',
                    });
                    actions.setSubmitting(false);
                    onClose();
                  } else {
                    console.log(state.error);
                    toast({
                      title: 'Error',
                      description: window.store.getState().authReducer.error,
                      status: 'error',
                      duration: 9000,
                      isClosable: true,
                      position: 'top',
                    });
                    actions.setSubmitting(false);
                  }
                }}
              >
                {(formik) => {
                  return (
                    <Form>
                      <Field>
                        {(props) => (
                          <FormControl
                            mb="20px"
                            isInvalid={
                              props.form.errors.userName &&
                              props.form.touched.userName
                            }
                          >
                            <Input
                              {...formik.getFieldProps('userName')}
                              name="userName"
                              id="userName"
                              placeholder="username"
                            />
                            <FormErrorMessage>
                              {props.form.errors.userName}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field>
                        {(props) => (
                          <FormControl
                            mb="20px"
                            isInvalid={
                              props.form.errors.password &&
                              props.form.touched.password
                            }
                          >
                            <Input
                              {...formik.getFieldProps('password')}
                              id="password"
                              name="password"
                              type="password"
                              placeholder="password"
                            />
                            <FormErrorMessage>
                              {props.form.errors.password}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field>
                        {(props) => (
                          <FormControl
                            mb="20px"
                            isInvalid={
                              props.form.errors.confirmPassword &&
                              props.form.touched.confirmPassword
                            }
                          >
                            <Input
                              {...formik.getFieldProps('confirmPassword')}
                              id="confirmPassword"
                              name="confirmPassword"
                              type="password"
                              placeholder="confirm password"
                            />

                            <FormErrorMessage>
                              {props.form.errors.confirmPassword}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <ModalFooter>
                        <Button
                          type="submit"
                          isLoading={formik.isSubmitting}
                          colorScheme="blue"
                          mr={3}
                        >
                          Sign Up
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                      </ModalFooter>
                    </Form>
                  );
                }}
              </Formik>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
