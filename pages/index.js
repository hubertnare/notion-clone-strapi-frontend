import { useQuery, useMutation } from 'graphql-hooks';
import { useState } from 'react';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import {
  ALL_PAGES_QUERY,
  CREATE_PAGE_MUTATION,
} from '../lib/graphql-query-mutation';

export default function Home() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const { data, refetch } = useQuery(ALL_PAGES_QUERY);
  const [createPage] = useMutation(CREATE_PAGE_MUTATION);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setTitle("");
    setOpen(false);
  };

  const addPage = async () => {
    await createPage({ variables: { title } });
    refetch();
    handleClose();
  };
  
  if (!data) return <div>Loading...</div>;
  
  const { pages } = data;

  return (
    <section>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h3">Welcome 👋</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">
            This project uses Strapi + GraphQL + Next.js. It illustrates how to
            use these technologies to create a Notion-like project (with block
            content).
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">All pages</Typography>
        </Grid>
        <Grid container direction="column" spacing={1}>
          {pages.data.map((page, index) => (
            <Grid item key={page.id}>
              <div>
                <span>{index + 1}. </span>
                <Link href={`/${page.id}`}>
                  <a>{page.attributes.title}</a>
                </Link>
              </div>
            </Grid>
          ))}
        </Grid>
        <Grid item>
          <Button color="primary" onClick={handleClickOpen}>
            Add page
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Page</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addPage} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
};