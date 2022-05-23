import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: {
      html: {
        // prevent scrollbar from shifting content to the left
        overflowY: 'overlay',
      },
      '::-webkit-scrollbar': {
        width: '8px',
        cursor: 'pointer',
      },
      '::-webkit-scrollbar-thumb': {
        backgroundColor: '#686868',
        borderRadius: '8px',
        width: '8px',
      },
      '::-webkit-scrollbar-thumb:hover': {
        backgorund: '#7d7d7d;',
      },
    },
  },
});
