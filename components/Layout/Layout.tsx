import styles from './Layout.module.scss';
import {FC, ReactElement, useLayoutEffect} from 'react';
import Head from 'next/head';
import {AppBar} from 'components/AppBar';
import {useSelector} from 'react-redux';
import {useAppContext} from 'hooks/useAppContext';
import {pageSelector} from 'selectors/page';

type Props = {
    children: ReactElement;
    title?: string;
};

export const Layout: FC<Props> = ({children, title = '@yataw | Pipes puzzle'}) => {
    const ctx = useAppContext();

    const {level} = useSelector(pageSelector);

    useLayoutEffect(() => {
        // initialise api before all other effects
        ctx.puzzleApi.init();
        ctx.puzzleApi.setLevel(level);
    }, [ctx, level]);

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
