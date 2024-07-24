import type { Member } from 'src/__generated__/graphql';

import Grid from '@mui/material/Unstable_Grid2';

import Table from './Table';
import Reward from './Reward';
import OverView from './OverView';
import Personal from './Personal';

interface Props {
  me: Member;
}

export default function HistoryView({ me }: Props) {
  return (
    <Grid container>
      <Grid md={12} xl={6}>
        <OverView me={me} />
        <Personal me={me} />
      </Grid>
      <Grid md={12} xl={6}>
        <Reward me={me} />
      </Grid>
      <Grid xl={12}>
        <Table />
      </Grid>
    </Grid>
  );
}
