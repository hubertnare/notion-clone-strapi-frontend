import { useState } from 'react';
import { useMutation } from 'graphql-hooks';

import dynamic from 'next/dynamic';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import ContentBlock from './content-block';
const Editor = dynamic(() => import('./editor'));

import { CREATE_BLOCKS_MUTATION } from '../lib/graphql-query-mutation';

export default function Content({ pageId, refetchPage, content_blocks = [] }) {
    const [openEditor, setOpenEditor] = useState(false);
    const [createContentBlock] = useMutation(CREATE_BLOCKS_MUTATION);

    const addBlock = async (content) => {
        await createContentBlock({ variables: { content, pageId } });
        setOpenEditor(false);
        refetchPage();
    };

    return (
        <Grid container direction="column">
            <Grid item>
                {content_blocks.map((block) => (
                    <Grid item key={block.id}>
                        <ContentBlock block={block.attributes} refetchPage={refetchPage} id={block.id}/>
                    </Grid>
                ))}
            </Grid>
            <Grid item>
                {openEditor ? (
                    <Editor saveBlock={addBlock} />
                ) : (
                    <Button color="primary" onClick={() => setOpenEditor(true)}>
                        Add content block
                    </Button>
                )}
            </Grid>
        </Grid>
    );
};