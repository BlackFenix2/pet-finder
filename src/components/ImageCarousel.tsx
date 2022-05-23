import { Center, Flex, Image, Wrap, WrapItem } from '@chakra-ui/react';
import React from 'react';

type Props = {
  images: string[];
};

const ImageCarousel = ({ images }: Props) => {
  const [activeImage, setActiveImage] = React.useState(0);

  const clickEvent: React.PointerEventHandler<HTMLImageElement> = (event) => {
    setActiveImage(+(event.currentTarget as any).dataset.index);
  };
  return (
    <Flex
      width={'100%'}
      justifyContent="space-around"
      flexDirection={{ base: 'column', lg: 'row' }}
    >
      <Center>
        <Image
          src={images[activeImage]}
          fallbackSrc={
            'https://www.sotera.com/media/catalog/product/placeholder/default/Image_not_Available.png'
          }
          boxSize={400}
        />
      </Center>
      <Center padding={3}>
        <Wrap justify="center" spacing={10}>
          {images.map((image, index) => (
            <WrapItem key={image}>
              <Image
                transition="all 0.3s"
                cursor={'pointer'}
                opacity={index === activeImage ? 0.5 : 1}
                border={index === activeImage ? '1px solid black' : 'none'}
                onPointerDown={clickEvent}
                boxSize="100px"
                data-index={index}
                src={image}
                alt={`animal thumbnail ${index}`}
                borderRadius="full"
              />
            </WrapItem>
          ))}
        </Wrap>
      </Center>
    </Flex>
  );
};

export default ImageCarousel;
