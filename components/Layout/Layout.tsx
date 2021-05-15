import styles from './Layout.module.scss'
import {FC, ReactElement} from 'react';
import Head from 'next/head'
import {Header} from 'components/Header';
import {Container} from '@material-ui/core';
import {Footer} from 'components/Footer';

type Props = {
    children: ReactElement;
    title?: string
}

export const Layout: FC<Props> = ({children, title = '@yataw | Pipes puzzle'}) => {
    return (
        <div className={styles.page}>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8"/>∂
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>

            <Header/>

            <Container maxWidth={'md'} className={styles.content}>
                {children}
            </Container>

            <Footer/>
        </div>
    )
};
