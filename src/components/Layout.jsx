import Main from './Main';
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div className="Layout">
            <Navbar />
            <main>
                <Sidebar />
                <Main>
                    <Outlet />
                </Main>
            </main>
            <Footer />
        </div>
    )
}
export default Layout