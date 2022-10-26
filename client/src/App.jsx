import { useEffect,useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Box, Badge,  Image } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'


export default function App() {
  const [dadosApi, setDadosApi] = useState(undefined)

  useEffect(() => {
    console.log("componente montado")
    fetch("http://localhost:8000/livros")
      .then((res) => res.json())
      .then((obj) => setDadosApi(obj)) 
  },[])

  if (dadosApi === undefined) return <div>Carregando...</div>

  const property = {
    imageUrl: 'https://bit.ly/2Z4KKcF',
    imageAlt: 'Rear view of modern home with pool',
    beds: 3,
    baths: 2,
    title: 'Modern home in city center in the heart of historic Los Angeles',
    formattedPrice: '$1,900.00',
    reviewCount: 34,
    rating: 4
  }
  
  return (
    <ChakraProvider>
      {dadosApi.map((livro) => (

  
    <Box w='xs' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Image src={property.imageUrl} alt={property.imageAlt} />

      <Box p='6'>
        <Box display='flex' alignItems='baseline'>
          <Badge borderRadius='full' px='2' colorScheme='teal'>
            New
          </Badge>
          <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
          >
            Lançamento &bull; {livro.data}
          </Box>
        </Box>

        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          noOfLines={1}
        >
          {livro.name}
        </Box>

        <Box>
          {livro.author}
          <Box as='span' color='gray.600' fontSize='sm'>
          </Box>
        </Box>

        <Box display='flex' mt='2' alignItems='center'>
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < property.rating ? 'teal.500' : 'gray.300'}
              />
            ))}
          <Box as='span' ml='2' color='gray.600' fontSize='sm'>
            {property.reviewCount} reviews
          </Box>
        </Box>
      </Box>
    </Box>
        ))}

    </ChakraProvider>
  )
}