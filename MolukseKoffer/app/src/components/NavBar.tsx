import { NavLink } from "react-router-dom";


const NavBar = () => {

    return (
        <nav className="navbar || flex flex-col h-screen border-2 rounded-2xl max-w-1/5 w-80">
            <div>
                <h1 className="text-4xl mt-20 ">
                    <NavLink to='/' className="flex justify-center font-bold">Molukse Koffer</NavLink>
                </h1>
                <ul className="flex justify-center mt-5 mb-10">
                    <li className='flex flex-col'>
                        {/* NavLink maakt gebruik van de predefined routes (index.tsx), de website hoeft
                            dus niet telkens te re-renderen zoals bij een <a> tag */}
                        <NavLink to="/" className='mb-10 mt-10 text-2xl'>Homepage</NavLink>
                        <NavLink to="/about" className='mb-10 text-2xl'>About</NavLink>
                        <NavLink to="/familyline" className='mb-10 text-2xl'>Family Line</NavLink>
                        <NavLink to="/familymap" className='mb-10 text-2xl'>Family Map</NavLink>
                        <NavLink to="/familysuitcase" className='text-2xl'>Family Suitcase</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )

}

export default NavBar
