import Document, {Html, Head, Main, NextScript} from 'next/document';
import {TextEncoder} from 'text-encoding';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return {...initialProps};
    }

    render() {
        return (
            <Html>
                <Head>
                    {/* Add polyfill for TextEncoder if not available */}
                    {typeof window !== 'undefined' && !window.TextEncoder && (
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                if (!('TextEncoder' in window)) {
                  window.TextEncoder = ${TextEncoder.toString()};
                }
              `,
                            }}
                        />
                    )}
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
