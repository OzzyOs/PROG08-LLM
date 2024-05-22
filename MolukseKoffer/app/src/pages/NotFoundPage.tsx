import React from "react";
import {Link} from "react-router-dom";

export default function NotFoundPage () {
    // Custom error message, with a link back to the 'Root' page
    return (
        <div className='flex flex-col gap-2'> 404 Not Found
            <Link to='/'>Home</Link>
        </div>
    )
}

// <a> tag refreshes the whole page from HTML to JavaScript.

// <Link> tag doesn't refresh the page and performs client side routing.
// https://reactrouter.com/en/main/components/link