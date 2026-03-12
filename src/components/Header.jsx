function Header() {
  const menuItems = [
    { id: 1, label: 'Histórico valores', href: '#historico-valores' },
    { id: 2, label: 'Última actualización', href: '#ultima-actualizacion' },
    { id: 3, label: 'Convertir divisas', href: '#convertir-divisas' },
  ];

  return (
    <header>
      <h1>Bitcoin Dashboard</h1>
      <dl>
        {menuItems.map((item) => (
          <li key={item.id}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </dl>
    </header>
  );
}

export default Header;
