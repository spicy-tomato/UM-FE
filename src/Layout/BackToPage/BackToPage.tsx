import { Box, Button } from '@chakra-ui/react';
import { AiOutlineLeft } from 'react-icons/ai';
import { Link } from 'react-router-dom';

type BackToPageProps = {
  url: string;
  text?: string;
  children: JSX.Element;
};

const BackToPage = ({ url, text, children }: BackToPageProps) => {
  return (
    <Box>
      <Button as={Link} leftIcon={<AiOutlineLeft />} to={url}>
        {text ?? 'Back'}
      </Button>
      <Box mt='2'>{children}</Box>
    </Box>
  );
};

export default BackToPage;
