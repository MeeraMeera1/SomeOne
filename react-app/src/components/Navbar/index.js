import React from "react";
import Logo from "../../assets2/logo.svg"

const NavBar = () => {
//   const sessionUser = useSelector((state) => state.session.user);
//   const width = useWindowWidth();

//   let sessionLinks;

//   if (!!sessionUser) {
//     if (width > 800) {
//       sessionLinks = (
//         <>
//           <LogoutButton />
//         </>
//       );
//     } else {
//       sessionLinks = null;
//     }
//   } else {
//     if (width > 800) {
//       sessionLinks = (
//         <>
//           <li className="nav__item">
//             <LoginFormModal />
//           </li>
//           <li className="nav__item">
//             <SignUpFormModal />
//           </li> 
//           <li className="nav__item">
//             <NavLink
//               className="nav__item"
//               to="/browse"
//               exact={true}
//               activeClassName="active"
//             >
//               Get Started
//             </NavLink>
//           </li>
//         </>
//       );
//     } else {
//       sessionLinks = <SessionLinksDropdown />;
//     }
//   }

  return (
    <header className="sticky top-0 left-0 right-0 z-20">
      <nav className="container mx-auto px-6 md:px-12 py-4">
        <div className="md:flex justify-between items-center">
          <div className="flex justify-between items-center">
            <a href="/">
              <img className="mr-2 fill-current" src={Logo} />
            </a>
            <div className="hidden md:flex items-center">
              <a
                href="/dashboard"
                className="block bg-white hover:bg-gray-100 py-3 px-4 rounded-lg text-lg text-gray-800 font-bold uppercase mt-10"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
