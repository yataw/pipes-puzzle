import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {IconButton} from '@material-ui/core';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {routes} from '../../router';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            marginRight: theme.spacing(5),
            marginLeft: theme.spacing(2),
        },
        paper: {
            marginRight: theme.spacing(2),
        },
    }),
);

export const MenuButton = () => {
    const router = useRouter();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const btnRef = React.useRef<HTMLButtonElement>(null);

    const handleBtnClick = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleMenuClose = (event: React.MouseEvent<EventTarget>) => {
        if (btnRef.current && btnRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    };
    const handleExploreItemClick = () => {
        router.push(routes.Explore);
    };

    return (
        <div className={classes.root}>
            <div>
                <IconButton onClick={handleBtnClick} ref={btnRef}>
                    <Image src={'/pipes-puzzle/images/menu.svg'} width={20} height={20} />
                </IconButton>

                <Popper open={open} anchorEl={btnRef.current} transition>
                    {({TransitionProps, placement}) => (
                        <Grow
                            {...TransitionProps}
                            style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleMenuClose}>
                                    <MenuList>
                                        <MenuItem onClick={handleExploreItemClick}>Explore</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
    );
};
