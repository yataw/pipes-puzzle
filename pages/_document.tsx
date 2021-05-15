import React from 'react';
import Document, {Html, Head, Main, NextScript} from 'next/document';
import {ServerStyleSheets} from '@material-ui/core/styles';
import {theme} from 'utils/theme';
import {robotoFontStyle} from 'utils/inline-styles';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang='ru'>
                <Head>
                    <meta name='theme-color' content={theme.palette.primary.main}/>
                    {/*TODO : @yataw : 5/15/21 : refactor FOUT */}
                    <style dangerouslySetInnerHTML={{__html: robotoFontStyle}}>{}</style>
                    <link rel='apple-touch-icon' sizes='180x180' href='apple-touch-icon.png'/>
                    <link rel='icon' type='image/png' sizes='32x32' href='favicon-32x32.png'/>
                    <link rel='icon' type='image/png' sizes='16x16' href='favicon-16x16.png'/>
                    <link rel='manifest' href='site.webmanifest'/>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}

// material-ui SSR fix
// @see https://stackoverflow.com/questions/63324512/material-ui-breaks-nextjs-app-in-production
MyDocument.getInitialProps = async (ctx) => {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
        });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
        styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
};