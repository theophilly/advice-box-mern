import * as React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { AddIcon } from "@chakra-ui/icons";
import {
  FormControl,
  useDisclosure,
  Box,
  Input,
  Textarea,
  Select,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormErrorMessage,
} from "@chakra-ui/react";

export default function Board() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const selectData = [
    { key: null, value: null },
    { key: "programming", value: "programming" },
    { key: "education", value: "education" },
    { key: "relationship", value: "relationship" },
    { key: "life", value: "life" },
  ];

  return (
    <div>
      <Box
        h="12vh"
        padding={{ base: "10px", xl: "0px calc((100vw - 1200px) / 2)" }}
      >
        <Box mt="20px" minW="30%">
          <Box display="flex">
            <Button onClick={onOpen} leftIcon={<AddIcon />} colorScheme="blue">
              Add Advice
            </Button>
          </Box>
        </Box>
      </Box>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Drop an Advice</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Formik
              initialValues={{
                title: "",
                category: "",
                content: "",
              }}
              validationSchema={Yup.object({
                title: Yup.string()
                  .max(40, "Must be 40 characters or less 😱")
                  .required("Title is Required"),
                category: Yup.string().required("category is Required"),
                content: Yup.string()
                  .max(150, "Must be 150 characters or less")
                  .required("Advice content is Required"),
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
                          isInvalid={
                            props.form.errors.title && props.form.touched.title
                          }
                        >
                          <Input
                            {...formik.getFieldProps("title")}
                            name="title"
                            id="title"
                            placeholder="Title"
                          />
                          <FormErrorMessage>
                            {props.form.errors.title}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field>
                      {(props) => (
                        <FormControl
                          isInvalid={
                            props.form.errors.category &&
                            props.form.touched.category
                          }
                          mt={4}
                        >
                          <Select
                            {...formik.getFieldProps("category")}
                            name="category"
                            id="catagory"
                            mb="6px"
                          >
                            {selectData.map((item) => (
                              <option key={item.key} value={item.value}>
                                {item.key}
                              </option>
                            ))}
                          </Select>
                          <FormErrorMessage>
                            {props.form.errors.category}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field>
                      {(props) => (
                        <FormControl
                          isInvalid={
                            props.form.errors.content &&
                            props.form.touched.content
                          }
                          mt={4}
                        >
                          <Textarea
                            {...formik.getFieldProps("content")}
                            id="content"
                            name="content"
                            height="120px"
                            maxH="200px"
                            placeholder="Advice us already"
                          ></Textarea>
                          <FormErrorMessage>
                            {props.form.errors.content}
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
                        Give Advice
                      </Button>
                      <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                  </Form>
                );
              }}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

{
  /* <Box display="flex" justifyContent="flex-end" minW="70%">
          <Box px="50px" py="30px" bg="#dbf9ea" width="60%">
            <Text
              color="#288855"
              fontWeight="bold"
              fontFamily="font-family: 'Inter', sans-serif"
            >
              A litle About this App
            </Text>
            <OrderedList mt="20px">
              <ListItem>
                Lorem ipsum dolor sit ametClick on login Use the "Forgot
                Password"
              </ListItem>
              <ListItem>Consectetur adipiscing elitOption Enter</ListItem>
              <ListItem>
                Integer moles and follow the instructions to reset your ptie
                lorem at massa
              </ListItem>
              <ListItem>
                Facilisis in pretium nisword, please login to update your recl
                aliquet
              </ListItem>
            </OrderedList>
          </Box>
        </Box> */
}
