import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const { Header } = Layout;

const items: MenuProps["items"] = [
  {
    label: <Link to="/characters">Personagens</Link>,
    key: "characters",
  },
  {
    label: <Link to="/locations">Localizações</Link>,
    key: "locations",
  },
  {
    label: <Link to="/episodes">Episódios</Link>,
    key: "episodes",
  },
];

const Logo = styled.img`
  width: 150px;
  height: auto;
`;

const Navbar: React.FC = () => {
  const location = useLocation();
  const [current, setCurrent] = useState("characters");

  useEffect(() => {
    if (location.pathname.includes("/characters")) {
      setCurrent("characters");
    } else if (location.pathname.includes("/locations")) {
      setCurrent("locations");
    } else if (location.pathname.includes("/episodes")) {
      setCurrent("episodes");
    }
  }, [location]);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent' }}>
        <Logo src='https://1000logos.net/wp-content/uploads/2022/03/Rick-and-Morty.png' alt="Rick and Morty" />
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
          style={{ flex: '1', justifyContent: 'flex-end', background: 'transparent' }}
        />
      </Header>
    </Layout>
  );
};

export default Navbar;
