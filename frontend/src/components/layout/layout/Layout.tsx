import { useContext } from 'react'
import AuthContext from '../../auth/auth/AuthContext'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import Main from '../main/Main'
import './Layout.css'


export default function Layout() {
    const { jwt } = useContext(AuthContext)!

    return (
        <div className="Layout">
            {jwt && (
                <header>
                    <Header />
                </header>
            )}

            <main>
                <Main />
            </main>

            {jwt && (
                <footer>
                    <Footer />
                </footer>
            )}
        </div>
    )
}