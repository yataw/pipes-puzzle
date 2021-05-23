import type {AppProps} from 'next/app';
import {getStoreWrapper} from 'store';
import {Layout} from 'components/Layout';
import 'public/styles/global.scss';
import {ThemeProvider} from '@material-ui/styles';
import {theme} from 'utils/theme';
import React, {FC, useEffect, useLayoutEffect, useRef} from 'react';
import {AppContext, AppContextType} from 'components/AppContext';
import {Puzzle} from 'api/puzzle';
import {SnackbarProvider} from 'notistack';

// Remove the server-side injected CSS
const removeMaterialStyles = () => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
        jssStyles.parentElement!.removeChild(jssStyles);
    }
};

const WrappedApp: FC<AppProps> = (...props: ToDo) => {
    const ctx = useRef<AppContextType>({
        puzzleApi: new Puzzle(),
    });

    const App: FC<AppProps> = ({Component, pageProps}) => (
        <AppContext.Provider value={ctx.current}>
            <ThemeProvider theme={theme}>
                <SnackbarProvider maxSnack={2}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </SnackbarProvider>
            </ThemeProvider>
        </AppContext.Provider>
    );

    useEffect(() => {
        removeMaterialStyles();
    }, []);


// TODO : @yataw : 5/20/21 : fixme
// @ts-ignore
    return getStoreWrapper(ctx.current).withRedux(App)(...props);
};

export default WrappedApp;
