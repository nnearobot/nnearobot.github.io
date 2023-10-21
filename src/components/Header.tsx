import Navbar from './Navbar';

const Header = ({...props}) => {   
    return (
        <header>
            <Navbar 
            {...props}
            />
        </header>
    );
};

export default Header;