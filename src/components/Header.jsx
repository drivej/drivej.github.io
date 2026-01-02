export function Header({ name, subtitle, nav }) {
  return (
    <header className='site-header'>
	      <div className="site-header-inner">
	        <a className='brand' href='#top'>
	          <div className='logo' aria-hidden='true' />
	          <div>
	            <b>{name}</b>
	            <span>{subtitle}</span>
	          </div>
	        </a>

	        <nav className='nav' aria-label='Primary'>
	          {nav.map((item) => (
	            <a key={item.href} className='pill' href={item.href}>
	              {item.label} <kbd>{item.kbd}</kbd>
	            </a>
	          ))}
	        </nav>
	      </div>
    </header>
  );
}
