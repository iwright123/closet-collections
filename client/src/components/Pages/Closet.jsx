import React from 'react';
import { Editor, Frame, Element } from '@craftjs/core';
import {Typography, Paper, Grid, makeStyles} from '@material-ui/core';

import { Toolbox } from './Toolbox.jsx';
import { SettingsPanel } from './SettingsPanel.jsx';
import { Topbar } from '../components/Topbar.jsx';

import { Container } from './user/Container.jsx';
import { Button } from './user/Button.jsx';
import { Card } from './user/Card.jsx';
import { Text } from './user/Text.jsx';

const useStyles = makeStyles(() => ({
  root: {
    padding: 0,
    background: 'rgb(252, 253, 253)',
  },
}));

export default function Closet() {
  const classes = useStyles();
  return (
    <div style={{margin: '0 auto', width: '800px'}}>
      <Typography variant="h5" align="center">Closet</Typography>
      <Editor resolver={{Card, Button, Text, Container}}>
        <Grid container spacing={3}>
          <Grid item xs>
            <Frame>
              <Container>
                <Card />
                <Button size="small" variant="outlined">Click</Button>
                <Text size="small" text="Choose your outfit!" />
                <Container padding={6} background="#999">
                  {/* <Text size="small" text="It's me again!" /> */}
                </Container>
              </Container>
            </Frame>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.root}>
              <Toolbox />
              <SettingsPanel />
            </Paper>
          </Grid>
        </Grid>
      </Editor>
    </div>
  );
}
