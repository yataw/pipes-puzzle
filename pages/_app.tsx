import type {AppProps} from 'next/app';
import {wrapper} from 'store';
import {Layout} from 'components/Layout';
import 'public/styles/global.scss';
import {ThemeProvider} from '@material-ui/styles';
import {theme} from 'utils/theme';
import React, {useEffect, useRef} from 'react';
import {AppContext, AppContextType} from 'components/AppContext';
import {Puzzle} from 'api/puzzle';

// Remove the server-side injected CSS
const removeMaterialStyles = () => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
        jssStyles.parentElement!.removeChild(jssStyles);
    }
};

const App = ({Component, pageProps}: AppProps) => {
    const appCtx = useRef<AppContextType>({
        puzzleApi: new Puzzle(),
    });

    useEffect(() => {
        removeMaterialStyles();
    }, [removeMaterialStyles]);

    return (
        <AppContext.Provider value={appCtx.current}>
            <ThemeProvider theme={theme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </AppContext.Provider>
    );
};

export default wrapper.withRedux(App);
