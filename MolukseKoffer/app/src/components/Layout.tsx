import NavBar from "./NavBar.tsx";


const Layout = ({children:children}) => {
    return (
        <div className='sidenav || flex h-screen w-screen'>
            <header></header>
                    <body className='body || flex w-screen h-screen'>
                        <aside>
                            <NavBar/>
                        </aside>
                        <div className='main-container || flex flex-col w-screen h-screen'>
                            {children}
                        </div>
                    </body>
            <footer></footer>
        </div>
    );
}
export default Layout;
