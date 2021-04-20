import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { BrowserRouter, Route, Redirect, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import Layout from '../components/layout';
import {
  Text,
  Box,
  Flex,
  WrapItem,
  Avatar,
  Spacer,
  Link,
  FormControl,
  Textarea,
  Button,
  FormLabel,
  Center,
  useToast,
  Input,
  FormErrorMessage,
  FormHelperText,
  Badge,
} from '@chakra-ui/react';
import { EditIcon, SettingsIcon } from '@chakra-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from '../components/Card';
import axios from 'axios';
import { updateUser } from '../store/actions/authActions';

export default function Dashboard() {
  const {
    postReducer: { posts },
    authReducer: { user },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const toast = useToast();
  const [reloadProfile, setReloadProfile] = useState(0);
  let { userName } = useParams();
  const [profile, setProfile] = useState({
    userName: null,
    about: null,
    profilePicture: null,
  });

  useEffect(() => {
    const getUser = async (userUsername) => {
      let fecthedUser = await axios.get(
        `http://127.0.0.1:5000/api/user/getuser/${userUsername}`
      );
      return fecthedUser;
    };
    getUser(userName).then(({ data: { user } }) => setProfile({ ...user }));
    console.log(profile);
  }, [userName, reloadProfile]);

  // if (id.match(/^[0-9a-fA-F]{24}$/)) {
  //   // it's an ObjectID
  // } else {
  //   return <Redirect to="/home" />;
  // }

  const rebuildData = (data) => {
    let formData = new FormData();
    formData.append('file', data.file);
    formData.append('about', data.about);
    return formData;
  };

  const FILE_SIZE = 200000;
  const SUPPORTED_FORMATS = [
    'image/jpg',
    'image/jpeg',
    'image/gif',
    'image/png',
  ];
  return (
    <Layout>
      <Box flexWrap="wrap" d="flex">
        <Box
          h="12vh"
          padding={{ base: '10px', xl: '20px calc((100vw - 1200px) / 2)' }}
          lineHeight="1.4rem"
        >
          <Text fontSize="0.9rem">Overview</Text>
          <Text
            fontFamily={'Poppins, sans-serif'}
            fontSize="1.5rem"
            fontWeight="bold"
          >
            User Profile
          </Text>
        </Box>

        {user
          ? profile.userName === user.userName &&
            profile.about === '' && (
              <Center>
                <Badge
                  padding="5px 10px"
                  // bg="yellow"
                  // color="white"
                  colorScheme="yellow"
                >
                  please update your profile
                </Badge>
              </Center>
            )
          : null}
      </Box>
      <Flex
        padding={{ base: '10px', xl: '20px calc((100vw - 1200px) / 2)' }}
        sx={{
          '@media only screen and (max-width: 759px) ': {
            flexDirection: 'column',
            alignItems: 'center',
          },
        }}
      >
        {edit ? (
          <Box
            sx={{
              '@media only screen and (max-width: 759px) ': {
                width: '90vw',
              },
            }}
            bg="#F7FAFC"
            alignSelf="flex-start"
            borderRadius="20px"
            p="20px 10px"
            flex={{ md: '0.3' }}
            width="100%"
          >
            <Formik
              initialValues={{
                file: undefined,
                about: '',
              }}
              validationSchema={Yup.object().shape({
                file: Yup.mixed()
                  .required('A file is required')
                  .test(
                    'fileSize',
                    'File too large',
                    (value) => value && value.size <= FILE_SIZE
                  )
                  .test(
                    'fileFormat',
                    'Unsupported Format',
                    (value) => value && SUPPORTED_FORMATS.includes(value.type)
                  ),
                about: Yup.string()
                  .max(15, 'Must be 15 characters or less')
                  .required('about is required'),
              })}
              onSubmit={async (values, actions) => {
                var formData = rebuildData(values);

                await dispatch(updateUser(formData));

                if (window.store.getState().authReducer.updated === true) {
                  toast({
                    title: 'success',
                    description: 'updated successfully',
                    status: 'success',
                    duration: 1000,
                    isClosable: true,
                    position: 'top',
                  });
                  actions.setSubmitting(false);
                  setReloadProfile(reloadProfile + 1);
                  setEdit(!edit);
                } else {
                  toast({
                    title: 'Error',
                    description: window.store.getState().authReducer.error,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                    position: 'top',
                  });
                  actions.setSubmitting(false);
                  setEdit(!edit);
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
                            props.form.errors.file && props.form.touched.file
                          }
                        >
                          <FormLabel>profile picture</FormLabel>
                          <Input
                            name="file"
                            id="file"
                            type="file"
                            placeholder="file"
                            onChange={(event) => {
                              formik.setFieldValue(
                                'file',
                                event.currentTarget.files[0]
                              );
                            }}
                          />
                          <FormHelperText>
                            Picture should not be more than 200kb
                          </FormHelperText>
                          <FormErrorMessage>
                            {props.form.errors.file}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field>
                      {(props) => (
                        <FormControl
                          mb="20px"
                          isInvalid={
                            props.form.errors.about && props.form.touched.about
                          }
                        >
                          <FormLabel>about</FormLabel>
                          <Textarea
                            {...formik.getFieldProps('about')}
                            id="about"
                            name="about"
                            height="120px"
                            maxH="200px"
                            placeholder="Something about you"
                          ></Textarea>
                          <FormErrorMessage>
                            {props.form.errors.about}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Flex>
                      <Button
                        type="submit"
                        isLoading={formik.isSubmitting}
                        colorScheme="blue"
                        mr={3}
                      >
                        Update
                      </Button>
                      <Button onClick={() => setEdit(!edit)}>Cancel</Button>
                    </Flex>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        ) : (
          <Box
            sx={{
              '@media only screen and (max-width: 759px) ': {
                width: '90vw',
              },
            }}
            bg="#F7FAFC"
            alignSelf="flex-start"
            borderRadius="20px"
            p="20px 10px"
            flex={{ md: '0.3' }}
            width="100%"
          >
            <Box
              position="relative"
              d="flex"
              flexDirection="column"
              alignItems="center"
            >
              {user
                ? profile.userName === user.userName && (
                    <Link
                      onClick={() => setEdit(!edit)}
                      _hover={{ textDecoration: 'none' }}
                      top="-13px"
                      right="7"
                      position="absolute"
                    >
                      update <SettingsIcon />
                    </Link>
                  )
                : null}
              <WrapItem mb="10px">
                <Avatar
                  size="2xl"
                  name={profile.userName}
                  src={`/${profile.profilePicture}`}
                />
              </WrapItem>
              <Text
                fontSize="1.2rem"
                color="#3D5170"
                fontWeight="bold"
                fontFamily="Roboto', sans-serif"
              >
                {profile.userName}
              </Text>
            </Box>
            <Box
              borderTop="2px solid #E1E5EB"
              borderBottom="2px solid #E1E5EB"
              p="15px 10px"
              d="flex"
              mt="5px"
            >
              <Text fontWeight="semibold">Advices</Text>
              <Spacer></Spacer>
              <Text>
                {posts[0]
                  ? Object.keys(
                      posts.filter((item) => item.userName === userName)
                    ).length
                  : null}
              </Text>
            </Box>
            <Box p="15px 10px">
              <Text fontWeight="semibold">About</Text>
              <Text>{profile.about}</Text>
            </Box>
          </Box>
        )}

        <Box width="300px" ml={{ md: '20px' }} flex={{ md: '0.7' }}>
          <Box borderBottom="2px solid #E1E5EB" p="15px 10px" d="flex" mt="5px">
            <Text fontWeight="semibold">Your Advices</Text>
            <Spacer></Spacer>
          </Box>

          <Flex mt="10px" justifyContent="center" wrap="wrap">
            {posts[0]
              ? posts
                  .filter((item) => item.userName === profile.userName)
                  .map((item) => <Card {...item}></Card>)
              : Array(13)
                  .fill('')
                  .map(() => <Card></Card>)}
          </Flex>
        </Box>
      </Flex>
    </Layout>
  );
}
