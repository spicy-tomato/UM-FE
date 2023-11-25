import { Program, UMApplicationProgramQueriesGetByIdGetByIdDto } from '@api';
import { Grid, GridItem } from '@chakra-ui/react';
import { setStateWithApiFallback } from '@functions';
import { BackToPage, MainData } from '@layout';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Actions } from './Actions';
import { InfoCard } from './InfoCard';

const ProgramDetails = () => {
  const params = useParams();
  const [program, setProgram] = useState<
    UMApplicationProgramQueriesGetByIdGetByIdDto | null | undefined
  >();

  const getProgram = () => {
    const id = params.programId;
    if (id) {
      setStateWithApiFallback(new Program().getProgramById(id), setProgram);
    }
  };
  useEffect(() => {
    getProgram();
  }, [params]);

  return (
    <MainData data={program}>
      <BackToPage
        url='/program'
        text='Back to program list'
        rightContent={<Actions reload={getProgram} program={program!} />}
      >
        <Grid rowGap={3}>
          <GridItem>
            <InfoCard program={program!} />
          </GridItem>
        </Grid>
      </BackToPage>
    </MainData>
  );
};

export { ProgramDetails };
