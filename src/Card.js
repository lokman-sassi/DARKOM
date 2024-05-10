import { Card, Image, Stack, Heading, Text, Button, CardBody, CardFooter, Flex } from '@chakra-ui/react';

function Cards() {
    return (
        <Flex justify="center" align="center" minHeight="50vh">
            <Card
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
                maxWidth="800px"
            >
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '200px' }}
                    src='https://www.algeriahome.com/oc-content/uploads/344/153200.jpg'
                    alt='Caffe Latte'
                />

                <Stack>
                    <CardBody>
                        <Heading size='md'>Logement à vendre Souk Ahras</Heading>
                        <Text py='2'>
                           Price: 673440624.00 DZD
                           <br/>
                           Location:  نهج دريسي عبد العزيز10, Souk Ahras, Souk Ahras, Algeria 
                           <br/>
                           Date: Avril 28, 2024
                           <br/>
                           Surface: 152 m2
                        </Text>
                    </CardBody>

                    <CardFooter>
                        <a href='https://www.algeriahome.com/a-vendre/maison-appartement-a-vendre/logement-a-vendre-souk-ahras_i34475' target='_blank' rel="noopener noreferrer">
                        <Button type="button" variant='solid' colorScheme='blue'>Details</Button>
                        </a>
                    </CardFooter>
                </Stack>
            </Card>
        </Flex>
    );
}

export default Cards;
