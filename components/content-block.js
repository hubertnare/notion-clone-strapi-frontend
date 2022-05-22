import { useMutation } from 'graphql-hooks';
import { useState } from 'react';
import dynamic from 'next/dynamic';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
const Editor = dynamic(() => import('./editor'));

import {
    DELETE_BLOCK_MUTATION,
    UPDATE_BLOCKS_MUTATION,
} from '../lib/graphql-query-mutation';

export default function ContentBlock({ refetchPage, id, block }) {
    const [openEditor, setOpenEditor] = useState(false);
    const [deleteContentBlock] = useMutation(DELETE_BLOCK_MUTATION);
    const [updateContentBlock] = useMutation(UPDATE_BLOCKS_MUTATION);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = async () => {
        await deleteContentBlock({ variables: { id } });
        refetchPage();
        handleClose();
    };

    const handleEdit = () => {
        handleClose();
        setOpenEditor(true);
    };

    const saveBlock = async (content) => {
        await updateContentBlock({ variables: { id, content } });
        setOpenEditor(false);
        refetchPage();
    };

    if (openEditor)
        return (
            <div>
                <Editor content={block.content} saveBlock={saveBlock} />
            </div>
        );

    return (
        <Grid container direction="row" alignItems="center">
            <Grid item>
                <IconButton
                    aria-label="options"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                    size="small"
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleEdit}>Edit</MenuItem>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                </Menu>
            </Grid>
            <Grid item>
                <div
                    dangerouslySetInnerHTML={{ __html: block ? block.content : "" }}
                ></div>
            </Grid>
        </Grid>
    );
}