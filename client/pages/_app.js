import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, me }) => {
    return (
        <div>
            <Header me={me}/>
            <Component {...pageProps}/>
        </div>
    );
}

// Next.js propertie that allows us to fetch some data
// during the server side rendering process
AppComponent.getInitialProps = async appContext => {
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/me');

    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }

    return { pageProps, me: data.me }
}

export default AppComponent;
