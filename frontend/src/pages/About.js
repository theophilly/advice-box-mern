import * as React from 'react';
import Layout from '../components/layout';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Image,
  Flex,
  Box,
  Text,
  Icon,
  Tag,
  Button,
  useDisclosure,
  useToast,
  Link,
  FormErrorMessage,
  FormControl,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { FaFacebookF, FaGithub, FaTwitter, FaPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { sendMail } from '../store/actions/postActions';

export default function About() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const toast = useToast();

  return (
    <Layout>
      <Flex
        sx={{
          '@media only screen and (max-width: 750px) ': {
            flexDirection: 'column',
          },
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          pl="2rem"
        >
          <Image
            borderRadius="50%"
            h="350px"
            w="370px"
            src="/kolade.png"
          ></Image>

          <Text
            fontWeight="700"
            fontSize="1.2rem"
            fontFamily="Mulish, sans-serif"
          >
            Adeyemi Kolade
          </Text>
          <Flex>
            <Box
              d="flex"
              justifyContent="center"
              alignItems="center"
              h="60px"
              w="60px"
              bgSize="contain"
              bgImage="url('/1.svg')"
            >
              <Link href="https://web.facebook.com/iceprince.hkn" isExternal>
                <Icon color="white" as={FaFacebookF} />
              </Link>
            </Box>
            <Box
              d="flex"
              justifyContent="center"
              alignItems="center"
              h="60px"
              w="60px"
              bgSize="contain"
              bgImage="url('/2.svg')"
            >
              <Link href="https://github.com/theophilly" isExternal>
                <Icon color="white" as={FaGithub} />
              </Link>
            </Box>
            <Box
              d="flex"
              justifyContent="center"
              alignItems="center"
              h="60px"
              w="60px"
              bgSize="contain"
              bgImage="url('/3.svg')"
            >
              <Link href="https://twitter.com/theodasa" isExternal>
                <Icon color="white" as={FaTwitter} />
              </Link>
            </Box>
          </Flex>
        </Box>
        <Box padding="50px 20px 0px" flex="1">
          <Box>
            <Text
              fontWeight="500"
              fontSize="1.4rem"
              fontFamily="Poppins, sans-serif"
            >
              About Project
            </Text>
            <Text
              mt="10px"
              w="60%"
              sx={{
                '@media only screen and (max-width: 1000px) ': {
                  width: '100%',
                },
              }}
            >
              Advice Box is one of my side projects. It has React with Chakra UI
              on the frontend, node express on the backend, and state management
              with Redux
            </Text>
          </Box>
          <Box>
            <Text
              fontWeight="500"
              fontSize="1.4rem"
              fontFamily="Poppins, sans-serif"
              mt="20px"
            >
              About Me
            </Text>
            <Text
              mt="10px"
              w="60%"
              sx={{
                '@media only screen and (max-width: 1000px) ': {
                  width: '100%',
                },
              }}
            >
              I am a junior M.E.R.N stack developer from Nigeria currently
              looking for my first opportunity, I am open to onsite or remote
              positions. I am very hardworking, an avid learner and easy to work
              with. Below are some of the tools I have worked with:
            </Text>
            <Box d="flex" flexWrap="wrap" mt={2}>
              {[
                'React',
                'Redux',
                'Node',
                'Sass',
                'Express',
                'Chakra UI',
                'React Native',
                'Git',
              ].map((item, i) => (
                <Tag colorScheme="blue" key={i} mt={1} ml={2}>
                  {item}
                </Tag>
              ))}
            </Box>
          </Box>
          <Box>
            <Text
              fontWeight="500"
              fontSize="1.4rem"
              fontFamily="Poppins, sans-serif"
              mt={3}
              mb={3}
            >
              Contact Me
            </Text>
            <Button
              onClick={onOpen}
              size="sm"
              colorScheme="blue"
              leftIcon={<FaPlus />}
            >
              Send Direct Message
            </Button>
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
            <ModalHeader>Message</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Formik
                initialValues={{
                  subject: '',
                  email: '',
                  content: '',
                }}
                validationSchema={Yup.object({
                  subject: Yup.string()
                    .max(40, 'Must be 40 characters or less 😱')
                    .required('Subject is Required'),
                  email: Yup.string().email().required('provide a valid email'),
                  content: Yup.string()
                    .max(150, 'Must be 150 characters or less')
                    .required('Body content is Required'),
                })}
                onSubmit={async (values, actions) => {
                  try {
                    await dispatch(sendMail({ ...values }));

                    if (window.store.getState().postReducer.mailSent === true) {
                      toast({
                        title: 'success',
                        description: window.store.getState().postReducer
                          .message,
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                        position: 'top',
                      });
                      actions.setSubmitting(false);
                      onClose();
                    } else {
                      toast({
                        title: 'error',
                        description: window.store.getState().postReducer
                          .message,
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                        position: 'top',
                      });
                      actions.setSubmitting(false);
                      onClose();
                    }
                    actions.setSubmitting(false);
                    onClose();
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
                              props.form.errors.subject &&
                              props.form.touched.subject
                            }
                          >
                            <Input
                              {...formik.getFieldProps('subject')}
                              name="subject"
                              id="subject"
                              placeholder="subject"
                            />
                            <FormErrorMessage>
                              {props.form.errors.subject}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field>
                        {(props) => (
                          <FormControl
                            isInvalid={
                              props.form.errors.email &&
                              props.form.touched.email
                            }
                            mt={4}
                          >
                            <Input
                              {...formik.getFieldProps('email')}
                              name="email"
                              id="email"
                              placeholder="email"
                              mb="6px"
                            ></Input>
                            <FormErrorMessage>
                              {props.form.errors.email}
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
                              placeholder="Body"
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
      </Flex>
    </Layout>
  );
}
