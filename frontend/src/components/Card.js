import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Wrap,
  Text,
  Flex,
  Avatar,
  Spacer,
  FormControl,
  useDisclosure,
  Input,
  Button,
  Textarea,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormErrorMessage,
  AlertDialog,
  SkeletonCircle,
  SkeletonText,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

export const Card = ({
  image,
  category,
  userName,
  title,
  content,
  name,
  userId,
}) => {
  //Modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  //dispatch and selector
  const { user } = useSelector((state) => state.authReducer);

  //Alert
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const cancelRef = React.useRef();

  //onclose for Alert box
  const alertAffirmation = () => {
    setIsAlertOpen(false);
    onClose();
  };
  const alertRejection = () => {
    setIsAlertOpen(false);
  };

  const selectData = [
    { key: null, value: null },
    { key: 'Programming', value: 'Programming' },
    { key: 'Education', value: 'Education' },
    { key: 'Relationships', value: 'Relationships' },
    { key: 'Life', value: 'Life' },
    { key: 'Finance', value: 'Finance' },
  ];

  const handleDelete = () => {
    const confirm = window.confirm('Are you sure you want to delete this?');
    if (confirm) {
      onClose();
    }
  };

  return content ? (
    <Box
      _hover={{ boxShadow: 'md' }}
      p="20px"
      ml={{ base: '0px', md: '16px' }}
      bg="#F7FAFC"
      boxShadow="sm"
      borderRadius="md"
      mb="10px"
      w={{ base: '100%', md: '360px' }}
      h="175px"
      overflow="hidden"
      className="my-box"
    >
      <Flex cursor="pointer" alignItems="center">
        <Avatar
          mr="5px"
          height="25px"
          width="25px"
          name={userName}
          src={image}
        />
        <Text
          color={() => {
            if (userName === 'Admin') return 'green';
          }}
          fontWeight="bold"
          fontSize="sm"
        >
          {userName}
        </Text>
        <Spacer></Spacer>

        {user
          ? user._id === userId && (
              <EditIcon
                onClick={onOpen}
                sx={{
                  '.my-box:hover &': {
                    display: 'block',
                  },
                }}
                d="none"
                color="#3182CE"
              ></EditIcon>
            )
          : null}
      </Flex>

      <Box
        mt="1"
        fontSize="sm"
        fontWeight="semibold"
        as="h4"
        lineHeight="tight"
        noOfLines={1}
      >
        {title}
      </Box>

      <Box noOfLines={4}>{content}</Box>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Advice</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Formik
              initialValues={{
                title: title,
                category: category,
                content: content,
              }}
              validationSchema={Yup.object({
                title: Yup.string()
                  .max(40, 'Must be 40 characters or less 😱')
                  .required('Title is Required'),
                category: Yup.string().required('category is Required'),
                content: Yup.string()
                  .max(150, 'Must be 150 characters or less')
                  .required('Advice content is Required'),
              })}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  actions.setSubmitting(false);
                }, 1000);
                onClose();
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
                            {...formik.getFieldProps('title')}
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
                            {...formik.getFieldProps('category')}
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
                            {...formik.getFieldProps('content')}
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
                      <DeleteIcon
                        color="red"
                        onClick={() => setIsAlertOpen(true)}
                      />
                      <Spacer />
                      <Button
                        type="submit"
                        isLoading={formik.isSubmitting}
                        colorScheme="blue"
                        mr={3}
                      >
                        Save Changes
                      </Button>
                    </ModalFooter>
                  </Form>
                );
              }}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={setIsAlertOpen}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Advice
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={alertRejection}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={alertAffirmation} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  ) : (
    <Box
      p="20px"
      ml={{ base: '0px', md: '16px' }}
      bg="white"
      boxShadow="sm"
      borderRadius="md"
      mb="10px"
      w={{ base: '100%', md: '360px' }}
      h="175px"
      overflow="hidden"
      className="my-box"
    >
      <SkeletonCircle size="10" />
      <SkeletonText mt="4" noOfLines={4} spacing="4" />
    </Box>
  );
};
