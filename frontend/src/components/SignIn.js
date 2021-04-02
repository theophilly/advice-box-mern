import React from "react";
import { NavLink } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
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
import { login } from "../store/actions/authActions";

export default function SignIn() {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <NavLink className="navlink" to="/" ref={btnRef} onClick={onOpen}>
        <i className="fas fa-sign-in-alt"></i>
        Sign In
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
            <DrawerHeader>Login to your account</DrawerHeader>

            <DrawerBody>
              <Formik
                initialValues={{
                  userName: "",
                  password: "",
                }}
                validationSchema={Yup.object({
                  userName: Yup.string()
                    .max(15, "Must be 15 characters or less")
                    .required("Username is required"),
                  password: Yup.string()
                    .min(6, "password must be atleast 6 characters")
                    .required("Password is required"),
                })}
                onSubmit={(values, actions) => {
                  // setTimeout(() => {
                  //   alert(JSON.stringify(values, null, 2));
                  //   actions.setSubmitting(false);
                  // }, 1000);

                  dispatch(login(values));
                  actions.setSubmitting(false);
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
                              autocomplete="current-password"
                            />
                            <FormErrorMessage>
                              {props.form.errors.password}
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
                          Sign In
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
