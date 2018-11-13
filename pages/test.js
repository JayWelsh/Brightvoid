import { withRouter } from 'next/router'

const testPage = (props) => {
    let requestedID = props.router.query.id;
    return <div> Welcome to test {requestedID}! </div>
}

export default withRouter(testPage);