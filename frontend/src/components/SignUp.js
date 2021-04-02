import React from "react";
import { NavLink } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerFooter,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  ModalFooter,
} from "@chakra-ui/react";

export default function SignUp() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <NavLink className="navlink" to="/" ref={btnRef} onClick={onOpen}>
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
                  userName: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={Yup.object({
                  userName: Yup.string()
                    .max(15, "Must be 15 characters or less")
                    .required("Username is Required"),
                  password: Yup.string()
                    .min(6, "password must be atleast 6 characters")
                    .required("Password is Required"),
                  confirmPassword: Yup.string()
                    .oneOf([Yup.ref("password"), null], "password must match")
                    .required("Please confirm password 😱"),
                })}
                onSubmit={(values, actions) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                  }, 1000);
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
                              {...formik.getFieldProps("userName")}
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
                              {...formik.getFieldProps("password")}
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
                              {...formik.getFieldProps("confirmPassword")}
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
