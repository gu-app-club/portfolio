import React from "react";
import Cookies from "js-cookie";
import Link from 'next/link';

class RedirectToLoginLink extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            session : Cookies.get("session")
        }
    }

    render() {
        if (this.state.session) {
            return <Link {...this.props}/>
        }
        
        // Browser 
        if (location) {
            return <Link href={{pathname: "/login", query: { back: location.pathname }}}/>
        }

        // Server side rendered
        return (
            <Link href={{ pathname: '/login' }}/>
        )
    }
}

export default RedirectToLoginLink;