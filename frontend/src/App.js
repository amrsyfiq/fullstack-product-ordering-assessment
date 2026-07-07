import React, { useState } from 'react';
import {
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from 'reactstrap';
import ProductListing from './components/ProductListing';
import OrderHistory from './components/OrderHistory';
import { TABS } from './constants';

function App() {
  const [activeTab, setActiveTab] = useState(TABS.PRODUCTS);

  return (
    <Container fluid className="py-3">
      <Nav pills className="justify-content-center mb-4">
        <NavItem>
          <NavLink
            href="#"
            active={activeTab === TABS.PRODUCTS}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab(TABS.PRODUCTS);
            }}
          >
            Product Listing
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            href="#"
            active={activeTab === TABS.ORDERS}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab(TABS.ORDERS);
            }}
          >
            Order History
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId={TABS.PRODUCTS}>
          {activeTab === TABS.PRODUCTS && <ProductListing />}
        </TabPane>
        <TabPane tabId={TABS.ORDERS}>
          {activeTab === TABS.ORDERS && <OrderHistory />}
        </TabPane>
      </TabContent>
    </Container>
  );
}

export default App;
