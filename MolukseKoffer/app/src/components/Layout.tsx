import NavBar from "./NavBar.tsx";


const Layout = ({children:children}) => {
    return (
        <div className='sidenav || flex h-screen w-screen overflow-auto bg-gray-600'>
            <header></header>
                    <div className='layout-body || flex w-screen h-screen'>
                        <aside className='navigation-container || fixed h-screen'>
                            <NavBar/>
                        </aside>
                        <div className='main-container || flex flex-col w-screen h-screen ml-64'>
                            {children}
                        </div>
                    </div>
            <footer></footer>
        </div>
    );
}
export default Layout;

// Layout is verantwoordelijk voor de indeling van de pagina's, deze wordt in principe op elke pagina aangeroepen.
