import { Link } from 'react-router-dom';

export const GlobalHeader = () => {
	  return (
	    <Header
	      name='Jason Contento'
	      subtitle='Developer • Designer • Builder'
	      nav={[
	        { href: '/?section=projects', label: 'Projects', kbd: '5' },
	        { href: '/?section=about', label: 'About', kbd: '2' },
	        { href: '/?section=contact', label: 'Contact', kbd: '3' },
	        { href: '/lab', label: 'Lab', kbd:'4' }
	      ]}
	    />
	  );
};

export function Header({ name, subtitle, nav }) {
	  return (
	    <header className='site-header'>
	      <div className='site-header-inner'>
	        <Link className='brand' to='/'>
	          <div className='logo' aria-hidden='true' />
	          <div>
	            <b>{name}</b>
	            <span>{subtitle}</span>
	          </div>
	        </Link>

        <nav className='nav' aria-label='Primary'>
          {nav.map((item) => {
            const isRouteLink = typeof item.href === 'string' && item.href.startsWith('/');
            const content = (
              <>
                {item.label}
                {item.kbd ? <kbd>{item.kbd}</kbd> : null}
              </>
            );

            return isRouteLink ? (
              <Link key={item.href} className='pill' to={item.href}>
                {content}
              </Link>
            ) : (
              <a key={item.href} className='pill' href={item.href}>
                {content}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
