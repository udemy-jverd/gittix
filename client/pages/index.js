import buildClient from '../api/build-client';

const LandingPage = ({ me }) => {
    return me ? <h1>You are signed in</h1> : <h1>You are not signed in</h1>
}

LandingPage.getInitialProps = async (context) => {
    const client = buildClient(context);
    const { data } = await client.get('/api/users/me');
    return data;
}

export default LandingPage
