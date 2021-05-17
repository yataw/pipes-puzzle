import React, {FC} from 'react';
import clsx from 'clsx';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {
    Drawer,
    AppBar as MaterialAppBar,
    List,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Image from 'next/image';
import {Footer} from 'components/Footer';
import {routes} from 'router';
import {useRouter} from 'next/router';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
        footer: {
            marginTop: 'auto',
        },
    }),
);

type MenuItem = {
    text: string;
    path: string;
    imageUrl?: string;
};

const menuItems: MenuItem[] = [
    {
        text: 'CLI mode',
        imageUrl: '/images/terminal.svg',
        path: routes.CLI,
    },
    {
        text: 'Explore mode',
        imageUrl: '/images/game-controller.svg',
        path: routes.GUI,
    },
];

const additionalMenuItems: MenuItem[] = [
    {
        text: 'Explore',
        path: routes.Explore,
    },
];

type CustomLIstItemProps = {
    text: string;
    onClick: () => void;
    imageUrl?: string;
};

const CustomListItem: FC<CustomLIstItemProps> = ({text, imageUrl, onClick}) => (
    <ListItem button onClick={onClick}>
        <ListItemIcon>{imageUrl && <Image src={imageUrl} width={20} height={20} />}</ListItemIcon>
        <ListItemText primary={text} />
    </ListItem>
);

export const AppBar: FC = ({children}) => {
    const router = useRouter();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleListItemClick = (path: string) => {
        router.push(path);
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <MaterialAppBar position="fixed" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">Pipes puzzle</Typography>
                </Toolbar>
            </MaterialAppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {menuItems.map(({text, imageUrl, path}) => (
                        <CustomListItem
                            key={text}
                            text={text}
                            imageUrl={imageUrl}
                            onClick={() => handleListItemClick(path)}
                        />
                    ))}
                </List>
                <Divider />
                <List>
                    {additionalMenuItems.map(({text, imageUrl, path}) => (
                        <CustomListItem
                            key={text}
                            text={text}
                            imageUrl={imageUrl}
                            onClick={() => handleListItemClick(path)}
                        />
                    ))}
                </List>
                <Footer className={classes.footer} />
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                {children}
            </main>
        </div>
    );
};
