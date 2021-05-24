import React, {FC} from 'react';
import {List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {routes} from 'router';

type Props = {
    onItemClick: () => void;
};

type MenuItem = {
    text: string;
    path: string;
    imageUrl?: string;
};

const menuItems: MenuItem[] = [
    {
        text: 'CLI mode',
        imageUrl: '/pipes-puzzle/images/terminal.svg',
        path: routes.CLI,
    },
    {
        text: 'GUI mode',
        imageUrl: '/pipes-puzzle/images/game-controller.svg',
        path: routes.GUI,
    },
    {
        text: 'Explore',
        imageUrl: '/pipes-puzzle/images/search.svg',
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


export const AppBarMenuItems: FC<Props> = ({onItemClick}) => {
    const router = useRouter();

    const handleListItemClick = (path: string) => {
        router.push(path);
        onItemClick();
    };
    return (
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
    );
};
