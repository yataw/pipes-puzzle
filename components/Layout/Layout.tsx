import styles from './Layout.module.scss';
import {FC, ReactElement} from 'react';
import Head from 'next/head';
import {AppBar} from 'components/AppBar';

type Props = {
    children: ReactElement;
    title?: string;
};

export const Layout: FC<Props> = ({children, title = '@yataw | Pipes puzzle'}) => {
    return (

        <div className={styles.page}>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />∂
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <AppBar>{children}</AppBar>
        </div>
    );
};
