import { Link, Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem'
        }}
      >
        <Link to="/shoes">Shoes</Link> | <Link to="/invoices">Invoices</Link> |{' '}
        <Link to="/expenses">Expenses</Link>
      </nav>
      <Outlet />
    </div>
  );
}

// const App = () => {
//   return (
//     <BrowserRouter>
//       <nav
//         style={{
//           borderBottom: 'solid 1px',
//           paddingBottom: '1rem'
//         }}
//       >
//         <Link to="/">Home</Link> | <Link to="/about">About</Link>
//       </nav>
//
//       <Suspense fallback={<p> Loading...</p>}>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           {/* <Route path="streamer2" element={<Mixer />}>
//               <Route path=":eventId" element={<Mixer />} />
//             </Route> */}
//           <Route path="*" element={<div>not found</div>} />
//         </Routes>
//       </Suspense>
//     </BrowserRouter>
//   );
// };
//
// export default App;
