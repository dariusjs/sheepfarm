import Link from 'next/link'
import navStyles from '../styles/Nav.module.css'
export default function Nav() {

  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href="index">Home</Link>
        </li>
        <li>
          <Link href="Sheep">Sheep</Link>
        </li>
        <li>
          <Link href="Equipment">Equipment</Link>
        </li>
        <li>
          <Link href="Perishables">Perishables</Link>
        </li>
      </ul>
    </nav>
  )
}
