import styles from './Header.module.scss';
import {Paper, Tab, Tabs} from '@material-ui/core';
import Link from 'next/link';
import {routes} from 'router';
import {useRouter} from 'next/router';
import {MenuButton} from 'components/MenuButton';

type CustomTabProps = {
    href: string;
    label: string;
};
const CustomTab = ({href, label}: CustomTabProps) => {
    return (
        <Link href={href}>
            <Tab label={label} style={{textTransform: 'initial', opacity: '100%'}} />
        </Link>
    );
};

const routeToTabIndex = {
    [routes.Root]: 0,
    [routes.CLI]: 0,
    [routes.GUI]: 1,
};

export const Header = () => {
    const router = useRouter();
    const index = routeToTabIndex[router.route] ?? false;

    return (
        <nav>
            <Paper square>
                <div className={styles.container}>
                    <Tabs value={index} indicatorColor="primary" textColor="primary" variant="scrollable">
                        <CustomTab href={routes.CLI} label={'CLI'} />
                        <CustomTab href={routes.GUI} label={'GUI'} />
                    </Tabs>
                    <MenuButton />
                </div>
            </Paper>
        </nav>
    );
};
