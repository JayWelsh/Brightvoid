import { withRouter } from 'next/router';
import OurAppBar from '../components/AppBar';
import Head from 'next/head'
import "../styles/styles.scss";

const AppRoot = (props) => {
    return <div>
        <Head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no"/>
            <meta name="theme-color" content="#000000"/>
        </Head>
        <OurAppBar/>
        </div>
}

export default withRouter(AppRoot);