import { React, useEffect, useState, useRef } from "react";
import { useDisclosure } from '@chakra-ui/react'
import ReactDOM from "react-dom/client";

import {
  Box,
  Badge,
  Image,
  CircularProgress,
  Button,
  ButtonGroup,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input
} from "@chakra-ui/react";
import { StarIcon, AddIcon } from "@chakra-ui/icons";

export default function App() {
  const [dadosApi, setDadosApi] = useState(undefined);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  useEffect(() => {
    console.log("componente montado");
    fetch("http://localhost:8000/livros")
      .then((res) => res.json())
      .then((obj) => setDadosApi(obj));
  }, []);

  if (dadosApi === undefined)
    return <CircularProgress isIndeterminate color="green.300" />;

  const property = {
    imageUrl: "https://bit.ly/2Z4KKcF",
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    baths: 2,
    title: "Modern home in city center in the heart of historic Los Angeles",
    formattedPrice: "$1,900.00",
    reviewCount: 34,
    rating: 4,
  };

  return (
    <>
    
    <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form method="POST" action="submit">
            <FormControl mt={2}>
              <FormLabel>Book name</FormLabel>
              <Input ref={initialRef} name="bookName" placeholder='Book name' />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Author name</FormLabel>
              <Input ref={initialRef} name="author" placeholder='Author name' />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Publication date</FormLabel>
              <Input type='date' ref={initialRef} name="date" placeholder='Publication date' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Photo</FormLabel>
              <Input type='file' name="photo" placeholder='Photo' />
            </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <ButtonGroup onClick={onOpen} size="lg" position='fixed' right={50} bottom={30} isAttached colorScheme="green">
        <IconButton aria-label="Add to friends" icon={<AddIcon />} />
      </ButtonGroup>

      {dadosApi.map((livro) => (
        <Box w="xs" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Image src={property.imageUrl} alt={property.imageAlt} />

          <Box p="6">
            <Box display="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="teal">
                New
              </Badge>
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                Lançamento &bull; {livro.data}
              </Box>
            </Box>

            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            >
              {livro.name}
            </Box>

            <Box>
              {livro.author}
              <Box as="span" color="gray.600" fontSize="sm"></Box>
            </Box>

            <Box display="flex" mt="2" alignItems="center">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <StarIcon
                    key={i}
                    color={i < property.rating ? "teal.500" : "gray.300"}
                  />
                ))}
              <Box as="span" ml="2" color="gray.600" fontSize="sm">
                {property.reviewCount} reviews
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </>
  );
}
