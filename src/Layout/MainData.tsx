import { Flex, Spinner } from '@chakra-ui/react';

type MainDataProps<T> = {
  data: T | T[] | null | undefined;
  children: JSX.Element;
};

const MainData = <T,>({ data, children }: MainDataProps<T>) => {
  if (data === undefined) {
    return (
      <Flex justify='center'>
        <Spinner />
      </Flex>
    );
  }

  if (data === null || (Array.isArray(data) && data.length === 0)) {
    return <>No data</>;
  }

  return children;
};

export { MainData };
