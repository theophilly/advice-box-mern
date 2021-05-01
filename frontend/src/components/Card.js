import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import {
  Box,
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
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { updateAdvice, deleteAdvice } from '../store/actions/postActions';

export const Card = ({
  image,
  category,
  userName,
  title,
  content,
  name,
  userId,
  _id,
}) => {
  //Modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  //Toast
  const toast = useToast();

  //dispatch and selector
  const {
    authReducer: { user },
    postReducer: { loading },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  //Alert
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);

  //profile
  const [profile, setProfile] = React.useState({
    userName: null,
    about: null,
    profilePicture: null,
  });
  React.useEffect(() => {
    if (userName) {
      const getUser = async (userName) => {
        let fecthedUser = await axios.get(`/api/user/getuser/${userName}`);
        return fecthedUser;
      };
      getUser(userName).then(({ data: { user } }) => setProfile({ ...user }));
    }
  }, [userName]);

  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const cancelRef = React.useRef();

  //onclose for Alert box
  const alertAffirmation = async () => {
    try {
      await dispatch(deleteAdvice(_id));
      setIsAlertOpen(false);
      onClose();
      toast({
        title: 'success',
        description: 'Advice Deleted',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      setIsAlertOpen(false);
      onClose();
      toast({
        title: 'Check',
        description: 'session expired, login again',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
    }
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
      <Flex alignItems="center">
        <Link to={`/dashboard/${userName}`}>
          <Flex cursor="pointer" alignItems="center">
            <Avatar
              mr="5px"
              height="25px"
              width="25px"
              name={userName}
              src={`/${profile.profilePicture}`}
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
          </Flex>
        </Link>
        <Spacer></Spacer>

        {user
          ? user._id === userId && (
              <EditIcon
                onClick={onOpen}
                sx={{
                  '.my-box:hover &': {
                    display: 'block',
                  },
                  '@media only screen and (max-width: 400px) ': {
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
              onSubmit={async (values, actions) => {
                try {
                  await dispatch(updateAdvice({ ...values, _id }));
                  actions.setSubmitting(false);
                  onClose();
                  toast({
                    title: 'success',
                    description: 'advice updated successfully',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: 'top',
                  });
                } catch (error) {
                  actions.setSubmitting(false);
                  onClose();
                  toast({
                    title: 'Check',
                    description: 'session expired, login again',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    position: 'top',
                  });
                }
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
              <Button
                isLoading={loading}
                colorScheme="red"
                onClick={alertAffirmation}
                ml={3}
              >
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
