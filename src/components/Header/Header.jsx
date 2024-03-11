import './Header.css'
import img from '../../assets/images/spotify-logo.png'

const Header = () => {
    return(
        <div>
            <div className="logo-container">
                <img className="spotify-logo" src={img}/>
                <h1 className="header">Jam<span>m</span>ming</h1>
            </div>
            <div className="p-container">
                <p className="description">Search for your favorite songs, add them to a playlist, and save it directly to your spotify!</p>
            </div>
        </div>
    );
}

export default Header;