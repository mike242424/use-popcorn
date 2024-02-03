import Logo from './Logo';
import NumResults from './NumResults';
import SearchInput from './SearchInput';

export default function Navbar({ movies }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <SearchInput />
      <NumResults movies={movies} />
    </nav>
  );
}
