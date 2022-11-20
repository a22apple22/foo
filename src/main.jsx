import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Link,
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams
} from 'react-router-dom';

import App from './App';
import './index.scss';
import { deleteInvoice, getInvoice, getInvoices } from './assets/data.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="shoes" element={<Shoes />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="invoices" element={<Invoices />}>
            <Route
              index
              element={
                <main style={{ padding: '1rem' }}>
                  <p>Select an invoice</p>
                </main>
              }
            />
            <Route path=":invoiceId" element={<Invoice />} />
          </Route>
          <Route
            path="*"
            element={
              <main style={{ padding: '1rem' }}>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

function Shoes() {
  return (
    <main style={{ padding: '1rem 0' }}>
      <h2>Shoes</h2>
      <BrandLink brand="foo">foo</BrandLink> |
      <BrandLink brand="boo">boo</BrandLink> |
      <BrandLink brand="bar">bar</BrandLink>
    </main>
  );
}

function BrandLink({ brand, ...props }) {
  let [params] = useSearchParams();
  let isActive = params.getAll('brand').includes(brand);
  if (!isActive) {
    params.append('brand', brand);
  } else {
    params = new URLSearchParams(
      Array.from(params).filter(
        ([key, value]) => key !== 'brand' || value !== brand
      )
    );
  }

  // let brands = params.getAll('brand');
  // let isActive = brands.includes(brand) && brands.length === 1;

  return (
    <Link
      style={{ color: isActive ? 'red' : '' }}
      to={`/shoes?${params.toString()}`}
      // to={`/shoes?brand=${brand}`}
      {...props}
    />
  );
}

function Expenses() {
  return (
    <main style={{ padding: '1rem 0' }}>
      <h2>Expenses</h2>
    </main>
  );
}

function Invoices() {
  let invoices = getInvoices();
  let [searchParams, setSearchParams] = useSearchParams({
    xxx: ['bbb', 'yyy']
  });
  console.log([...searchParams.entries()]);

  return (
    <div style={{ display: 'flex' }}>
      <nav
        style={{
          borderRight: 'solid 1px',
          padding: '1rem'
        }}
      >
        <input
          value={searchParams.get('filter') || ''}
          onChange={event => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
        {invoices
          .filter(invoice => {
            let filter = searchParams.get('filter');
            if (!filter) return true;
            let name = invoice.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map(invoice => (
            <QueryNavLink
              style={({ isActive }) => {
                return {
                  display: 'block',
                  color: isActive ? 'red' : ''
                };
              }}
              to={`/invoices/${invoice.number}`}
              key={invoice.number}
            >
              {invoice.name}
            </QueryNavLink>
          ))}
      </nav>
      <Outlet />
    </div>
  );
}

function QueryNavLink({ to, ...props }) {
  let location = useLocation();
  console.log(location);
  return <NavLink to={to + location.search} {...props} />;
}

function Invoice() {
  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();
  let invoice = getInvoice(parseInt(params.invoiceId, 10));
  return (
    <main style={{ padding: '1rem' }}>
      <h2>Total Due: {invoice.amount}</h2>
      <p>
        {invoice.name}: {invoice.number}
      </p>
      <p>Due Date: {invoice.due}</p>
      <p>
        <button
          onClick={() => {
            deleteInvoice(invoice.number);
            navigate('/invoices' + location.search);
          }}
        >
          Delete
        </button>
      </p>
    </main>
  );
}
// {
//   /*<BrowserRouter>
//       <App />
//       <Routes>
//         <Route path="/" element={<App />}>
//           <Route index element={<Home />} />
//           <Route path="teams" element={<Teams />}>
//             <Route path=":teamId" element={<Team />} />
//             <Route path="new" element={<NewTeamForm />} />
//             <Route index element={<LeagueStandings />} />
//           </Route>
//         </Route>
//       </Routes>
//     </BrowserRouter>*/
// }

// function App() {
//   return (
//     <>
//       <nav>
//         <Link to="/">Home</Link> |<Link to="/dashboard">Dashboard</Link>|
//         <Link to="/dashboard/invoices">Invoices</Link>
//       </nav>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="dashboard/*" element={<Dashboard />} />
//       </Routes>
//     </>
//   );
// }
//
// function Dashboard() {
//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <Routes>
//         <Route path="/" element={<DashboardGraphs />} />
//         <Route path="invoices" element={<InvoiceList />} />
//       </Routes>
//     </div>
//   );
// }
//
// function Home() {
//   return <h1>Home</h1>;
// }
//
// function DashboardGraphs() {
//   return <h2>DashboardGraphs</h2>;
// }
//
// function InvoiceList() {
//   return <h2>InvoiceList</h2>;
// }

// function App() {
//   return (
//     <>
//       <Sidebar>
//         <Routes>
//           <Route path="/" element={<MainNav />} />
//           <Route path="dashboard" element={<DashboardNav />} />
//         </Routes>
//       </Sidebar>
//       <hr />
//       <MainContent>
//         <Routes>
//           <Route path="/" element={<Home />}>
//             <Route path="about" element={<About />} />
//             <Route path="support" element={<Support />} />
//           </Route>
//           <Route path="dashboard" element={<Dashboard />}>
//             <Route path="invoices" element={<Invoices />} />
//             <Route path="team" element={<Team />} />
//           </Route>
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </MainContent>
//     </>
//   );
// }
//
// function Sidebar({ children }) {
//   return (
//     <div className="Sidebar">
//       <h1>Sidebar</h1>
//       <nav>
//         <Link to="/">Home</Link> |<Link to="dashboard">Dashboard</Link>
//       </nav>
//       {children}
//     </div>
//   );
// }
//
// function MainNav() {
//   return <h2>MainNav</h2>;
// }
//
// function DashboardNav() {
//   return <h2>DashboardNav</h2>;
// }
//
// function MainContent({ children }) {
//   return (
//     <div className="MainContent">
//       <h1>MainContent</h1>
//       <nav>
//         <Link to="/">Home</Link> |<Link to="/dashboard">Dashboard</Link> |
//         <Link to="/about">About</Link> |<Link to="/support">Support</Link> |
//         <Link to="/dashboard/invoices">Invoices</Link> |
//         <Link to="/dashboard/team">Team</Link> |<Link to="/xxx">NotFound</Link>
//       </nav>
//       {children}
//     </div>
//   );
// }
//
// function Home() {
//   return (
//     <div>
//       <h2>Home</h2>
//       <Outlet />
//     </div>
//   );
// }
//
// function About() {
//   return <h3>About</h3>;
// }
//
// function Support() {
//   return <h3>Support</h3>;
// }
//
// function Dashboard() {
//   return (
//     <div>
//       <h2>Dashboard</h2>
//       <Outlet />
//     </div>
//   );
// }
//
// function Invoices() {
//   return <h3>Invoices</h3>;
// }
//
// function Team() {
//   return <h3>Team</h3>;
// }
//
// function NotFound() {
//   return <h2>NotFound</h2>;
// }

// function Root() {
//   const element = useRoutes([
//     {
//       path: '/',
//       element: <App />,
//       children: [
//         {
//           index: true,
//           element: <Home />
//         },
//         {
//           path: 'teams',
//           element: <Teams />,
//           children: [
//             { path: ':teamId', element: <Team /> },
//             { path: 'new', element: <NewTeamForm /> },
//             { index: true, element: <LeagueStandings /> }
//           ]
//         }
//       ]
//     }
//   ]);
//   return element;
// }

// function App() {
//   return (
//     <>
//       <nav>
//         <Link to="/">Home</Link> | <Link to="/teams">Teams</Link> |{' '}
//         <Link to="/teams/1">Team 1</Link> |<Link to="/teams/2">Team 2</Link> |
//         <Link to="/teams/new">New Team</Link> |
//       </nav>
//       <h1>App</h1>
//       <main>
//         <Outlet />
//       </main>
//     </>
//   );
// }

// function Home() {
//   return <h2>Home</h2>;
// }

// function Teams() {
//   return (
//     <div>
//       <h2>Teams</h2>
//       <Outlet />
//     </div>
//   );
// }

// function Team() {
//   const { teamId } = useParams();
//   return <h3>Team {teamId}</h3>;
// }

// function NewTeamForm() {
//   return <h3>New Team</h3>;
// }
//
// function LeagueStandings() {
//   return <h3>League Standings</h3>;
// }
